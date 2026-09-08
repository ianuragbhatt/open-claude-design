import { tool, ToolLoopAgent, isStepCount } from "ai";
import { z } from "zod";
import { resolveLanguageModel, type ModelResolutionOptions } from "./provider";
import { createAgentTools } from "./tools";
import { getWorkspaceStorage } from "../workspace";
import {
  buildMarkupDesignerPrompt,
  buildStylistPrompt,
  buildEngineerPrompt,
  buildReviewerPrompt,
  type AgentPromptContext,
} from "./prompt";

export type SpecialistRole = "supervisor" | "designer" | "stylist" | "engineer" | "reviewer";

export interface SpecialistInfo {
  role: SpecialistRole;
  title: string;
  avatar: string;
  badge: string;
  description: string;
}

export const SPECIALISTS: Record<SpecialistRole, SpecialistInfo> = {
  supervisor: {
    role: "supervisor",
    title: "Creative Director",
    avatar: "🏛️",
    badge: "Director",
    description: "Orchestrating design vision, architecture, and team delegation",
  },
  designer: {
    role: "designer",
    title: "UI Markup Designer",
    avatar: "🎨",
    badge: "Designer",
    description: "Crafting semantic HTML, Lucide icons, and layout structure",
  },
  stylist: {
    role: "stylist",
    title: "Style Specialist",
    avatar: "💅",
    badge: "Stylist",
    description: "Authoring design system CSS variables, responsive layout, and glass cards",
  },
  engineer: {
    role: "engineer",
    title: "Logic Engineer",
    avatar: "⚡",
    badge: "Engineer",
    description: "Wiring up reactive DOM, canvas charts, event handlers, and persistence",
  },
  reviewer: {
    role: "reviewer",
    title: "Quality Reviewer",
    avatar: "🔍",
    badge: "Reviewer",
    description: "Validating DOM IDs, verifying syntax, and executing surgical fixes",
  },
};

export type SupervisorStreamEvent =
  | { type: "text"; text: string; specialist?: SpecialistRole }
  | { type: "thinking"; text: string; specialist?: SpecialistRole }
  | {
      type: "specialist_dispatched";
      specialist: SpecialistRole;
      task: string;
      title: string;
      avatar: string;
    }
  | {
      type: "tool_call";
      toolCallId: string;
      toolName: string;
      args: any;
      specialist?: SpecialistRole;
    }
  | {
      type: "tool_result";
      toolCallId: string;
      toolName: string;
      result: any;
      specialist?: SpecialistRole;
    }
  | { type: "phase_complete"; specialist: SpecialistRole; summary: string }
  | { type: "finish" }
  | { type: "error"; error: string };

export interface SupervisorExecutionOptions {
  projectId: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  brandId: string;
  customBrand?: string;
  selectedElementContext?: AgentPromptContext["selectedElementContext"];
  modelOptions: ModelResolutionOptions;
  abortSignal?: AbortSignal;
}

export function buildSupervisorPrompt(context: AgentPromptContext): string {
  return `
You are Khayal, the Lead Creative Director and Engineering Supervisor of an autonomous UI/UX studio.
You pair Claude Design's design system contracts with Lovable.dev's autonomous agent engine to build production-grade web applications.

You are an AUTONOMOUS AGENT. You make your own strategic decisions. You do not follow rigid scripts—you evaluate the workspace and user request, then summon the right specialist agents at the right time.

### YOUR SPECIALIST TEAM:
1. \`delegate_to_designer\`: Dispatches the UI Markup Designer to create or update \`index.html\` (semantic HTML5, Lucide icons, data-khayal-element hooks).
2. \`delegate_to_stylist\`: Dispatches the Style Specialist to create or update \`styles.css\` (design system CSS custom properties, responsive layout, glass surfaces, elevation).
3. \`delegate_to_engineer\`: Dispatches the Frontend Logic Engineer to create or update \`script.js\` (interactive event listeners, calculations, canvas charts, localStorage).
4. \`delegate_to_reviewer\`: Dispatches the Quality Reviewer & Linter to inspect the workspace files, verify that DOM IDs match, check for syntax errors, and run surgical fixes via \`edit_file\`.
5. \`inspect_workspace\`: Allows you to inspect existing files and directory structure before deciding your strategy.

### STRATEGIC REASONING & QUALITY STANDARDS:
- **For New Applications**:
  1. Inspect the brief and design system tokens.
  2. Summon the Designer to establish the layout, structure, and semantic markup in \`index.html\`.
  3. Summon the Stylist to apply the active brand design contract, CSS variables, and responsive styling in \`styles.css\`.
  4. Summon the Engineer to wire up full interactivity, state, and charts in \`script.js\`.
  5. Summon the Reviewer to run quality assurance and ensure zero console errors.
- **For Incremental Revisions**:
  - Do NOT rewrite everything. Inspect existing files first.
  - If the user asks for styling or color tweaks, summon ONLY the Stylist.
  - If the user asks for new interactive features, summon the Engineer (and Designer if new HTML markup is required).
  - If the user clicked a specific element in the canvas preview, use the targeted context to instruct your specialist with pinpoint precision.
- **Quality Standard**:
  - Never allow "Lorem Ipsum" or AI slop.
  - Always demand authentic micro-copy, believable metrics, and intentional design system tokens.
  - When your team completes their work, provide a polished, concise closing review to the user.
`.trim();
}

