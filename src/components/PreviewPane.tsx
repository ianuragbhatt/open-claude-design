"use client";

import React, { useState } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  MousePointer2,
  Crosshair,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Code2,
  RefreshCw,
  Copy,
  Download,
  ExternalLink,
  Sun,
  Moon,
  Settings,
  Check,
  RotateCcw,
  Layers,
} from "lucide-react";
import { PreviewFrame } from "./PreviewFrame";
import { CodeViewer } from "./CodeViewer";
import type { ArtifactVersion } from "@/lib/storage";

interface PreviewPaneProps {
  projectName?: string;
  currentHtml: string;
  versions: ArtifactVersion[];
  activeVersionIndex: number;
  onSelectVersion: (index: number) => void;
  onSelectElement: (info: { elementName: string; selector: string; textSnippet: string }) => void;
  isLoading?: boolean;
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
  onOpenSettings?: () => void;
}

type ViewportMode = "desktop" | "tablet" | "mobile" | "responsive";

export function PreviewPane({
  projectName,
  currentHtml,
  versions,
  activeVersionIndex,
  onSelectVersion,
  onSelectElement,
  isLoading,
  theme,
  onToggleTheme,
  onOpenSettings,
}: PreviewPaneProps) {
  const [viewport, setViewport] = useState<ViewportMode>("responsive");
  const [canvasMode, setCanvasMode] = useState<"interact" | "inspect">("interact");
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [reloadKey, setReloadKey] = useState(0);
  const [isVersionMenuOpen, setIsVersionMenuOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const hasVersions = versions.length > 0;
  const currentVersion = versions[activeVersionIndex];
  const htmlToDisplay = currentVersion ? currentVersion.html : currentHtml;

  // Viewport width mapping
  const viewportWidthClass = {
    responsive: "w-full h-full",
    desktop: "w-[1440px] max-w-full h-full shadow-2xl rounded-lg overflow-hidden border border-border",
    tablet: "w-[768px] max-w-full h-full shadow-2xl rounded-2xl overflow-hidden border border-border",
    mobile: "w-[375px] max-w-full h-[812px] shadow-2xl rounded-3xl overflow-hidden border-4 border-border",
  }[viewport];

  const handleDownload = () => {
    if (!htmlToDisplay) return;
    const blob = new Blob([htmlToDisplay], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentVersion?.title || projectName || "design-prototype"}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleOpenNewTab = () => {
    if (!htmlToDisplay) return;
    const blob = new Blob([htmlToDisplay], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const handleCopyCode = () => {
    if (!htmlToDisplay) return;
    navigator.clipboard.writeText(htmlToDisplay);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1500);
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-background overflow-hidden transition-colors">
      {/* Top Ribbon - Claude Design Command Ribbon */}
      <div className="h-12 px-4 border-b border-border bg-surface flex items-center justify-between shrink-0 select-none z-20 text-xs text-foreground transition-colors">
        {/* Left Section: Reload + Artifact/Version Title Dropdown */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setReloadKey((prev) => prev + 1)}
            className="w-8 h-8 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-subtle flex items-center justify-center transition-colors"
            title="Reload canvas preview"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* App Logo & Version Title Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsVersionMenuOpen(!isVersionMenuOpen)}
              className="flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-surface-subtle transition-colors group"
            >
              <div className="w-5 h-5 rounded bg-surface-subtle border border-border/80 flex items-center justify-center text-foreground-muted group-hover:text-terracotta text-xs shrink-0 transition-colors">
                <Layers className="w-3 h-3" />
              </div>
              <div className="flex items-center gap-1.5 text-left">
                <span className="font-medium text-xs text-foreground group-hover:text-terracotta transition-colors truncate max-w-[140px]">
                  {currentVersion?.title || projectName || "Design Prototype"}
                </span>
                <span className="text-[10px] text-foreground-muted bg-surface-subtle px-1.5 py-0.2 rounded border border-border/70">
                  v{activeVersionIndex + 1}/{Math.max(versions.length, 1)}
                </span>
                <ChevronDown className="w-3 h-3 text-foreground-muted group-hover:text-foreground opacity-70" />
              </div>
            </button>

            {isVersionMenuOpen && hasVersions && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsVersionMenuOpen(false)} />
                <div className="absolute top-full left-0 mt-1 w-64 bg-surface border border-border rounded-xl shadow-2xl p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                  <div className="flex items-center justify-between px-2 py-1 mb-1 border-b border-border text-[10px] font-semibold uppercase tracking-wider text-foreground-muted">
                    <span>Iterations</span>
                    <div className="flex items-center gap-1">
                      <button
                        disabled={activeVersionIndex <= 0}
                        onClick={() => onSelectVersion(activeVersionIndex - 1)}
                        className="p-0.5 rounded hover:bg-surface-subtle disabled:opacity-30"
                      >
                        <ChevronLeft className="w-3 h-3" />
                      </button>
                      <button
                        disabled={activeVersionIndex >= versions.length - 1}
                        onClick={() => onSelectVersion(activeVersionIndex + 1)}
                        className="p-0.5 rounded hover:bg-surface-subtle disabled:opacity-30"
                      >
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1">
                    {versions.map((ver, idx) => (
                      <button
                        key={ver.id}
                        onClick={() => {
                          onSelectVersion(idx);
                          setIsVersionMenuOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg flex items-center justify-between transition-colors ${
                          idx === activeVersionIndex
                            ? "bg-surface-subtle text-foreground font-medium"
                            : "text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-medium text-xs truncate">
                            v{ver.versionNumber} · {ver.title}
                          </div>
                          {ver.promptSummary && (
                            <div className="text-[10px] text-foreground-muted truncate mt-0.5">
                              {ver.promptSummary}
                            </div>
                          )}
                        </div>
                        {idx === activeVersionIndex && (
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

        {/* Center: Viewport & Mode Segments */}
        <div className="flex items-center gap-1.5">
          {/* Viewports */}
          <div className="flex items-center p-0.5 bg-surface-subtle/80 rounded-lg border border-border/60">
            <button
              onClick={() => setViewport("responsive")}
              className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                viewport === "responsive" ? "bg-surface text-foreground shadow-2xs font-medium" : "text-foreground-muted hover:text-foreground"
              }`}
              title="Responsive (100%)"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
            <button
              onClick={() => setViewport("desktop")}
              className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                viewport === "desktop" ? "bg-surface text-foreground shadow-2xs font-medium" : "text-foreground-muted hover:text-foreground"
              }`}
              title="Desktop (1440px)"
            >
              <Monitor className="w-3 h-3" />
            </button>
            <button
              onClick={() => setViewport("tablet")}
              className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                viewport === "tablet" ? "bg-surface text-foreground shadow-2xs font-medium" : "text-foreground-muted hover:text-foreground"
              }`}
              title="Tablet (768px)"
            >
              <Tablet className="w-3 h-3" />
            </button>
            <button
              onClick={() => setViewport("mobile")}
              className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                viewport === "mobile" ? "bg-surface text-foreground shadow-2xs font-medium" : "text-foreground-muted hover:text-foreground"
              }`}
              title="Mobile (375px)"
            >
              <Smartphone className="w-3 h-3" />
            </button>
          </div>

          <div className="h-3.5 w-px bg-border/60 hidden sm:block" />

          {/* Interact vs Click to Edit */}
          <div className="flex items-center p-0.5 bg-surface-subtle/80 rounded-xl border border-border/60">
            <button
              onClick={() => setCanvasMode("interact")}
              className={`flex items-center gap-1.5 h-6.5 px-2.5 rounded-lg text-xs font-medium transition-colors ${
                canvasMode === "interact" ? "bg-surface text-foreground shadow-2xs" : "text-foreground-muted hover:text-foreground"
              }`}
              title="Test interactive prototype buttons & links"
            >
              <MousePointer2 className="w-3 h-3" />
              <span>Interact</span>
            </button>
            <button
              onClick={() => setCanvasMode("inspect")}
              className={`flex items-center gap-1.5 h-6.5 px-2.5 rounded-lg text-xs font-medium transition-colors ${
                canvasMode === "inspect" ? "bg-terracotta text-white shadow-2xs" : "text-foreground-muted hover:text-foreground"
              }`}
              title="Click any section on the canvas to request targeted revisions"
            >
              <Crosshair className="w-3 h-3" />
              <span>Click to Edit</span>
            </button>
          </div>
        </div>

        {/* Right: Code, Share/Export Pill, Theme, Settings */}
        <div className="flex items-center gap-1.5">
          {/* Code View Toggle */}
          <button
            onClick={() => setActiveTab(activeTab === "code" ? "preview" : "code")}
            className={`h-7 px-2.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
              activeTab === "code"
                ? "bg-surface text-foreground border-border shadow-2xs"
                : "bg-surface-subtle/80 hover:bg-surface text-foreground-muted hover:text-foreground border-border/60"
            }`}
            title="Inspect HTML code"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Code</span>
          </button>

          {/* Prominent Export Pill */}
          <div className="relative">
            <button
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
              disabled={!htmlToDisplay}
              className="h-7 px-3 rounded-full bg-foreground text-background hover:opacity-90 disabled:opacity-40 font-medium text-xs flex items-center gap-1.5 transition-opacity shadow-2xs shrink-0"
              title="Export prototype"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Export</span>
              <ChevronDown className="w-2.5 h-2.5 opacity-70" />
            </button>

            {isExportMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsExportMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-1.5 w-60 bg-surface border border-border rounded-2xl shadow-2xl p-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                  <button
                    onClick={() => {
                      handleCopyCode();
                      setTimeout(() => setIsExportMenuOpen(false), 600);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-surface-subtle flex items-center justify-between transition-colors text-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <Copy className="w-3.5 h-3.5 text-foreground-muted" />
                      <span>Copy Shareable HTML</span>
                    </div>
                    {copiedCode && <span className="text-[10px] text-emerald-500 font-medium">Copied!</span>}
                  </button>

                  <button
                    onClick={() => {
                      handleDownload();
                      setIsExportMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-surface-subtle flex items-center gap-2 transition-colors text-foreground"
                  >
                    <Download className="w-3.5 h-3.5 text-foreground-muted" />
                    <span>Download Prototype (.html)</span>
                  </button>

                  <button
                    onClick={() => {
                      handleOpenNewTab();
                      setIsExportMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-surface-subtle flex items-center gap-2 transition-colors text-foreground"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-foreground-muted" />
                    <span>Open in Fullscreen</span>
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="h-3.5 w-px bg-border/60" />

          {/* Theme Switcher */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="w-7 h-7 rounded-md text-foreground-muted hover:text-foreground hover:bg-surface-subtle flex items-center justify-center transition-colors"
              title={theme === "dark" ? "Switch to Ivory Light mode" : "Switch to Warm Dark mode"}
            >
              {theme === "dark" ? <Sun className="w-3.5 h-3.5 text-[#e28767]" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          )}

          {/* Settings Trigger */}
          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              className="w-7 h-7 rounded-md text-foreground-muted hover:text-foreground hover:bg-surface-subtle flex items-center justify-center transition-colors"
              title="Open Endpoint & Model Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-background">
        {activeTab === "preview" ? (
          <div className={`transition-all duration-300 flex items-center justify-center ${viewportWidthClass}`}>
            <PreviewFrame
              key={reloadKey}
              html={htmlToDisplay}
              mode={canvasMode}
              onSelectElement={onSelectElement}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <div className="w-full h-full rounded-xl overflow-hidden border border-border bg-surface">
            <CodeViewer
              code={htmlToDisplay}
              title={`${currentVersion?.title || projectName || "index"}.html`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
