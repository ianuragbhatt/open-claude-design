"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Search,
  Plus,
  ArrowUp,
  Check,
  ChevronDown,
  Star,
  List as ListIcon,
  LayoutGrid,
  Trash2,
  Feather,
  Layers,
  FolderKanban,
  Settings,
  Sun,
  Moon,
  Compass,
} from "lucide-react";
import { ModelPickerPopover } from "@/components/ModelPickerPopover";
import { CreateDesignSystemModal } from "@/components/CreateDesignSystemModal";
import {
  getAllDesignSystems,
  deleteCustomDesignSystem,
  type DesignSystem,
} from "@/lib/design-systems";
import type { ApiSettings, Project } from "@/lib/storage";
import { formatModelName } from "@/lib/formatters";

interface HomeViewProps {
  projects: Project[];
  activeProject: Project | null;
  settings: ApiSettings;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
  onUpdateSettings: (newSettings: ApiSettings) => void;
  onOpenSettings: () => void;
  onSelectProject: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  onNewProject: () => void;
  onSubmitPrompt: (prompt: string, brandId: string) => void;
}

const INSPIRATION_IDEAS = [
  {
    label: "✦ Minimalist Portfolio",
    prompt: "Design a clean portfolio website for a visual designer with a featured project grid, about bio, and sleek contact drawer.",
  },
  {
    label: "✦ Mobile Banking App",
    prompt: "Design a mobile banking interface with account balance, card carousel, quick transfers, and recent activity breakdown.",
  },
  {
    label: "✦ Modern SaaS Dashboard",
    prompt: "Design a modern SaaS analytics dashboard with revenue charts, active team members, and real-time conversion metrics.",
  },
  {
    label: "✦ Editorial Magazine",
    prompt: "Design a literary editorial homepage with warm serif typography, featured longform story, and newsletter subscription.",
  },
  {
    label: "✦ E-Commerce Showcase",
    prompt: "Design an elegant luxury e-commerce product page with high-res photo gallery, size selector, and checkout summary.",
  },
];

