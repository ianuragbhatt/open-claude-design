import { ToolLoopAgent, isStepCount } from "ai";
import { resolveLanguageModel, type ModelResolutionOptions } from "./provider";
import { createAgentTools } from "./tools";
import {
  buildArchitectPrompt,
  buildMarkupDesignerPrompt,
  buildStylistPrompt,
  buildEngineerPrompt,
  buildReviewerPrompt,
  type AgentPromptContext,
} from "./prompt";

export type AgentPhase = "architect" | "designer" | "stylist" | "engineer" | "reviewer";

export interface AgentPhaseInfo {
  phase: AgentPhase;
  title: string;
  badge: string;
  avatar: string;
  description: string;
}

export const AGENT_PHASES: Record<AgentPhase, AgentPhaseInfo> = {
  architect: {
    phase: "architect",
    title: "System Architect",
    badge: "Architect",
    avatar: "🏛️",
    description: "Analyzing prompt, selecting tokens, and structuring component hierarchy",
  },
  designer: {
    phase: "designer",
    title: "UI Markup Designer",
    badge: "Designer",
    avatar: "🎨",
    description: "Drafting semantic HTML, accessibility tags, and Lucide icons",
  },
  stylist: {
    phase: "stylist",
    title: "Style Specialist",
    badge: "Stylist",
    avatar: "💅",
    description: "Applying brand design contracts, CSS variables, and responsive layout",
  },
  engineer: {
    phase: "engineer",
    title: "Logic Engineer",
    badge: "Engineer",
    avatar: "⚡",
    description: "Wiring up reactive state, charts, form modals, and localStorage",
  },
  reviewer: {
    phase: "reviewer",
    title: "Quality Reviewer",
    badge: "Reviewer",
    avatar: "🔍",
    description: "Inspecting codebase, checking element references, and executing surgical fixes",
  },
};

export interface MultiAgentPipelineOptions {
  projectId: string;
  userPrompt: string;
  conversationHistory?: Array<{ role: "user" | "assistant"; content: string }>;
  brandId: string;
  customBrand?: string;
  selectedElementContext?: AgentPromptContext["selectedElementContext"];
  modelOptions: ModelResolutionOptions;
  abortSignal?: AbortSignal;
}

export async function* runMultiAgentPipeline(
  options: MultiAgentPipelineOptions
): AsyncGenerator<string, void, unknown> {
  const {
    projectId,
    userPrompt,
    brandId,
    customBrand,
    selectedElementContext,
    modelOptions,
    abortSignal,
  } = options;

  const model = resolveLanguageModel(modelOptions);
  const allTools = createAgentTools(projectId);

  const context: AgentPromptContext = {
    brandId,
    customBrand,
    selectedElementContext,
  };

  // If this is a surgical edit of an element, run a fast targeted reviewer/stylist edit instead of full 5-stage pipeline
  if (selectedElementContext) {
    yield JSON.stringify({
      type: "agent_phase",
      ...AGENT_PHASES.reviewer,
      title: "Surgical Revision Agent",
      description: `Targeting element <${selectedElementContext.elementName || "element"}> for precision edit`,
    });

    const reviewerAgent = new ToolLoopAgent({
      model,
      instructions: buildReviewerPrompt(context),
      tools: allTools,
      maxOutputTokens: 4096,
      stopWhen: isStepCount(4),
    });

    const stream = await reviewerAgent.stream({
      messages: [{ role: "user", content: userPrompt }],
      abortSignal,
    });

    for await (const part of stream.stream) {
      yield* serializeStreamPart(part);
    }
    return;
  }

  // Full Pipeline Execution
  const pipeline: Array<{
    phase: AgentPhase;
    promptBuilder: (ctx: AgentPromptContext) => string;
    maxSteps: number;
    instruction: string;
  }> = [
    {
      phase: "architect",
      promptBuilder: buildArchitectPrompt,
      maxSteps: 2,
      instruction: `Analyze this design request and create a concise Architecture Blueprint:\n"${userPrompt}"`,
    },
    {
      phase: "designer",
      promptBuilder: buildMarkupDesignerPrompt,
      maxSteps: 4,
      instruction: `Using write_file, create 'index.html' based on the architectural plan for: "${userPrompt}". Include all semantic markup, Lucide icons, and data-khayal-element tags.`,
    },
    {
      phase: "stylist",
      promptBuilder: buildStylistPrompt,
      maxSteps: 4,
      instruction: `Inspect 'index.html' using read_file, then write complete 'styles.css' using write_file for: "${userPrompt}". Ensure responsive design and active design system tokens.`,
    },
    {
      phase: "engineer",
      promptBuilder: buildEngineerPrompt,
      maxSteps: 4,
      instruction: `Inspect 'index.html' using read_file, then write complete 'script.js' using write_file for: "${userPrompt}". Include DOM events, charts, and localStorage persistence.`,
    },
    {
      phase: "reviewer",
      promptBuilder: buildReviewerPrompt,
      maxSteps: 4,
      instruction: `Inspect the workspace files (index.html, styles.css, script.js). Verify all IDs and functions match. If any issue or syntax bug exists, fix it using edit_file. Provide a final summary.`,
    },
  ];

  let architectSummary = "";

  for (const step of pipeline) {
    if (abortSignal?.aborted) break;

    const phaseInfo = AGENT_PHASES[step.phase];

    // Emit phase announcement event
    yield JSON.stringify({
      type: "agent_phase",
      ...phaseInfo,
    });

    const agent = new ToolLoopAgent({
      model,
      instructions: step.promptBuilder(context),
      tools: allTools,
      maxOutputTokens: 6144,
      stopWhen: isStepCount(step.maxSteps),
    });

    const promptMessage = architectSummary
      ? `${step.instruction}\n\nArchitectural Plan Reference:\n${architectSummary}`
      : step.instruction;

    try {
      const result = await agent.stream({
        messages: [{ role: "user", content: promptMessage }],
        abortSignal,
      });

      for await (const part of result.stream) {
        const p = part as any;
        if (step.phase === "architect" && (p.type === "text-delta" || p.type === "text")) {
          architectSummary += p.textDelta || p.text || "";
        }
        yield* serializeStreamPart(p);
      }
    } catch (err: any) {
      if (abortSignal?.aborted) break;
      // Log phase error but allow pipeline to proceed to subsequent stages if possible
      yield JSON.stringify({
        type: "phase_warning",
        phase: step.phase,
        message: err?.message || "Phase completed with warnings.",
      });
    }
  }
}

function* serializeStreamPart(p: any): Generator<string, void, unknown> {
  if (p.type === "text-delta" || p.type === "text") {
    const text = p.textDelta || p.text || "";
    if (text) {
      yield JSON.stringify({ type: "text", text });
    }
  } else if (p.type === "reasoning" || p.type === "reasoning-delta") {
    const text = p.textDelta || p.text || "";
    if (text) {
      yield JSON.stringify({ type: "thinking", text });
    }
  } else if (p.type === "tool-call") {
    let parsedArgs = p.input || p.args;
    if (typeof parsedArgs === "string") {
      try {
        parsedArgs = JSON.parse(parsedArgs);
      } catch {}
    }
    yield JSON.stringify({
      type: "tool_call",
      toolCallId: p.toolCallId,
      toolName: p.toolName,
      args: parsedArgs,
    });
  } else if (p.type === "tool-result") {
    yield JSON.stringify({
      type: "tool_result",
      toolCallId: p.toolCallId,
      toolName: p.toolName,
      result: p.output || p.result,
    });
  }
}
