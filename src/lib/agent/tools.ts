import { tool } from "ai";
import { z } from "zod";
import { getWorkspaceStorage } from "../workspace";

export function createAgentTools(projectId: string) {
  const storage = getWorkspaceStorage();

  return {
    write_file: tool({
      description:
        "Create a new file or completely overwrite an existing file in the project workspace (e.g., 'index.html', 'styles.css', 'script.js', 'components/hero.html', 'about.html').",
      inputSchema: z.object({
        path: z
          .string()
          .describe("The relative file path inside the workspace (e.g. 'index.html', 'styles.css')."),
        content: z.string().describe("The complete code contents to write to the file."),
      }),
      execute: async ({ path, content }: { path: string; content: string }) => {
        try {
          await storage.writeFile(projectId, path, content);
          return {
            success: true,
            path,
            message: `Successfully wrote file: ${path} (${content.length} characters)`,
          };
        } catch (err: any) {
          return { success: false, path, error: err.message };
        }
      },
    }),

    edit_file: tool({
      description:
        "Surgically edit an existing file by replacing a specific unique code snippet with new code. Always prefer this over write_file for small adjustments, fixes, or styling tweaks.",
      inputSchema: z.object({
        path: z.string().describe("The relative file path of the existing file to modify."),
        target_snippet: z
          .string()
          .describe(
            "The exact character-sequence in the file to be replaced. Must match existing file content verbatim."
          ),
        replacement_snippet: z
          .string()
          .describe("The complete replacement code to insert in place of target_snippet."),
      }),
      execute: async ({
        path,
        target_snippet,
        replacement_snippet,
      }: {
        path: string;
        target_snippet: string;
        replacement_snippet: string;
      }) => {
        const result = await storage.editFile(projectId, path, target_snippet, replacement_snippet);
        return {
          success: result.success,
          path,
          diffSummary: result.diffSummary,
          error: result.error,
        };
      },
    }),

    read_file: tool({
      description:
        "Read the text content of a file in the project workspace to inspect existing code, CSS classes, or script functions.",
      inputSchema: z.object({
        path: z.string().describe("The relative file path to read (e.g. 'index.html', 'styles.css')."),
      }),
      execute: async ({ path }: { path: string }) => {
        try {
          const content = await storage.readFile(projectId, path);
          return { success: true, path, content };
        } catch (err: any) {
          return { success: false, path, error: err.message };
        }
      },
    }),

    list_files: tool({
      description:
        "List all existing files in the project workspace to understand its current structure.",
      inputSchema: z.object({
        directory: z
          .string()
          .optional()
          .describe("Optional sub-directory to list. Defaults to the root of the workspace."),
      }),
      execute: async ({ directory = "" }: { directory?: string }) => {
        try {
          const files = await storage.listFiles(projectId, directory);
          return { success: true, files };
        } catch (err: any) {
          return { success: false, error: err.message };
        }
      },
    }),

    delete_file: tool({
      description: "Delete an unneeded file from the project workspace.",
      inputSchema: z.object({
        path: z.string().describe("The relative file path to delete."),
      }),
      execute: async ({ path }: { path: string }) => {
        try {
          await storage.deleteFile(projectId, path);
          return { success: true, path, message: `Deleted file: ${path}` };
        } catch (err: any) {
          return { success: false, path, error: err.message };
        }
      },
    }),

    fetch_asset: tool({
      description:
        "Find high-quality curated photography URLs or Lucide icon names to include in prototypes without broken links.",
      inputSchema: z.object({
        type: z
          .enum(["photo", "icon", "avatar"])
          .describe("The type of visual asset needed: 'photo', 'icon', or 'avatar'."),
        query: z
          .string()
          .describe(
            "Keywords for the asset (e.g. 'modern architecture', 'fintech chart', 'user avatar', 'sparkles')."
          ),
      }),
      execute: async ({ type, query }: { type: "photo" | "icon" | "avatar"; query: string }) => {
        if (type === "avatar") {
          return {
            success: true,
            type,
            url: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80`,
            alt: `Avatar for ${query}`,
          };
        }

        if (type === "photo") {
          return {
            success: true,
            type,
            url: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=800&q=80`,
            description: `Curated photography matching ${query}`,
          };
        }

        return {
          success: true,
          type: "icon",
          iconName: query.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
          instruction: `Use <i data-lucide="${query.toLowerCase()}"></i> with lucide.createIcons();`,
        };
      },
    }),
  };
}
