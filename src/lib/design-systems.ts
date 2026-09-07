export interface DesignSystem {
  id: string;
  name: string;
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
}

export const DESIGN_SYSTEMS: DesignSystem[] = [
  {
    id: "claude-anthropic",
    name: "Anthropic Design System",
    description: "Warm espresso & ivory canvas, refined Newsreader serif typography, and signature terracotta accents.",
    badge: "Official Theme",
    accentColor: "#d97757",
    bgDark: true,
    swatchColors: ["#1f1e1c", "#282724", "#d97757", "#faf9f5"],
    owner: "Included",
    updatedAt: "Built-in",
    published: true,
    promptGuidance: `
DESIGN SYSTEM: ANTHROPIC DESIGN SYSTEM
- Atmosphere: Warm espresso dark workspace (#1F1E1C canvas, #282724 cards, #383632 borders) or ivory light mode (#FAF9F5 canvas, #FFFFFF cards, #E5E0D8 borders).
- Palette: Signature terracotta (#D97757 primary, #E28767 hover, #B85A3F active), warm cream text (#EDEBE6 in dark, #1F1E1D in light), sand muted text (#9C988F in dark, #6B6860 in light).
- Typography: Newsreader serif (Google Font) for display headlines, section titles, and editorial banners. Inter for UI controls, buttons, and system text.
- Details: Claude.ai card aesthetic with rounded-2xl corners, 1px subtle warm borders, generous editorial whitespace, soft terracotta focus rings, and high-legibility layout.
    `.trim(),
  },
  {
    id: "linear",
    name: "Linear",
    description: "Dark precision engineering, starlight borders, signature indigo-violet accent.",
    badge: "Dark Minimal",
    accentColor: "#5e6ad2",
    bgDark: true,
    swatchColors: ["#08090a", "#191a1b", "#5e6ad2", "#7170ff"],
    owner: "Included",
    updatedAt: "Built-in",
    published: true,
    promptGuidance: `
DESIGN SYSTEM: LINEAR
- Atmosphere: Dark-mode-first (#08090a canvas, #0f1011 panels, #191a1b elevated cards).
- Palette: Near-black backgrounds, text in luminous whites (#f7f8f8 primary, #8a8f98 secondary).
- Accent: Signature indigo-violet (#5e6ad2 primary, #7170ff accent hover). Used sparingly on primary CTAs and active states.
- Borders: Ultra-subtle semi-transparent borders (border border-white/10 or rgba(255,255,255,0.08)).
- Typography: Inter Variable with tight tracking (-0.02em to -0.04em for headings). Font weights: 500/600 for headings, 400 for body.
- Visual details: Multi-layered soft glow on hero elements, pills with subtle border-white/10, backdrop blur on glass headers.
    `.trim(),
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "World-class fintech design. Crisp light mode, vibrant gradient accents, precision typography.",
    badge: "Fintech Elegance",
    accentColor: "#635bff",
    bgDark: false,
    swatchColors: ["#ffffff", "#635bff", "#00d4ff", "#0a2540"],
    owner: "Included",
    updatedAt: "Built-in",
    published: true,
    promptGuidance: `
DESIGN SYSTEM: STRIPE
- Atmosphere: Pristine light mode (#ffffff background, #f6f9fc secondary canvas).
- Palette: Dark slate text (#0a2540 primary, #425466 body text), clean neutral borders (#e6ebf1).
- Accent: Stripe blurple (#635bff), vibrant gradients (cyan to purple #00d4ff -> #635bff), emerald success (#00d924).
- Typography: Clean sans-serif, confident display headlines with balanced letter-spacing.
- Cards & Shadows: Crisp rounded corners (rounded-xl / rounded-2xl), multi-layered ambient drop shadows (shadow-sm, shadow-md, shadow-lg with subtle blue tint).
- Elements: Interactive badges, tabular figures for pricing, clean pill tags, high-contrast buttons with smooth hover states.
    `.trim(),
  },
  {
    id: "apple",
    name: "Apple",
    description: "Human Interface elegance. Expansive whitespace, subtle typography, and refined curves.",
    badge: "Refined Modern",
    accentColor: "#0071e3",
    bgDark: false,
    swatchColors: ["#ffffff", "#f5f5f7", "#0071e3", "#1d1d1f"],
    owner: "Included",
    updatedAt: "Built-in",
    published: true,
    promptGuidance: `
DESIGN SYSTEM: APPLE
- Atmosphere: Pure, spacious, distraction-free (#ffffff or deep #000000).
- Palette: High contrast, neutral gray hierarchies (#1d1d1f primary text, #86868b secondary text).
- Accent: Classic Apple blue (#0071e3) for interactive text and pills.
- Typography: SF Pro style sans-serif, bold clear headers, generous line-heights (leading-relaxed).
- Geometry: Large rounded corners (rounded-2xl / rounded-3xl), subtle hairline dividers (border-gray-200 / border-neutral-800).
- Visual hierarchy: Let the product hero image and typography breathe. Never crowd the interface.
    `.trim(),
  },
  {
    id: "vercel",
    name: "Vercel",
    description: "Monochrome, high-contrast developer aesthetic with razor-sharp geometric precision.",
    badge: "Developer High-Contrast",
    accentColor: "#000000",
    bgDark: true,
    swatchColors: ["#000000", "#18181b", "#ededed", "#ffffff"],
    owner: "Included",
    updatedAt: "Built-in",
    published: true,
    promptGuidance: `
DESIGN SYSTEM: VERCEL
- Atmosphere: Pure black canvas (#000000) or pure white (#ffffff) with maximum contrast.
- Palette: Achromatic. Strict grayscale (#ededed primary, #a1a1aa secondary, #27272a borders).
- Borders: Crisp 1px solid borders (border-neutral-800 on dark, border-neutral-200 on light).
- Typography: Geist / Inter style monospace & sans-serif pairing. Sharp uppercase tracking on micro-labels.
- Structure: Rigid grid layouts, bento box modular sections, zero clutter, instant clarity.
    `.trim(),
  },
  {
    id: "editorial",
    name: "Warm Editorial",
    description: "Literary, thoughtful design with serif typography, warm parchment tones, and magazine layout.",
    badge: "Editorial Magazine",
    accentColor: "#b45309",
    bgDark: false,
    swatchColors: ["#fbf9f5", "#f4efe6", "#b45309", "#1c1917"],
    owner: "Included",
    updatedAt: "Built-in",
    published: true,
    promptGuidance: `
DESIGN SYSTEM: WARM EDITORIAL
- Atmosphere: Warm cream/parchment background (#fbf9f5, #f4efe6).
- Palette: Ink black text (#1c1917, #292524), warm amber/terracotta accents (#b45309, #c2410c).
- Typography: Elegant serif headers (Playfair Display / Georgia / Merriweather) paired with clean sans body.
- Dividers: Delicate editorial lines, drop caps, quote callouts, generous margin and breathing room.
- Aesthetic: Resembles the New Yorker, Kinfolk, or Monocle digital magazine.
    `.trim(),
  },
  {
    id: "modern-saas",
    name: "Modern SaaS",
    description: "Vibrant, friendly, high-converting modern startup UI with rounded cards and soft glows.",
    badge: "Startup SaaS",
    accentColor: "#3b82f6",
    bgDark: false,
    swatchColors: ["#ffffff", "#eff6ff", "#3b82f6", "#1e293b"],
    owner: "Included",
    updatedAt: "Built-in",
    published: true,
    promptGuidance: `
DESIGN SYSTEM: MODERN SAAS
- Atmosphere: Clean, bright (#ffffff canvas with subtle slate/gray-50 sections).
- Palette: Slate-900 text, Indigo/Blue primary CTA (#4f46e5 / #2563eb), vibrant gradient highlights.
- Cards: Soft rounded corners (rounded-2xl), subtle borders (border-slate-100), ambient shadows (shadow-xl shadow-slate-200/50).
- Features: Star rating reviews, customer avatar stacks, pricing cards with "Most Popular" floating ribbons, feature grids with colorful icon badges.
    `.trim(),
  },
  {
    id: "neobrutalism",
    name: "Neo-Brutalist",
    description: "High-energy bold design. Heavy black borders, hard drop shadows, vibrant pop colors.",
    badge: "Playful Bold",
    accentColor: "#facc15",
    bgDark: false,
    swatchColors: ["#fef08a", "#a7f3d0", "#facc15", "#000000"],
    owner: "Included",
    updatedAt: "Built-in",
    published: true,
    promptGuidance: `
DESIGN SYSTEM: NEO-BRUTALISM
- Atmosphere: High-contrast, dynamic, punchy.
- Palette: Bright saturated backgrounds (yellow #fef08a, mint #a7f3d0, lavender #e9d5ff, peach #fed7aa).
- Borders: Thick solid black borders (border-2 or border-4 border-black).
- Shadows: Hard offset black drop shadows with NO blur (shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]).
- Typography: Heavy bold sans-serif, uppercase badges, playful sticker pills, jaunty rotations (-rotate-1, rotate-2).
    `.trim(),
  },
  {
    id: "modernist",
    name: "Modernist",
    description: "Swiss style typography, asymmetrical grid balance, and bold crimson accents.",
    badge: "Swiss Graphic",
    accentColor: "#e11d48",
    bgDark: false,
    swatchColors: ["#e11d48", "#fb7185", "#18181b", "#ffffff"],
    owner: "Included",
    updatedAt: "Built-in",
    published: true,
    promptGuidance: `
DESIGN SYSTEM: MODERNIST
- Atmosphere: Crisp Swiss graphic design, bold geometric harmony.
- Palette: Vermilion crimson (#e11d48), off-white parchment (#fafafa), deep obsidian black (#18181b).
- Typography: Grotesk / Helvetica / Inter with heavy contrast between oversized numerals/headers and refined body copy.
- Layout: Asymmetrical grids, poster-inspired whitespace, thick rule dividers.
    `.trim(),
  },
  {
    id: "dct-abu-dhabi",
    name: "DCT Abu Dhabi Design System",
    description: "Cultural heritage and luxury hospitality with warm desert terracotta and crisp accents.",
    badge: "Cultural Luxury",
    accentColor: "#e05a47",
    bgDark: false,
    swatchColors: ["#e05a47", "#059669", "#ffffff", "#1e1e1e"],
    owner: "Included",
    updatedAt: "Built-in",
    published: true,
    promptGuidance: `
DESIGN SYSTEM: DCT ABU DHABI
- Atmosphere: Warm desert luxury, cultural hospitality, modern elegance.
- Palette: Terracotta coral (#e05a47), emerald oasis (#059669), ivory sand (#fdfbf7), deep charcoal (#1e1e1e).
- Typography: Prestigious display serif headers, spacious layout, refined line heights.
- Accents: Subtle gold or oasis emerald accents, generous photography showcases, crisp pill badges.
    `.trim(),
  },
];

