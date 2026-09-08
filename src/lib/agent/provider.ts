import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";

export interface ModelResolutionOptions {
  modelId?: string;
  baseUrl?: string;
  apiKey?: string;
  reasoningEffort?: "low" | "medium" | "high";
}

export function resolveLanguageModel(options: ModelResolutionOptions) {
  const modelId = (options.modelId || "anthropic/claude-3.7-sonnet").trim();
  const apiKey = (options.apiKey || "").trim();
  const baseUrl = (options.baseUrl || "").trim().replace(/\/+$/, "");

  const isAnthropicKey = apiKey.startsWith("sk-ant-") || process.env.ANTHROPIC_API_KEY;
  const isOpenAiKey = apiKey.startsWith("sk-proj-") || apiKey.startsWith("sk-none-");
  const isOpenRouterUrl = baseUrl.includes("openrouter.ai") || (!baseUrl && apiKey.startsWith("sk-or-"));
  const isLocalOllama = baseUrl.includes("localhost:11434") || baseUrl.includes("127.0.0.1:11434");

  // 1. Direct Native Anthropic Provider (only when no custom proxy baseUrl or baseUrl is Anthropic)
  const isDirectAnthropic =
    (!baseUrl || baseUrl.includes("anthropic.com")) &&
    (modelId.startsWith("claude-") ||
      modelId.startsWith("anthropic/") ||
      (isAnthropicKey && !baseUrl));

  if (isDirectAnthropic) {
    const effectiveAnthropicKey = apiKey || process.env.ANTHROPIC_API_KEY || "";
    const anthropic = createAnthropic({
      apiKey: effectiveAnthropicKey,
      baseURL: baseUrl || undefined,
    });

    const cleanModelName = modelId.replace(/^anthropic\//, "");
    const targetModel =
      cleanModelName === "claude-3.7-sonnet"
        ? "claude-3-7-sonnet-20250219"
        : cleanModelName === "claude-3.5-sonnet"
        ? "claude-3-5-sonnet-20241022"
        : cleanModelName === "claude-3.5-haiku"
        ? "claude-3-5-haiku-20241022"
        : cleanModelName;

    return anthropic(targetModel);
  }

  // 2. Direct Native OpenAI Provider (when using direct OpenAI key and no custom proxy baseUrl)
  if (
    !baseUrl &&
    (modelId.startsWith("gpt-") ||
      modelId.startsWith("o1") ||
      modelId.startsWith("o3") ||
      modelId.startsWith("openai/"))
  ) {
    const effectiveOpenAiKey = apiKey || process.env.OPENAI_API_KEY || "";
    const openai = createOpenAI({
      apiKey: effectiveOpenAiKey,
    });

    const cleanModelName = modelId.replace(/^openai\//, "");
    return openai.chat(cleanModelName);
  }

  // 3. Local Ollama Endpoint
  if (isLocalOllama) {
    const ollama = createOpenAI({
      baseURL: baseUrl || "http://localhost:11434/v1",
      apiKey: apiKey || "ollama",
    });
    const cleanModelName = modelId.replace(/^(openai|anthropic)\//, "");
    return ollama.chat(cleanModelName);
  }

  // 4. OpenRouter / Custom OpenAI-Compatible Provider (e.g. Capgemini, LiteLLM, vLLM)
  const effectiveBaseUrl = baseUrl || process.env.AI_BASE_URL || "https://openrouter.ai/api/v1";
  const effectiveApiKey = apiKey || process.env.AI_API_KEY || process.env.OPENROUTER_API_KEY || "";

  const customProvider = createOpenAI({
    baseURL: effectiveBaseUrl,
    apiKey: effectiveApiKey,
  });

  return customProvider.chat(modelId);
}
