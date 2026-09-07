"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Target,
  ChevronDown,
  StopCircle,
  Plus,
  Palette,
  Check,
  LayoutGrid,
  Pencil,
  Play,
  SquarePen,
  Wand2,
} from "lucide-react";
import { QuestionFormView } from "./QuestionFormView";
import { ModelPickerPopover } from "./ModelPickerPopover";
import { getAllDesignSystems, type DesignSystem } from "@/lib/design-systems";
import type { Message, ApiSettings, Project } from "@/lib/storage";
import { formatModelName, formatElementName } from "@/lib/formatters";

interface ChatPaneProps {
  project: Project;
  allProjects: Project[];
  onSelectProject: (projectId: string) => void;
  onNewProject: () => void;
  onRenameProject: (newName: string) => void;
  onDeleteProject?: (projectId: string) => void;
  onGoHome: () => void;
  brandId: string;
  onSelectBrand: (brandId: string) => void;
  customBrand?: string;
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  onStopGeneration?: () => void;
  selectedElement: { elementName: string; selector: string; textSnippet: string } | null;
  onClearSelectedElement: () => void;
  settings: ApiSettings;
  onUpdateSettings: (settings: ApiSettings) => void;
  onOpenSettings: () => void;
}

const STARTER_PROMPTS = [
  "Mobile banking app with card balance, quick transfers, and expense breakdown",
  "Editorial magazine reader with serif typography, featured stories, and newsletter",
  "Creative agency portfolio with interactive project grid and case study preview",
  "Modern SaaS analytics dashboard with revenue charts, active user stats, and filter tabs",
];

const QUICK_REVISIONS = [
  "Make this layout mobile responsive with a clean drawer menu",
  "Add an interactive dark / light theme toggle",
  "Add customer testimonials with star ratings and avatar stack",
  "Improve typography contrast and generous whitespace",
  "Add interactive tabs and live search filtering",
];

