import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params;
    if (!projectId) {
      return new Response("Project ID required", { status: 400 });
    }

    const workspaceDir = path.resolve(process.cwd(), "workspaces", projectId);
    if (!fs.existsSync(workspaceDir)) {
      try {
        fs.mkdirSync(workspaceDir, { recursive: true });
      } catch {}
    }

    const encoder = new TextEncoder();
    let watcher: fs.FSWatcher | null = null;
    let heartbeat: NodeJS.Timeout | null = null;
    let debounceTimer: NodeJS.Timeout | null = null;

    const stream = new ReadableStream({
      start(controller) {
        // Send initial connected event
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ type: "connected", projectId })}\n\n`)
        );

        const notifyChange = (filename?: string | null) => {
          if (debounceTimer) clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            try {
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({
                    type: "change",
                    projectId,
                    filename: filename || "workspace",
                    timestamp: Date.now(),
                  })}\n\n`
                )
              );
            } catch {}
          }, 120);
        };

        try {
          if (fs.existsSync(workspaceDir)) {
            watcher = fs.watch(workspaceDir, { recursive: true }, (eventType, filename) => {
              if (filename && !filename.startsWith(".")) {
                notifyChange(filename);
              }
            });
          }
        } catch (err) {
          console.warn("Workspace live watcher init note:", err);
        }

        // Heartbeat every 25s
        heartbeat = setInterval(() => {
          try {
            controller.enqueue(encoder.encode(`: ping\n\n`));
          } catch {}
        }, 25000);

        req.signal.addEventListener("abort", () => {
          if (watcher) {
            try {
              watcher.close();
            } catch {}
          }
          if (heartbeat) clearInterval(heartbeat);
          if (debounceTimer) clearTimeout(debounceTimer);
        });
      },
      cancel() {
        if (watcher) {
          try {
            watcher.close();
          } catch {}
        }
        if (heartbeat) clearInterval(heartbeat);
        if (debounceTimer) clearTimeout(debounceTimer);
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || "Internal error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
