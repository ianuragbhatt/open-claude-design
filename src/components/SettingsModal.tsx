"use client";

import React, { useState } from "react";
import { X, Key, Shield, Globe, RefreshCw, Check, AlertCircle } from "lucide-react";
import { type ApiSettings, saveSettings } from "@/lib/storage";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ApiSettings;
  onSave: (settings: ApiSettings) => void;
}

export function SettingsModal({
  isOpen,
  onClose,
  settings: initialSettings,
  onSave,
}: SettingsModalProps) {
  const [settings, setSettings] = useState<ApiSettings>(initialSettings);
  const [isFetchingModels, setIsFetchingModels] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [customModelInput, setCustomModelInput] = useState("");

  if (!isOpen) return null;

  const handleFetchModels = async () => {
    setIsFetchingModels(true);
    setFetchError(null);

    try {
      const res = await fetch("/api/models", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          baseUrl: settings.baseUrl,
          apiKey: settings.apiKey,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch models list");
      }

      if (Array.isArray(data.models) && data.models.length > 0) {
        const updatedModels = Array.from(new Set([...data.models, ...settings.availableModels]));
        const updated = {
          ...settings,
          availableModels: updatedModels,
          selectedModel: data.models.includes(settings.selectedModel)
            ? settings.selectedModel
            : data.models[0],
        };
        setSettings(updated);
      } else {
        throw new Error("No models returned by this endpoint.");
      }
    } catch (err: any) {
      setFetchError(err?.message || "Could not reach the Base URL models endpoint.");
    } finally {
      setIsFetchingModels(false);
    }
  };

  const handleAddCustomModel = () => {
    if (!customModelInput.trim()) return;
    const model = customModelInput.trim();
    if (!settings.availableModels.includes(model)) {
      setSettings({
        ...settings,
        availableModels: [model, ...settings.availableModels],
        selectedModel: model,
      });
    } else {
      setSettings({
        ...settings,
        selectedModel: model,
      });
    }
    setCustomModelInput("");
  };

  const handleSave = () => {
    saveSettings(settings);
    onSave(settings);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-[#16171a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-semibold text-white">AI Endpoint & Model Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs">
          {/* Base URL */}
          <div>
            <label className="block text-neutral-300 font-medium mb-1">
              Base URL <span className="text-neutral-500 font-normal">(OpenAI-Compatible API)</span>
            </label>
            <input
              type="text"
              value={settings.baseUrl}
              onChange={(e) => setSettings({ ...settings, baseUrl: e.target.value })}
              placeholder="https://api.openai.com/v1"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-mono"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Supports OpenRouter, LiteLLM, vLLM, Ollama (<code className="text-neutral-400">http://localhost:11434/v1</code>), or any custom endpoint.
            </p>
          </div>

          {/* API Key */}
          <div>
            <label className="block text-neutral-300 font-medium mb-1">
              API Key <span className="text-neutral-500 font-normal">(Optional for local Ollama)</span>
            </label>
            <input
              type="password"
              value={settings.apiKey}
              onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
              placeholder="sk-..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-mono"
            />
            <p className="text-[11px] text-neutral-500 mt-1">
              Leave blank if configured on your server or if using unauthenticated local models.
            </p>
          </div>

          {/* Model Selection & Fetch */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-neutral-300 font-medium">Active Model</label>
              <button
                type="button"
                onClick={handleFetchModels}
                disabled={isFetchingModels || !settings.baseUrl}
                className="flex items-center gap-1.5 text-[11px] text-amber-400 hover:text-amber-300 disabled:opacity-50 transition-colors font-medium"
              >
                <RefreshCw className={`w-3 h-3 ${isFetchingModels ? "animate-spin" : ""}`} />
                <span>{isFetchingModels ? "Fetching models..." : "Fetch models from API"}</span>
              </button>
            </div>

            {fetchError && (
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{fetchError}</span>
              </div>
            )}

            {/* Model Dropdown */}
            <select
              value={settings.selectedModel}
              onChange={(e) => setSettings({ ...settings, selectedModel: e.target.value })}
              className="w-full bg-[#1e2025] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
            >
              {settings.availableModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>

            {/* Add custom model name */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={customModelInput}
                onChange={(e) => setCustomModelInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCustomModel()}
                placeholder="Or type custom model name (e.g. claude-3-7-sonnet)"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-mono text-[11px]"
              />
              <button
                type="button"
                onClick={handleAddCustomModel}
                disabled={!customModelInput.trim()}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-40 text-neutral-300 hover:text-white font-medium text-[11px] transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-start gap-2 text-[11px] text-neutral-400">
            <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Your API key and Base URL are stored in your local browser and called directly via your Next.js backend without 3rd-party telemetry.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t border-white/10 bg-white/5 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-amber-500/20"
          >
            {showSavedToast ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{showSavedToast ? "Saved!" : "Save Settings"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
