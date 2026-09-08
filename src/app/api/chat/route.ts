import { NextRequest } from "next/server";
import { buildSystemPrompt } from "@/lib/prompt";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      messages = [],
      brandId = "linear",
      customBrand,
      selectedElementContext,
      baseUrl: clientBaseUrl,
      apiKey: clientApiKey,
      model: clientModel,
      reasoningEffort,
    } = body;

    const baseUrl = (clientBaseUrl || process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "");
    const apiKey = clientApiKey || process.env.AI_API_KEY || process.env.OPENAI_API_KEY || "";
    const model = clientModel || "gpt-4o";

    const systemPrompt = buildSystemPrompt({
      brandId,
      customBrand,
      selectedElementContext,
    });

    const validMessages = messages
      .filter((m: any) => (m.content || "").trim() && !m.isError && !m.content.startsWith("⚠️"))
      .map((m: any) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.content,
      }));

    const openAiMessages = [
      { role: "system", content: systemPrompt },
      ...(validMessages.length > 0 ? validMessages : [{ role: "user", content: "Please create a design." }]),
    ];

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const requestPayload: Record<string, any> = {
      model,
      messages: openAiMessages,
      stream: true,
    };

    const isReasoningModel =
      model.includes("o1") ||
      model.includes("o3") ||
      model.includes("deepseek-r1") ||
      model.includes("thinking");

    if (reasoningEffort && isReasoningModel) {
      requestPayload["reasoning_effort"] = reasoningEffort;
      if (baseUrl.includes("openrouter")) {
        requestPayload["reasoning"] = { effort: reasoningEffort };
      }
    }

    let res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify(requestPayload),
    });

    if (!res.ok) {
      let errText = await res.text();
      // If the model rejected reasoning_effort parameter, gracefully retry without it
      if (
        res.status === 400 &&
        requestPayload["reasoning_effort"] &&
        (errText.includes("reasoning_effort") || errText.includes("unsupported_parameter"))
      ) {
        delete requestPayload["reasoning_effort"];
        delete requestPayload["reasoning"];
        res = await fetch(`${baseUrl}/chat/completions`, {
          method: "POST",
          headers,
          body: JSON.stringify(requestPayload),
        });
        if (!res.ok) {
          errText = await res.text();
        }
      }

      if (!res.ok) {
        return new Response(JSON.stringify({ error: `API Error (${res.status}): ${errText}` }), {
          status: res.status,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = res.body?.getReader();
        if (!reader) {
          controller.close();
          return;
        }

        let buffer = "";
        let isReasoning = false;
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += new TextDecoder().decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data: ")) continue;
              const dataStr = trimmed.slice(6);
              if (dataStr === "[DONE]") continue;

              try {
                const event = JSON.parse(dataStr);
                const delta = event.choices?.[0]?.delta;
                const textChunk = delta?.content;
                const reasoningChunk = delta?.reasoning || delta?.reasoning_content;

                if (reasoningChunk) {
                  if (!isReasoning) {
                    controller.enqueue(encoder.encode("<think>"));
                    isReasoning = true;
                  }
                  controller.enqueue(encoder.encode(reasoningChunk));
                }

                if (textChunk) {
                  if (isReasoning) {
                    controller.enqueue(encoder.encode("</think>\n"));
                    isReasoning = false;
                  }
                  controller.enqueue(encoder.encode(textChunk));
                }
              } catch {
                // ignore unparseable chunk
              }
            }
          }

          if (isReasoning) {
            controller.enqueue(encoder.encode("</think>\n"));
            isReasoning = false;
          }
        } catch (err: any) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
