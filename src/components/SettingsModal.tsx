"use client";

import React, { useState } from "react";
import {
  X,
  Shield,
  RefreshCw,
  Check,
  AlertCircle,
  Sun,
  Moon,
  Sparkles,
  Globe,
  Key,
  Cpu,
} from "lucide-react";
import { type ApiSettings, saveSettings, saveTheme } from "@/lib/storage";
import { formatModelName } from "@/lib/formatters";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ApiSettings;
  onSave: (settings: ApiSettings) => void;
}

const COMMON_URL_SUGGESTIONS = [
  { label: "OpenRouter", url: "https://openrouter.ai/api/v1", defaultModel: "anthropic/claude-3.7-sonnet" },
  { label: "OpenAI", url: "https://api.openai.com/v1", defaultModel: "gpt-4o" },
  { label: "Local Ollama", url: "http://localhost:11434/v1", defaultModel: "llama3.3" },
];

export function SettingsModal({
  isOpen,
  onClose,
  settings: initialSettings,
  onSave,
}: SettingsModalProps) {
  const [settings, setSettings] = useState<ApiSettings>(initialSettings);
  const [isFetchingModels, setIsFetchingModels] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetchSuccess, setFetchSuccess] = useState<string | null>(null);
  const [showSavedToast, setShowSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleFetchModels = async () => {
    if (!settings.baseUrl.trim()) {
      setFetchError("Please enter a URL first.");
      return;
    }
    setIsFetchingModels(true);
    setFetchError(null);
    setFetchSuccess(null);

    try {
      const res = await fetch("/api/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl: settings.baseUrl.trim(),
          apiKey: settings.apiKey.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to fetch models from this URL.");
      }

      if (Array.isArray(data.models) && data.models.length > 0) {
        const updatedModels = Array.from(new Set([...data.models, ...settings.availableModels]));
        setSettings((prev) => ({
          ...prev,
          availableModels: updatedModels,
          selectedModel: data.models.includes(prev.selectedModel) ? prev.selectedModel : data.models[0],
        }));
        setFetchSuccess(`Found ${data.models.length} models!`);
        setTimeout(() => setFetchSuccess(null), 3000);
      } else {
        throw new Error("No models returned by this endpoint.");
      }
    } catch (err: any) {
      setFetchError(err?.message || "Could not reach endpoint. Please check your URL and API Key.");
    } finally {
      setIsFetchingModels(false);
    }
  };

  const handleSave = () => {
    const cleaned: ApiSettings = {
      ...settings,
      baseUrl: settings.baseUrl.trim(),
      apiKey: settings.apiKey.trim(),
      selectedModel: settings.selectedModel.trim(),
    };
    saveSettings(cleaned);
    if (cleaned.theme) {
      saveTheme(cleaned.theme);
    }
    onSave(cleaned);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">AI Configuration</h2>
              <p className="text-xs text-foreground-muted">Set your AI endpoint URL, API Key, and Model</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-subtle transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs overflow-y-auto flex-1">
          {/* Appearance Toggle */}
          <div className="space-y-1.5">
            <label className="block text-foreground font-medium">Appearance</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSettings({ ...settings, theme: "dark" });
                  saveTheme("dark");
                }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                  settings.theme === "dark"
                    ? "bg-terracotta/10 border-terracotta text-terracotta shadow-2xs"
                    : "bg-surface-subtle border-border text-foreground-muted hover:text-foreground hover:bg-surface"
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Anthropic Warm Dark</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSettings({ ...settings, theme: "light" });
                  saveTheme("light");
                }}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                  settings.theme === "light"
                    ? "bg-terracotta/10 border-terracotta text-terracotta shadow-2xs"
                    : "bg-surface-subtle border-border text-foreground-muted hover:text-foreground hover:bg-surface"
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Anthropic Ivory Light</span>
              </button>
            </div>
          </div>

          {/* 1. URL Input */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-foreground font-medium flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-terracotta" />
              <span>Endpoint URL</span>
            </label>
            <input
              type="text"
              value={settings.baseUrl}
              onChange={(e) => setSettings({ ...settings, baseUrl: e.target.value })}
              placeholder="https://openrouter.ai/api/v1"
              className="w-full bg-surface-subtle border border-border rounded-xl px-3.5 py-2 text-xs text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:border-terracotta font-mono transition-colors"
            />
            {/* Quick URL fill suggestions */}
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className="text-[10px] text-foreground-muted">Presets:</span>
              {COMMON_URL_SUGGESTIONS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    setSettings((prev) => ({
                      ...prev,
                      baseUrl: item.url,
                      selectedModel: prev.selectedModel || item.defaultModel,
                    }));
                  }}
                  className="px-2 py-0.5 rounded-md bg-surface border border-border hover:border-terracotta/40 text-[10px] text-foreground-muted hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. API Key Input */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-foreground font-medium flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-terracotta" />
              <span>API Key</span>
            </label>
            <input
              type="password"
              value={settings.apiKey}
              onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
              placeholder="Paste your API key (sk-...)"
              className="w-full bg-surface-subtle border border-border rounded-xl px-3.5 py-2 text-xs text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:border-terracotta font-mono transition-colors"
            />
            <p className="text-[10px] text-foreground-muted">
              Leave blank if using local Ollama or an unauthenticated proxy.
            </p>
          </div>

          {/* 3. Model Name Input */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-foreground font-medium flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-terracotta" />
                <span>Model Name</span>
              </label>
              <button
                type="button"
                onClick={handleFetchModels}
                disabled={isFetchingModels || !settings.baseUrl}
                className="flex items-center gap-1 text-[11px] text-terracotta hover:text-terracotta-hover disabled:opacity-50 transition-colors font-medium"
              >
                <RefreshCw className={`w-3 h-3 ${isFetchingModels ? "animate-spin" : ""}`} />
                <span>{isFetchingModels ? "Checking..." : "Fetch Models"}</span>
              </button>
            </div>

            {/* Direct Model Name input */}
            <input
              type="text"
              value={settings.selectedModel}
              onChange={(e) => setSettings({ ...settings, selectedModel: e.target.value })}
              placeholder="e.g. anthropic/claude-3.7-sonnet or gpt-4o"
              className="w-full bg-surface-subtle border border-border rounded-xl px-3.5 py-2 text-xs text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:border-terracotta font-mono transition-colors"
            />

            {/* Quick dropdown if available models exist */}
            {settings.availableModels.length > 0 && (
              <div className="pt-1">
                <select
                  value={settings.selectedModel}
                  onChange={(e) => setSettings({ ...settings, selectedModel: e.target.value })}
                  className="w-full bg-surface-subtle border border-border rounded-xl px-3 py-1.5 text-[11px] text-foreground focus:outline-none focus:border-terracotta transition-colors"
                >
                  <option value="" disabled>
                    Or pick from available models:
                  </option>
                  {settings.availableModels.map((m) => {
                    const info = formatModelName(m);
                    return (
                      <option key={m} value={m} className="bg-surface text-foreground">
                        {info.displayName} ({m})
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            {fetchError && (
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] flex items-start gap-2 mt-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{fetchError}</span>
              </div>
            )}

            {fetchSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px] flex items-center gap-2 mt-2">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span>{fetchSuccess}</span>
              </div>
            )}
          </div>

          {/* Privacy Note */}
          <div className="p-3 bg-surface-subtle border border-border rounded-xl flex items-start gap-2.5 text-[11px] text-foreground-muted leading-relaxed">
            <Shield className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            <span>
              Your credentials are saved locally in your browser and used directly for design generation.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-border bg-surface-subtle/50 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl text-xs font-medium text-foreground-muted hover:text-foreground hover:bg-surface transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-medium text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            {showSavedToast ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{showSavedToast ? "Saved!" : "Save Settings"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
