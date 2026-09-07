"use client";

import React, { useState } from "react";
import { Check, ChevronRight, Sliders, RefreshCw, Settings2, AlertCircle } from "lucide-react";
import type { ApiSettings } from "@/lib/storage";

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

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute bottom-full mb-2 left-3 w-80 bg-[#1a1b20] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 text-xs overflow-hidden backdrop-blur-xl">
        {models.length === 0 ? (
          <div className="p-4 text-center space-y-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white font-medium text-xs">No models found</p>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Configure your Base URL and API Key in Settings to fetch the models available on your account.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
              className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors"
            >
              Open Settings
            </button>
          </div>
        ) : (
          <>
            {/* Model items */}
            <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
              {displayedModels.map((model) => {
                const isSelected = settings.selectedModel === model;

                return (
                  <button
                    key={model}
                    onClick={() => {
                      onSelectModel(model);
                      onClose();
                    }}
                    className={`w-full text-left p-2.5 rounded-xl flex items-start justify-between gap-3 transition-colors group ${
                      isSelected
                        ? "bg-white/10 text-white"
                        : "text-neutral-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 font-medium text-xs text-white">
                        <span className="truncate">{model}</span>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-1.5 border-t border-white/10" />

            {/* Reasoning Effort Selector */}
            <div className="relative">
              <button
                onClick={() => setShowEffortSubmenu(!showEffortSubmenu)}
                className="w-full flex items-center justify-between p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition-colors text-xs font-medium"
              >
                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Effort</span>
                </div>
                <div className="flex items-center gap-1 text-neutral-400 capitalize">
                  <span>{settings.reasoningEffort || "Medium"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Effort Submenu */}
              {showEffortSubmenu && (
                <div className="mt-1 p-1 bg-[#141518] border border-white/10 rounded-xl space-y-1">
                  {(["low", "medium", "high"] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => {
                        onSelectEffort(level);
                        setShowEffortSubmenu(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs capitalize flex items-center justify-between ${
                        settings.reasoningEffort === level
                          ? "bg-white/10 text-white font-medium"
                          : "text-neutral-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{level}</span>
                      {settings.reasoningEffort === level && (
                        <Check className="w-3.5 h-3.5 text-sky-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* More models or Refresh */}
            <div className="pt-1 flex items-center justify-between border-t border-white/10 mt-1 px-1">
              {models.length > 6 ? (
                <button
                  onClick={() => setShowAllModels(!showAllModels)}
                  className="text-[11px] text-neutral-400 hover:text-white py-1 flex items-center gap-1"
                >
                  <span>{showAllModels ? "Show fewer" : `All models (${models.length})`}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              ) : (
                <span className="text-[11px] text-neutral-500">
                  {models.length} model{models.length === 1 ? "" : "s"}
                </span>
              )}

              <div className="flex items-center gap-1">
                <button
                  onClick={onRefreshModels}
                  disabled={isRefreshingModels}
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  title="Fetch latest models from API"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingModels ? "animate-spin text-sky-400" : ""}`} />
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenSettings();
                  }}
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  title="Configure Base URL and API Key"
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
