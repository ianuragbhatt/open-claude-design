import type { QuestionForm } from "./parser";
import { DEMO_PROJECT_HTML } from "./demo-starter";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  thinking?: string;
  isError?: boolean;
  questionForm?: QuestionForm | null;
  timestamp: number;
}

export interface ArtifactVersion {
  id: string;
  versionNumber: number;
  title: string;
  html: string;
  timestamp: number;
  promptSummary: string;
}

export interface Project {
  id: string;
  name: string;
  brandId: string;
  customBrand?: string;
  createdAt: number;
  updatedAt: number;
  messages: Message[];
  versions: ArtifactVersion[];
  activeVersionIndex: number;
}

export interface ConfiguredModel {
  id: string;
  customName: string;
  description?: string;
}

export interface ApiSettings {
  baseUrl: string;
  apiKey: string;
  selectedModel: string;
  availableModels: string[];
  configuredModels?: ConfiguredModel[];
  reasoningEffort: "low" | "medium" | "high";
  theme: "dark" | "light";
}

export const DEFAULT_CONFIGURED_MODELS: ConfiguredModel[] = [
  { id: "anthropic/claude-3.7-sonnet", customName: "Opus 5", description: "For complex tasks" },
  { id: "anthropic/claude-3.5-sonnet", customName: "Sonnet 5", description: "Most efficient for everyday tasks" },
  { id: "anthropic/claude-3.5-haiku", customName: "Haiku 4.5", description: "Fastest for quick answers" },
  { id: "openai/gpt-4o", customName: "GPT-4o", description: "Balanced everyday design" },
];

export const DEFAULT_SETTINGS: ApiSettings = {
  baseUrl: "https://openrouter.ai/api/v1",
  apiKey: "",
  selectedModel: "anthropic/claude-3.7-sonnet",
  availableModels: [
    "anthropic/claude-3.7-sonnet",
    "anthropic/claude-3.5-sonnet",
    "anthropic/claude-3.5-haiku",
    "openai/gpt-4o",
    "openai/o3-mini",
    "deepseek/deepseek-r1",
  ],
  configuredModels: DEFAULT_CONFIGURED_MODELS,
  reasoningEffort: "medium",
  theme: "dark",
};

export function isFictionalOrLegacyModel(id?: string | null): boolean {
  if (!id || typeof id !== "string") return false;
  const lower = id.toLowerCase();
  return (
    lower.includes("claude-terra") ||
    lower.includes("claude-sol") ||
    lower.includes("claude-luna") ||
    lower === "terra" ||
    lower === "sol" ||
    lower === "luna" ||
    lower.includes("gpt-5.6") ||
    lower.includes("gpt-5-")
  );
}

export function getConfiguredModels(settings?: Partial<ApiSettings> | null): ConfiguredModel[] {
  if (Array.isArray(settings?.configuredModels) && settings.configuredModels.length > 0) {
    const valid: ConfiguredModel[] = [];
    for (const m of settings.configuredModels) {
      if (!m) continue;
      if (typeof m === "string") {
        if (!isFictionalOrLegacyModel(m)) {
          valid.push({ id: m, customName: m, description: "" });
        }
      } else if (typeof m === "object" && (m as any).id) {
        const id = String((m as any).id);
        if (!isFictionalOrLegacyModel(id)) {
          valid.push({
            id,
            customName: String((m as any).customName || id || "Model"),
            description: (m as any).description ? String((m as any).description) : undefined,
          });
        }
      }
    }
    if (valid.length > 0) return valid;
  }
  return DEFAULT_CONFIGURED_MODELS;
}

