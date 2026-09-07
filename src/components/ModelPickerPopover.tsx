"use client";

import React, { useState } from "react";
import { Check, ChevronRight, Sliders, RefreshCw, Settings2, AlertCircle, Sparkles, Brain } from "lucide-react";
import type { ApiSettings } from "@/lib/storage";
import { formatModelName } from "@/lib/formatters";

interface ModelPickerPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ApiSettings;
  onSelectModel: (model: string) => void;
  onSelectEffort: (effort: "low" | "medium" | "high") => void;
  onOpenSettings: () => void;
  onRefreshModels: () => void;
  isRefreshingModels?: boolean;
}

const EFFORT_LEVELS = [
  { id: "low", label: "Fast Draft", desc: "Quick ideas and rapid layout sketches" },
  { id: "medium", label: "Balanced Craft", desc: "Thoughtful layouts with polished styling" },
  { id: "high", label: "Deep Thinking", desc: "Complex interfaces with interactive state" },
] as const;

export function ModelPickerPopover({
  isOpen,
  onClose,
  settings,
  onSelectModel,
  onSelectEffort,
  onOpenSettings,
  onRefreshModels,
  isRefreshingModels,
}: ModelPickerPopoverProps) {
  const [showEffortSubmenu, setShowEffortSubmenu] = useState(false);
  const [showAllModels, setShowAllModels] = useState(false);

  if (!isOpen) return null;

  const models = settings.availableModels || [];
  const displayedModels = showAllModels ? models : models.slice(0, 6);

  const activeEffortLabel =
    EFFORT_LEVELS.find((l) => l.id === settings.reasoningEffort)?.label || "Balanced Craft";

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute bottom-full mb-2 left-0 w-84 bg-surface border border-border rounded-2xl shadow-2xl p-2.5 z-50 text-xs overflow-hidden backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100">
        {models.length === 0 ? (
          <div className="p-4 text-center space-y-3">
            <div className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-foreground font-medium text-xs">No AI models connected</p>
              <p className="text-[11px] text-foreground-muted mt-1 leading-relaxed">
                Connect your provider or API key in Settings to begin designing.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
              className="w-full py-2 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-medium text-xs transition-colors shadow-sm"
            >
              Configure Provider
            </button>
          </div>
        ) : (
          <>
            <div className="px-2 py-1 mb-1 border-b border-border flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-foreground-muted">
              <span>Select Model</span>
              <span className="text-[10px] text-foreground-muted font-normal">
                {models.length} available
              </span>
            </div>

            {/* Model items */}
            <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
              {displayedModels.map((model) => {
                const isSelected = settings.selectedModel === model;
                const info = formatModelName(model);

                return (
                  <button
                    key={model}
                    onClick={() => {
                      onSelectModel(model);
                      onClose();
                    }}
                    className={`w-full text-left p-2 rounded-xl flex items-center justify-between gap-2.5 transition-colors group ${
                      isSelected
                        ? "bg-terracotta/10 border border-terracotta/40 text-foreground"
                        : "text-foreground-muted hover:bg-surface-subtle hover:text-foreground border border-transparent"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-xs text-foreground truncate">
                          {info.displayName}
                        </span>
                        {info.badge && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-surface border border-border text-foreground-muted shrink-0 font-normal">
                            {info.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-foreground-muted/80 truncate">
                        {info.provider}
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-terracotta shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-1.5 border-t border-border" />

            {/* Design Thinking Depth (Reasoning Effort) */}
            <div className="relative">
              <button
                onClick={() => setShowEffortSubmenu(!showEffortSubmenu)}
                className="w-full flex items-center justify-between p-2 rounded-xl text-foreground-muted hover:text-foreground hover:bg-surface-subtle transition-colors text-xs font-medium"
              >
                <div className="flex items-center gap-2">
                  <Brain className="w-3.5 h-3.5 text-terracotta" />
                  <span>Thinking Depth</span>
                </div>
                <div className="flex items-center gap-1 text-foreground-muted text-[11px]">
                  <span>{activeEffortLabel}</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </button>

              {/* Effort Submenu */}
              {showEffortSubmenu && (
                <div className="mt-1 p-1 bg-surface-subtle border border-border rounded-xl space-y-1">
                  {EFFORT_LEVELS.map((level) => {
                    const isSelected = (settings.reasoningEffort || "medium") === level.id;
                    return (
                      <button
                        key={level.id}
                        onClick={() => {
                          onSelectEffort(level.id);
                          setShowEffortSubmenu(false);
                        }}
                        className={`w-full text-left px-2.5 py-2 rounded-lg transition-colors flex items-start justify-between gap-2 ${
                          isSelected
                            ? "bg-terracotta/10 text-foreground font-medium"
                            : "text-foreground-muted hover:text-foreground hover:bg-surface"
                        }`}
                      >
                        <div>
                          <div className="text-xs font-medium text-foreground">{level.label}</div>
                          <div className="text-[10px] text-foreground-muted">{level.desc}</div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-terracotta shrink-0 mt-0.5" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Row */}
            <div className="pt-1.5 flex items-center justify-between border-t border-border mt-1 px-1 text-[11px]">
              {models.length > 6 ? (
                <button
                  onClick={() => setShowAllModels(!showAllModels)}
                  className="text-foreground-muted hover:text-foreground py-1 flex items-center gap-1"
                >
                  <span>{showAllModels ? "Show fewer" : `All models (${models.length})`}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              ) : (
                <span className="text-foreground-muted/70">
                  {models.length} model{models.length === 1 ? "" : "s"}
                </span>
              )}

              <div className="flex items-center gap-1">
                <button
                  onClick={onRefreshModels}
                  disabled={isRefreshingModels}
                  className="p-1.5 text-foreground-muted hover:text-foreground hover:bg-surface-subtle rounded-lg transition-colors"
                  title="Check for newly available models"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingModels ? "animate-spin text-terracotta" : ""}`} />
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenSettings();
                  }}
                  className="p-1.5 text-foreground-muted hover:text-foreground hover:bg-surface-subtle rounded-lg transition-colors"
                  title="Manage AI settings"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
