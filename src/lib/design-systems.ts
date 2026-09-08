import { RICH_DESIGN_SYSTEMS } from "./design-systems-data";

export interface DesignSystemSlide {
  id: number;
  label: string;
  category?: string;
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  type: "cover" | "toc" | "divider" | "columns" | "quadrants" | "table" | "quote" | "close";
  items?: string[];
  accentBg?: boolean;
}

export interface DesignSystemDeck {
  name: string;
  description: string;
  slides: DesignSystemSlide[];
}

export interface DesignSystemLanding {
  name: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaText: string;
  features: { title: string; desc: string }[];
}

export interface DesignSystemComponent {
  name: string;
  description: string;
  previewCode: string;
}

export interface DesignSystemTokenColor {
  name: string;
  varName: string;
  hex: string;
  role: string;
}

export interface DesignSystemTypographyScale {
  name: string;
  size: string;
  weight: string;
  sample: string;
}

export interface DesignSystemDashboard {
  name: string;
  description: string;
  metrics: { label: string; value: string; change: string; positive?: boolean }[];
  recentActivity: { title: string; user: string; status: string; date: string }[];
}

export interface DesignSystemIcons {
  library: string;
  strokeWidth: number;
  style: string;
  defaultSet: string[];
}

export interface DesignSystemImagery {
  artDirection: string;
  aspectRatios: { ratio: string; label: string; desc: string }[];
  cornerRadius: string;
  treatment: string;
}

export interface DesignSystemElevation {
  name: string;
  value: string;
  desc: string;
}

export interface DesignSystemFoundations {
  colors: DesignSystemTokenColor[];
  semanticColors?: { role: string; name: string; hex: string }[];
  typography: {
    displayFont: string;
    bodyFont: string;
    monoFont: string;
    scale: DesignSystemTypographyScale[];
  };
  spacing: { name: string; value: string }[];
  radii: { name: string; value: string }[];
  elevation?: DesignSystemElevation[];
  icons?: DesignSystemIcons;
  imagery?: DesignSystemImagery;
}

export interface DesignSystem {
  id: string;
  name: string;
  category?: string;
  description: string;
  badge: string;
  accentColor: string;
  bgDark: boolean;
  promptGuidance: string;
  swatchColors?: string[];
  owner?: string;
  updatedAt?: string | number;
  isCustom?: boolean;
  published?: boolean;
  isOrgDefault?: boolean;
}

export interface RichDesignSystem extends DesignSystem {
  readme: {
    headline: string;
    description: string;
    howToUse: string[];
    direction: string;
    manifestFiles: { path: string; description: string }[];
  };
  templates: {
    deck: DesignSystemDeck;
    landing: DesignSystemLanding;
    dashboard?: DesignSystemDashboard;
  };
  components: {
    buttons: DesignSystemComponent;
    cards: DesignSystemComponent;
    dialog: DesignSystemComponent;
    forms: DesignSystemComponent;
    navigation: DesignSystemComponent;
    table: DesignSystemComponent;
    badges?: DesignSystemComponent;
    stats?: DesignSystemComponent;
    alerts?: DesignSystemComponent;
  };
  foundations: DesignSystemFoundations;
  tokensCss: string;
  themeJson: string;
  designMd?: string;
}

export const DESIGN_SYSTEMS: RichDesignSystem[] = RICH_DESIGN_SYSTEMS;

const CUSTOM_SYSTEMS_KEY = "khayal_custom_systems";
const CUSTOM_OVERRIDES_KEY = "khayal_overrides";

// Id alias mapping for backward compatibility with older projects
const ID_ALIASES: Record<string, string> = {
  "claude-anthropic": "claude",
  "linear": "linear-app",
  "editorial": "warm-editorial",
  "dct-abu-dhabi": "warm-editorial",
};