export function HomeView({
  projects,
  activeProject,
  settings,
  theme = "dark",
  onToggleTheme,
  onUpdateSettings,
  onOpenSettings,
  onSelectProject,
  onDeleteProject,
  onNewProject,
  onSubmitPrompt,
}: HomeViewProps) {
  const [activeTab, setActiveTab] = useState<"projects" | "design-systems">("design-systems");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Hero composer state
  const [prompt, setPrompt] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState<string>(
    activeProject?.brandId || "claude-anthropic"
  );
  const [isDesignSystemMenuOpen, setIsDesignSystemMenuOpen] = useState(false);
  const [isModelPickerOpen, setIsModelPickerOpen] = useState(false);
  const [isRefreshingModels, setIsRefreshingModels] = useState(false);
  const [isCreateSystemOpen, setIsCreateSystemOpen] = useState(false);

  // Design systems list (built-in + custom)
  const [allSystems, setAllSystems] = useState<DesignSystem[]>([]);

  const modelButtonRef = useRef<HTMLButtonElement | null>(null);
  const brandButtonRef = useRef<HTMLButtonElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleRefreshModels = async () => {
    setIsRefreshingModels(true);
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
      if (res.ok && Array.isArray(data.models) && data.models.length > 0) {
        onUpdateSettings({
          ...settings,
          availableModels: Array.from(new Set([...data.models, ...settings.availableModels])),
        });
      }
    } catch {
      // ignore
    } finally {
      setIsRefreshingModels(false);
    }
  };

  const refreshSystems = () => {
    setAllSystems(getAllDesignSystems());
  };

  useEffect(() => {
    refreshSystems();
  }, []);

  const currentBrand =
    allSystems.find((ds) => ds.id === selectedBrandId) || allSystems[0] || {
      id: "claude-anthropic",
      name: "Anthropic Design System",
      accentColor: "#d97757",
      badge: "Official",
    };

  const handleSend = () => {
    if (!prompt.trim()) return;
    onSubmitPrompt(prompt.trim(), selectedBrandId);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Filtered lists
  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSystems = allSystems.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.badge.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatRelativeTime = (timestamp?: number | string) => {
    if (!timestamp || typeof timestamp === "string") return timestamp || "—";
    const diffMs = Date.now() - timestamp;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 30) return `${diffDays} days ago`;
    return new Date(timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  const modelInfo = formatModelName(settings.selectedModel);

  return (
    <div className="min-h-full w-full bg-background text-foreground flex flex-col font-sans overflow-y-auto selection:bg-terracotta/25 selection:text-foreground transition-colors">
      {/* Top Header */}
      <header className="h-12 w-full px-6 flex items-center justify-between z-20 border-b border-border bg-surface/80 backdrop-blur-md shrink-0 select-none">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta shadow-2xs">
            <Sparkles className="w-4 h-4 fill-terracotta/20 text-terracotta" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-editorial text-base tracking-tight text-foreground font-medium">
              Open Claude Design
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-terracotta/10 text-terracotta border border-terracotta/20">
              Studio
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5">
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="w-8 h-8 rounded-lg hover:bg-surface-subtle text-foreground-muted hover:text-foreground flex items-center justify-center transition-colors"
              title={theme === "dark" ? "Switch to Ivory Light mode" : "Switch to Warm Dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-[#e28767]" />
              ) : (
                <Moon className="w-4 h-4 text-foreground" />
              )}
            </button>
          )}

          <button
            onClick={onOpenSettings}
            className="w-8 h-8 rounded-lg hover:bg-surface-subtle text-foreground-muted hover:text-foreground flex items-center justify-center transition-colors"
            title="AI Setup & Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center pt-10 pb-16 px-4 w-full max-w-5xl mx-auto">
        {/* Editorial Headline */}
        <div className="text-center mb-7 select-none">
          <h1 className="font-editorial text-4xl sm:text-5xl font-medium text-foreground tracking-tight mb-2">
            What should we create today?
          </h1>
          <p className="text-sm text-foreground-muted max-w-lg mx-auto leading-relaxed font-sans">
            Describe your interface idea, pick a brand style, and watch your interactive design come alive.
          </p>
        </div>

        {/* Hero Composer Card */}
        <div className="w-full max-w-3xl bg-surface border border-border rounded-2xl p-4 shadow-xl relative group focus-within:border-terracotta transition-all">
          <textarea
            ref={textareaRef}
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Sketch a landing page, mobile app flow, or dashboard..."
            className="w-full bg-transparent text-foreground placeholder:text-foreground-muted/60 text-sm focus:outline-none resize-none leading-relaxed"
          />

          {/* Bottom Bar inside Composer */}
          <div className="flex items-center justify-between pt-3 border-t border-border mt-1">
            {/* Left: Brand Style Selector */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  ref={brandButtonRef}
                  type="button"
                  onClick={() => setIsDesignSystemMenuOpen(!isDesignSystemMenuOpen)}
                  className="bg-surface-subtle hover:bg-surface border border-border rounded-xl px-2.5 py-1.5 flex items-center gap-2 text-left transition-colors"
                >
                  <div
                    className="w-4 h-4 rounded-full ring-1 ring-border shrink-0"
                    style={{ backgroundColor: currentBrand.accentColor }}
                  />
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-foreground-muted flex items-center gap-0.5">
                      Brand Style
                      <ChevronDown className="w-2.5 h-2.5 text-foreground-muted" />
                    </span>
                    <span className="text-xs font-medium text-foreground truncate max-w-[140px]">
                      {currentBrand.name}
                    </span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isDesignSystemMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setIsDesignSystemMenuOpen(false)}
                    />
                    <div className="absolute top-full mt-2 left-0 w-72 bg-surface border border-border rounded-2xl shadow-2xl p-2 z-40 animate-in fade-in zoom-in-95 duration-100">
                      <div className="text-[11px] font-semibold text-foreground-muted px-2.5 py-1.5 flex items-center justify-between border-b border-border mb-1">
                        <span>Select Brand Style</span>
                        <button
                          onClick={() => {
                            setIsDesignSystemMenuOpen(false);
                            setIsCreateSystemOpen(true);
                          }}
                          className="text-[11px] text-terracotta hover:underline font-medium"
                        >
                          + New Style
                        </button>
                      </div>
                      <div className="space-y-1 max-h-64 overflow-y-auto">
                        {allSystems.map((brand) => (
                          <button
                            key={brand.id}
                            type="button"
                            onClick={() => {
                              setSelectedBrandId(brand.id);
                              setIsDesignSystemMenuOpen(false);
                            }}
                            className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center gap-2.5 transition-colors text-xs ${
                              brand.id === selectedBrandId
                                ? "bg-terracotta/15 text-foreground font-medium"
                                : "text-foreground hover:bg-surface-subtle"
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full shrink-0 ring-1 ring-border"
                              style={{ backgroundColor: brand.accentColor }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="truncate font-medium">{brand.name}</div>
                              <div className="text-[10px] text-foreground-muted truncate">
                                {brand.badge}
                              </div>
                            </div>
                            {brand.id === selectedBrandId && (
                              <Check className="w-3.5 h-3.5 text-terracotta shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right: Model Pill & Send Button */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  ref={modelButtonRef}
                  type="button"
                  onClick={() => setIsModelPickerOpen(!isModelPickerOpen)}
                  className="bg-surface-subtle hover:bg-surface border border-border rounded-xl px-2.5 py-1.5 flex items-center gap-2 text-left transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-foreground-muted flex items-center gap-0.5">
                      Model
                      <ChevronDown className="w-2.5 h-2.5 text-foreground-muted" />
                    </span>
                    <span className="text-xs font-medium text-foreground truncate max-w-[130px]">
                      {modelInfo.displayName}
                    </span>
                  </div>
                </button>

                <ModelPickerPopover
                  isOpen={isModelPickerOpen}
                  onClose={() => setIsModelPickerOpen(false)}
                  settings={settings}
                  onSelectModel={(model) => onUpdateSettings({ ...settings, selectedModel: model })}
                  onSelectEffort={(effort) => onUpdateSettings({ ...settings, reasoningEffort: effort })}
                  onOpenSettings={onOpenSettings}
                  onRefreshModels={handleRefreshModels}
                  isRefreshingModels={isRefreshingModels}
                />
              </div>

              {/* Send Button */}
              <button
                type="button"
                onClick={handleSend}
                disabled={!prompt.trim()}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  prompt.trim()
                    ? "bg-terracotta hover:bg-terracotta-400 text-white shadow-md shadow-terracotta/20 active:scale-95"
                    : "bg-surface-subtle text-foreground-muted border border-border cursor-not-allowed"
                }`}
                title="Create design"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Inspiration Chips */}
        <div className="w-full max-w-3xl mt-3 flex items-center gap-1.5 flex-wrap justify-center">
          {INSPIRATION_IDEAS.map((idea) => (
            <button
              key={idea.label}
              type="button"
              onClick={() => {
                setPrompt(idea.prompt);
                textareaRef.current?.focus();
              }}
              className="px-2.5 py-1 rounded-lg bg-surface-subtle hover:bg-surface border border-border text-[11px] text-foreground-muted hover:text-foreground transition-all hover:border-terracotta/40 shadow-2xs"
            >
              {idea.label}
            </button>
          ))}
        </div>

        {/* Lower Section: Tabs & Lists */}
        <section className="w-full mt-12">
          {/* Navigation & Controls Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-border">
            {/* Tabs */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab("design-systems")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "design-systems"
                    ? "bg-surface text-foreground border border-border shadow-sm"
                    : "text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
                }`}
              >
                Brand Styles ({allSystems.length})
              </button>

              <button
                onClick={() => setActiveTab("projects")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "projects"
                    ? "bg-surface text-foreground border border-border shadow-sm"
                    : "text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
                }`}
              >
                Saved Designs ({projects.length})
              </button>
            </div>

            {/* Right Controls: Create Style / New Project, Search, View Toggle */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              {activeTab === "design-systems" ? (
                <button
                  onClick={() => setIsCreateSystemOpen(true)}
                  className="px-3 py-1.5 text-xs font-medium bg-surface hover:bg-surface-subtle text-foreground border border-border rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5 text-terracotta" />
                  <span>Create Brand Style</span>
                </button>
              ) : (
                <button
                  onClick={onNewProject}
                  className="px-3 py-1.5 text-xs font-medium bg-terracotta hover:bg-terracotta-400 text-white rounded-lg flex items-center gap-1.5 transition-colors shadow-sm shadow-terracotta/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Design</span>
                </button>
              )}

              {/* Search Box */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-foreground-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-surface-subtle border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-terracotta w-36 sm:w-44 transition-all"
                />
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-surface-subtle border border-border rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-1 rounded ${
                    viewMode === "table" ? "bg-surface text-foreground shadow-sm" : "text-foreground-muted hover:text-foreground"
                  }`}
                  title="List view"
                >
                  <ListIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1 rounded ${
                    viewMode === "grid" ? "bg-surface text-foreground shadow-sm" : "text-foreground-muted hover:text-foreground"
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* TAB CONTENT: DESIGN SYSTEMS */}
          {activeTab === "design-systems" && (
            <div className="mt-4">
              {viewMode === "table" ? (
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left text-xs text-foreground">
                    <thead>
                      <tr className="text-foreground-muted border-b border-border text-[11px] font-medium">
                        <th className="py-2.5 px-3 font-normal">Style Name & Palette</th>
                        <th className="py-2.5 px-3 font-normal">Aesthetic / Mood</th>
                        <th className="py-2.5 px-3 font-normal">Canvas</th>
                        <th className="py-2.5 px-3 font-normal">Updated</th>
                        <th className="py-2.5 px-3 font-normal text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredSystems.map((system) => {
                        const isSelected = system.id === selectedBrandId;
                        return (
                          <tr
                            key={system.id}
                            onClick={() => setSelectedBrandId(system.id)}
                            className={`group cursor-pointer hover:bg-surface-subtle transition-colors ${
                              isSelected ? "bg-terracotta/10" : ""
                            }`}
                          >
                            {/* Swatch & Name */}
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-3">
                                <div className="w-14 h-8 rounded-md border border-border overflow-hidden flex shadow-2xs shrink-0 bg-surface">
                                  {system.swatchColors && system.swatchColors.length >= 3 ? (
                                    system.swatchColors.map((col, idx) => (
                                      <div
                                        key={idx}
                                        className="flex-1 h-full"
                                        style={{ backgroundColor: col }}
                                      />
                                    ))
                                  ) : (
                                    <div
                                      className="w-full h-full flex items-center justify-center"
                                      style={{ backgroundColor: system.accentColor }}
                                    >
                                      <span className="text-[9px] font-bold text-white uppercase drop-shadow">
                                        {system.name.slice(0, 3)}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-foreground group-hover:text-terracotta transition-colors">
                                      {system.name}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-foreground-muted truncate max-w-md mt-0.5">
                                    {system.description}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Badge */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-subtle text-foreground-muted border border-border">
                                {system.badge}
                              </span>
                            </td>

                            {/* Canvas Mode */}
                            <td className="py-3 px-3 whitespace-nowrap text-foreground-muted text-[11px]">
                              {system.bgDark ? "Dark Canvas" : "Light Canvas"}
                            </td>

                            {/* Updated */}
                            <td className="py-3 px-3 text-foreground-muted text-[11px] whitespace-nowrap">
                              {formatRelativeTime(system.updatedAt)}
                            </td>

                            {/* Actions */}
                            <td className="py-3 px-3 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedBrandId(system.id);
                                    textareaRef.current?.focus();
                                  }}
                                  className={`px-2.5 py-1 rounded text-[11px] border transition-colors ${
                                    isSelected
                                      ? "bg-terracotta text-white border-transparent shadow-xs"
                                      : "bg-surface-subtle hover:bg-surface text-foreground border-border"
                                  }`}
                                >
                                  {isSelected ? "Active" : "Use Style"}
                                </button>
                                {system.isCustom && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteCustomDesignSystem(system.id);
                                      refreshSystems();
                                    }}
                                    className="p-1 hover:text-red-400 text-foreground-muted rounded transition-colors"
                                    title="Delete custom style"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Grid View */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredSystems.map((system) => {
                    const isSelected = system.id === selectedBrandId;
                    return (
                      <div
                        key={system.id}
                        onClick={() => setSelectedBrandId(system.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-surface border-terracotta shadow-md shadow-terracotta/10"
                            : "bg-surface border-border hover:border-terracotta/40 hover:shadow-sm"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="w-16 h-8 rounded-md border border-border overflow-hidden flex shrink-0">
                              {system.swatchColors ? (
                                system.swatchColors.map((col, idx) => (
                                  <div
                                    key={idx}
                                    className="flex-1 h-full"
                                    style={{ backgroundColor: col }}
                                  />
                                ))
                              ) : (
                                <div
                                  className="w-full h-full"
                                  style={{ backgroundColor: system.accentColor }}
                                />
                              )}
                            </div>
                            {isSelected && (
                              <span className="text-[10px] text-terracotta font-medium flex items-center gap-1 bg-terracotta/10 px-2 py-0.5 rounded-full">
                                <Check className="w-3 h-3" /> Active
                              </span>
                            )}
                          </div>
                          <h3 className="font-medium text-foreground text-xs">{system.name}</h3>
                          <p className="text-[11px] text-foreground-muted line-clamp-2 mt-1 leading-relaxed">
                            {system.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-border text-[10px] text-foreground-muted">
                          <span>{system.badge}</span>
                          <span>{system.bgDark ? "Dark" : "Light"}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: PROJECTS */}
          {activeTab === "projects" && (
            <div className="mt-4">
              {filteredProjects.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-border rounded-2xl">
                  <FolderKanban className="w-8 h-8 text-foreground-muted mx-auto mb-2" />
                  <p className="text-xs text-foreground font-medium">No saved designs yet</p>
                  <p className="text-[11px] text-foreground-muted mt-0.5">
                    Start by typing a prompt in the composer above.
                  </p>
                  <button
                    onClick={onNewProject}
                    className="mt-4 px-3 py-1.5 bg-terracotta hover:bg-terracotta-400 text-white font-medium text-xs rounded-lg inline-flex items-center gap-1.5 transition-colors shadow-sm shadow-terracotta/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create First Design</span>
                  </button>
                </div>
              ) : viewMode === "table" ? (
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left text-xs text-foreground">
                    <thead>
                      <tr className="text-foreground-muted border-b border-border text-[11px] font-medium">
                        <th className="py-2.5 px-3 font-normal">Design Name</th>
                        <th className="py-2.5 px-3 font-normal">Brand Style</th>
                        <th className="py-2.5 px-3 font-normal">Iterations</th>
                        <th className="py-2.5 px-3 font-normal">Updated</th>
                        <th className="py-2.5 px-3 font-normal text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredProjects.map((p) => {
                        const brand =
                          allSystems.find((ds) => ds.id === p.brandId) || {
                            name: p.brandId,
                            accentColor: "#d97757",
                          };
                        return (
                          <tr
                            key={p.id}
                            onClick={() => onSelectProject(p.id)}
                            className="group cursor-pointer hover:bg-surface-subtle transition-colors"
                          >
                            {/* Project Name & Preview Icon */}
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-surface-subtle border border-border flex items-center justify-center text-foreground-muted group-hover:text-terracotta group-hover:border-terracotta/40 transition-colors shrink-0">
                                  <Layers className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <span className="font-medium text-foreground group-hover:text-terracotta transition-colors truncate block">
                                    {p.name}
                                  </span>
                                  <span className="text-[10px] text-foreground-muted">
                                    {p.messages.length} revisions
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Design System */}
                            <td className="py-3 px-3">
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-subtle border border-border text-[11px] text-foreground">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: brand.accentColor }}
                                />
                                {brand.name}
                              </span>
                            </td>

                            {/* Version count */}
                            <td className="py-3 px-3 text-foreground-muted text-[11px]">
                              {p.versions.length} {p.versions.length === 1 ? "version" : "versions"}
                            </td>

                            {/* Updated */}
                            <td className="py-3 px-3 text-foreground-muted text-[11px] whitespace-nowrap">
                              {formatRelativeTime(p.updatedAt)}
                            </td>

                            {/* Actions */}
                            <td className="py-3 px-3 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectProject(p.id);
                                  }}
                                  className="px-2.5 py-1 rounded bg-surface-subtle hover:bg-surface text-[11px] text-foreground border border-border hover:border-terracotta/40 transition-colors"
                                >
                                  Open
                                </button>
                                {projects.length > 1 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onDeleteProject(p.id);
                                    }}
                                    className="p-1 text-foreground-muted hover:text-red-400 rounded transition-colors"
                                    title="Delete design"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Grid View */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredProjects.map((p) => {
                    const brand =
                      allSystems.find((ds) => ds.id === p.brandId) || {
                        name: p.brandId,
                        accentColor: "#d97757",
                      };
                    return (
                      <div
                        key={p.id}
                        onClick={() => onSelectProject(p.id)}
                        className="p-4 rounded-xl bg-surface border border-border hover:border-terracotta/40 transition-all cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-md"
                      >
                        <div>
                          <div className="flex items-start justify-between">
                            <div className="w-8 h-8 rounded-lg bg-surface-subtle border border-border flex items-center justify-center text-foreground-muted group-hover:text-terracotta transition-colors">
                              <Layers className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] text-foreground-muted">
                              {formatRelativeTime(p.updatedAt)}
                            </span>
                          </div>
                          <h3 className="font-medium text-foreground text-xs mt-3 group-hover:text-terracotta transition-colors truncate">
                            {p.name}
                          </h3>
                          <p className="text-[10px] text-foreground-muted mt-0.5">
                            {p.versions.length} versions &bull; {p.messages.length} turns
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-border">
                          <span className="inline-flex items-center gap-1.5 text-[10px] text-foreground-muted">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: brand.accentColor }}
                            />
                            {brand.name}
                          </span>
                          <span className="text-[10px] text-terracotta font-medium group-hover:underline">
                            Open &rarr;
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="w-full mt-16 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-[11px] text-foreground-muted gap-2 select-none">
          <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
            <span>Crafted for UI/UX designers</span>
            <span>&bull;</span>
            <span>Inspired by Claude Design</span>
          </div>
          <div>
            <span>Editorial Warmth &bull; Live Interactive Canvas</span>
          </div>
        </footer>
      </main>

      {/* Create Design System Modal */}
      <CreateDesignSystemModal
        isOpen={isCreateSystemOpen}
        onClose={() => setIsCreateSystemOpen(false)}
        onCreated={(newSystem) => {
          refreshSystems();
          setSelectedBrandId(newSystem.id);
        }}
      />
    </div>
  );
}
