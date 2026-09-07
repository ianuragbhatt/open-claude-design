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
}

export const DEFAULT_SETTINGS: ApiSettings = {
  baseUrl: "",
  apiKey: "",
  selectedModel: "",
  availableModels: [],
  reasoningEffort: "medium",
};

const SETTINGS_KEY = "claude_design_settings";
const PROJECTS_KEY = "claude_design_projects";
const ACTIVE_PROJECT_ID_KEY = "claude_design_active_project";

export function loadSettings(): ApiSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: ApiSettings): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function loadProjects(): Project[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
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
  return localStorage.getItem(ACTIVE_PROJECT_ID_KEY);
}

export function setActiveProjectId(id: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACTIVE_PROJECT_ID_KEY, id);
}

export function createInitialDemoProject(): Project {
  return {
    id: "proj_demo_apex",
    name: "Apex Global Finance Dashboard",
    brandId: "linear",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    messages: [
      {
        id: "msg_user_demo",
        role: "user",
        content: "Design an ultra-clean fintech portfolio dashboard for global treasury with dark mode, bento metrics, and recent settlements.",
        timestamp: Date.now() - 60000,
      },
      {
        id: "msg_assistant_demo",
        role: "assistant",
        content: "I've created the Apex Global Finance portfolio dashboard following the Linear design system: dark-mode starlight canvas (#08090a), semi-transparent borders, signature indigo accents (#5e6ad2), and responsive bento metrics.",
        timestamp: Date.now() - 55000,
      }
    ],
    versions: [
      {
        id: "ver_demo_1",
        versionNumber: 1,
        title: "Apex Global Finance",
        html: DEMO_PROJECT_HTML,
        timestamp: Date.now() - 55000,
        promptSummary: "Fintech portfolio dashboard with dark mode and bento metrics",
      }
    ],
    activeVersionIndex: 0,
  };
}

export function createNewProject(name = "Untitled Design", brandId = "linear"): Project {
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
