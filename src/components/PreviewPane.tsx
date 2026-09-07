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
  Code2,
  Eye,
  ExternalLink,
  Download,
} from "lucide-react";
import { PreviewFrame } from "./PreviewFrame";
import { CodeViewer } from "./CodeViewer";
import type { ArtifactVersion } from "@/lib/storage";

interface PreviewPaneProps {
  currentHtml: string;
  versions: ArtifactVersion[];
  activeVersionIndex: number;
  onSelectVersion: (index: number) => void;
  onSelectElement: (info: { elementName: string; selector: string; textSnippet: string }) => void;
  isLoading?: boolean;
}

type ViewportMode = "desktop" | "tablet" | "mobile" | "responsive";

export function PreviewPane({
  currentHtml,
  versions,
  activeVersionIndex,
  onSelectVersion,
  onSelectElement,
  isLoading,
}: PreviewPaneProps) {
  const [viewport, setViewport] = useState<ViewportMode>("responsive");
  const [canvasMode, setCanvasMode] = useState<"interact" | "inspect">("interact");
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const hasVersions = versions.length > 0;
  const currentVersion = versions[activeVersionIndex];
  const htmlToDisplay = currentVersion ? currentVersion.html : currentHtml;

  // Viewport width mapping
  const viewportWidthClass = {
    responsive: "w-full h-full",
    desktop: "w-[1440px] max-w-full h-full shadow-2xl rounded-lg overflow-hidden border border-white/10",
    tablet: "w-[768px] max-w-full h-full shadow-2xl rounded-2xl overflow-hidden border border-white/10",
    mobile: "w-[375px] max-w-full h-[812px] shadow-2xl rounded-3xl overflow-hidden border-4 border-neutral-800",
  }[viewport];

  const handleDownload = () => {
    if (!htmlToDisplay) return;
    const blob = new Blob([htmlToDisplay], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentVersion?.title || "design-prototype"}.html`;
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

  return (
    <div className="flex-1 h-full flex flex-col bg-[#090a0c] overflow-hidden">
      {/* Top Toolbar */}
      <div className="h-11 px-4 border-b border-white/10 bg-[#121316] flex items-center justify-between shrink-0 select-none z-10 text-xs">
        {/* Left: Viewport Toggles & Mode */}
        <div className="flex items-center gap-2">
          {/* Viewports */}
          <div className="flex items-center p-0.5 bg-white/5 rounded-lg border border-white/5">
            <button
              onClick={() => setViewport("responsive")}
              className={`p-1.5 rounded-md transition-colors ${
                viewport === "responsive" ? "bg-white/15 text-white" : "text-neutral-400 hover:text-white"
              }`}
              title="Responsive (100%)"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport("desktop")}
              className={`p-1.5 rounded-md transition-colors ${
                viewport === "desktop" ? "bg-white/15 text-white" : "text-neutral-400 hover:text-white"
              }`}
              title="Desktop (1440px)"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport("tablet")}
              className={`p-1.5 rounded-md transition-colors ${
                viewport === "tablet" ? "bg-white/15 text-white" : "text-neutral-400 hover:text-white"
              }`}
              title="Tablet (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport("mobile")}
              className={`p-1.5 rounded-md transition-colors ${
                viewport === "mobile" ? "bg-white/15 text-white" : "text-neutral-400 hover:text-white"
              }`}
              title="Mobile (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-px bg-white/10" />

          {/* Interact vs Inspect Mode Toggle */}
          <div className="flex items-center p-0.5 bg-white/5 rounded-lg border border-white/5">
            <button
              onClick={() => setCanvasMode("interact")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                canvasMode === "interact" ? "bg-white/15 text-white shadow-sm" : "text-neutral-400 hover:text-white"
              }`}
              title="Test interactive prototype buttons & links"
            >
              <MousePointer2 className="w-3 h-3" />
              <span>Interact</span>
            </button>
            <button
              onClick={() => setCanvasMode("inspect")}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                canvasMode === "inspect" ? "bg-amber-500 text-black font-semibold shadow-sm" : "text-neutral-400 hover:text-white"
              }`}
              title="Click any element on the page to request targeted changes"
            >
              <Crosshair className="w-3 h-3" />
              <span>Inspect & Edit</span>
            </button>
          </div>
        </div>

        {/* Center: Version Scrubber */}
        {hasVersions && (
          <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">
            <button
              disabled={activeVersionIndex <= 0}
              onClick={() => onSelectVersion(activeVersionIndex - 1)}
              className="p-1 rounded text-neutral-400 hover:text-white disabled:opacity-30 disabled:hover:text-neutral-400"
              title="Previous version"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-medium text-neutral-200 px-1">
              v{activeVersionIndex + 1} / {versions.length}
            </span>
            <button
              disabled={activeVersionIndex >= versions.length - 1}
              onClick={() => onSelectVersion(activeVersionIndex + 1)}
              className="p-1 rounded text-neutral-400 hover:text-white disabled:opacity-30 disabled:hover:text-neutral-400"
              title="Next version"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Right: Preview/Code Switcher & Export */}
        <div className="flex items-center gap-2">
          {/* Preview / Code Tab */}
          <div className="flex items-center p-0.5 bg-white/5 rounded-lg border border-white/5">
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                activeTab === "preview" ? "bg-white/15 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                activeTab === "code" ? "bg-white/15 text-white" : "text-neutral-400 hover:text-white"
              }`}
            >
              <Code2 className="w-3 h-3" />
              <span>Code</span>
            </button>
          </div>

          <div className="h-4 w-px bg-white/10" />

          {/* Export Actions */}
          <button
            onClick={handleOpenNewTab}
            disabled={!htmlToDisplay}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30"
            title="Open standalone preview in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleDownload}
            disabled={!htmlToDisplay}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30"
            title="Download standalone HTML file"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-[#090a0c]">
        {activeTab === "preview" ? (
          <div className={`transition-all duration-300 flex items-center justify-center ${viewportWidthClass}`}>
            <PreviewFrame
              html={htmlToDisplay}
              mode={canvasMode}
              onSelectElement={onSelectElement}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <div className="w-full h-full rounded-xl overflow-hidden border border-white/10">
            <CodeViewer
              code={htmlToDisplay}
              title={`${currentVersion?.title || "index"}.html`}
            />
          </div>
        )}
      </div>
    </div>
  );
}
