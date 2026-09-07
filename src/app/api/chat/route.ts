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
      .filter((m: any) => (m.content || "").trim())
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

    if (reasoningEffort && (model.includes("o1") || model.includes("o3") || model.includes("deepseek-r1"))) {
      requestPayload["reasoning_effort"] = reasoningEffort;
    }

    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers,
      body: JSON.stringify(requestPayload),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(JSON.stringify({ error: `API Error (${res.status}): ${errText}` }), {
        status: res.status,
        headers: { "Content-Type": "application/json" },
      });
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
                const textChunk = event.choices?.[0]?.delta?.content;
                if (textChunk) {
                  controller.enqueue(encoder.encode(textChunk));
                }
              } catch {
                // ignore unparseable chunk
              }
            }
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
