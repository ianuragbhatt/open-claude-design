import type { QuestionForm } from "./parser";
import { DEMO_PROJECT_HTML } from "./demo-starter";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
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

export interface ApiSettings {
  baseUrl: string;
  apiKey: string;
  selectedModel: string;
  availableModels: string[];
  reasoningEffort: "low" | "medium" | "high";
  theme: "dark" | "light";
}

export const DEFAULT_SETTINGS: ApiSettings = {
  baseUrl: "https://openrouter.ai/api/v1",
  apiKey: "",
  selectedModel: "anthropic/claude-3.7-sonnet",
  availableModels: [
    "openai.gpt-5.6-terra",
    "openai.gpt-5.6-sol",
    "openai.gpt-5.6-luna",
    "anthropic/claude-3.7-sonnet",
    "anthropic/claude-3.7-sonnet:thinking",
    "anthropic/claude-3.5-sonnet",
    "openai/gpt-4o",
    "deepseek/deepseek-r1",
  ],
  reasoningEffort: "medium",
  theme: "dark",
};

export const THEME_KEY = "open_claude_design_theme";

export function loadTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(THEME_KEY);
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

const SETTINGS_KEY = "open_claude_design_settings";
const PROJECTS_KEY = "open_claude_design_projects";
const ACTIVE_PROJECT_ID_KEY = "open_claude_design_active_project";

export function loadSettings(): ApiSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const currentTheme = loadTheme();
    const raw = localStorage.getItem(SETTINGS_KEY) || localStorage.getItem("claude_design_settings");
    if (!raw) return { ...DEFAULT_SETTINGS, theme: currentTheme };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, theme: currentTheme, ...parsed };
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
    const raw = localStorage.getItem(PROJECTS_KEY) || localStorage.getItem("claude_design_projects");
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
  return localStorage.getItem(ACTIVE_PROJECT_ID_KEY) || localStorage.getItem("claude_design_active_project");
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