const CUSTOM_SYSTEMS_KEY = "open_claude_design_custom_systems";

export function loadCustomDesignSystems(): DesignSystem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CUSTOM_SYSTEMS_KEY) || localStorage.getItem("claude_design_custom_systems");
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveCustomDesignSystem(system: DesignSystem): void {
  if (typeof window === "undefined") return;
  const current = loadCustomDesignSystems();
  const index = current.findIndex((s) => s.id === system.id);
  let updated: DesignSystem[];
  if (index !== -1) {
    updated = [...current];
    updated[index] = { ...system, isCustom: true, owner: "You", updatedAt: Date.now() };
  } else {
    updated = [{ ...system, isCustom: true, owner: "You", updatedAt: Date.now() }, ...current];
  }
  localStorage.setItem(CUSTOM_SYSTEMS_KEY, JSON.stringify(updated));
}

export function deleteCustomDesignSystem(id: string): void {
  if (typeof window === "undefined") return;
  const current = loadCustomDesignSystems();
  const filtered = current.filter((s) => s.id !== id);
  localStorage.setItem(CUSTOM_SYSTEMS_KEY, JSON.stringify(filtered));
}

export function getAllDesignSystems(): DesignSystem[] {
  const custom = loadCustomDesignSystems();
  return [...custom, ...DESIGN_SYSTEMS];
}

export function getDesignSystem(id: string): DesignSystem {
  const all = getAllDesignSystems();
  return all.find((ds) => ds.id === id) || DESIGN_SYSTEMS[0];
}
