import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { baseUrl, apiKey } = await req.json();

    if (!baseUrl) {
      return new Response(JSON.stringify({ error: "Base URL is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const cleanBaseUrl = baseUrl.replace(/\/+$/, "");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const res = await fetch(`${cleanBaseUrl}/models`, {
      method: "GET",
      headers,
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(
        JSON.stringify({ error: `Failed to fetch models: ${errText}` }),
        { status: res.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await res.json();
    let modelIds: string[] = [];

    if (Array.isArray(data)) {
      modelIds = data.map((m: any) => (typeof m === "string" ? m : m.id || m.name)).filter(Boolean);
    } else if (Array.isArray(data?.data)) {
      modelIds = data.data.map((m: any) => (typeof m === "string" ? m : m.id || m.name)).filter(Boolean);
    } else if (Array.isArray(data?.models)) {
      modelIds = data.models.map((m: any) => (typeof m === "string" ? m : m.id || m.name)).filter(Boolean);
    }

    // Sort alphabetically
    modelIds = Array.from(new Set(modelIds)).sort();

    return new Response(JSON.stringify({ models: modelIds }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || "Internal error fetching models" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