export function loadCustomDesignSystems(): RichDesignSystem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw =
      localStorage.getItem(CUSTOM_SYSTEMS_KEY) ||
      localStorage.getItem("open_claude_design_custom_systems") ||
      localStorage.getItem("claude_design_custom_systems");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function loadSystemOverrides(): Record<string, Partial<RichDesignSystem>> {
  if (typeof window === "undefined") return {};
  try {
    const raw =
      localStorage.getItem(CUSTOM_OVERRIDES_KEY) ||
      localStorage.getItem("open_claude_design_overrides");
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveCustomDesignSystem(system: Partial<RichDesignSystem> & { id: string; name: string }): void {
  if (typeof window === "undefined") return;
  const current = loadCustomDesignSystems();
  const index = current.findIndex((s) => s.id === system.id);
  const baseDefault = RICH_DESIGN_SYSTEMS[0];
  const fullSystem: RichDesignSystem = {
    ...baseDefault,
    ...system,
    isCustom: true,
    owner: "You",
    updatedAt: Date.now(),
  } as RichDesignSystem;

  let updated: RichDesignSystem[];
  if (index !== -1) {
    updated = [...current];
    updated[index] = fullSystem;
  } else {
    updated = [fullSystem, ...current];
  }
  localStorage.setItem(CUSTOM_SYSTEMS_KEY, JSON.stringify(updated));
}

export function updateDesignSystem(system: RichDesignSystem): void {
  if (typeof window === "undefined") return;
  if (system.isCustom) {
    saveCustomDesignSystem(system);
    return;
  }
  const overrides = loadSystemOverrides();
  overrides[system.id] = {
    ...system,
    updatedAt: Date.now(),
  };
  localStorage.setItem(CUSTOM_OVERRIDES_KEY, JSON.stringify(overrides));
}

export function resetDesignSystem(id: string): void {
  if (typeof window === "undefined") return;
  const overrides = loadSystemOverrides();
  delete overrides[id];
  localStorage.setItem(CUSTOM_OVERRIDES_KEY, JSON.stringify(overrides));
}

export function deleteCustomDesignSystem(id: string): void {
  if (typeof window === "undefined") return;
  const current = loadCustomDesignSystems();
  const filtered = current.filter((s) => s.id !== id);
  localStorage.setItem(CUSTOM_SYSTEMS_KEY, JSON.stringify(filtered));
}

export function getAllDesignSystems(): RichDesignSystem[] {
  const custom = loadCustomDesignSystems();
  const overrides = loadSystemOverrides();

  const mergedBuiltIn = RICH_DESIGN_SYSTEMS.map((base) => {
    if (overrides[base.id]) {
      return { ...base, ...overrides[base.id] } as RichDesignSystem;
    }
    return base;
  });

  return [...custom, ...mergedBuiltIn];
}

export function getDesignSystem(id: string): RichDesignSystem {
  const resolvedId = ID_ALIASES[id] || id;
  const all = getAllDesignSystems();
  return all.find((ds) => ds.id === resolvedId) || all[0] || RICH_DESIGN_SYSTEMS[0];
}

export function duplicateDesignSystem(id: string): RichDesignSystem {
  const original = getDesignSystem(id);
  const newId = `custom_${original.id}_copy_${Math.random().toString(36).slice(2, 6)}`;
  const duplicated: RichDesignSystem = {
    ...JSON.parse(JSON.stringify(original)),
    id: newId,
    name: `${original.name} (Copy)`,
    owner: "You",
    isCustom: true,
    updatedAt: Date.now(),
  };
  saveCustomDesignSystem(duplicated);
  return duplicated;
}

export interface GenerateSystemInputs {
  name: string;
  category?: string;
  badge?: string;
  description?: string;
  accentColor: string;
  secondaryColor?: string;
  bgDark: boolean;
  displayFont?: string;
  bodyFont?: string;
  monoFont?: string;
  radius?: string;
  borderWidth?: string;
  mood?: string;
  notes?: string;
}

export function generateRichDesignSystem(inputs: GenerateSystemInputs): RichDesignSystem {
  const name = inputs.name.trim() || "Untitled System";
  const id = `custom_${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}_${Math.random().toString(36).slice(2, 6)}`;
  const accent = inputs.accentColor || "#d97757";
  const secondary = inputs.secondaryColor || (inputs.bgDark ? "#282724" : "#e5e0d8");
  const bgDark = inputs.bgDark;

  const canvas = bgDark ? "#121110" : "#faf9f5";
  const surface = bgDark ? "#1c1b18" : "#ffffff";
  const surfaceSubtle = bgDark ? "#252420" : "#f4f1ea";
  const border = bgDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)";
  const textProminent = bgDark ? "#f5f3ee" : "#191816";
  const textMuted = bgDark ? "#9e9a90" : "#68645c";

  const displayFont = inputs.displayFont || (inputs.mood?.includes("Editorial") ? "Newsreader" : "Inter");
  const bodyFont = inputs.bodyFont || "Plus Jakarta Sans";
  const monoFont = inputs.monoFont || "JetBrains Mono";
  const radius = inputs.radius || "12px";
  const borderWidth = inputs.borderWidth || "1px";
  const mood = inputs.mood || (bgDark ? "Warm Dark Studio" : "Clean Editorial Light");

  const swatchColors = bgDark
    ? [canvas, surface, accent, textProminent]
    : [canvas, surfaceSubtle, accent, textProminent];

  const description = inputs.description?.trim() ||
    `${mood} aesthetic engineered with ${displayFont} typography, ${accent} accents, and ${radius} corner geometry.`;

  const promptGuidance = `
DESIGN SYSTEM: ${name.toUpperCase()}
- Atmosphere: ${bgDark ? "Dark-mode-first workspace" : "Pristine light canvas"}. Canvas ${canvas}, Surface ${surface}, Borders ${border}.
- Vibe / Mood: ${mood}.
- Typography System: Headlines in ${displayFont}, body copy in ${bodyFont}, monospace/data in ${monoFont}. Strict typographic rhythm with generous line-height and balanced tracking.
- Palette: Primary accent ${accent}, secondary accent ${secondary}.
- Geometry & Elevation: ${radius} border radius, ${borderWidth} border width. Subtle ambient drop-shadows.
- Craft & Details:
  - Generous editorial margins and intentional component padding.
  - Interactive components must feature clean states (hover, active, focus).
  - Responsive layouts scaling gracefully across Desktop (1440px), Tablet (768px), and Mobile (375px).
  ${inputs.notes ? `- Designer Notes: ${inputs.notes}` : ""}
`.trim();

  const foundations: DesignSystemFoundations = {
    colors: [
      { name: "Primary Accent", varName: "--color-accent", hex: accent, role: "Key action buttons, active states, brand focal points" },
      { name: "Secondary Accent", varName: "--color-accent-subtle", hex: secondary, role: "Secondary highlights, subtle pills, tags" },
      { name: "Background Canvas", varName: "--color-canvas", hex: canvas, role: "Main page background ground layer" },
      { name: "Surface Card", varName: "--color-surface", hex: surface, role: "Elevated container, modular cards, modals" },
      { name: "Subtle Surface", varName: "--color-surface-subtle", hex: surfaceSubtle, role: "Hover states, nested code blocks, pill backdrops" },
      { name: "Border Neutral", varName: "--color-border", hex: border, role: "Component boundaries, structural dividing rules" },
      { name: "Text Prominent", varName: "--color-text-prominent", hex: textProminent, role: "Primary headlines, high-contrast titles, values" },
      { name: "Text Muted", varName: "--color-text-muted", hex: textMuted, role: "Body text, captions, secondary descriptions" },
    ],
    semanticColors: [
      { role: "Success", name: "Emerald Signal", hex: "#10b981" },
      { role: "Warning", name: "Amber Alert", hex: "#f59e0b" },
      { role: "Error", name: "Crimson Danger", hex: "#ef4444" },
      { role: "Info", name: "Sky Informational", hex: "#3b82f6" },
    ],
    typography: {
      displayFont,
      bodyFont,
      monoFont,
      scale: [
        { name: "Display Hero", size: "44px", weight: "700", sample: `${name} Design Experience` },
        { name: "Heading 1", size: "32px", weight: "600", sample: "Crafted with Purpose & Precision" },
        { name: "Heading 2", size: "24px", weight: "600", sample: "Design Token Architecture" },
        { name: "Heading 3", size: "18px", weight: "500", sample: "Modular Components & Systems" },
        { name: "Body Standard", size: "14px", weight: "400", sample: "Every component adheres strictly to semantic color and geometric contracts." },
        { name: "Caption / Meta", size: "11px", weight: "500", sample: "UPDATED 2026 · PRODUCTION SPECIFICATION" },
        { name: "Code Monospace", size: "12px", weight: "400", sample: "const system = createDesignContract();" },
      ],
    },
    spacing: [
      { name: "space-1 (4px)", value: "4px" },
      { name: "space-2 (8px)", value: "8px" },
      { name: "space-3 (12px)", value: "12px" },
      { name: "space-4 (16px)", value: "16px" },
      { name: "space-6 (24px)", value: "24px" },
      { name: "space-8 (32px)", value: "32px" },
      { name: "space-12 (48px)", value: "48px" },
      { name: "space-16 (64px)", value: "64px" },
    ],
    radii: [
      { name: "radius-none", value: "0px" },
      { name: "radius-sm", value: "4px" },
      { name: "radius-base", value: radius },
      { name: "radius-lg", value: "18px" },
      { name: "radius-full", value: "9999px" },
    ],
    elevation: [
      { name: "Elevation 0 (Flat)", value: "none", desc: "Flush with canvas background ground" },
      { name: "Elevation 1 (Soft)", value: "0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.08)", desc: "Standard resting card state" },
      { name: "Elevation 2 (Floating)", value: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)", desc: "Hovered card, dropdown popover" },
      { name: "Elevation 3 (Modal)", value: "0 20px 25px -5px rgba(0,0,0,0.2), 0 8px 10px -6px rgba(0,0,0,0.1)", desc: "Modal dialog, prominent drawer" },
      { name: "Ambient Glow", value: `0 0 24px 0 ${accent}33`, desc: "Signature brand glow on featured focal points" },
    ],
    icons: {
      library: "Lucide",
      strokeWidth: 1.75,
      style: "Crisp geometric lines with 24x24 optical balance",
      defaultSet: ["sparkles", "arrow-right", "layers", "check", "shield", "zap", "activity", "bar-chart-2", "cpu", "globe"],
    },
    imagery: {
      artDirection: "Refined editorial composition with purposeful high-contrast framing and atmospheric depth",
      aspectRatios: [
        { ratio: "16:9", label: "Landscape Hero", desc: "Wide showcase banners, hero cards, and header photography" },
        { ratio: "4:3", label: "Editorial Card", desc: "Standard ratio for story cards, case studies, and feature highlights" },
        { ratio: "1:1", label: "Square Aspect", desc: "Profile avatars, app icon tiles, and symmetric gallery grids" },
        { ratio: "9:16", label: "Vertical Story", desc: "Mobile-first mockups, feed stories, and vertical drawer media" },
      ],
      cornerRadius: radius,
      treatment: `1px solid ${border} with subtle inner shadow vignette and soft natural lighting`,
    },
  };

  const templates = {
    deck: {
      name: `${name} Pitch Deck`,
      description: `Comprehensive 8-slide presentation deck formatted with ${name} tokens, typography, and geometry rules.`,
      slides: [
        {
          id: 1,
          label: "1",
          category: "DESIGN CONTRACT",
          title: name,
          subtitle: description,
          author: "Design & Product Team",
          date: "2026 Edition",
          type: "cover" as const,
        },
        {
          id: 2,
          label: "2",
          category: "INDEX",
          title: "Architecture & Agenda",
          subtitle: "Foundations, token hierarchies, and interactive component catalogs.",
          type: "toc" as const,
          items: [
            "01 Brand Core & Philosophy",
            "02 Semantic Design Tokens",
            "03 Reusable Component Catalog",
            "04 Production Starters & Templates",
          ],
        },
        {
          id: 3,
          label: "3",
          category: "01",
          title: "Brand Foundations",
          subtitle: `Core visual principles and discipline powering ${name}.`,
          type: "divider" as const,
          accentBg: true,
        },
        {
          id: 4,
          label: "4",
          category: "STRUCTURE",
          title: "Layout & Spacing",
          subtitle: `Engineered with ${radius} corner radius and mathematically balanced 8-point grid rhythm.`,
          type: "columns" as const,
          items: [
            `Tailored for ${mood} digital experiences.`,
            `Strict token contracts eliminate visual drift and inconsistent implementations.`,
          ],
        },
        {
          id: 5,
          label: "5",
          category: "TOKENS",
          title: "Semantic Token Roster",
          subtitle: `Primary values governing ${name} UI systems.`,
          type: "quadrants" as const,
          items: [
            `Accent: ${accent}`,
            `Headings: ${displayFont}`,
            `Body: ${bodyFont}`,
            `Geometry: ${radius}`,
          ],
        },
        {
          id: 6,
          label: "6",
          category: "DATA",
          title: "Performance & Quality Metrics",
          subtitle: "WCAG contrast compliance, rendering efficiency, and atomic component reusability.",
          type: "table" as const,
        },
        {
          id: 7,
          label: "7",
          category: "QUOTE",
          title: "Design Philosophy",
          subtitle: `"Design is not merely aesthetic decoration. In ${name}, design is how every interaction communicates clarity and trust."`,
          type: "quote" as const,
        },
        {
          id: 8,
          label: "8",
          category: "02",
          title: "Component Library",
          subtitle: "Production-ready UI primitives for high-converting interfaces.",
          type: "divider" as const,
          accentBg: true,
        },
      ],
    },
    landing: {
      name: `${name} Landing Page`,
      description: `High-converting responsive landing page starter consuming ${name} tokens and layout rules.`,
      heroTitle: `Build Next-Gen Experiences with ${name}`,
      heroSubtitle: description,
      ctaText: "Get Started Now",
      features: [
        { title: "Precision Crafted", desc: `Every section and card is aligned to the ${name} mathematical token system.` },
        { title: "Instant Interaction", desc: "Built with production-grade reactive controls, tab switchers, and fluid micro-states." },
        { title: "Universal Delivery", desc: "Zero runtime dependencies, responsive across desktop, tablet, and mobile screens." },
      ],
    },
    dashboard: {
      name: `${name} SaaS Dashboard`,
      description: `Modern analytics and operations dashboard starter utilizing ${name} data presentation patterns.`,
      metrics: [
        { label: "Active Workspaces", value: "2,840", change: "+14.2%", positive: true },
        { label: "Design System Drift", value: "0.2%", change: "-8.1%", positive: true },
        { label: "Average Render Time", value: "18ms", change: "-22%", positive: true },
      ],
      recentActivity: [
        { title: "Tokens synchronized with repository", user: "Lead Designer", status: "Published", date: "Just now" },
        { title: "New Deck presentation template generated", user: "Product Lead", status: "Active", date: "12m ago" },
        { title: "WCAG 2.1 accessibility audit completed", user: "System Agent", status: "Passed (AAA)", date: "1h ago" },
      ],
    },
  };

  const components = {
    buttons: {
      name: "Buttons & Action Controls",
      description: `Primary, secondary, ghost, and icon button patterns for ${name}.`,
      previewCode: `<div class="flex flex-wrap items-center gap-3">
  <button style="background-color: ${accent}; border-radius: ${radius}; font-family: '${bodyFont}', sans-serif;" class="px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-90 transition-opacity">
    Primary Action
  </button>
  <button style="border: 1px solid ${border}; border-radius: ${radius}; font-family: '${bodyFont}', sans-serif;" class="px-4 py-2 text-xs font-medium text-foreground hover:bg-black/5 transition-colors">
    Secondary Button
  </button>
  <button style="border-radius: ${radius}; font-family: '${bodyFont}', sans-serif;" class="px-3 py-2 text-xs font-medium text-foreground-muted hover:text-foreground transition-colors">
    Ghost Action
  </button>
</div>`,
    },
    cards: {
      name: "Modular Cards & Containers",
      description: `Structural card containers styled with ${radius} radius and ${borderWidth} borders.`,
      previewCode: `<div style="background-color: ${surface}; border: ${borderWidth} solid ${border}; border-radius: ${radius}; padding: 20px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.06);" class="space-y-3 max-w-sm">
  <div class="flex items-center justify-between">
    <span style="color: ${accent}; font-family: '${displayFont}', serif;" class="text-xs font-bold uppercase tracking-wider">Featured Tier</span>
    <span class="w-2 h-2 rounded-full" style="background-color: ${accent};"></span>
  </div>
  <h4 style="font-family: '${displayFont}', serif;" class="text-lg font-bold text-foreground">${name} Core Card</h4>
  <p class="text-xs text-foreground-muted leading-relaxed">${description}</p>
  <div class="pt-2 border-t border-border flex items-center justify-between text-xs text-foreground-muted">
    <span>Token compliant</span>
    <span style="color: ${accent};" class="font-semibold">Explore →</span>
  </div>
</div>`,
    },
    dialog: {
      name: "Modal Dialog & Drawer",
      description: `Centered alert and confirmation dialog over backdrop.`,
      previewCode: `<div style="background-color: ${surface}; border: 1px solid ${border}; border-radius: ${radius}; padding: 24px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.15);" class="max-w-md w-full space-y-4">
  <div class="flex items-center justify-between">
    <h3 style="font-family: '${displayFont}', serif;" class="text-base font-bold text-foreground">Confirm System Update</h3>
    <button class="text-foreground-muted hover:text-foreground text-xs font-mono">✕</button>
  </div>
  <p class="text-xs text-foreground-muted leading-relaxed">
    Publishing these changes will propagate ${name} tokens to all linked prototype pages and decks.
  </p>
  <div class="flex items-center justify-end gap-2 pt-2 border-t border-border">
    <button class="px-3 py-1.5 text-xs text-foreground-muted hover:text-foreground">Cancel</button>
    <button style="background-color: ${accent}; border-radius: ${radius};" class="px-3.5 py-1.5 text-xs font-semibold text-white">
      Publish Tokens
    </button>
  </div>
</div>`,
    },
    forms: {
      name: "Forms & Inputs",
      description: `Text fields, checkboxes, and select dropdowns styled to match ${name} tokens.`,
      previewCode: `<div class="space-y-3 max-w-sm text-xs">
  <div class="space-y-1">
    <label class="font-medium text-foreground">Project Identifier</label>
    <input type="text" placeholder="e.g. system-core-v1" style="border: 1px solid ${border}; border-radius: ${radius}; background: ${surfaceSubtle};" class="w-full px-3 py-2 text-foreground focus:outline-none" />
  </div>
  <div class="flex items-center gap-2 pt-1">
    <input type="checkbox" id="token-sync" checked class="w-4 h-4 rounded cursor-pointer" style="accent-color: ${accent};" />
    <label for="token-sync" class="text-foreground cursor-pointer">Enforce strict token matching</label>
  </div>
</div>`,
    },
    navigation: {
      name: "Navigation Header",
      description: `Header bar with brand identifier, navigation links, and primary CTA.`,
      previewCode: `<header style="background-color: ${surface}; border-bottom: 1px solid ${border};" class="h-14 px-6 flex items-center justify-between rounded-xl">
  <div class="flex items-center gap-4">
    <div class="flex items-center gap-2 font-bold text-sm">
      <div class="w-4 h-4 rounded-full" style="background-color: ${accent};"></div>
      <span style="font-family: '${displayFont}', serif;">${name}</span>
    </div>
    <nav class="hidden sm:flex items-center gap-4 text-xs text-foreground-muted font-medium">
      <span class="text-foreground hover:text-foreground cursor-pointer">Overview</span>
      <span class="hover:text-foreground cursor-pointer">Tokens</span>
      <span class="hover:text-foreground cursor-pointer">Components</span>
    </nav>
  </div>
  <button style="background-color: ${accent}; border-radius: ${radius};" class="px-3 py-1.5 text-xs font-semibold text-white">
    Deploy App
  </button>
</header>`,
    },
    table: {
      name: "Data Table & Row Rules",
      description: `Data grid with themed header cells, borders, and status tags.`,
      previewCode: `<div style="background-color: ${surface}; border: 1px solid ${border}; border-radius: ${radius}; overflow: hidden;" class="text-xs">
  <table class="w-full text-left">
    <thead style="background-color: ${surfaceSubtle}; border-bottom: 1px solid ${border};" class="text-foreground-muted font-medium text-[11px]">
      <tr>
        <th class="p-3 font-normal">Component</th>
        <th class="p-3 font-normal">Status</th>
        <th class="p-3 font-normal text-right">Tokens</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-border">
      <tr>
        <td class="p-3 font-medium text-foreground">Navigation Header</td>
        <td class="p-3"><span style="color: ${accent}; background-color: ${accent}15;" class="px-2 py-0.5 rounded-full text-[10px] font-semibold">Active</span></td>
        <td class="p-3 text-right text-foreground-muted font-mono">12 vars</td>
      </tr>
      <tr>
        <td class="p-3 font-medium text-foreground">Pitch Deck Template</td>
        <td class="p-3"><span style="color: #10b981; background-color: #10b98115;" class="px-2 py-0.5 rounded-full text-[10px] font-semibold">Passed</span></td>
        <td class="p-3 text-right text-foreground-muted font-mono">8 slides</td>
      </tr>
    </tbody>
  </table>
</div>`,
    },
    badges: {
      name: "Badges & Status Tags",
      description: `Contextual status indicators, pill labels, and metadata chips.`,
      previewCode: `<div class="flex flex-wrap items-center gap-2">
  <span style="background-color: ${accent}20; color: ${accent}; border: 1px solid ${accent}40; border-radius: 9999px;" class="px-2.5 py-0.5 text-[11px] font-semibold">
    ${name} Official
  </span>
  <span style="background-color: #10b98120; color: #10b981; border: 1px solid #10b98140; border-radius: 9999px;" class="px-2.5 py-0.5 text-[11px] font-semibold flex items-center gap-1">
    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Verified
  </span>
  <span style="background-color: ${surfaceSubtle}; border: 1px solid ${border}; border-radius: 9999px;" class="px-2.5 py-0.5 text-[11px] font-medium text-foreground-muted">
    Draft Mode
  </span>
</div>`,
    },
    stats: {
      name: "KPI & Stat Metrics",
      description: `High-impact counter cards for dashboards and analytical summaries.`,
      previewCode: `<div class="grid grid-cols-2 gap-3 max-w-sm">
  <div style="background-color: ${surface}; border: 1px solid ${border}; border-radius: ${radius}; padding: 14px;" class="space-y-1">
    <span class="text-[10px] uppercase font-semibold text-foreground-muted">Conversion Rate</span>
    <div style="font-family: '${displayFont}', serif;" class="text-2xl font-bold text-foreground">94.8%</div>
    <span style="color: #10b981;" class="text-[10px] font-semibold">+12.4% vs last week</span>
  </div>
  <div style="background-color: ${surface}; border: 1px solid ${border}; border-radius: ${radius}; padding: 14px;" class="space-y-1">
    <span class="text-[10px] uppercase font-semibold text-foreground-muted">Active Users</span>
    <div style="font-family: '${displayFont}', serif;" class="text-2xl font-bold text-foreground">18,240</div>
    <span style="color: ${accent};" class="text-[10px] font-semibold">Token compliant</span>
  </div>
</div>`,
    },
    alerts: {
      name: "Alerts & Notifications",
      description: `Callout banners for success, warning, and informational announcements.`,
      previewCode: `<div class="space-y-2 max-w-md text-xs">
  <div style="background-color: #10b98110; border: 1px solid #10b98130; border-radius: ${radius}; padding: 12px;" class="flex items-start gap-2.5">
    <span class="text-emerald-500 font-bold">✓</span>
    <div>
      <h5 class="font-bold text-foreground">Design contract validated</h5>
      <p class="text-[11px] text-foreground-muted mt-0.5">All 24 semantic token definitions match WCAG 2.1 AAA requirements.</p>
    </div>
  </div>
  <div style="background-color: ${accent}10; border: 1px solid ${accent}30; border-radius: ${radius}; padding: 12px;" class="flex items-start gap-2.5">
    <span style="color: ${accent};" class="font-bold">✦</span>
    <div>
      <h5 class="font-bold text-foreground">${name} ready for Canvas</h5>
      <p class="text-[11px] text-foreground-muted mt-0.5">Start prototyping immediately on the interactive canvas.</p>
    </div>
  </div>
</div>`,
    },
  };

  const tokensCss = `/* ${name} Design Tokens - Generated Specification */
:root {
  /* Color Palette */
  --color-accent: ${accent};
  --color-accent-subtle: ${secondary};
  --color-canvas: ${canvas};
  --color-surface: ${surface};
  --color-surface-subtle: ${surfaceSubtle};
  --color-border: ${border};
  --color-text-prominent: ${textProminent};
  --color-text-muted: ${textMuted};

  /* Semantic Status Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;

  /* Typography */
  --font-display: "${displayFont}", Georgia, serif;
  --font-body: "${bodyFont}", -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: "${monoFont}", monospace;

  /* Geometry & Spacing */
  --radius-base: ${radius};
  --border-width: ${borderWidth};
  --space-unit: 4px;
}`;

  const themeJson = JSON.stringify(
    {
      name,
      version: "2026.1",
      atmosphere: bgDark ? "dark" : "light",
      colors: {
        accent,
        secondary,
        canvas,
        surface,
        border,
        textProminent,
        textMuted,
        semantic: { success: "#10b981", warning: "#f59e0b", error: "#ef4444", info: "#3b82f6" },
      },
      typography: {
        display: displayFont,
        body: bodyFont,
        mono: monoFont,
        scale: foundations.typography.scale,
      },
      geometry: {
        radius,
        borderWidth,
      },
    },
    null,
    2
  );

  return {
    id,
    name,
    category: inputs.category || "Custom Design",
    badge: inputs.badge || (bgDark ? "Dark Studio" : "Light Canvas"),
    description,
    accentColor: accent,
    bgDark,
    swatchColors,
    owner: "You",
    updatedAt: Date.now(),
    isCustom: true,
    published: true,
    isOrgDefault: false,
    promptGuidance,
    readme: {
      headline: `${name} Design System`,
      description,
      howToUse: [
        `Link the design token stylesheet \`<link rel="stylesheet" href="tokens.css">\` and reference every color and font from CSS variables.`,
        `Adopt the component patterns (Buttons, Cards, Dialog, Forms, Navigation, Table, Badges, Metrics) directly into your UI.`,
        `Templates provide ready-to-use Deck presentation and Landing page starters consuming ${name} tokens.`,
        `To modify brand aesthetics, update Theme Parameters directly or adjust values in the inspector.`,
      ],
      direction: `${mood}. Headlines set in ${displayFont}, body copy in ${bodyFont}. Strict ${radius} corner geometry with ${borderWidth} subtle borders.`,
      manifestFiles: [
        { path: "DESIGN.md", description: "The master brand contract specification for AI and engineering." },
        { path: "tokens.css", description: "Core CSS custom properties defining palette, typography, and geometry." },
        { path: "theme.json", description: "Structured JSON tokens for cross-platform pipelines and tools." },
        { path: "templates/deck/", description: "8-slide presentation deck consuming system tokens." },
        { path: "templates/landing/", description: "High-converting responsive landing page starter." },
        { path: "templates/dashboard/", description: "SaaS analytics and operations dashboard starter." },
        { path: "components/catalog.html", description: "Comprehensive library of 9 verified atomic UI patterns." },
      ],
    },
    templates,
    components,
    foundations,
    tokensCss,
    themeJson,
  };
}

export function exportDesignSystemMarkdown(system: RichDesignSystem): string {
  return `# ${system.name.toUpperCase()} DESIGN CONTRACT (DESIGN.md)

> ${system.description}

## 1. Atmosphere & Brand Identity
- **Atmosphere:** ${system.bgDark ? "Dark-mode-first workspace ground" : "Pristine light canvas"}
- **Accent Color:** \`${system.accentColor}\`
- **Category:** ${system.category || "Digital Product"}
- **Design Direction:** ${system.readme.direction}

## 2. Color Palette & Tokens
| Variable Name | Hex Code | Role & Description |
| :--- | :--- | :--- |
${system.foundations.colors.map((c) => `| \`${c.varName}\` | \`${c.hex}\` | ${c.role} |`).join("\n")}

