"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Settings,
  Plus,
  Palette,
  Check,
  ChevronDown,
  FolderKanban,
  Trash2,
} from "lucide-react";
import { getAllDesignSystems } from "@/lib/design-systems";
import type { ApiSettings, Project } from "@/lib/storage";

interface HeaderProps {
  project: Project;
  allProjects: Project[];
  settings: ApiSettings;
  onGoHome: () => void;
  onSelectBrand: (brandId: string) => void;
  onSelectProject: (projectId: string) => void;
  onDeleteProject: (projectId: string) => void;
  onNewProject: () => void;
  onOpenSettings: () => void;
  onRenameProject: (newName: string) => void;
}

export function Header({
  project,
  allProjects,
  settings,
  onGoHome,
  onSelectBrand,
  onSelectProject,
  onDeleteProject,
  onNewProject,
  onOpenSettings,
  onRenameProject,
}: HeaderProps) {
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(project.name);

  const availableBrands = getAllDesignSystems();
  const currentBrand = availableBrands.find((b) => b.id === project.brandId) || availableBrands[0];

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    if (titleInput.trim()) {
      onRenameProject(titleInput.trim());
    } else {
      setTitleInput(project.name);
    }
  };

  const activeModelDisplay = settings.selectedModel
    ? settings.selectedModel
        .replace(/^accounts\/[^\/]+\/models\//, "")
        .replace(/^anthropic\//, "")
        .replace(/^openai\//, "")
    : "No model selected";

  return (
    <header className="h-14 border-b border-white/10 bg-[#121316] px-4 flex items-center justify-between select-none z-20 shrink-0">
      {/* Left: Brand logo, project title, & projects switcher */}
      <div className="flex items-center gap-3">
        <button
          onClick={onGoHome}
          className="flex items-center gap-2 pr-3 border-r border-white/10 hover:opacity-80 transition-opacity text-left cursor-pointer group"
          title="Back to Home"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-white flex items-center gap-1.5">
            Claude Design
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-neutral-300">
              Lite
            </span>
          </span>
        </button>

        {/* Project Name & Switcher Dropdown */}
        <div className="relative flex items-center gap-1">
          {isEditingTitle ? (
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={(e) => e.key === "Enter" && handleTitleSubmit()}
              autoFocus
              className="bg-white/5 border border-white/20 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-amber-500"
            />
          ) : (
            <button
              onClick={() => {
                setTitleInput(project.name);
                setIsEditingTitle(true);
              }}
              title="Click to rename design"
              className="text-xs text-neutral-300 font-medium hover:text-white px-2 py-1 rounded hover:bg-white/5 transition-colors"
            >
              {project.name}
            </button>
          )}

          {/* Switch Project Button */}
          <button
            onClick={() => setIsProjectsDropdownOpen(!isProjectsDropdownOpen)}
            className="p-1 text-neutral-400 hover:text-white rounded hover:bg-white/5 transition-colors"
            title="Switch project"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {/* Projects Dropdown Menu */}
          {isProjectsDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setIsProjectsDropdownOpen(false)}
              />
              <div className="absolute top-full mt-2 left-0 w-64 bg-[#18191d] border border-white/10 rounded-xl shadow-2xl p-2 z-40 text-xs">
                <div className="text-[11px] font-semibold text-neutral-400 px-2 py-1 flex items-center gap-1.5 border-b border-white/5 mb-1">
                  <FolderKanban className="w-3 h-3" />
                  Your Saved Designs ({allProjects.length})
                </div>
                <div className="space-y-1 max-h-60 overflow-y-auto">
                  {allProjects.map((p) => (
                    <div
                      key={p.id}
                      className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        p.id === project.id
                          ? "bg-white/10 text-white font-medium"
                          : "text-neutral-300 hover:bg-white/5 hover:text-white"
                      }`}
                      onClick={() => {
                        onSelectProject(p.id);
                        setIsProjectsDropdownOpen(false);
                      }}
                    >
                      <div className="truncate flex-1 mr-2">
                        <span className="truncate block">{p.name}</span>
                        <span className="text-[10px] text-neutral-500 font-normal">
                          {p.versions.length} versions
                        </span>
                      </div>
                      {allProjects.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteProject(p.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 rounded transition-opacity"
                          title="Delete project"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Center: Design System brand selector */}
      <div className="relative">
        <button
          onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-neutral-200 transition-all hover:border-white/20"
        >
          <span
            className="w-2.5 h-2.5 rounded-full ring-2 ring-white/10"
            style={{ backgroundColor: currentBrand.accentColor }}
          />
          <span>{currentBrand.name}</span>
          <span className="text-[10px] text-neutral-400 bg-white/5 px-1.5 py-0.2 rounded">
            {currentBrand.badge}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
        </button>

        {isBrandDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsBrandDropdownOpen(false)}
            />
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-72 bg-[#18191d] border border-white/10 rounded-xl shadow-2xl p-2 z-40">
              <div className="text-[11px] font-semibold text-neutral-400 px-2 py-1 flex items-center gap-1.5 border-b border-white/5 mb-1">
                <Palette className="w-3 h-3" />
                Select Design System (DESIGN.md)
              </div>
              <div className="space-y-1 max-h-80 overflow-y-auto">
                {availableBrands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => {
                      onSelectBrand(brand.id);
                      setIsBrandDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-lg flex items-start gap-2.5 transition-colors text-xs ${
                      brand.id === project.brandId
                        ? "bg-white/10 text-white"
                        : "text-neutral-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full mt-0.5 shrink-0 ring-1 ring-white/20"
                      style={{ backgroundColor: brand.accentColor }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between font-medium">
                        <span>{brand.name}</span>
                        <span className="text-[10px] text-neutral-400 font-normal">
                          {brand.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {brand.description}
                      </p>
                    </div>
                    {brand.id === project.brandId && (
                      <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Model Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] text-neutral-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono">{activeModelDisplay}</span>
        </div>

        {/* New Design button */}
        <button
          onClick={onNewProject}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors shadow-sm shadow-amber-500/20"
          title="Start fresh design"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New</span>
        </button>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className="p-1.5 rounded-lg hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
          title="API Keys & Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
