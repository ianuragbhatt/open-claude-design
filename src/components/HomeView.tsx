"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Search,
  Plus,
  ArrowUp,
  Check,
  CheckCircle2,
  ChevronDown,
  Star,
  List as ListIcon,
  LayoutGrid,
  Pencil,
  Trash2,
  Code2,
  Feather,
  Layers,
  FolderKanban,
  MoreHorizontal,
  Settings,
} from "lucide-react";
import { ModelPickerPopover } from "@/components/ModelPickerPopover";
import { CreateDesignSystemModal } from "@/components/CreateDesignSystemModal";
import {
  getAllDesignSystems,
  deleteCustomDesignSystem,
  type DesignSystem,
} from "@/lib/design-systems";
import type { ApiSettings, Project } from "@/lib/storage";

interface HomeViewProps {
  projects: Project[];
  activeProject: Project | null;
  settings: ApiSettings;
  onUpdateSettings: (newSettings: ApiSettings) => void;
  onOpenSettings: () => void;
  onSelectProject: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  onNewProject: () => void;
  onSubmitPrompt: (prompt: string, brandId: string) => void;
}

export function HomeView({
  projects,
  activeProject,
  settings,
  onUpdateSettings,
  onOpenSettings,
  onSelectProject,
  onDeleteProject,
  onNewProject,
  onSubmitPrompt,
}: HomeViewProps) {
  // Tabs: only 'projects' | 'design-systems' (no templates)
  const [activeTab, setActiveTab] = useState<"projects" | "design-systems">("design-systems");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Hero composer state
  const [prompt, setPrompt] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState<string>(
    activeProject?.brandId || "linear"
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
      id: "linear",
      name: "Linear",
      accentColor: "#5e6ad2",
      badge: "Dark Minimal",
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

  return (
    <div className="min-h-full w-full bg-[#131416] text-[#e3e3e3] flex flex-col font-sans overflow-y-auto selection:bg-amber-500/30 selection:text-white">
      {/* Top Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between z-20">
        <div className="flex flex-col">
          <span className="font-serif text-xl tracking-tight text-white font-normal">
            Claude Design
          </span>
          <span className="text-[11px] text-neutral-400 font-sans tracking-wide">
            Beta
          </span>
        </div>

        {/* Right side user avatar / settings trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSettings}
            className="w-8 h-8 rounded-full bg-[#242426] hover:bg-[#2c2c2e] border border-white/10 flex items-center justify-center text-xs font-medium text-neutral-200 transition-colors shadow-sm"
            title="Settings & API Key"
          >
            A
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center pt-8 pb-16 px-4 w-full max-w-5xl mx-auto">
        {/* Editorial Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl font-normal text-white tracking-tight mb-8 text-center select-none">
          What should we create?
        </h1>

        {/* Hero Composer Card */}
        <div className="w-full max-w-3xl bg-[#1c1c1f] border border-[#2e2e32] rounded-2xl p-4 shadow-2xl relative group focus-within:border-neutral-500 transition-all">
          <textarea
            ref={textareaRef}
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Sketch a landing page, dashboard, or interactive app..."
            className="w-full bg-transparent text-white placeholder:text-neutral-500 text-sm focus:outline-none resize-none leading-relaxed"
          />

          {/* Bottom Bar inside Composer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-1">
            {/* Left Controls */}
            <div className="flex items-center gap-2">
              {/* + Button */}
              <button
                type="button"
                onClick={() => {
                  textareaRef.current?.focus();
                  if (!prompt) {
                    setPrompt("Design a modern responsive UI for ");
                  }
                }}
                className="w-8 h-8 rounded-lg bg-[#242426] hover:bg-[#2c2c2e] border border-[#38383a] text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
                title="Add inspiration prompt"
              >
                <Plus className="w-4 h-4" />
              </button>

              {/* Design System Selector Button */}
              <div className="relative">
                <button
                  ref={brandButtonRef}
                  type="button"
                  onClick={() => setIsDesignSystemMenuOpen(!isDesignSystemMenuOpen)}
                  className="bg-[#242426] hover:bg-[#2c2c2e] border border-[#38383a] rounded-lg px-2.5 py-1 flex items-center gap-2.5 text-left transition-colors"
                >
                  <div className="w-6 h-6 rounded-md bg-[#18191c] border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
                    <Feather className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 flex items-center gap-0.5">
                      Design system
                      <ChevronDown className="w-2.5 h-2.5 text-neutral-400" />
                    </span>
                    <span className="text-xs font-medium text-white truncate max-w-[130px]">
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
                    <div className="absolute top-full mt-2 left-0 w-72 bg-[#18191d] border border-white/10 rounded-xl shadow-2xl p-2 z-40">
                      <div className="text-[11px] font-semibold text-neutral-400 px-2 py-1 flex items-center justify-between border-b border-white/5 mb-1">
                        <span>Select Design System</span>
                        <button
                          onClick={() => {
                            setIsDesignSystemMenuOpen(false);
                            setIsCreateSystemOpen(true);
                          }}
                          className="text-[10px] text-amber-400 hover:text-amber-300 font-medium"
                        >
                          + New System
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
                            className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center gap-2.5 transition-colors text-xs ${
                              brand.id === selectedBrandId
                                ? "bg-white/10 text-white font-medium"
                                : "text-neutral-300 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <span
                              className="w-3 h-3 rounded-full shrink-0 ring-1 ring-white/20"
                              style={{ backgroundColor: brand.accentColor }}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="truncate font-medium">{brand.name}</div>
                              <div className="text-[10px] text-neutral-500 truncate">
                                {brand.badge}
                              </div>
                            </div>
                            {brand.id === selectedBrandId && (
                              <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Code Mode Button */}
              <button
                type="button"
                onClick={() => {
                  textareaRef.current?.focus();
                  if (!prompt.includes("Code:")) {
                    setPrompt((prev) => (prev ? prev + "\nInclude full clean HTML & Tailwind code." : "Build a clean component in HTML and Tailwind."));
                  }
                }}
                className="w-8 h-8 rounded-lg bg-[#242426] hover:bg-[#2c2c2e] border border-[#38383a] text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
                title="Code mode hint"
              >
                <Code2 className="w-4 h-4" />
              </button>
            </div>

            {/* Right Controls: Model Pill & Send Button */}
            <div className="flex items-center gap-2">
              {/* Model Pill */}
              <div className="relative">
                <button
                  ref={modelButtonRef}
                  type="button"
                  onClick={() => setIsModelPickerOpen(!isModelPickerOpen)}
                  className="bg-[#242426] hover:bg-[#2c2c2e] border border-[#38383a] rounded-lg px-2.5 py-1 flex items-center gap-2 text-left transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 flex items-center gap-0.5">
                      Model
                      <ChevronDown className="w-2.5 h-2.5 text-neutral-400" />
                    </span>
                    <span className="text-xs font-mono font-medium text-white truncate max-w-[110px]">
                      {settings.selectedModel
                        ? settings.selectedModel
                            .replace(/^accounts\/[^\/]+\/models\//, "")
                            .replace(/^anthropic\//, "")
                            .replace(/^openai\//, "")
                        : "Select model"}
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
                    ? "bg-[#c25e3d] hover:bg-[#d46743] text-white shadow-lg shadow-orange-950/40 active:scale-95"
                    : "bg-[#2a2a2e] text-neutral-500 cursor-not-allowed"
                }`}
                title="Create design"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Lower Section: Tabs, Search, and Lists */}
        <section className="w-full mt-14">
          {/* Navigation & Controls Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
            {/* Tabs: Projects & Design systems (Strictly NO templates) */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "projects"
                    ? "bg-[#242426] text-white border border-[#38383a] shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                Projects ({projects.length})
              </button>

              <button
                onClick={() => setActiveTab("design-systems")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "design-systems"
                    ? "bg-[#242426] text-white border border-[#38383a] shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                Design systems
              </button>
            </div>

            {/* Right Controls: Create System / New Project, Search, View Toggle */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              {activeTab === "design-systems" ? (
                <button
                  onClick={() => setIsCreateSystemOpen(true)}
                  className="px-3 py-1.5 text-xs font-medium bg-[#242426] hover:bg-[#2c2c2e] text-white border border-[#38383a] rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Create design system</span>
                </button>
              ) : (
                <button
                  onClick={onNewProject}
                  className="px-3 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-black rounded-lg flex items-center gap-1 transition-colors shadow-sm shadow-amber-500/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Project</span>
                </button>
              )}

              {/* Search Box */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#18191c] border border-[#2e2e32] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-400 w-36 sm:w-44 transition-all"
                />
              </div>

              {/* Star Filter */}
              <button
                type="button"
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-[#38383a] transition-colors"
                title="Filter favorites"
              >
                <Star className="w-3.5 h-3.5" />
              </button>

              {/* View Toggle */}
              <div className="flex items-center bg-[#18191c] border border-[#2e2e32] rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-1 rounded ${
                    viewMode === "table" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"
                  }`}
                  title="List view"
                >
                  <ListIcon className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1 rounded ${
                    viewMode === "grid" ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white"
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
                  <table className="w-full text-left text-xs text-neutral-300">
                    <thead>
                      <tr className="text-neutral-500 border-b border-white/5 text-[11px] font-medium">
                        <th className="py-2.5 px-3 font-normal">Name</th>
                        <th className="py-2.5 px-3 font-normal">
                          <span className="flex items-center gap-1 cursor-pointer hover:text-neutral-300">
                            Updated <ChevronDown className="w-3 h-3" />
                          </span>
                        </th>
                        <th className="py-2.5 px-3 font-normal">All owners</th>
                        <th className="py-2.5 px-3 font-normal text-center">Published</th>
                        <th className="py-2.5 px-3 font-normal text-right">Access</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredSystems.map((system) => {
                        const isSelected = system.id === selectedBrandId;
                        return (
                          <tr
                            key={system.id}
                            onClick={() => setSelectedBrandId(system.id)}
                            className={`group cursor-pointer hover:bg-white/[0.03] transition-colors ${
                              isSelected ? "bg-white/[0.04]" : ""
                            }`}
                          >
                            {/* Swatch & Name */}
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-3">
                                {/* Swatch Card */}
                                <div className="w-14 h-9 rounded-md border border-white/10 overflow-hidden flex shadow-sm shrink-0 relative bg-[#1c1c1f]">
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
                                      <span className="text-[10px] font-bold text-white uppercase drop-shadow">
                                        {system.name.slice(0, 3)}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                <div className="min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-white group-hover:text-amber-400 transition-colors">
                                      {system.name}
                                    </span>
                                    {system.badge && (
                                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5">
                                        {system.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-neutral-500 truncate max-w-md mt-0.5">
                                    {system.description}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Updated */}
                            <td className="py-3 px-3 text-neutral-400 text-[11px] whitespace-nowrap">
                              {formatRelativeTime(system.updatedAt)}
                            </td>

                            {/* Owner */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <span className="w-4 h-4 rounded-full bg-neutral-700 text-neutral-200 text-[9px] flex items-center justify-center font-bold">
                                  {system.owner === "You" ? "Y" : "I"}
                                </span>
                                <span className="text-neutral-400 text-[11px]">
                                  {system.owner || "Included"}
                                </span>
                              </div>
                            </td>

                            {/* Published Checkmark */}
                            <td className="py-3 px-3 text-center">
                              <CheckCircle2 className="w-4 h-4 text-neutral-500 inline-block" />
                            </td>

                            {/* Actions / Access */}
                            <td className="py-3 px-3 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1 text-neutral-500">
                                {system.isCustom && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteCustomDesignSystem(system.id);
                                      refreshSystems();
                                    }}
                                    className="p-1 hover:text-red-400 rounded transition-colors"
                                    title="Delete custom system"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedBrandId(system.id);
                                  }}
                                  className="p-1 hover:text-neutral-300 rounded transition-colors"
                                  title="Select"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  className="p-1 hover:text-neutral-300 rounded transition-colors"
                                  title="More options"
                                >
                                  <MoreHorizontal className="w-3.5 h-3.5" />
                                </button>
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
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? "bg-white/[0.06] border-amber-500/50 shadow-md"
                            : "bg-[#18191c] border-white/5 hover:border-white/15"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-9 rounded-md border border-white/10 overflow-hidden flex shrink-0">
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
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-white text-xs truncate">
                                {system.name}
                              </span>
                              {isSelected && (
                                <Check className="w-3 h-3 text-amber-400 shrink-0" />
                              )}
                            </div>
                            <p className="text-[10px] text-neutral-400 line-clamp-2 mt-1">
                              {system.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5 text-[10px] text-neutral-500">
                          <span>{system.badge}</span>
                          <span>{formatRelativeTime(system.updatedAt)}</span>
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
                <div className="p-12 text-center border border-dashed border-white/10 rounded-2xl">
                  <FolderKanban className="w-8 h-8 text-neutral-500 mx-auto mb-2" />
                  <p className="text-xs text-neutral-300 font-medium">No projects found</p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Start by typing a prompt in the composer above or create a new project.
                  </p>
                  <button
                    onClick={onNewProject}
                    className="mt-4 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs rounded-lg inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create First Project</span>
                  </button>
                </div>
              ) : viewMode === "table" ? (
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left text-xs text-neutral-300">
                    <thead>
                      <tr className="text-neutral-500 border-b border-white/5 text-[11px] font-medium">
                        <th className="py-2.5 px-3 font-normal">Design Name</th>
                        <th className="py-2.5 px-3 font-normal">Design System</th>
                        <th className="py-2.5 px-3 font-normal">Versions</th>
                        <th className="py-2.5 px-3 font-normal">Updated</th>
                        <th className="py-2.5 px-3 font-normal text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredProjects.map((p) => {
                        const brand =
                          allSystems.find((ds) => ds.id === p.brandId) || {
                            name: p.brandId,
                            accentColor: "#5e6ad2",
                          };
                        return (
                          <tr
                            key={p.id}
                            onClick={() => onSelectProject(p.id)}
                            className="group cursor-pointer hover:bg-white/[0.03] transition-colors"
                          >
                            {/* Project Name & Preview Icon */}
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-amber-400 group-hover:border-amber-500/30 transition-colors shrink-0">
                                  <Layers className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <span className="font-medium text-white group-hover:text-amber-400 transition-colors truncate block">
                                    {p.name}
                                  </span>
                                  <span className="text-[10px] text-neutral-500">
                                    {p.messages.length} messages
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Design System */}
                            <td className="py-3 px-3">
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: brand.accentColor }}
                                />
                                {brand.name}
                              </span>
                            </td>

                            {/* Version count */}
                            <td className="py-3 px-3 text-neutral-400 text-[11px]">
                              {p.versions.length} {p.versions.length === 1 ? "version" : "versions"}
                            </td>

                            {/* Updated */}
                            <td className="py-3 px-3 text-neutral-400 text-[11px] whitespace-nowrap">
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
                                  className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[11px] text-neutral-200 hover:text-white transition-colors"
                                >
                                  Open
                                </button>
                                {projects.length > 1 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onDeleteProject(p.id);
                                    }}
                                    className="p-1 text-neutral-500 hover:text-red-400 rounded transition-colors"
                                    title="Delete project"
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
                        accentColor: "#5e6ad2",
                      };
                    return (
                      <div
                        key={p.id}
                        onClick={() => onSelectProject(p.id)}
                        className="p-4 rounded-xl bg-[#18191c] border border-white/5 hover:border-white/15 transition-all cursor-pointer flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-start justify-between">
                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-amber-400 transition-colors">
                              <Layers className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] text-neutral-500">
                              {formatRelativeTime(p.updatedAt)}
                            </span>
                          </div>
                          <h3 className="font-medium text-white text-xs mt-3 group-hover:text-amber-400 transition-colors truncate">
                            {p.name}
                          </h3>
                          <p className="text-[10px] text-neutral-400 mt-0.5">
                            {p.versions.length} versions &bull; {p.messages.length} turns
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5">
                          <span className="inline-flex items-center gap-1.5 text-[10px] text-neutral-400">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: brand.accentColor }}
                            />
                            {brand.name}
                          </span>
                          <span className="text-[10px] text-amber-400 font-medium group-hover:underline">
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
