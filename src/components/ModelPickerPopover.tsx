"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, ChevronRight, Settings2, AlertCircle } from "lucide-react";
import { type ApiSettings, getConfiguredModels } from "@/lib/storage";

interface ModelPickerPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ApiSettings;
  onSelectModel: (model: string) => void;
  onSelectEffort: (effort: "low" | "medium" | "high") => void;
  onOpenSettings: () => void;
  onRefreshModels?: () => void;
  isRefreshingModels?: boolean;
}

interface EffortOption {
  id: "low" | "medium" | "high";
  label: string;
  isDefault?: boolean;
}

const EFFORT_OPTIONS: EffortOption[] = [
  { id: "low", label: "Low" },
  { id: "medium", label: "Medium" },
  { id: "high", label: "High", isDefault: true },
];

export function ModelPickerPopover({
  isOpen,
  onClose,
  settings,
  onSelectModel,
  onSelectEffort,
  onOpenSettings,
}: ModelPickerPopoverProps) {
  const [showEffortSubmenu, setShowEffortSubmenu] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [placement, setPlacement] = useState<"top" | "bottom">("bottom");
  const [alignRight, setAlignRight] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const parent = popoverRef.current?.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();

      // Check vertical space: popover needs ~320px
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;

      // If space above is tight (< 340px) and there's more space below, open downward
      if (spaceAbove < 340 && spaceBelow > spaceAbove) {
        setPlacement("bottom");
      } else {
        setPlacement("top");
      }

      // Check horizontal space: main popover (288px) + submenu (288px) = ~580px
      const spaceRight = window.innerWidth - rect.left;
      if (spaceRight < 580 && rect.right > 580) {
        setAlignRight(true);
      } else {
        setAlignRight(false);
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [isOpen]);

  if (!isOpen) return null;

  const models = getConfiguredModels(settings);

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={() => {
          setShowEffortSubmenu(false);
          onClose();
        }}
      />

      <div
        ref={popoverRef}
        className={`absolute z-50 flex ${
          placement === "top" ? "bottom-full mb-2 items-end" : "top-full mt-2 items-start"
        } ${alignRight ? "right-0" : "left-0"}`}
      >
        {/* Main Model Selector Card */}
        <div className="w-72 bg-surface/95 border border-border rounded-2xl shadow-2xl p-1.5 z-50 text-xs backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 select-none">
          {models.length === 0 ? (
            <div className="p-4 text-center space-y-3">
              <div className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-foreground font-medium text-xs">No models configured</p>
                <p className="text-[11px] text-foreground-muted mt-1 leading-relaxed">
                  Configure and name your models in Settings.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSettings();
                }}
                className="w-full py-2 rounded-xl bg-terracotta hover:bg-terracotta-hover text-white font-medium text-xs transition-colors shadow-sm"
              >
                Open Settings
              </button>
            </div>
          ) : (
            <>
              {/* Models List */}
              <div className="space-y-0.5 max-h-56 overflow-y-auto pr-0.5">
                {models.map((model) => {
                  const isSelected = settings.selectedModel === model.id;

                  return (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => {
                        onSelectModel(model.id);
                        onClose();
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors group ${
                        isSelected
                          ? "bg-surface-subtle text-foreground"
                          : "text-foreground-muted hover:bg-surface-subtle hover:text-foreground"
                      }`}
                    >
                      <div className="flex-1 min-w-0 mr-2">
                        <div className="font-medium text-[13px] text-foreground truncate">
                          {model.customName}
                        </div>
                        {model.description && (
                          <div className="text-[11px] text-foreground-muted/80 truncate mt-0.5">
                            {model.description}
                          </div>
                        )}
                      </div>

                      {isSelected && (
                        <Check className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="my-1 border-t border-border" />

              {/* Effort Row */}
              <button
                type="button"
                onClick={() => setShowEffortSubmenu(!showEffortSubmenu)}
                onMouseEnter={() => setShowEffortSubmenu(true)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors text-[13px] font-medium ${
                  showEffortSubmenu
                    ? "bg-surface-subtle text-foreground"
                    : "text-foreground hover:bg-surface-subtle"
                }`}
              >
                <span>Effort</span>
                <div className="flex items-center gap-1 text-foreground-muted text-xs">
                  <span className="capitalize">{settings.reasoningEffort || "medium"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Divider */}
              <div className="my-1 border-t border-border" />

              {/* More Models / Configure */}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSettings();
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-foreground hover:bg-surface-subtle transition-colors text-[13px] font-medium"
              >
                <span>More models</span>
                <ChevronRight className="w-3.5 h-3.5 text-foreground-muted" />
              </button>
            </>
          )}
        </div>

        {/* Effort Flyout Submenu (opens to the right or left based on screen clearance) */}
        {showEffortSubmenu && (
          <div
            className={`${
              alignRight ? "mr-2 -order-1" : "ml-2"
            } w-72 bg-surface/95 border border-border rounded-2xl shadow-2xl p-3 z-50 text-xs backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100 select-none`}
          >
            <p className="text-[11px] text-foreground-muted leading-relaxed pb-2.5 border-b border-border">
              Higher effort means more thorough responses, but takes longer and uses your limits faster.
            </p>

            <div className="pt-2 space-y-0.5">
              {EFFORT_OPTIONS.map((item) => {
                const isSelected = (settings.reasoningEffort || "medium") === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectEffort(item.id);
                      setShowEffortSubmenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-[13px] transition-colors ${
                      isSelected
                        ? "bg-surface-subtle text-foreground font-medium"
                        : "text-foreground hover:bg-surface-subtle"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{item.label}</span>
                      {item.isDefault && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface border border-border text-foreground-muted font-normal">
                          Default
                        </span>
                      )}
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-500 dark:text-blue-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
