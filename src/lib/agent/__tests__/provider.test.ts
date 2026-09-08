import { describe, it, expect } from "vitest";
import { resolveLanguageModel } from "../provider";

describe("resolveLanguageModel", () => {
  it("resolves native Anthropic provider for claude model IDs", () => {
    const model = resolveLanguageModel({
      modelId: "claude-3-7-sonnet-20250219",
      apiKey: "sk-ant-api03-testkey",
    });
    expect(model).toBeDefined();
    expect(model.provider).toBe("anthropic.messages");
    expect(model.modelId).toBe("claude-3-7-sonnet-20250219");
  });

  it("standardizes anthropic/ prefix to official Anthropic model ID", () => {
    const model = resolveLanguageModel({
      modelId: "anthropic/claude-3.7-sonnet",
      apiKey: "sk-ant-test",
    });
    expect(model).toBeDefined();
    expect(model.modelId).toBe("claude-3-7-sonnet-20250219");
  });

  it("resolves native OpenAI provider for gpt-4o", () => {
    const model = resolveLanguageModel({
      modelId: "gpt-4o",
      apiKey: "sk-proj-testkey",
    });
    expect(model).toBeDefined();
    expect(model.provider).toBe("openai.chat");
    expect(model.modelId).toBe("gpt-4o");
  });

  it("resolves local Ollama endpoint when baseUrl is localhost:11434", () => {
    const model = resolveLanguageModel({
      modelId: "llama3.3",
      baseUrl: "http://localhost:11434/v1",
    });
    expect(model).toBeDefined();
    expect(model.provider).toBe("openai.chat");
    expect(model.modelId).toBe("llama3.3");
  });

  it("routes to OpenRouter provider when baseUrl is openrouter.ai", () => {
    const model = resolveLanguageModel({
      modelId: "anthropic/claude-3.7-sonnet",
      baseUrl: "https://openrouter.ai/api/v1",
      apiKey: "sk-or-testkey",
    });
    expect(model).toBeDefined();
    expect(model.provider).toBe("openai.chat");
    expect(model.modelId).toBe("anthropic/claude-3.7-sonnet");
  });
});