### Semantic Signals
- **Success:** \`#10b981\`
- **Warning:** \`#f59e0b\`
- **Error:** \`#ef4444\`
- **Info:** \`#3b82f6\`

## 3. Typography Hierarchy
- **Display Font:** \`${system.foundations.typography.displayFont}\`
- **Body Font:** \`${system.foundations.typography.bodyFont}\`
- **Monospace Font:** \`${system.foundations.typography.monoFont}\`

### Typographic Scale
| Step | Size | Weight | Sample / Usage |
| :--- | :--- | :--- | :--- |
${system.foundations.typography.scale.map((s) => `| **${s.name}** | \`${s.size}\` | \`${s.weight}\` | ${s.sample} |`).join("\n")}

## 4. Spacing & Geometry Rules
- **Corner Radius Scale:**
${system.foundations.radii.map((r) => `  - \`${r.name}\`: \`${r.value}\``).join("\n")}
- **Grid Spacing Scale:**
${system.foundations.spacing.map((s) => `  - \`${s.name}\`: \`${s.value}\``).join("\n")}

## 5. Iconography & Imagery Guidelines
- **Icon Library:** Lucide Icons (stroke width: 1.75px)
- **Imagery Rule:** Aspect ratios 16:9 (Hero), 4:3 (Cards), 1:1 (Avatars). Subtle borders matching border token.

## 6. How to Implement in Prototypes
1. Always inject the stylesheet \`tokens.css\` into the HTML \`<head>\`.
2. Wrap outputs with \`<artifact id="project-deliverable" title="${system.name} Prototype" type="html">\`.
3. Adhere strictly to the color, typography, and radius rules above. No visual drift.
`;
}

export function exportDesignSystemCss(system: RichDesignSystem): string {
  return system.tokensCss;
}

export function exportDesignSystemJson(system: RichDesignSystem): string {
  return system.themeJson;
}