export function getModelDisplayName(settings?: Partial<ApiSettings> | null, modelId?: string | null): string {
  const models = getConfiguredModels(settings);
  if (!modelId || typeof modelId !== "string" || isFictionalOrLegacyModel(modelId)) {
    return models[0]?.customName || "Select Model";
  }
  const found = models.find((m) => m?.id === modelId);
  if (found && typeof found.customName === "string" && found.customName.trim()) {
    return found.customName.trim();
  }
  if (models.length > 0 && models[0]?.customName) {
    return models[0].customName;
  }
  return modelId
    .replace(/^accounts\/[^\/]+\/models\//, "")
    .replace(/^anthropic\//, "")
    .replace(/^openai\//, "");
}

export function getModelDescription(settings?: Partial<ApiSettings> | null, modelId?: string | null): string {
  if (!modelId || typeof modelId !== "string" || isFictionalOrLegacyModel(modelId)) return "";
  const models = getConfiguredModels(settings);
  const found = models.find((m) => m?.id === modelId);
  return typeof found?.description === "string" ? found.description : "";
}

export const THEME_KEY = "khayal_theme";

export function loadTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(THEME_KEY) || localStorage.getItem("open_claude_design_theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {}
  return "dark";
}

export function saveTheme(theme: "dark" | "light"): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } catch {}
}

const SETTINGS_KEY = "khayal_settings";
const PROJECTS_KEY = "khayal_projects";
const ACTIVE_PROJECT_ID_KEY = "khayal_active_project";

export function loadSettings(): ApiSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const currentTheme = loadTheme();
    const raw =
      localStorage.getItem(SETTINGS_KEY) ||
      localStorage.getItem("open_claude_design_settings") ||
      localStorage.getItem("claude_design_settings");
    if (!raw) return { ...DEFAULT_SETTINGS, theme: currentTheme };
    const parsed = JSON.parse(raw);

    // Clean out legacy / fictional models
    let availableModels: string[] = Array.isArray(parsed.availableModels)
      ? parsed.availableModels.filter((m: any) => typeof m === "string" && !isFictionalOrLegacyModel(m))
      : DEFAULT_SETTINGS.availableModels;
    if (availableModels.length === 0) availableModels = DEFAULT_SETTINGS.availableModels;

    const configuredModels = getConfiguredModels(parsed);

    let selectedModel = parsed.selectedModel;
    if (
      !selectedModel ||
      isFictionalOrLegacyModel(selectedModel) ||
      !configuredModels.some((m) => m.id === selectedModel)
    ) {
      selectedModel = configuredModels[0]?.id || DEFAULT_SETTINGS.selectedModel;
    }

    const settings: ApiSettings = {
      ...DEFAULT_SETTINGS,
      ...parsed,
      theme: currentTheme,
      availableModels,
      configuredModels,
      selectedModel,
    };

    // If stale fictional models were detected in localStorage, rewrite clean state
    if (
      isFictionalOrLegacyModel(parsed.selectedModel) ||
      (Array.isArray(parsed.availableModels) && parsed.availableModels.some(isFictionalOrLegacyModel)) ||
      (Array.isArray(parsed.configuredModels) && parsed.configuredModels.some((m: any) => isFictionalOrLegacyModel(m?.id)))
    ) {
      saveSettings(settings);
    }

    return settings;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: ApiSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  if (settings.theme) {
    saveTheme(settings.theme);
  }
}

