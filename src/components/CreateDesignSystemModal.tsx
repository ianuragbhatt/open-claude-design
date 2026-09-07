"use client";

import React, { useState } from "react";
import { X, Sparkles, Palette, Check } from "lucide-react";
import { saveCustomDesignSystem, type DesignSystem } from "@/lib/design-systems";

interface CreateDesignSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (system: DesignSystem) => void;
}

const PRESET_COLORS = [
  "#5e6ad2", // Indigo (Linear)
  "#635bff", // Blurple (Stripe)
  "#0071e3", // Apple Blue
  "#d97706", // Terracotta Amber (Claude)
  "#e05a47", // Coral Desert (DCT)
  "#e11d48", // Crimson (Modernist)
  "#10b981", // Emerald Oasis
  "#8b5cf6", // Violet
  "#ec4899", // Pink
  "#f59e0b", // Warm Gold
  "#000000", // Obsidian
];

export function CreateDesignSystemModal({
  isOpen,
  onClose,
  onCreated,
}: CreateDesignSystemModalProps) {
  const [name, setName] = useState("");
  const [badge, setBadge] = useState("Custom");
  const [description, setDescription] = useState("");
  const [accentColor, setAccentColor] = useState("#635bff");
  const [bgDark, setBgDark] = useState(true);
  const [promptGuidance, setPromptGuidance] = useState(
`DESIGN SYSTEM RULES:
- Atmosphere: Dark/clean canvas with high visual hierarchy
- Palette: Primary text in clean white, muted secondary text, signature accent color
- Typography: Crisp modern sans-serif with balanced tracking
- Cards & Borders: Subtle 1px borders, rounded-xl corners, ambient shadows
- Interactive: Clean hover states, prominent primary call-to-action button`.trim()
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const id = "custom_" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "_" + Math.random().toString(36).slice(2, 6);
    
    const swatchColors = bgDark
      ? ["#141416", "#202024", accentColor, "#ffffff"]
      : ["#ffffff", "#f4f4f6", accentColor, "#18181b"];

    const newSystem: DesignSystem = {
      id,
      name: name.trim(),
      badge: badge.trim() || "Custom",
      description: description.trim() || "Custom user-defined design system",
      accentColor,
      bgDark,
      swatchColors,
      owner: "You",
      updatedAt: Date.now(),
      isCustom: true,
      published: true,
      promptGuidance: promptGuidance.trim(),
    };

    saveCustomDesignSystem(newSystem);
    onCreated(newSystem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="bg-[#18191c] border border-white/10 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Create Design System</h2>
              <p className="text-xs text-neutral-400">
                Define visual styles, color palettes, and prompt guidelines
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          {/* System Name & Badge */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-1.5">
              <label className="block text-neutral-300 font-medium">Design System Name</label>
              <input
                type="text"
                placeholder="e.g. Worldlabs Design System"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#121315] border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-neutral-300 font-medium">Badge / Tag</label>
              <input
                type="text"
                placeholder="e.g. Dark Minimal"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full bg-[#121315] border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-neutral-300 font-medium">Short Description</label>
            <input
              type="text"
              placeholder="e.g. Spatial depth, luminous glass, modern neon accents"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#121315] border border-white/10 rounded-lg px-3 py-2 text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Accent Color & Dark Mode */}
          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="space-y-2">
              <label className="block text-neutral-300 font-medium">Primary Accent Color</label>
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
                  className="w-24 bg-[#121315] border border-white/10 rounded-lg px-2.5 py-1.5 text-white font-mono uppercase focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setAccentColor(c)}
                    className="w-5 h-5 rounded-full border border-white/20 transition-transform hover:scale-110 flex items-center justify-center"
                    style={{ backgroundColor: c }}
                  >
                    {accentColor.toLowerCase() === c.toLowerCase() && (
                      <Check className="w-3 h-3 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-neutral-300 font-medium">Canvas Atmosphere</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setBgDark(true)}
                  className={`flex-1 py-2 px-3 rounded-lg border text-center transition-all ${
                    bgDark
                      ? "bg-white/10 border-white/30 text-white font-medium shadow-sm"
                      : "bg-[#121315] border-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  Dark Mode
                </button>
                <button
                  type="button"
                  onClick={() => setBgDark(false)}
                  className={`flex-1 py-2 px-3 rounded-lg border text-center transition-all ${
                    !bgDark
                      ? "bg-white/10 border-white/30 text-white font-medium shadow-sm"
                      : "bg-[#121315] border-white/5 text-neutral-400 hover:text-white"
                  }`}
                >
                  Light Mode
                </button>
              </div>
            </div>
          </div>

          {/* AI Prompt Guidelines (DESIGN.md) */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-neutral-300 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Prompt Instructions & Design Rules
            </label>
            <p className="text-[11px] text-neutral-400">
              These instructions will guide the LLM whenever this design system is selected.
            </p>
            <textarea
              rows={5}
              value={promptGuidance}
              onChange={(e) => setPromptGuidance(e.target.value)}
              className="w-full bg-[#121315] border border-white/10 rounded-lg p-3 text-white font-mono text-[11px] leading-relaxed placeholder:text-neutral-500 focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-semibold shadow-sm transition-all"
            >
              Save Design System
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
