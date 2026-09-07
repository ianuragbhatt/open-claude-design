/**
 * Human-friendly formatters for non-technical UI/UX creators.
 * Converts technical model identifiers, CSS selectors, and design tokens into clean language.
 */

export interface FormattedModel {
  displayName: string;
  provider: string;
  badge?: string;
  isThinking?: boolean;
}

export function formatModelName(rawId: string): FormattedModel {
  if (!rawId) {
    return { displayName: "Select AI Model", provider: "Auto" };
  }

  // Clean raw prefixes like accounts/fireworks/models/ or openrouter/
  let cleanId = rawId
    .replace(/^accounts\/[^\/]+\/models\//, "")
    .trim();

  const isThinking =
    cleanId.includes("thinking") ||
    cleanId.includes("r1") ||
    cleanId.includes("o1") ||
    cleanId.includes("o3");

  // Well-known models
  if (cleanId.includes("claude-3-7-sonnet") || cleanId.includes("claude-3.7-sonnet")) {
    return {
      displayName: isThinking ? "Claude 3.7 Sonnet (Thinking)" : "Claude 3.7 Sonnet",
      provider: "Anthropic",
      badge: isThinking ? "Deep Design" : "Top Pick",
      isThinking,
    };
  }

  if (cleanId.includes("claude-3-5-sonnet") || cleanId.includes("claude-3.5-sonnet")) {
    return {
      displayName: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      badge: "Creative",
      isThinking: false,
    };
  }

  if (cleanId.includes("claude-3-5-haiku") || cleanId.includes("claude-3.5-haiku")) {
    return {
      displayName: "Claude 3.5 Haiku",
      provider: "Anthropic",
      badge: "Fast",
      isThinking: false,
    };
  }

  if (cleanId.includes("gpt-4o-mini")) {
    return {
      displayName: "GPT-4o Mini",
      provider: "OpenAI",
      badge: "Fast",
      isThinking: false,
    };
  }

  if (cleanId.includes("gpt-4o")) {
    return {
      displayName: "GPT-4o",
      provider: "OpenAI",
      badge: "Balanced",
      isThinking: false,
    };
  }

  if (cleanId.includes("o1") || cleanId.includes("o3-mini")) {
    return {
      displayName: cleanId.includes("o3") ? "o3-mini" : "o1",
      provider: "OpenAI",
      badge: "Deep Reasoning",
      isThinking: true,
    };
  }

  if (cleanId.includes("deepseek-r1")) {
    return {
      displayName: "DeepSeek R1",
      provider: "DeepSeek",
      badge: "Deep Reasoning",
      isThinking: true,
    };
  }

  if (cleanId.includes("deepseek-chat") || cleanId.includes("deepseek-v3")) {
    return {
      displayName: "DeepSeek V3",
      provider: "DeepSeek",
      badge: "Fast & Sharp",
      isThinking: false,
    };
  }

  if (cleanId.includes("llama-3.3-70b")) {
    return {
      displayName: "Llama 3.3 70B",
      provider: "Meta",
      badge: "Open Model",
      isThinking: false,
    };
  }

  // Fallback: humanize name by removing provider prefixes and hyphens
  const parts = cleanId.split("/");
  const modelPart = parts[parts.length - 1] || cleanId;
  const provider = parts.length > 1 ? capitalize(parts[0]) : "AI";

  const formatted = modelPart
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    displayName: formatted,
    provider,
    isThinking,
  };
}

function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Humanizes element names clicked during canvas inspect mode.
 * Converts data tags like 'hero-section' or 'pricing-card' into 'Hero Section'.
 */
export function formatElementName(rawName: string, textSnippet?: string): string {
  if (!rawName) return "Selected Section";

  // If the rawName was an injected data attribute like "hero-section"
  let clean = rawName
    .replace(/^data-cd-element=/, "")
    .replace(/["']/g, "")
    .replace(/[-_]/g, " ")
    .trim();

  // If it's a CSS tag like "div > section#features"
  if (clean.includes(">") || clean.includes(".") || clean.includes("#")) {
    if (clean.includes("nav") || clean.includes("header")) return "Navigation Header";
    if (clean.includes("hero")) return "Hero Section";
    if (clean.includes("card") || clean.includes("feature")) return "Feature Card";
    if (clean.includes("pricing")) return "Pricing Section";
    if (clean.includes("footer")) return "Footer";
    if (clean.includes("button") || clean.includes("btn")) return "Button";
    if (textSnippet && textSnippet.length < 30) return `"${textSnippet}"`;
    return "Selected Section";
  }

  // Title case
  return clean.replace(/\b\w/g, (c) => c.toUpperCase());
}

export interface DesignStyleInputs {
  name: string;
  mood: string;
  typography: string;
  accentColor: string;
  secondaryColor?: string;
  bgDark: boolean;
  notes?: string;
}

/**
 * Automatically synthesizes professional design rules for the LLM
 * without requiring the designer to write prompt engineering Markdown.
 */
export function synthesizeDesignPrompt(inputs: DesignStyleInputs): string {
  const canvasMode = inputs.bgDark ? "Dark-mode-first" : "Pristine light mode";
  const canvasDesc = inputs.bgDark
    ? "Warm dark workspace (#191816 or #1f1e1c canvas, #282724 elevated cards, subtle #383632 borders)"
    : "Warm ivory / clean light canvas (#FAF9F5 or #FFFFFF canvas, #F3F1EC subtle cards, #E5E0D8 borders)";

  return `
DESIGN SYSTEM: ${inputs.name.toUpperCase()}
- Atmosphere: ${canvasMode}. ${canvasDesc}.
- Vibe / Mood: ${inputs.mood}.
- Typography System: ${inputs.typography}. Maintain strict typographic rhythm with generous line-height and balanced tracking.
- Color Palette: Primary accent (${inputs.accentColor})${inputs.secondaryColor ? `, secondary accent (${inputs.secondaryColor})` : ""}.
- Craft & Details:
  - Generous editorial whitespace and intentional component padding.
  - Subtle 1px borders with smooth border-radii (rounded-xl to rounded-2xl).
  - Responsive layout that scales gracefully from mobile (375px) to desktop (1440px).
  ${inputs.notes ? `- Designer Notes: ${inputs.notes}` : ""}
`.trim();
}
