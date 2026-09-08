"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
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
  Plus,
  Trash2,
  Search,
  ChevronDown,
  Eye,
  EyeOff,
  Database,
  HardDrive,
  Download,
  Upload,
  RotateCcw,
} from "lucide-react";
import {
  type ApiSettings,
  type ConfiguredModel,
  DEFAULT_CONFIGURED_MODELS,
  getConfiguredModels,
  isFictionalOrLegacyModel,
  saveSettings,
  saveTheme,
  exportBackupData,
  importBackupData,
  calculateStorageUsage,
  createInitialDemoProject,
  saveProjects,
} from "@/lib/storage";
import { formatModelName } from "@/lib/formatters";
import { KhayalLogo } from "@/components/KhayalLogo";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ApiSettings;
  onSave: (settings: ApiSettings) => void;
}

const COMMON_URL_SUGGESTIONS = [
  { label: "Capgemini GenAI", url: "https://openai.generative.engine.capgemini.com/v1", defaultModel: "anthropic.claude-opus-4-8" },
  { label: "Anthropic Claude (Direct)", url: "https://api.anthropic.com/v1", defaultModel: "claude-3-7-sonnet-20250219" },
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
  const [activeTab, setActiveTab] = useState<"models" | "provider" | "data">("models");
  const [settings, setSettings] = useState<ApiSettings>(() => ({
    ...initialSettings,
    configuredModels: getConfiguredModels(initialSettings),
  }));

  const [isFetchingModels, setIsFetchingModels] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetchSuccess, setFetchSuccess] = useState<string | null>(null);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  // Data & Storage backup state
  const [storageStats, setStorageStats] = useState(() => calculateStorageUsage());
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Add Model Dialog state
  const [isAddPickerOpen, setIsAddPickerOpen] = useState(false);
  const [modelSearchQuery, setModelSearchQuery] = useState("");
  const [selectedProviderFilter, setSelectedProviderFilter] = useState<string>("all");
  const [customModelInput, setCustomModelInput] = useState("");
  const configuredModels = getConfiguredModels(settings);

  useEffect(() => {
    if (!isAddPickerOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsAddPickerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAddPickerOpen]);

  const handleExportBackup = () => {
    const json = exportBackupData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const dateStr = new Date().toISOString().slice(0, 10);
    a.download = `khayal-backup-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const res = importBackupData(text);
      if (res.success) {
        setImportStatus({
          success: true,
          message: `Successfully imported ${res.projectCount} project(s)! Reloading workspace...`,
        });
        setStorageStats(calculateStorageUsage());
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        setImportStatus({
          success: false,
          message: res.error || "Failed to import backup file.",
        });
      }
    };
    reader.readAsText(file);
  };

  const handleResetToDemo = () => {
    if (confirm("Reset to factory demo project? This will preserve your settings and model keys.")) {
      const demo = createInitialDemoProject();
      saveProjects([demo]);
      setStorageStats(calculateStorageUsage());
      window.location.reload();
    }
  };

  const handleFetchModels = async () => {
    if (!settings.baseUrl.trim()) {
      setFetchError("Please enter an endpoint URL first.");
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
        const updatedModels = Array.from(
          new Set([...data.models, ...settings.availableModels])
        ).filter((m) => typeof m === "string" && !isFictionalOrLegacyModel(m));
        const nextSettings: ApiSettings = {
          ...settings,
          availableModels: updatedModels,
        };
        setSettings(nextSettings);
        saveSettings(nextSettings);
        setFetchSuccess(`Fetched ${data.models.length} available models!`);
        setTimeout(() => setFetchSuccess(null), 3500);
      } else {
        throw new Error("No models returned by this endpoint.");
      }
    } catch (err: any) {
      setFetchError(err?.message || "Could not reach endpoint. Please check your URL and API Key.");
    } finally {
      setIsFetchingModels(false);
    }
  };

  const handleUpdateModel = (index: number, field: keyof ConfiguredModel, value: string) => {
    const next = [...configuredModels];
    next[index] = { ...next[index], [field]: value };
    setSettings((prev) => ({ ...prev, configuredModels: next }));
  };

  const handleRemoveModel = (index: number) => {
    if (configuredModels.length <= 1) return;
    const modelToRemove = configuredModels[index];
    const next = configuredModels.filter((_, i) => i !== index);

    let nextSelected = settings.selectedModel;
    if (settings.selectedModel === modelToRemove.id) {
      nextSelected = next[0]?.id || "";
    }

    setSettings((prev) => ({
      ...prev,
      configuredModels: next,
      selectedModel: nextSelected,
    }));
  };

  const handleAddModel = (id: string, customName?: string, description?: string) => {
    const cleanId = id.trim();
    if (!cleanId) return;
    if (configuredModels.some((m) => m.id === cleanId)) return;

    const formatted = formatModelName(cleanId);
    const newModel: ConfiguredModel = {
      id: cleanId,
      customName: customName?.trim() || formatted.displayName,
      description:
        description?.trim() ||
        (formatted.provider ? `Powered by ${formatted.provider}` : "General purpose model"),
    };

    setSettings((prev) => ({
      ...prev,
      configuredModels: [...(prev.configuredModels || []), newModel],
      selectedModel: prev.selectedModel || newModel.id,
    }));
  };

  const handleSave = () => {
    const cleaned: ApiSettings = {
      ...settings,
      baseUrl: settings.baseUrl.trim(),
      apiKey: settings.apiKey.trim(),
      selectedModel: settings.selectedModel.trim() || configuredModels[0]?.id || "",
      configuredModels,
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

  // Extract unique providers for quick filter chips in model selector
  const providerOptions = useMemo(() => {
    const providers = new Set<string>();
    (settings.availableModels || []).forEach((m) => {
      if (typeof m === "string" && !isFictionalOrLegacyModel(m)) {
        const info = formatModelName(m);
        if (info.provider && info.provider !== "Auto" && info.provider !== "AI") {
          providers.add(info.provider);
        }
      }
    });
    return Array.from(providers).sort();
  }, [settings.availableModels]);

  // Robust, tokenized model search and filtering
  const filteredAvailableModels = useMemo(() => {
    const query = modelSearchQuery.toLowerCase().trim();
    const tokens = query.split(/\s+/).filter(Boolean);

    return (settings.availableModels || [])
      .filter((m) => typeof m === "string" && !isFictionalOrLegacyModel(m))
      .filter((m) => {
        const info = formatModelName(m);
        if (
          selectedProviderFilter !== "all" &&
          info.provider.toLowerCase() !== selectedProviderFilter.toLowerCase()
        ) {
          return false;
        }
        if (tokens.length === 0) return true;

        const rawLower = m.toLowerCase();
        const normalizedId = rawLower.replace(/[-_.:/]/g, " ");
        const condensedId = rawLower.replace(/[^a-z0-9]/g, "");
        const displayNameLower = info.displayName.toLowerCase();
        const normalizedDisplay = displayNameLower.replace(/[-_.:/]/g, " ");
        const providerLower = (info.provider || "").toLowerCase();

        return tokens.every((tok) => {
          const cleanTok = tok.replace(/[^a-z0-9]/g, "");
          return (
            rawLower.includes(tok) ||
            normalizedId.includes(tok) ||
            displayNameLower.includes(tok) ||
            normalizedDisplay.includes(tok) ||
            providerLower.includes(tok) ||
            (cleanTok.length > 0 && condensedId.includes(cleanTok))
          );
        });
      })
      .sort((a, b) => {
        const aConfigured = configuredModels.some((cm) => cm.id === a);
        const bConfigured = configuredModels.some((cm) => cm.id === b);
        if (aConfigured && !bConfigured) return 1;
        if (!aConfigured && bConfigured) return -1;
        return a.localeCompare(b);
      });
  }, [settings.availableModels, configuredModels, modelSearchQuery, selectedProviderFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150 select-none">
      <div className="w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <KhayalLogo size={32} />
            <div>
              <h2 className="text-sm font-semibold text-foreground">AI Configuration</h2>
              <p className="text-xs text-foreground-muted">Configure models, nicknames & provider connections</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-subtle transition-colors focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Segmented Pill Control */}
        <div className="px-6 pt-4 pb-1">
          <div className="flex bg-surface-subtle p-1 rounded-xl gap-1 w-fit">
            <button
              type="button"
              onClick={() => setActiveTab("models")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 focus:outline-none ${
                activeTab === "models"
                  ? "bg-surface text-foreground shadow-xs font-semibold"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Chat Models</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
                  activeTab === "models"
                    ? "bg-terracotta/15 text-terracotta"
                    : "bg-surface-subtle text-foreground-muted"
                }`}
              >
                {configuredModels.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("provider")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 focus:outline-none ${
                activeTab === "provider"
                  ? "bg-surface text-foreground shadow-xs font-semibold"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Provider & API Key</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("data");
                setStorageStats(calculateStorageUsage());
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 focus:outline-none ${
                activeTab === "data"
                  ? "bg-surface text-foreground shadow-xs font-semibold"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Data & Backup</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs">
          {activeTab === "models" ? (
            <div className="space-y-3.5">
              {/* Section Header & Add Button */}
              <div className="flex items-center justify-between relative">
                <div>
                  <h3 className="font-semibold text-foreground text-xs">Active Models in Chat</h3>
                  <p className="text-[11px] text-foreground-muted mt-0.5">
                    Click the radio to set your default. Edit names and subtitles directly inline.
                  </p>
                </div>

                {/* Add Model Dialog Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    setIsAddPickerOpen(true);
                    setModelSearchQuery("");
                    setSelectedProviderFilter("all");
                  }}
                  className="px-3 py-1.5 rounded-xl bg-terracotta/10 hover:bg-terracotta/20 border border-terracotta/30 text-terracotta font-medium text-xs flex items-center gap-1.5 transition-colors shadow-2xs focus:outline-none cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Model</span>
                </button>
              </div>

              {/* Models List: Clean, High-Density Rows */}
              <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                {configuredModels.map((model, idx) => {
                  const isSelected = settings.selectedModel === model.id;

                  return (
                    <div
                      key={model.id}
                      className={`group px-3 py-2 rounded-xl border transition-all flex items-center gap-3 ${
                        isSelected
                          ? "bg-surface border-terracotta/40 shadow-2xs"
                          : "bg-surface-subtle/50 hover:bg-surface border-transparent hover:border-border"
                      }`}
                    >
                      {/* Radio Default Selector */}
                      <button
                        type="button"
                        onClick={() => setSettings((prev) => ({ ...prev, selectedModel: model.id }))}
                        className="shrink-0 p-1 -m-1 cursor-pointer group/radio focus:outline-none"
                        title={isSelected ? "Default model" : "Click to set as default model"}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-terracotta bg-terracotta text-white shadow-xs shadow-terracotta/30"
                              : "border-border group-hover/radio:border-foreground-muted bg-surface"
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </button>

                      {/* Main Editable Content */}
                      <div className="flex-1 min-w-0">
                        {/* Line 1: Custom Name & Technical ID */}
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={model.customName}
                            onChange={(e) => handleUpdateModel(idx, "customName", e.target.value)}
                            placeholder="Custom Name"
                            className="font-medium text-xs text-foreground bg-transparent hover:bg-surface focus:bg-surface border border-transparent hover:border-border focus:border-terracotta rounded-md px-1.5 py-0.5 -ml-1.5 focus:outline-none transition-colors max-w-[180px]"
                            title="Click to rename model"
                          />
                          <span className="font-mono text-[10px] text-foreground-muted px-2 py-0.5 rounded-md bg-surface-subtle truncate max-w-[220px]">
                            {model.id}
                          </span>
                          {isSelected && (
                            <span className="text-[9px] text-terracotta font-semibold uppercase tracking-wider px-1.5 py-0.2 rounded bg-terracotta/10 border border-terracotta/20">
                              Default
                            </span>
                          )}
                        </div>

                        {/* Line 2: Subtitle / Description */}
                        <div className="mt-0.5">
                          <input
                            type="text"
                            value={model.description || ""}
                            onChange={(e) => handleUpdateModel(idx, "description", e.target.value)}
                            placeholder="Add a subtitle (e.g. For complex tasks)..."
                            className="text-[11px] text-foreground-muted bg-transparent hover:bg-surface focus:bg-surface border border-transparent hover:border-border focus:border-terracotta rounded-md px-1.5 py-0.2 -ml-1.5 focus:outline-none transition-colors w-full"
                            title="Click to edit subtitle"
                          />
                        </div>
                      </div>

                      {/* Delete Action */}
                      {configuredModels.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveModel(idx)}
                          className="opacity-40 group-hover:opacity-100 p-1.5 rounded-lg text-foreground-muted hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0 focus:outline-none"
                          title="Remove from chat picker"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Browse & Search Available Models Button */}
              <button
                type="button"
                onClick={() => {
                  setIsAddPickerOpen(true);
                  setModelSearchQuery("");
                  setSelectedProviderFilter("all");
                }}
                className="w-full py-2.5 rounded-xl border border-dashed border-border hover:border-terracotta/50 bg-surface-subtle/30 hover:bg-surface-subtle text-foreground-muted hover:text-foreground text-xs font-medium flex items-center justify-center gap-2 transition-all mt-1 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-terracotta" />
                <span>Browse & Search All Models ({settings.availableModels?.length || 0} available)</span>
              </button>

              {/* Quick Info */}
              <div className="flex items-center justify-between text-[11px] text-foreground-muted pt-1 px-1">
                <span>
                  Tip: Renaming a model updates it everywhere in chat, headers, and popovers.
                </span>
                <button
                  type="button"
                  onClick={handleFetchModels}
                  disabled={isFetchingModels || !settings.baseUrl}
                  className="text-terracotta hover:underline flex items-center gap-1 focus:outline-none"
                >
                  <RefreshCw className={`w-3 h-3 ${isFetchingModels ? "animate-spin" : ""}`} />
                  <span>{isFetchingModels ? "Refreshing..." : "Refresh Provider Models"}</span>
                </button>
              </div>
            </div>
          ) : activeTab === "provider" ? (
            <div className="space-y-4">
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
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-medium transition-all focus:outline-none ${
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
                    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-medium transition-all focus:outline-none ${
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

              {/* Endpoint URL */}
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
                {/* Presets */}
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
                          selectedModel: item.defaultModel || prev.selectedModel,
                          availableModels: Array.from(new Set([item.defaultModel, ...(prev.availableModels || [])])),
                        }));
                      }}
                      className="px-2 py-0.5 rounded-md bg-surface border border-border hover:border-terracotta/40 text-[10px] text-foreground-muted hover:text-foreground transition-colors focus:outline-none"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* API Key */}
              <div className="space-y-1.5 pt-1">
                <label className="block text-foreground font-medium flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-terracotta" />
                  <span>API Key</span>
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={settings.apiKey}
                    onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                    placeholder="Paste your API key (sk-...)"
                    className="w-full bg-surface-subtle border border-border rounded-xl pl-3.5 pr-10 py-2 text-xs text-foreground placeholder:text-foreground-muted/50 focus:outline-none focus:border-terracotta font-mono transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground focus:outline-none"
                  >
                    {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-[10px] text-foreground-muted">
                  Leave blank if using local Ollama or an unauthenticated proxy.
                </p>
              </div>

              {/* Fetch Models button in provider tab */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleFetchModels}
                  disabled={isFetchingModels || !settings.baseUrl}
                  className="w-full py-2 rounded-xl bg-surface border border-border hover:border-terracotta/40 text-foreground font-medium text-xs transition-colors flex items-center justify-center gap-1.5 focus:outline-none"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isFetchingModels ? "animate-spin text-terracotta" : ""}`} />
                  <span>
                    {isFetchingModels
                      ? "Connecting and fetching models..."
                      : "Fetch Available Models from Endpoint"}
                  </span>
                </button>
              </div>

              {fetchError && (
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] flex items-start gap-2 mt-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{fetchError}</span>
                </div>
              )}

              {fetchSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] flex items-center justify-between gap-2 mt-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>{fetchSuccess}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("models");
                      setIsAddPickerOpen(true);
                      setSelectedProviderFilter("all");
                    }}
                    className="text-xs font-semibold text-terracotta hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Browse Models &rarr;</span>
                  </button>
                </div>
              )}

              {/* Privacy Note */}
              <div className="p-3 bg-surface-subtle border border-border rounded-xl flex items-start gap-2.5 text-[11px] text-foreground-muted leading-relaxed">
                <Shield className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  Your credentials and model configurations are securely saved locally in your browser.
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Storage Quota Meter */}
              <div className="p-4 bg-surface-subtle border border-border rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <HardDrive className="w-4 h-4 text-terracotta" />
                    <span>Browser Storage Usage</span>
                  </div>
                  <span className="font-mono text-[11px] text-foreground-muted">
                    {storageStats.usedKb} used (~5 MB browser quota)
                  </span>
                </div>

                <div className="w-full bg-surface border border-border rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      storageStats.percentEstimate > 80 ? "bg-amber-500" : "bg-terracotta"
                    }`}
                    style={{ width: `${Math.max(3, storageStats.percentEstimate)}%` }}
                  />
                </div>

                <p className="text-[11px] text-foreground-muted leading-relaxed">
                  Your designs, prompts, component iterations, and brand styles are saved directly in your browser&apos;s persistent LocalStorage. Zero external database or tracking is used.
                </p>
              </div>

              {/* Backup & Export */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 bg-surface-subtle border border-border rounded-xl flex flex-col justify-between gap-3">
                  <div>
                    <h4 className="font-medium text-foreground flex items-center gap-2 mb-1">
                      <Download className="w-4 h-4 text-terracotta" />
                      <span>Export All Projects</span>
                    </h4>
                    <p className="text-[11px] text-foreground-muted leading-relaxed">
                      Download all saved designs, iterations, custom styles, and preferences into a portable .khayal.json backup file.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleExportBackup}
                    className="w-full py-2 px-3 rounded-xl bg-surface border border-border hover:border-terracotta/40 text-foreground font-medium text-xs transition-colors flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-terracotta" />
                    <span>Download Backup (.json)</span>
                  </button>
                </div>

                <div className="p-4 bg-surface-subtle border border-border rounded-xl flex flex-col justify-between gap-3">
                  <div>
                    <h4 className="font-medium text-foreground flex items-center gap-2 mb-1">
                      <Upload className="w-4 h-4 text-terracotta" />
                      <span>Import Backup</span>
                    </h4>
                    <p className="text-[11px] text-foreground-muted leading-relaxed">
                      Restore and merge designs from a previously downloaded .khayal.json file into this browser workspace.
                    </p>
                  </div>
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".json,application/json"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2 px-3 rounded-xl bg-surface border border-border hover:border-terracotta/40 text-foreground font-medium text-xs transition-colors flex items-center justify-center gap-2 focus:outline-none cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-terracotta" />
                      <span>Select Backup File...</span>
                    </button>
                  </div>
                </div>
              </div>

              {importStatus && (
                <div
                  className={`p-3 rounded-xl text-[11px] flex items-center gap-2 ${
                    importStatus.success
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-500"
                      : "bg-red-500/10 border border-red-500/20 text-red-400"
                  }`}
                >
                  {importStatus.success ? (
                    <Check className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{importStatus.message}</span>
                </div>
              )}

              {/* Reset to Default */}
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <div>
                  <h4 className="text-foreground font-medium text-xs">Reset Workspace</h4>
                  <p className="text-[11px] text-foreground-muted">Restore the default starter design demo</p>
                </div>
                <button
                  type="button"
                  onClick={handleResetToDemo}
                  className="px-3 py-1.5 rounded-lg border border-border hover:border-red-500/40 text-foreground-muted hover:text-red-400 text-xs transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Restore Demo</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-border bg-surface-subtle/50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-foreground-muted">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {configuredModels.length} model{configuredModels.length === 1 ? "" : "s"} enabled for chat
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-foreground-muted hover:text-foreground hover:bg-surface transition-colors focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-medium text-xs transition-colors flex items-center gap-1.5 shadow-sm focus:outline-none"
            >
              {showSavedToast ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{showSavedToast ? "Saved!" : "Save Settings"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Front-of-Screen AI Model Selector Dialog */}
      {isAddPickerOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-6 animate-in fade-in duration-150 select-none"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsAddPickerOpen(false);
            }
          }}
        >
          <div className="w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh] animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-surface-subtle/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center font-semibold">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Select AI Models for Chat</h3>
                  <p className="text-[11px] text-foreground-muted">
                    Search and choose models to enable in your workspace chat.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddPickerOpen(false)}
                className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-subtle transition-colors focus:outline-none cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Prominent Search Bar & Controls */}
            <div className="p-4 border-b border-border space-y-3 bg-surface">
              {/* Large Search Input */}
              <div className="relative">
                <Search className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search available models (e.g. claude, sonnet 4, gpt-4o, llama, opus)..."
                  value={modelSearchQuery}
                  onChange={(e) => setModelSearchQuery(e.target.value)}
                  className="w-full bg-surface-subtle border border-border focus:border-terracotta rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-foreground-muted/60 focus:outline-none transition-colors"
                  autoFocus
                />
                {modelSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setModelSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground focus:outline-none cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Provider Quick Filters & Refresh Button */}
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                {/* Provider Chips */}
                <div className="flex items-center gap-1.5 flex-wrap overflow-x-auto py-0.5">
                  <button
                    type="button"
                    onClick={() => setSelectedProviderFilter("all")}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                      selectedProviderFilter === "all"
                        ? "bg-terracotta text-white shadow-2xs"
                        : "bg-surface-subtle text-foreground-muted hover:text-foreground hover:bg-surface border border-border"
                    }`}
                  >
                    All ({settings.availableModels.length})
                  </button>
                  {providerOptions.map((provider) => {
                    const isSelected = selectedProviderFilter.toLowerCase() === provider.toLowerCase();
                    return (
                      <button
                        key={provider}
                        type="button"
                        onClick={() => setSelectedProviderFilter(isSelected ? "all" : provider)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                          isSelected
                            ? "bg-terracotta text-white shadow-2xs"
                            : "bg-surface-subtle text-foreground-muted hover:text-foreground hover:bg-surface border border-border"
                        }`}
                      >
                        {provider}
                      </button>
                    );
                  })}
                </div>

                {/* Fetch from Endpoint Button */}
                <button
                  type="button"
                  onClick={handleFetchModels}
                  disabled={isFetchingModels || !settings.baseUrl}
                  className="px-2.5 py-1 rounded-lg bg-surface hover:bg-surface-subtle border border-border text-foreground-muted hover:text-foreground text-[11px] font-medium flex items-center gap-1.5 transition-colors shrink-0 ml-auto focus:outline-none cursor-pointer"
                  title="Fetch latest available models directly from your provider endpoint"
                >
                  <RefreshCw className={`w-3 h-3 text-terracotta ${isFetchingModels ? "animate-spin" : ""}`} />
                  <span>{isFetchingModels ? "Fetching..." : "Refresh Endpoint"}</span>
                </button>
              </div>

              {/* Status / Feedback messages */}
              {fetchSuccess && (
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>{fetchSuccess}</span>
                </div>
              )}
              {fetchError && (
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{fetchError}</span>
                </div>
              )}
            </div>

            {/* Models Scrollable List */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-1.5 min-h-[240px] max-h-[440px]">
              {filteredAvailableModels.length > 0 ? (
                filteredAvailableModels.map((modelId) => {
                  const info = formatModelName(modelId);
                  const isAdded = configuredModels.some((cm) => cm.id === modelId);

                  return (
                    <div
                      key={modelId}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        isAdded
                          ? "bg-surface-subtle/40 border-border/60"
                          : "bg-surface hover:bg-surface-subtle/80 border-border hover:border-terracotta/40"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-xs text-foreground">
                            {info.displayName}
                          </span>
                          {info.provider && info.provider !== "AI" && (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-surface-subtle text-foreground-muted border border-border">
                              {info.provider}
                            </span>
                          )}
                          {info.badge && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-terracotta/10 text-terracotta border border-terracotta/20">
                              {info.badge}
                            </span>
                          )}
                          {info.isThinking && (
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              Reasoning
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-foreground-muted font-mono mt-0.5 truncate" title={modelId}>
                          {modelId}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="shrink-0">
                        {isAdded ? (
                          <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium text-xs flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAddModel(modelId)}
                            className="px-3 py-1.5 rounded-lg bg-terracotta hover:bg-terracotta-hover text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer focus:outline-none"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center space-y-2">
                  <p className="text-xs font-medium text-foreground">
                    {modelSearchQuery
                      ? `No models found matching "${modelSearchQuery}"`
                      : "No models detected"}
                  </p>
                  <p className="text-[11px] text-foreground-muted max-w-sm mx-auto">
                    {modelSearchQuery
                      ? "Try a different search term, or enter the exact model ID below to add it directly."
                      : "Click 'Refresh Endpoint' to fetch models from your provider URL, or enter a model ID below."}
                  </p>
                  {modelSearchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        handleAddModel(modelSearchQuery.trim());
                        setModelSearchQuery("");
                      }}
                      className="px-3 py-1.5 rounded-lg bg-terracotta/10 hover:bg-terracotta/20 border border-terracotta/30 text-terracotta text-xs font-medium inline-flex items-center gap-1.5 transition-colors mt-2 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add &ldquo;{modelSearchQuery}&rdquo; as Model ID</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer / Custom Model Entry */}
            <div className="px-4 py-3 border-t border-border bg-surface-subtle/40 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                <input
                  type="text"
                  placeholder="Or enter custom ID (e.g. o3-mini, qwen-2.5-coder)..."
                  value={customModelInput}
                  onChange={(e) => setCustomModelInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && customModelInput.trim()) {
                      e.preventDefault();
                      handleAddModel(customModelInput.trim());
                      setCustomModelInput("");
                    }
                  }}
                  className="flex-1 bg-surface border border-border focus:border-terracotta rounded-xl px-3 py-1.5 text-xs text-foreground placeholder:text-foreground-muted/50 font-mono focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customModelInput.trim()) {
                      handleAddModel(customModelInput.trim());
                      setCustomModelInput("");
                    }
                  }}
                  disabled={!customModelInput.trim()}
                  className="px-3 py-1.5 rounded-xl bg-terracotta hover:bg-terracotta-hover disabled:opacity-40 text-white text-xs font-medium transition-colors shrink-0 focus:outline-none cursor-pointer"
                >
                  Add ID
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsAddPickerOpen(false)}
                className="px-4 py-1.5 rounded-xl bg-surface hover:bg-surface-subtle border border-border text-foreground font-medium text-xs transition-colors focus:outline-none cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