export async function* executeSupervisorLoop(
  options: SupervisorExecutionOptions
): AsyncGenerator<SupervisorStreamEvent, void, unknown> {
  const {
    projectId,
    messages,
    brandId,
    customBrand,
    selectedElementContext,
    modelOptions,
    abortSignal,
  } = options;

  const storage = getWorkspaceStorage();
  await storage.ensureProject(projectId, brandId);

  const model = resolveLanguageModel(modelOptions);
  const context: AgentPromptContext = {
    brandId,
    customBrand,
    selectedElementContext,
  };

  const allWorkspaceTools = createAgentTools(projectId);

  // Queue to stream subagent events out to client in real time
  const eventQueue: SupervisorStreamEvent[] = [];

  // Helper to run a subagent and stream its events
  async function runSubagent(
    role: SpecialistRole,
    prompt: string,
    instruction: string,
    tools: any,
    maxSteps = 5
  ): Promise<string> {
    const spec = SPECIALISTS[role];
    eventQueue.push({
      type: "specialist_dispatched",
      specialist: role,
      task: instruction,
      title: spec.title,
      avatar: spec.avatar,
    });

    const subagent = new ToolLoopAgent({
      model,
      instructions: prompt,
      tools,
      maxOutputTokens: 6144,
      stopWhen: isStepCount(maxSteps),
    });

    let accumulatedText = "";

    try {
      const result = await subagent.stream({
        messages: [{ role: "user", content: instruction }],
        abortSignal,
      });

      for await (const part of result.stream) {
        const p = part as any;
        if (p.type === "text-delta" || p.type === "text") {
          const text = p.textDelta || p.text || "";
          accumulatedText += text;
          eventQueue.push({ type: "text", text, specialist: role });
        } else if (p.type === "reasoning" || p.type === "reasoning-delta") {
          const text = p.textDelta || p.text || "";
          eventQueue.push({ type: "thinking", text, specialist: role });
        } else if (p.type === "tool-call") {
          let parsedArgs = p.input || p.args;
          if (typeof parsedArgs === "string") {
            try {
              parsedArgs = JSON.parse(parsedArgs);
            } catch {}
          }
          eventQueue.push({
            type: "tool_call",
            toolCallId: p.toolCallId,
            toolName: p.toolName,
            args: parsedArgs,
            specialist: role,
          });
        } else if (p.type === "tool-result") {
          eventQueue.push({
            type: "tool_result",
            toolCallId: p.toolCallId,
            toolName: p.toolName,
            result: p.output || p.result,
            specialist: role,
          });
        }
      }

      eventQueue.push({
        type: "phase_complete",
        specialist: role,
        summary: accumulatedText.slice(0, 200) || `${spec.title} completed their task successfully.`,
      });

      return accumulatedText || `${spec.title} completed task successfully.`;
    } catch (err: any) {
      const errMsg = err?.message || `${spec.title} encountered an error.`;
      eventQueue.push({
        type: "tool_result",
        toolCallId: "err_" + Math.random().toString(36).slice(2, 7),
        toolName: `delegate_to_${role}`,
        result: { success: false, error: errMsg },
        specialist: role,
      });
      return `Warning: ${errMsg}`;
    }
  }

  // Define the Supervisor's Autonomous Delegation Tools
  const supervisorTools = {
    inspect_workspace: tool({
      description: "Inspect workspace files or read a specific file to evaluate the current codebase state.",
      inputSchema: z.object({
        path: z.string().optional().describe("Optional relative file path to read (e.g. 'index.html', 'styles.css'). If omitted, lists all files."),
      }),
      execute: async ({ path }: { path?: string }) => {
        try {
          if (path) {
            const exists = await storage.fileExists(projectId, path);
            if (!exists) return { success: false, error: `File not found: ${path}` };
            const content = await storage.readFile(projectId, path);
            return { success: true, path, length: content.length, preview: content.slice(0, 2500) };
          }
          const files = await storage.listFiles(projectId);
          return { success: true, files };
        } catch (err: any) {
          return { success: false, error: err.message };
        }
      },
    }),

    delegate_to_designer: tool({
      description: "Dispatch the UI Markup Designer specialist to create or update semantic 'index.html', Lucide icons, and layout structure.",
      inputSchema: z.object({
        task: z.string().describe("Specific instructions for the Markup Designer describing the UI structure, sections, and copy."),
      }),
      execute: async ({ task }: { task: string }) => {
        const designerTools = {
          write_file: allWorkspaceTools.write_file,
          edit_file: allWorkspaceTools.edit_file,
          read_file: allWorkspaceTools.read_file,
          fetch_asset: allWorkspaceTools.fetch_asset,
          list_files: allWorkspaceTools.list_files,
        };
        const summary = await runSubagent("designer", buildMarkupDesignerPrompt(context), task, designerTools, 5);
        return { success: true, specialist: "designer", summary };
      },
    }),

    delegate_to_stylist: tool({
      description: "Dispatch the Style & Design System Specialist to write or refine 'styles.css', design tokens, glass cards, and responsive layout.",
      inputSchema: z.object({
        task: z.string().describe("Specific styling instructions, brand contract details, and layout requirements."),
      }),
      execute: async ({ task }: { task: string }) => {
        const stylistTools = {
          write_file: allWorkspaceTools.write_file,
          edit_file: allWorkspaceTools.edit_file,
          read_file: allWorkspaceTools.read_file,
          list_files: allWorkspaceTools.list_files,
        };
        const summary = await runSubagent("stylist", buildStylistPrompt(context), task, stylistTools, 5);
        return { success: true, specialist: "stylist", summary };
      },
    }),

    delegate_to_engineer: tool({
      description: "Dispatch the Frontend Logic Engineer to create or update 'script.js' with state, event listeners, charts, and localStorage persistence.",
      inputSchema: z.object({
        task: z.string().describe("Specific interactivity instructions, data schema, and interactive logic requirements."),
      }),
      execute: async ({ task }: { task: string }) => {
        const engineerTools = {
          write_file: allWorkspaceTools.write_file,
          edit_file: allWorkspaceTools.edit_file,
          read_file: allWorkspaceTools.read_file,
          list_files: allWorkspaceTools.list_files,
        };
        const summary = await runSubagent("engineer", buildEngineerPrompt(context), task, engineerTools, 5);
        return { success: true, specialist: "engineer", summary };
      },
    }),

    delegate_to_reviewer: tool({
      description: "Dispatch the Quality Reviewer to inspect files, check for missing element IDs or syntax issues, and execute surgical fixes via edit_file.",
      inputSchema: z.object({
        criteria: z.string().optional().describe("Specific acceptance criteria or areas to verify (e.g. 'check canvas IDs and Lucide icons')."),
      }),
      execute: async ({ criteria = "Run full QA checklist on index.html, styles.css, and script.js" }: { criteria?: string }) => {
        const reviewerTools = {
          read_file: allWorkspaceTools.read_file,
          edit_file: allWorkspaceTools.edit_file,
          list_files: allWorkspaceTools.list_files,
        };
        const summary = await runSubagent("reviewer", buildReviewerPrompt(context), criteria, reviewerTools, 4);
        return { success: true, specialist: "reviewer", summary };
      },
    }),
  };

  // Instantiate the Supervisor Agent
  const supervisor = new ToolLoopAgent({
    model,
    instructions: buildSupervisorPrompt(context),
    tools: supervisorTools,
    maxOutputTokens: 6144,
    stopWhen: isStepCount(12),
  });

  const stream = await supervisor.stream({
    messages,
    abortSignal,
  });

  // Drain and stream both supervisor stream and queued subagent events
  for await (const part of stream.stream) {
    // Flush any events from subagents that executed
    while (eventQueue.length > 0) {
      const queued = eventQueue.shift()!;
      yield queued;
    }

    const p = part as any;
    if (p.type === "text-delta" || p.type === "text") {
      const text = p.textDelta || p.text || "";
      if (text) {
        yield { type: "text", text, specialist: "supervisor" };
      }
    } else if (p.type === "reasoning" || p.type === "reasoning-delta") {
      const text = p.textDelta || p.text || "";
      if (text) {
        yield { type: "thinking", text, specialist: "supervisor" };
      }
    } else if (p.type === "tool-call") {
      let parsedArgs = p.input || p.args;
      if (typeof parsedArgs === "string") {
        try {
          parsedArgs = JSON.parse(parsedArgs);
        } catch {}
      }
      yield {
        type: "tool_call",
        toolCallId: p.toolCallId,
        toolName: p.toolName,
        args: parsedArgs,
        specialist: "supervisor",
      };
    } else if (p.type === "tool-result") {
      yield {
        type: "tool_result",
        toolCallId: p.toolCallId,
        toolName: p.toolName,
        result: p.output || p.result,
        specialist: "supervisor",
      };
    }
  }

  // Final flush of remaining subagent events
  while (eventQueue.length > 0) {
    const queued = eventQueue.shift()!;
    yield queued;
  }

  yield { type: "finish" };
}
