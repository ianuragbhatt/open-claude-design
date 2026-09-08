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
  if (!rawId || typeof rawId !== "string") {
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

  // Fallback: humanize name by removing provider prefixes, dots, and hyphens
  const parts = cleanId.split("/");
  const modelPart = parts[parts.length - 1] || cleanId;
  const lowerClean = cleanId.toLowerCase();

  let provider = "AI";
  if (parts.length > 1) {
    provider = capitalize(parts[0]);
  } else if (lowerClean.startsWith("anthropic.") || lowerClean.includes("claude")) {
    provider = "Anthropic";
  } else if (lowerClean.startsWith("openai.") || lowerClean.startsWith("gpt") || lowerClean.includes("o1") || lowerClean.includes("o3")) {
    provider = "OpenAI";
  } else if (lowerClean.startsWith("google.") || lowerClean.includes("gemini")) {
    provider = "Google";
  } else if (lowerClean.startsWith("meta.") || lowerClean.includes("llama")) {
    provider = "Meta";
  } else if (lowerClean.startsWith("mistral.") || lowerClean.includes("mistral") || lowerClean.includes("mixtral")) {
    provider = "Mistral";
  } else if (lowerClean.startsWith("deepseek.") || lowerClean.includes("deepseek")) {
    provider = "DeepSeek";
  } else if (lowerClean.startsWith("amazon.") || lowerClean.includes("titan") || lowerClean.includes("bedrock")) {
    provider = "Amazon";
  }

  // Strip redundant provider prefix from display name (e.g. anthropic.claude-opus-5 -> claude-opus-5)
  const displayPart = modelPart
    .replace(/^(?:us\.|eu\.)?(?:anthropic|openai|google|meta|amazon|mistral|deepseek)\./i, "")
    .replace(/[-_.]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

  return {
    displayName: displayPart || modelPart,
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
    .replace(/^data-(?:khayal|cd)-element=/, "")
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

export function calculateLuminance(hex: string): number {
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean.split("").map((c) => c + c).join("");
  }
  if (clean.length !== 6) return 0.5;

  const r = parseInt(clean.substring(0, 2), 16) / 255;
  const g = parseInt(clean.substring(2, 4), 16) / 255;
  const b = parseInt(clean.substring(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function calculateContrastRatio(hex1: string, hex2: string): number {
  try {
    const l1 = calculateLuminance(hex1);
    const l2 = calculateLuminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    const ratio = (lighter + 0.05) / (darker + 0.05);
    return Math.round(ratio * 10) / 10;
  } catch {
    return 1;
  }
}

export interface WcagEvaluation {
  ratio: number;
  ratioStr: string;
  normalText: "AAA" | "AA" | "Fail";
  largeText: "AAA" | "AA" | "Fail";
}

export function getWcagRating(hex1: string, hex2: string): WcagEvaluation {
  const ratio = calculateContrastRatio(hex1, hex2);
  const ratioStr = `${ratio.toFixed(1)}:1`;

  const normalText: "AAA" | "AA" | "Fail" =
    ratio >= 7.0 ? "AAA" : ratio >= 4.5 ? "AA" : "Fail";
  const largeText: "AAA" | "AA" | "Fail" =
    ratio >= 4.5 ? "AAA" : ratio >= 3.0 ? "AA" : "Fail";

  return { ratio, ratioStr, normalText, largeText };
}
