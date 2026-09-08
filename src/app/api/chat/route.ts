import { NextRequest } from "next/server";
import { executeSupervisorLoop } from "@/lib/agent/supervisor";
import { runIndependentClientReview } from "@/lib/agent/client-reviewer";
import { getWorkspaceStorage } from "@/lib/workspace";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      projectId = "proj_default",
      messages = [],
      brandId = "linear",
      customBrand,
      selectedElementContext,
      baseUrl,
      apiKey,
      model: modelId,
      reasoningEffort,
    } = body;

    // 1. Ensure project workspace is initialized
    const storage = getWorkspaceStorage();
    await storage.ensureProject(projectId, brandId);

    // 2. Clean and prepare conversation messages
    const validMessages = messages
      .filter((m: any) => (m.content || "").trim() && !m.isError && !m.content.startsWith("⚠️"))
      .map((m: any) => ({
        role: (m.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
        content: m.content,
      }));

    const conversation =
      validMessages.length > 0
        ? validMessages
        : [{ role: "user" as const, content: "Please create a stunning, complete prototype." }];

    // 3. Execute Autonomous Supervisor Multi-Agent Loop
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const supervisorStream = executeSupervisorLoop({
            projectId,
            messages: conversation,
            brandId,
            customBrand,
            selectedElementContext,
            modelOptions: {
              modelId,
              baseUrl,
              apiKey,
              reasoningEffort,
            },
          });

          for await (const event of supervisorStream) {
            if (event.type === "finish") {
              break;
            }
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
          }

          // 4. Trigger Independent Non-Biased Client Review upon prototype completion
          try {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: "client_review_started",
                })}\n\n`
              )
            );

            const userPrompt = conversation[conversation.length - 1]?.content || "Design web app";
            const clientReview = await runIndependentClientReview({
              projectId,
              brandId,
              userPrompt,
              modelOptions: {
                modelId,
                baseUrl,
                apiKey,
                reasoningEffort,
              },
            });

            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: "client_review",
                  review: clientReview,
                })}\n\n`
              )
            );
          } catch (reviewErr) {
            console.warn("Client review check completed with note:", reviewErr);
          }

          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "finish" })}\n\n`));
          controller.close();
        } catch (err: any) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: "error",
                error: err?.message || "Agent execution error occurred.",
              })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err: any) {
    let status = 500;
    const msg = err?.message || "Internal server error";
    if (msg.includes("401") || msg.includes("API key") || msg.includes("Unauthorized")) {
      status = 401;
    }

    return new Response(JSON.stringify({ error: msg }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
}
