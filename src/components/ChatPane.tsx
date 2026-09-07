"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  X,
  Target,
  ChevronDown,
  StopCircle,
  Plus,
  Radio,
} from "lucide-react";
import { QuestionFormView } from "./QuestionFormView";
import { ModelPickerPopover } from "./ModelPickerPopover";
import type { Message, ApiSettings } from "@/lib/storage";

interface ChatPaneProps {
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
  "Fintech mobile dashboard with balance cards, transaction history, and send money modal",
  "Dark-mode SaaS landing page with animated hero, bento feature grid, and pricing table",
  "Clean photography editorial portfolio with gallery grid and minimalist typography",
  "DevOps mission control dashboard with server health metrics and live logs panel",
];

export function ChatPane({
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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  // Friendly label for the active model
  const activeModelDisplay = settings.selectedModel
    ? settings.selectedModel
        .replace(/^accounts\/[^\/]+\/models\//, "")
        .replace(/^anthropic\//, "")
        .replace(/^openai\//, "")
    : "Select model";

  return (
    <div className="w-[420px] max-w-[45vw] h-full border-r border-white/10 bg-[#101114] flex flex-col shrink-0 select-none">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 select-text text-xs">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col justify-center text-center px-4 py-8">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-semibold text-white mb-1">What would you like to design?</h2>
            <p className="text-neutral-400 text-xs mb-6 max-w-xs mx-auto">
              Describe your interface idea or pick an architectural starter below.
            </p>

            {/* Quick Starters */}
            <div className="space-y-2 text-left">
              {STARTER_PROMPTS.map((starter, i) => (
                <button
                  key={i}
                  onClick={() => onSendMessage(starter)}
                  className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-neutral-300 hover:text-white transition-all text-[11px] leading-relaxed block group"
                >
                  <span className="text-neutral-500 group-hover:text-amber-400 mr-1.5 font-mono">
                    0{i + 1}
                  </span>
                  {starter}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.role === "user" ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                  msg.role === "user"
                    ? "bg-amber-500 text-black font-medium shadow-md shadow-amber-500/10"
                    : "bg-[#18191e] border border-white/10 text-neutral-200"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {msg.questionForm && (
                  <QuestionFormView
                    form={msg.questionForm}
                    onSelectOption={(label) => onSendMessage(label)}
                    onSkip={() => onSendMessage("Proceed with the most modern recommendation")}
                  />
                )}
              </div>
              <span className="text-[10px] text-neutral-500 mt-1 px-1">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-neutral-400 bg-white/5 border border-white/5 rounded-2xl px-3.5 py-2.5 max-w-[80%]">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>Generating interface design...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Composer Input Area */}
      <div className="p-3 border-t border-white/10 bg-[#141519]">
        {/* Selected Element Pin Badge */}
        {selectedElement && (
          <div className="mb-2 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] flex items-center justify-between">
            <div className="flex items-center gap-1.5 truncate">
              <Target className="w-3 h-3 text-amber-400 shrink-0" />
              <span className="font-semibold">Target:</span>
              <span className="font-mono truncate">{selectedElement.elementName}</span>
              {selectedElement.textSnippet && (
                <span className="text-neutral-400 truncate max-w-[140px]">
                  ("{selectedElement.textSnippet}")
                </span>
              )}
            </div>
            <button
              onClick={onClearSelectedElement}
              className="p-0.5 hover:bg-amber-500/20 rounded text-neutral-400 hover:text-white"
              title="Clear target selection"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Text Input Box */}
        <div className="relative flex flex-col bg-[#1c1d22] border border-white/10 rounded-2xl p-2.5 focus-within:border-amber-500/50 transition-colors">
          <textarea
            ref={textareaRef}
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              selectedElement
                ? `What would you like to change in "${selectedElement.elementName}"?`
                : "Describe what to build or modify..."
            }
            className="w-full bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none resize-none leading-relaxed"
          />

          {/* Bottom Bar: Action buttons & Model selector pill */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
            {/* Left Actions & Model Selector Pill */}
            <div className="flex items-center gap-1.5 relative">
              <button
                type="button"
                onClick={() => alert("Upload references or context")}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                title="Add reference file or context"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => alert("Voice dictation input")}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                title="Voice input"
              >
                <Radio className="w-3.5 h-3.5" />
              </button>

              {/* Model Picker Pill (Just like screenshot!) */}
              <button
                type="button"
                onClick={() => setIsModelPickerOpen(!isModelPickerOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors border ${
                  settings.selectedModel
                    ? "bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border-white/5"
                    : "bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30"
                }`}
                title="Select model and reasoning effort"
              >
                {!settings.selectedModel && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                )}
                <span className="truncate max-w-[120px]">{activeModelDisplay}</span>
                {settings.selectedModel && (
                  <span className="text-neutral-500 capitalize text-[10px]">
                    {settings.reasoningEffort || "Medium"}
                  </span>
                )}
                <ChevronDown className="w-3 h-3 text-neutral-400" />
              </button>

              {/* Model Picker Popover */}
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
                  className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors flex items-center gap-1 text-xs"
                  title="Stop generation"
                >
                  <StopCircle className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  disabled={!input.trim()}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 disabled:opacity-30 text-white font-medium text-xs transition-all shadow-md shadow-orange-500/20 flex items-center gap-1.5"
                  title="Send prompt (Enter)"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-neutral-500 mt-1.5 px-1">
          <span>Shift+Enter for newline</span>
          <span>OpenAI-compatible unified API</span>
        </div>
      </div>
    </div>
  );
}