export function ChatPane({
  project,
  allProjects,
  onSelectProject,
  onNewProject,
  onRenameProject,
  onGoHome,
  brandId,
  onSelectBrand,
  messages,
  isLoading,
  onSendMessage,
  onStopGeneration,
  selectedElement,
  onClearSelectedElement,
  settings,
  onUpdateSettings,
  onOpenSettings,
}: ChatPaneProps) {
  const [input, setInput] = useState("");
  const [isModelPickerOpen, setIsModelPickerOpen] = useState(false);
  const [isRefreshingModels, setIsRefreshingModels] = useState(false);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  const [isBrandMenuOpen, setIsBrandMenuOpen] = useState(false);
  const [isQuickIdeasOpen, setIsQuickIdeasOpen] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(project.name);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const allBrands = getAllDesignSystems();
  const currentBrand = allBrands.find((b) => b.id === brandId) || allBrands[0];

  useEffect(() => {
    setEditedTitle(project.name);
  }, [project.name]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

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

  const modelInfo = formatModelName(settings.selectedModel);
  const friendlyElementName = selectedElement
    ? formatElementName(selectedElement.elementName, selectedElement.textSnippet)
    : "";

  return (
    <div className="w-[420px] max-w-[45vw] h-full border-r border-border bg-surface flex flex-col shrink-0 select-none text-foreground transition-colors">
      {/* Top Left Header */}
      <div className="h-12 px-4 border-b border-border bg-surface flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2 min-w-0 relative">
          <button
            onClick={onGoHome}
            className="w-7 h-7 rounded-lg bg-surface-subtle border border-border/80 flex items-center justify-center text-terracotta hover:border-terracotta/40 transition-colors shrink-0 shadow-2xs"
            title="All designs gallery"
          >
            <Sparkles className="w-3.5 h-3.5 fill-terracotta/20 text-terracotta" />
          </button>

          {/* Project Title Dropdown */}
          <div className="relative min-w-0">
            {isEditingTitle ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={() => {
                  if (editedTitle.trim() && editedTitle !== project.name) {
                    onRenameProject(editedTitle.trim());
                  }
                  setIsEditingTitle(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (editedTitle.trim() && editedTitle !== project.name) {
                      onRenameProject(editedTitle.trim());
                    }
                    setIsEditingTitle(false);
                  } else if (e.key === "Escape") {
                    setEditedTitle(project.name);
                    setIsEditingTitle(false);
                  }
                }}
                autoFocus
                className="bg-surface-subtle border border-terracotta rounded px-2 py-0.5 text-xs text-foreground font-medium focus:outline-none"
              />
            ) : (
              <button
                onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
                className="flex items-center gap-1 text-[13px] font-medium text-foreground hover:text-terracotta transition-colors truncate max-w-[190px] py-1 px-1.5 rounded-md hover:bg-surface-subtle"
                title="Switch or rename design"
              >
                <span className="truncate">{project.name}</span>
                <ChevronDown className="w-3 h-3 text-foreground-muted opacity-70 shrink-0" />
              </button>
            )}

            {/* Project Picker Dropdown */}
            {isProjectMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsProjectMenuOpen(false)} />
                <div className="absolute top-full left-0 mt-1 w-64 bg-surface border border-border rounded-xl shadow-xl p-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground-muted px-2.5 py-1">
                    Saved Designs
                  </div>
                  <div className="max-h-56 overflow-y-auto space-y-0.5 py-1">
                    {allProjects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectProject(p.id);
                          setIsProjectMenuOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between gap-2 transition-colors ${
                          p.id === project.id
                            ? "bg-surface-subtle text-foreground font-medium"
                            : "text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
                        }`}
                      >
                        <span className="truncate">{p.name}</span>
                        {p.id === project.id && <Check className="w-3.5 h-3.5 text-terracotta shrink-0" />}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-border mt-1 pt-1 space-y-0.5">
                    <button
                      onClick={() => {
                        setIsEditingTitle(true);
                        setIsProjectMenuOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-subtle flex items-center gap-2"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Rename Design</span>
                    </button>
                    <button
                      onClick={() => {
                        onNewProject();
                        setIsProjectMenuOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-subtle flex items-center gap-2"
                    >
                      <Plus className="w-3 h-3" />
                      <span>New Design</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Header icons: Home Gallery / New Session */}
        <div className="flex items-center gap-1">
          <button
            onClick={onGoHome}
            className="w-8 h-8 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-subtle flex items-center justify-center transition-colors"
            title="All designs and styles"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={onNewProject}
            className="w-8 h-8 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-subtle flex items-center justify-center transition-colors"
            title="Start fresh design"
          >
            <SquarePen className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 select-text text-xs">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col justify-center text-center px-4 py-8">
            <div className="w-11 h-11 rounded-2xl bg-terracotta/10 border border-terracotta/20 text-terracotta flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="font-editorial text-lg font-medium text-foreground mb-1">
              What would you like to design?
            </h2>
            <p className="text-foreground-muted text-xs mb-6 max-w-xs mx-auto leading-relaxed">
              Describe your interface idea or click an inspiration starter below.
            </p>

            {/* Quick Starters */}
            <div className="space-y-2 text-left">
              {STARTER_PROMPTS.map((starter, i) => (
                <button
                  key={i}
                  onClick={() => onSendMessage(starter)}
                  className="w-full text-left p-3 rounded-xl bg-surface-subtle hover:bg-surface border border-border text-foreground-muted hover:text-foreground transition-all text-xs leading-relaxed block group hover:border-terracotta/40 shadow-xs"
                >
                  <span className="text-foreground-muted group-hover:text-terracotta mr-2 font-mono text-[11px]">
                    0{i + 1}
                  </span>
                  {starter}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="py-1.5">
              {msg.role === "user" ? (
                <div className="flex justify-end mb-1">
                  <div className="max-w-[92%] rounded-2xl px-4 py-2.5 bg-surface-subtle border border-border/80 text-foreground text-xs leading-relaxed shadow-xs">
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ) : (
                <div className="text-foreground/90 text-xs leading-relaxed space-y-2 select-text font-sans">
                  <div className="whitespace-pre-wrap font-normal">{msg.content}</div>

                  {msg.questionForm && (
                    <QuestionFormView
                      form={msg.questionForm}
                      onSelectOption={(label) => onSendMessage(label)}
                      onSkip={() => onSendMessage("Proceed with the most modern recommendation")}
                    />
                  )}
                </div>
              )}
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-foreground-muted py-2 px-1">
            <div className="w-2 h-2 rounded-full bg-terracotta animate-ping" />
            <span>Crafting your interface design...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Composer Area */}
      <div className="p-3 border-t border-border bg-surface flex flex-col gap-2">
        {/* Top Composer Row: Brand Style link & Selected Target Pin */}
        <div className="flex items-center justify-between text-xs px-1">
          {/* Brand Style Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsBrandMenuOpen(!isBrandMenuOpen)}
              className="flex items-center gap-1.5 text-[11px] text-foreground-muted hover:text-foreground transition-colors font-medium group"
              title="Change active brand style"
            >
              <Palette className="w-3 h-3 text-terracotta" />
              <span className="truncate max-w-[200px]">{currentBrand.name}</span>
              <ChevronDown className="w-3 h-3 text-foreground-muted group-hover:text-foreground" />
            </button>

            {isBrandMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsBrandMenuOpen(false)} />
                <div className="absolute bottom-full mb-2 left-0 w-72 bg-surface border border-border rounded-xl shadow-2xl p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground-muted px-2 py-1 mb-1 border-b border-border">
                    Select Brand Style
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-1">
                    {allBrands.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          onSelectBrand(b.id);
                          setIsBrandMenuOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg flex items-center justify-between transition-colors ${
                          b.id === brandId
                            ? "bg-surface-subtle text-foreground font-medium"
                            : "text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: b.accentColor }}
                          />
                          <span className="truncate">{b.name}</span>
                        </div>
                        {b.id === brandId && (
                          <Check className="w-3.5 h-3.5 text-terracotta shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Selected Element Pin Badge */}
          {selectedElement && (
            <div className="px-2.5 py-0.5 rounded-md bg-terracotta/10 border border-terracotta/30 text-terracotta text-[10px] flex items-center gap-1.5">
              <Target className="w-2.5 h-2.5 text-terracotta shrink-0" />
              <span className="font-medium truncate max-w-[140px]">{friendlyElementName}</span>
              <button
                onClick={onClearSelectedElement}
                className="hover:text-foreground ml-1"
                title="Deselect section"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="relative flex flex-col bg-surface-subtle border border-border rounded-2xl p-2.5 focus-within:border-terracotta transition-colors shadow-xs">
          <textarea
            ref={textareaRef}
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              selectedElement
                ? `What changes would you like to make to ${friendlyElementName}?`
                : "Describe changes, new features, or refinements..."
            }
            className="w-full bg-transparent text-xs text-foreground placeholder-foreground-muted/60 focus:outline-none resize-none leading-relaxed"
          />

          {/* Bottom Bar */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
            {/* Left: Quick Ideas & Model Selector Pill */}
            <div className="flex items-center gap-1.5 relative">
              {/* Quick Ideas Popover Button */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsQuickIdeasOpen(!isQuickIdeasOpen)}
                  className="p-1.5 rounded-lg bg-surface hover:bg-surface-subtle border border-border text-foreground-muted hover:text-foreground transition-colors"
                  title="Quick design enhancements"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                </button>

                {isQuickIdeasOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsQuickIdeasOpen(false)}
                    />
                    <div className="absolute bottom-full mb-2 left-0 w-72 bg-surface border border-border rounded-xl shadow-2xl p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground-muted px-2 py-1 mb-1 border-b border-border">
                        Quick Enhancements
                      </div>
                      <div className="space-y-1">
                        {QUICK_REVISIONS.map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setInput((prev) => (prev ? `${prev}. ${item}` : item));
                              setIsQuickIdeasOpen(false);
                              textareaRef.current?.focus();
                            }}
                            className="w-full text-left p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-subtle text-xs transition-colors"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Model Picker Pill */}
              <button
                type="button"
                onClick={() => setIsModelPickerOpen(!isModelPickerOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors border ${
                  settings.selectedModel
                    ? "bg-surface hover:bg-surface-subtle text-foreground border-border"
                    : "bg-terracotta/10 hover:bg-terracotta/20 text-terracotta border-terracotta/30"
                }`}
                title="Select model and thinking depth"
              >
                {!settings.selectedModel && (
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
                )}
                <span className="truncate max-w-[130px]">{modelInfo.displayName}</span>
                <ChevronDown className="w-3 h-3 text-foreground-muted" />
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

            {/* Right: Send / Stop button */}
            <div>
              {isLoading ? (
                <button
                  type="button"
                  onClick={onStopGeneration}
                  className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium text-xs transition-colors flex items-center gap-1.5"
                  title="Stop generating"
                >
                  <StopCircle className="w-3.5 h-3.5" />
                  <span>Stop</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  disabled={!input.trim()}
                  className="px-3.5 py-1.5 rounded-xl bg-terracotta hover:bg-terracotta-hover disabled:opacity-35 text-white font-medium text-xs transition-all shadow-sm flex items-center gap-1.5"
                  title="Send (Enter)"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Send</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