export function loadProjects(): Project[] {
  if (typeof window === "undefined") return [];
  try {
    const raw =
      localStorage.getItem(PROJECTS_KEY) ||
      localStorage.getItem("open_claude_design_projects") ||
      localStorage.getItem("claude_design_projects");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveProjects(projects: Project[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function getActiveProjectId(): string | null {
  if (typeof window === "undefined") return null;
  return (
    localStorage.getItem(ACTIVE_PROJECT_ID_KEY) ||
    localStorage.getItem("open_claude_design_active_project") ||
    localStorage.getItem("claude_design_active_project")
  );
}

export function setActiveProjectId(id: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACTIVE_PROJECT_ID_KEY, id);
}

export function createInitialDemoProject(): Project {
  return {
    id: "proj_demo_anthropic",
    name: "Anthropic Research & Synthesis Hub",
    brandId: "claude-anthropic",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    messages: [
      {
        id: "msg_user_demo",
        role: "user",
        content: "Design an editorial research and knowledge workspace with Anthropic warm espresso tones, serif headings, interactive research notebooks, and live metrics.",
        timestamp: Date.now() - 60000,
      },
      {
        id: "msg_assistant_demo",
        role: "assistant",
        content: "I've created the Anthropic Research & Synthesis Hub following the Claude / Anthropic design system: warm dark workspace (#1c1c1f canvas, #282724 cards), editorial serif typography (Newsreader), signature terracotta accents (#d97757), and interactive vector steering sliders.",
        timestamp: Date.now() - 55000,
      }
    ],
    versions: [
      {
        id: "ver_demo_1",
        versionNumber: 1,
        title: "Anthropic Research & Synthesis Hub",
        html: DEMO_PROJECT_HTML,
        timestamp: Date.now() - 55000,
        promptSummary: "Editorial research and knowledge workspace with Anthropic design system",
      }
    ],
    activeVersionIndex: 0,
  };
}

export function createNewProject(name = "Untitled Design", brandId = "claude-anthropic"): Project {
  return {
    id: "proj_" + Math.random().toString(36).slice(2, 9),
    name,
    brandId,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    messages: [],
    versions: [],
    activeVersionIndex: -1,
  };
}

export interface KhayalBackupPayload {
  version: "1.0";
  exportedAt: number;
  projects: Project[];
  settings?: Partial<ApiSettings>;
  customSystems?: any[];
}

export function exportBackupData(): string {
  if (typeof window === "undefined") return "{}";
  const projects = loadProjects();
  const settings = loadSettings();
  let customSystems: any[] = [];
  try {
    const rawCustom = localStorage.getItem("khayal_custom_systems");
    if (rawCustom) customSystems = JSON.parse(rawCustom);
  } catch {}

  const payload: KhayalBackupPayload = {
    version: "1.0",
    exportedAt: Date.now(),
    projects,
    settings: {
      theme: settings.theme,
      configuredModels: settings.configuredModels,
      reasoningEffort: settings.reasoningEffort,
    },
    customSystems,
  };
  return JSON.stringify(payload, null, 2);
}

export function importBackupData(jsonString: string): { success: boolean; projectCount: number; error?: string } {
  try {
    const data = JSON.parse(jsonString);
    if (!data || !Array.isArray(data.projects)) {
      return { success: false, projectCount: 0, error: "Invalid backup format: missing projects list." };
    }
    const current = loadProjects();
    const merged = [...data.projects];
    // Keep any current projects not in backup
    for (const p of current) {
      if (!merged.some((mp: any) => mp.id === p.id)) {
        merged.push(p);
      }
    }
    saveProjects(merged);

    if (Array.isArray(data.customSystems) && data.customSystems.length > 0) {
      localStorage.setItem("khayal_custom_systems", JSON.stringify(data.customSystems));
    }
    return { success: true, projectCount: data.projects.length };
  } catch (err: any) {
    return { success: false, projectCount: 0, error: err?.message || "Failed to parse backup JSON." };
  }
}

export function calculateStorageUsage(): { usedBytes: number; usedKb: string; percentEstimate: number } {
  if (typeof window === "undefined") return { usedBytes: 0, usedKb: "0 KB", percentEstimate: 0 };
  try {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith("khayal") || key.startsWith("open_claude"))) {
        const val = localStorage.getItem(key) || "";
        total += key.length + val.length * 2; // UTF-16 chars ~ 2 bytes
      }
    }
    const usedKb = (total / 1024).toFixed(1) + " KB";
    const percentEstimate = Math.min(100, Math.round((total / (5 * 1024 * 1024)) * 100));
    return { usedBytes: total, usedKb, percentEstimate };
  } catch {
    return { usedBytes: 0, usedKb: "0 KB", percentEstimate: 0 };
  }
}

