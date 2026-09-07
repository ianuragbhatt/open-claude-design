"use client";

import React, { useState } from "react";
import { X, Sparkles, Palette, Check, Type, Layers } from "lucide-react";
import { saveCustomDesignSystem, type DesignSystem } from "@/lib/design-systems";
import { synthesizeDesignPrompt } from "@/lib/formatters";

interface CreateDesignSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (system: DesignSystem) => void;
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
  { color: "#d97706", name: "Warm Amber" },
  { color: "#18181b", name: "Obsidian" },
];

const VIBE_OPTIONS = [
  { id: "minimal", label: "Clean & Minimalist", badge: "Minimal" },
  { id: "editorial", label: "Warm Editorial", badge: "Editorial" },
  { id: "saas", label: "Modern SaaS", badge: "Modern" },
  { id: "luxury", label: "Luxury Dark", badge: "Prestige" },
  { id: "bold", label: "Bold & High-Energy", badge: "Bold" },
  { id: "swiss", label: "Swiss High-Contrast", badge: "Monochrome" },
];

const TYPOGRAPHY_OPTIONS = [
  { id: "serif-sans", label: "Editorial Serif + Crisp Sans", sample: "Newsreader / Inter" },
  { id: "geo-sans", label: "Modern Geometric Sans", sample: "Plus Jakarta / Helvetica" },
  { id: "apple-human", label: "Refined Human Interface", sample: "SF Pro / Clean Sans" },
  { id: "mono-sans", label: "Technical Monospace + Sans", sample: "JetBrains / Geist" },
];

