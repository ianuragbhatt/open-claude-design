"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Sparkles,
  Palette,
  Check,
  Type,
  Layers,
  Wand2,
  Sliders,
  FileCode,
  Image as ImageIcon,
  Upload,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import {
  saveCustomDesignSystem,
  generateRichDesignSystem,
  type RichDesignSystem,
} from "@/lib/design-systems";
import { getWcagRating } from "@/lib/formatters";

interface CreateDesignSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (system: RichDesignSystem) => void;
}

const PRESET_ACCENTS = [
  { color: "#d97757", name: "Terracotta" },
  { color: "#e28767", name: "Coral" },
  { color: "#5e6ad2", name: "Linear Indigo" },
  { color: "#635bff", name: "Blurple" },
  { color: "#0071e3", name: "Apple Blue" },
  { color: "#059669", name: "Emerald" },
  { color: "#8b5cf6", name: "Violet" },
  { color: "#e11d48", name: "Crimson" },
  { color: "#06b6d4", name: "Electric Cyan" },
  { color: "#d97706", name: "Warm Amber" },
  { color: "#18181b", name: "Obsidian" },
];

const PROMPT_STARTERS = [
  {
    label: "Cyberpunk Terminal",
    prompt: "A high-contrast dark developer platform named Aegis with electric cyan accents, JetBrains Mono typography, sharp 2px corners, and subtle grid lines.",
    accent: "#06b6d4",
    bgDark: true,
  },
  {
    label: "Luxury Scandinavian",
    prompt: "An elegant Nordic design studio named Varde with warm ivory canvas, sage green accents, Newsreader serif headlines, and smooth 16px cards.",
    accent: "#4d7c0f",
    bgDark: false,
  },
  {
    label: "Fintech Wealth",
    prompt: "An institutional wealth management platform named Obsidian with deep espresso grounds, emerald green signals, and refined typography.",
    accent: "#10b981",
    bgDark: true,
  },
  {
    label: "Swiss Modernist",
    prompt: "A rigid Swiss-school architecture system named Helvetica Noir with bold vermilion crimson accents, strict Archivo type, and 0px corner geometry.",
    accent: "#e11d48",
    bgDark: false,
  },
  {
    label: "Warm Editorial",
    prompt: "A literary magazine and longform journal named Harper with warm paper canvas, terracotta accent, and classical serif typography.",
    accent: "#d97757",
    bgDark: false,
  },
];

const DISPLAY_FONTS = [
  { name: "Newsreader", category: "Editorial Serif", sample: "Literary & refined" },
  { name: "Inter", category: "Geometric Sans", sample: "Modern neutral interface" },
  { name: "Plus Jakarta Sans", category: "Friendly Sans", sample: "Clean contemporary SaaS" },
  { name: "Archivo", category: "Swiss Neo-Grotesque", sample: "Strict high-contrast" },
  { name: "Space Grotesk", category: "Tech Grotesque", sample: "Developer & futuristic" },
  { name: "Playfair Display", category: "Luxury Serif", sample: "High elegance & prestige" },
];

const RADII_OPTIONS = [
  { label: "Sharp (0px)", value: "0px" },
  { label: "Clean (6px)", value: "6px" },
  { label: "Smooth (12px)", value: "12px" },
  { label: "Rounded (18px)", value: "18px" },
  { label: "Pill (9999px)", value: "9999px" },
];

export function CreateDesignSystemModal({
  isOpen,
  onClose,
  onCreated,
}: CreateDesignSystemModalProps) {
  const [activeTab, setActiveTab] = useState<"prompt" | "studio" | "import">("prompt");

  // Common State
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Product Design");
  const [description, setDescription] = useState("");
  const [bgDark, setBgDark] = useState(true);
  const [accentColor, setAccentColor] = useState("#d97757");
  const [secondaryColor, setSecondaryColor] = useState("#282724");
  const [displayFont, setDisplayFont] = useState("Newsreader");
  const [bodyFont, setBodyFont] = useState("Plus Jakarta Sans");
  const [radius, setRadius] = useState("12px");
  const [notes, setNotes] = useState("");

  // AI Prompt Tab State
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Import Tab State
  const [specInput, setSpecInput] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Real-time WCAG rating
  const canvasHex = bgDark ? "#121110" : "#faf9f5";
  const wcagCanvas = getWcagRating(accentColor, canvasHex);

  const handleSelectStarter = (starter: (typeof PROMPT_STARTERS)[0]) => {
    setAiPrompt(starter.prompt);
    setAccentColor(starter.accent);
    setBgDark(starter.bgDark);
    if (!name) {
      setName(starter.label);
    }
  };

  // Image color extraction using HTML5 Canvas
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setImagePreview(dataUrl);

      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          canvas.width = 100;
          canvas.height = 100;
          ctx.drawImage(img, 0, 0, 100, 100);
          const p1 = ctx.getImageData(50, 50, 1, 1).data;
          const p2 = ctx.getImageData(20, 20, 1, 1).data;

          const toHex = (r: number, g: number, b: number) =>
            "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");

          const extractedAccent = toHex(p1[0], p1[1], p1[2]);
          setAccentColor(extractedAccent);

          const isDark = (p2[0] * 299 + p2[1] * 587 + p2[2] * 114) / 1000 < 128;
          setBgDark(isDark);
        } catch {
          // ignore
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleParseSpec = () => {
    if (!specInput.trim()) return;
    try {
      const parsed = JSON.parse(specInput);
      if (parsed.name) setName(parsed.name);
      if (parsed.colors?.accent) setAccentColor(parsed.colors.accent);
      if (parsed.colors?.secondary) setSecondaryColor(parsed.colors.secondary);
      if (parsed.typography?.display) setDisplayFont(parsed.typography.display);
      if (parsed.typography?.body) setBodyFont(parsed.typography.body);
      if (parsed.geometry?.radius) setRadius(parsed.geometry.radius);
      if (parsed.atmosphere) setBgDark(parsed.atmosphere === "dark");
      setActiveTab("studio");
    } catch {
      // If Markdown specification
      const nameMatch = specInput.match(/#\s+(.+?)\s+DESIGN/i) || specInput.match(/#\s+(.+)/);
      if (nameMatch) setName(nameMatch[1].trim());
      const accentMatch = specInput.match(/--color-accent:\s*(#[a-fA-F0-9]{3,8})/i) || specInput.match(/Accent Color:[^#]+(#[a-fA-F0-9]{3,8})/i);
      if (accentMatch) setAccentColor(accentMatch[1].trim());
      setActiveTab("studio");
    }
  };

  const handleSave = () => {
    setIsGenerating(true);
    try {
      const finalName = name.trim() || (aiPrompt.slice(0, 24) || "Custom Design System");
      const generatedSystem = generateRichDesignSystem({
        name: finalName,
        category: category.trim() || "Custom Design",
        description: description.trim() || (aiPrompt.trim() ? aiPrompt : undefined),
        accentColor,
        secondaryColor,
        bgDark,
        displayFont,
        bodyFont,
        radius,
        mood: aiPrompt.trim() ? aiPrompt.slice(0, 80) : undefined,
        notes: notes.trim() || undefined,
      });

      saveCustomDesignSystem(generatedSystem);
      onCreated(generatedSystem);
      onClose();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150 select-none">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-subtle/40">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-sm"
              style={{ backgroundColor: accentColor }}
            >
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-foreground">Create Design System</h2>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-terracotta/10 text-terracotta border border-terracotta/20">
                  Design Architect
                </span>
              </div>
              <p className="text-xs text-foreground-muted">
                Teach Khayal your brand foundations, tokens, presentation slides, and UI templates
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-foreground-muted hover:text-foreground rounded-lg hover:bg-surface-subtle transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Tab Mode Switcher */}
        <div className="px-6 pt-3 pb-2 border-b border-border bg-surface flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab("prompt")}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              activeTab === "prompt"
                ? "bg-terracotta text-white shadow-xs"
                : "text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>AI Prompt Architect</span>
          </button>

          <button
            onClick={() => setActiveTab("studio")}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              activeTab === "studio"
                ? "bg-terracotta text-white shadow-xs"
                : "text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Visual Token Studio</span>
          </button>

          <button
            onClick={() => setActiveTab("import")}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              activeTab === "import"
                ? "bg-terracotta text-white shadow-xs"
                : "text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Import Spec & Image</span>
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs space-y-6">
          {/* TAB 1: AI PROMPT ARCHITECT */}
          {activeTab === "prompt" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="space-y-1.5">
                <label className="block text-foreground font-semibold text-xs">
                  Describe Your Brand & Aesthetic Vision
                </label>
                <textarea
                  rows={4}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Describe your brand direction, atmosphere, desired typography, mood, and color signals... e.g. A serene healthcare interface named Solace with lavender accents, clean typography, soft card borders, and warm compassionate copy."
                  className="w-full bg-surface-subtle border border-border rounded-xl p-3.5 text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:border-terracotta text-xs leading-relaxed transition-colors resize-none shadow-inner"
                />
              </div>

              {/* Inspiration Chips */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-foreground-muted block">
                  Creative Starting Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PROMPT_STARTERS.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => handleSelectStarter(s)}
                      className="px-2.5 py-1 rounded-lg bg-surface-subtle hover:bg-surface border border-border hover:border-terracotta/40 text-[11px] text-foreground-muted hover:text-foreground transition-all flex items-center gap-1.5 shadow-2xs"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: s.accent }}
                      />
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Atmosphere & Primary Accent Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <label className="block text-foreground font-medium">Canvas Atmosphere</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setBgDark(true)}
                      className={`py-2 px-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${
                        bgDark
                          ? "bg-terracotta/10 border-terracotta text-terracotta font-medium shadow-xs"
                          : "bg-surface-subtle border-border text-foreground-muted hover:bg-surface"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-[#121110] border border-white/20" />
                      <span>Warm Dark</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBgDark(false)}
                      className={`py-2 px-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${
                        !bgDark
                          ? "bg-terracotta/10 border-terracotta text-terracotta font-medium shadow-xs"
                          : "bg-surface-subtle border-border text-foreground-muted hover:bg-surface"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-[#faf9f5] border border-black/20" />
                      <span>Ivory Light</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-foreground font-medium">Primary Accent Color</label>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-9 h-9 rounded-xl cursor-pointer bg-transparent border-0 shrink-0"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-24 bg-surface-subtle border border-border rounded-xl px-2.5 py-2 font-mono uppercase focus:outline-none focus:border-terracotta text-xs"
                    />
                    <div className="flex items-center gap-1 overflow-x-auto py-1">
                      {PRESET_ACCENTS.slice(0, 5).map((item) => (
                        <button
                          key={item.color}
                          type="button"
                          onClick={() => setAccentColor(item.color)}
                          className="w-5 h-5 rounded-full border border-border shrink-0 hover:scale-110 transition-transform"
                          style={{ backgroundColor: item.color }}
                          title={item.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VISUAL TOKEN STUDIO */}
          {activeTab === "studio" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-foreground font-medium">Design System Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Studio, Nordic Minimal, Vault SaaS..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface-subtle border border-border rounded-xl px-3.5 py-2 text-foreground focus:outline-none focus:border-terracotta text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-foreground font-medium">Category / Domain</label>
                  <input
                    type="text"
                    placeholder="e.g. Fintech & Crypto, Editorial & Media, SaaS..."
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-surface-subtle border border-border rounded-xl px-3.5 py-2 text-foreground focus:outline-none focus:border-terracotta text-xs"
                  />
                </div>
              </div>

              {/* Atmosphere & Colors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-foreground font-medium">Canvas Background</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setBgDark(true)}
                      className={`py-2 px-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${
                        bgDark
                          ? "bg-terracotta/10 border-terracotta text-terracotta font-medium shadow-xs"
                          : "bg-surface-subtle border-border text-foreground-muted hover:bg-surface"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-[#121110] border border-white/20" />
                      <span>Warm Dark Canvas</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBgDark(false)}
                      className={`py-2 px-3 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${
                        !bgDark
                          ? "bg-terracotta/10 border-terracotta text-terracotta font-medium shadow-xs"
                          : "bg-surface-subtle border-border text-foreground-muted hover:bg-surface"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-[#faf9f5] border border-black/20" />
                      <span>Ivory Light Canvas</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-foreground font-medium">Primary Accent Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-24 bg-surface-subtle border border-border rounded-xl px-2.5 py-1.5 font-mono uppercase focus:outline-none focus:border-terracotta text-xs"
                    />
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {PRESET_ACCENTS.map((item) => (
                        <button
                          key={item.color}
                          type="button"
                          onClick={() => setAccentColor(item.color)}
                          className="w-5 h-5 rounded-full border border-border shrink-0 hover:scale-110 transition-transform"
                          style={{ backgroundColor: item.color }}
                          title={item.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography Selection */}
              <div className="space-y-2">
                <label className="block text-foreground font-medium flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-terracotta" />
                  <span>Display & Headline Typography</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {DISPLAY_FONTS.map((font) => (
                    <button
                      key={font.name}
                      type="button"
                      onClick={() => setDisplayFont(font.name)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        displayFont === font.name
                          ? "bg-terracotta/10 border-terracotta text-foreground font-medium shadow-xs"
                          : "bg-surface-subtle border-border text-foreground-muted hover:text-foreground hover:bg-surface"
                      }`}
                    >
                      <div className="text-xs font-semibold text-foreground">{font.name}</div>
                      <div className="text-[10px] text-foreground-muted truncate">{font.category}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Corner Radius */}
              <div className="space-y-2">
                <label className="block text-foreground font-medium flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-terracotta" />
                  <span>Corner Radius Geometry</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {RADII_OPTIONS.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRadius(r.value)}
                      className={`py-2 px-2 rounded-xl border text-center transition-all text-xs ${
                        radius === r.value
                          ? "bg-terracotta/10 border-terracotta text-terracotta font-medium shadow-xs"
                          : "bg-surface-subtle border-border text-foreground-muted hover:text-foreground hover:bg-surface"
                      }`}
                    >
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: IMPORT SPEC & REFERENCE */}
          {activeTab === "import" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Image upload dropzone */}
              <div className="space-y-2">
                <label className="block text-foreground font-medium flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-terracotta" />
                  <span>Extract Brand Palette from Image or Screenshot</span>
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border hover:border-terracotta rounded-2xl p-6 text-center cursor-pointer bg-surface-subtle/40 hover:bg-surface-subtle transition-all space-y-2"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Upload className="w-6 h-6 text-foreground-muted mx-auto" />
                  <div className="text-xs font-medium text-foreground">
                    Drop a brand logo, design screenshot, or moodboard image
                  </div>
                  <p className="text-[11px] text-foreground-muted">
                    Supports PNG, JPG, WebP. Automatically extracts dominant colors and canvas atmosphere.
                  </p>
                  {imagePreview && (
                    <div className="mt-3 flex items-center justify-center gap-3 pt-2">
                      <img
                        src={imagePreview}
                        alt="Reference Preview"
                        className="h-14 rounded-lg border border-border shadow-xs object-cover"
                      />
                      <div className="text-left text-[11px] text-foreground">
                        <span className="font-semibold block text-emerald-600">Palette Extracted</span>
                        <span>Accent: {accentColor}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Paste DESIGN.md or theme.json */}
              <div className="space-y-2 pt-2 border-t border-border">
                <label className="block text-foreground font-medium flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-terracotta" />
                  <span>Paste Existing DESIGN.md or theme.json</span>
                </label>
                <textarea
                  rows={4}
                  value={specInput}
                  onChange={(e) => setSpecInput(e.target.value)}
                  placeholder="Paste tokens.css variables, theme.json, or DESIGN.md markdown table..."
                  className="w-full bg-surface-subtle border border-border rounded-xl p-3 text-foreground font-mono text-xs placeholder:text-foreground-muted/60 focus:outline-none focus:border-terracotta resize-none transition-colors"
                />
                <button
                  type="button"
                  onClick={handleParseSpec}
                  disabled={!specInput.trim()}
                  className="px-3 py-1.5 bg-surface border border-border hover:bg-surface-subtle rounded-lg text-xs font-medium text-foreground disabled:opacity-40"
                >
                  Parse & Auto-Fill Studio Knobs
                </button>
              </div>
            </div>
          )}

          {/* REAL-TIME LIVE PREVIEW CARD */}
          <div className="border border-border rounded-2xl p-4 bg-surface-subtle/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-muted">
                Live Token Specification Preview
              </span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface border border-border text-[10px] text-foreground-muted">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>WCAG: {wcagCanvas.normalText} ({wcagCanvas.ratioStr})</span>
                </div>
              </div>
            </div>

            {/* Rendered live mini-interface */}
            <div
              style={{
                backgroundColor: canvasHex,
                borderRadius: radius,
                borderColor: bgDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
              }}
              className="p-4 border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
            >
              <div className="space-y-1">
                <span
                  style={{
                    backgroundColor: `${accentColor}25`,
                    color: accentColor,
                    borderColor: `${accentColor}40`,
                    borderRadius: "9999px",
                  }}
                  className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border inline-block"
                >
                  {name || "Preview Brand"}
                </span>
                <h3
                  style={{
                    fontFamily: `'${displayFont}', serif`,
                    color: bgDark ? "#f5f3ee" : "#191816",
                  }}
                  className="text-base font-bold tracking-tight"
                >
                  Crafting Digital Elegance
                </h3>
                <p
                  style={{ color: bgDark ? "#9e9a90" : "#68645c" }}
                  className="text-[11px] leading-relaxed max-w-sm"
                >
                  Typography in {displayFont} & {bodyFont}. Engineered with {radius} radius.
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  style={{
                    backgroundColor: accentColor,
                    borderRadius: radius,
                  }}
                  className="px-3.5 py-1.5 text-white font-semibold text-xs shadow-sm hover:opacity-90 transition-opacity"
                >
                  Action Button
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-3.5 border-t border-border flex items-center justify-between bg-surface-subtle/40">
          <div className="text-[11px] text-foreground-muted">
            Creates complete Deck, Landing, Dashboard, and Component tokens.
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-surface transition-colors text-xs"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isGenerating}
              className="px-4 py-2 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-medium shadow-sm transition-all text-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGenerating ? "Synthesizing..." : "Create & Launch System"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