export function CreateDesignSystemModal({
  isOpen,
  onClose,
  onCreated,
}: CreateDesignSystemModalProps) {
  const [name, setName] = useState("");
  const [selectedVibe, setSelectedVibe] = useState(VIBE_OPTIONS[0]);
  const [selectedTypo, setSelectedTypo] = useState(TYPOGRAPHY_OPTIONS[0]);
  const [accentColor, setAccentColor] = useState("#d97757");
  const [secondaryColor, setSecondaryColor] = useState("#282724");
  const [bgDark, setBgDark] = useState(true);
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const id =
      "custom_" +
      name.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
      "_" +
      Math.random().toString(36).slice(2, 6);

    const swatchColors = bgDark
      ? ["#191816", secondaryColor || "#282724", accentColor, "#FAF9F5"]
      : ["#FAF9F5", secondaryColor || "#F3F1EC", accentColor, "#191816"];

    const promptGuidance = synthesizeDesignPrompt({
      name: name.trim(),
      mood: selectedVibe.label,
      typography: selectedTypo.label,
      accentColor,
      secondaryColor,
      bgDark,
      notes: notes.trim(),
    });

    const newSystem: DesignSystem = {
      id,
      name: name.trim(),
      badge: selectedVibe.badge,
      description: `${selectedVibe.label} aesthetic with ${selectedTypo.sample} typography.`,
      accentColor,
      bgDark,
      swatchColors,
      owner: "You",
      updatedAt: Date.now(),
      isCustom: true,
      published: true,
      promptGuidance,
    };

    saveCustomDesignSystem(newSystem);
    onCreated(newSystem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta shadow-xs">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Create Brand Style</h2>
              <p className="text-xs text-foreground-muted">
                Define visual aesthetics, colors, and typography for your designs
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
          {/* Style Name */}
          <div className="space-y-1.5">
            <label className="block text-foreground font-medium">Style Name</label>
            <input
              type="text"
              placeholder="e.g. Studio Nordic, Acme Brand, Velvet Dark..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              className="w-full bg-surface-subtle border border-border rounded-xl px-3.5 py-2 text-foreground placeholder:text-foreground-muted/60 focus:outline-none focus:border-terracotta text-xs transition-colors"
            />
          </div>

          {/* Atmosphere / Canvas Theme */}
          <div className="space-y-2">
            <label className="block text-foreground font-medium">Canvas Atmosphere</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setBgDark(true)}
                className={`py-2 px-3 rounded-xl border text-center transition-all text-xs font-medium flex items-center justify-center gap-2 ${
                  bgDark
                    ? "bg-terracotta/10 border-terracotta text-terracotta shadow-xs"
                    : "bg-surface-subtle border-border text-foreground-muted hover:text-foreground hover:bg-surface"
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-[#191816] border border-white/20" />
                <span>Warm Dark Canvas</span>
              </button>
              <button
                type="button"
                onClick={() => setBgDark(false)}
                className={`py-2 px-3 rounded-xl border text-center transition-all text-xs font-medium flex items-center justify-center gap-2 ${
                  !bgDark
                    ? "bg-terracotta/10 border-terracotta text-terracotta shadow-xs"
                    : "bg-surface-subtle border-border text-foreground-muted hover:text-foreground hover:bg-surface"
                }`}
              >
                <span className="w-3 h-3 rounded-full bg-[#FAF9F5] border border-black/20" />
                <span>Ivory Light Canvas</span>
              </button>
            </div>
          </div>

          {/* Vibe / Aesthetic Chips */}
          <div className="space-y-2">
            <label className="block text-foreground font-medium">Visual Mood & Vibe</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {VIBE_OPTIONS.map((v) => {
                const isSelected = selectedVibe.id === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVibe(v)}
                    className={`py-2 px-2.5 rounded-xl border text-left transition-all text-xs flex items-center justify-between ${
                      isSelected
                        ? "bg-terracotta/10 border-terracotta text-terracotta font-medium shadow-2xs"
                        : "bg-surface-subtle border-border text-foreground-muted hover:text-foreground hover:bg-surface"
                    }`}
                  >
                    <span>{v.label}</span>
                    {isSelected && <Check className="w-3 h-3 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Typography Pairing */}
          <div className="space-y-2">
            <label className="block text-foreground font-medium flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-terracotta" />
              Typography Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TYPOGRAPHY_OPTIONS.map((t) => {
                const isSelected = selectedTypo.id === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTypo(t)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "bg-terracotta/10 border-terracotta text-foreground font-medium shadow-2xs"
                        : "bg-surface-subtle border-border text-foreground-muted hover:text-foreground hover:bg-surface"
                    }`}
                  >
                    <div className="text-xs font-medium text-foreground">{t.label}</div>
                    <div className="text-[10px] text-foreground-muted mt-0.5">{t.sample}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Palette */}
          <div className="space-y-2.5 pt-1">
            <label className="block text-foreground font-medium">Primary Accent Color</label>
            <div className="flex items-center gap-3">
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
                  className="w-24 bg-surface-subtle border border-border rounded-xl px-2.5 py-1.5 text-foreground font-mono uppercase focus:outline-none focus:border-terracotta text-xs"
                />
              </div>

              {/* Swatch Quick Selectors */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {PRESET_ACCENTS.map((item) => (
                  <button
                    key={item.color}
                    type="button"
                    onClick={() => setAccentColor(item.color)}
                    className="w-5 h-5 rounded-full border border-border/80 transition-transform hover:scale-110 flex items-center justify-center shadow-xs"
                    style={{ backgroundColor: item.color }}
                    title={item.name}
                  >
                    {accentColor.toLowerCase() === item.color.toLowerCase() && (
                      <Check className="w-3 h-3 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Designer Notes in Plain English */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-foreground font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              Special Design Preferences (Optional)
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Spacious card padding, rounded pills, high-contrast buttons, soft ambient shadows..."
              className="w-full bg-surface-subtle border border-border rounded-xl p-3 text-foreground text-xs leading-relaxed placeholder:text-foreground-muted/60 focus:outline-none focus:border-terracotta resize-none transition-colors"
            />
          </div>

          {/* Visual Preview Box */}
          <div className="p-3 bg-surface-subtle rounded-xl border border-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
                style={{ backgroundColor: accentColor }}
              >
                <Layers className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-medium text-foreground text-xs">
                  {name || "Untitled Style"}
                </div>
                <div className="text-[10px] text-foreground-muted">
                  {selectedVibe.badge} &bull; {selectedTypo.sample} &bull; {bgDark ? "Dark Canvas" : "Light Canvas"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: accentColor }} />
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: bgDark ? "#191816" : "#FAF9F5" }}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 border-t border-border flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-surface-subtle transition-colors text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-4 py-2 rounded-xl bg-terracotta hover:bg-terracotta-hover disabled:opacity-40 text-white font-medium shadow-sm transition-all text-xs"
            >
              Save Brand Style
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
