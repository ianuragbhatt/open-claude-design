"use client";

import React, { useState } from "react";
import { HelpCircle, ArrowRight, SkipForward } from "lucide-react";
import type { QuestionForm } from "@/lib/parser";

interface QuestionFormViewProps {
  form: QuestionForm;
  onSelectOption: (optionLabel: string) => void;
  onSkip: () => void;
}

export function QuestionFormView({
  form,
  onSelectOption,
  onSkip,
}: QuestionFormViewProps) {
  const [selectedId, setSelectedId] = useState<string>(form.options[0]?.id || "");

  const handleConfirm = () => {
    const chosen = form.options.find((o) => o.id === selectedId);
    if (chosen) {
      onSelectOption(chosen.label);
    } else {
      onSkip();
    }
  };

  return (
    <div className="my-3 p-4 bg-surface border border-terracotta/30 rounded-2xl shadow-sm">
      <div className="flex items-center gap-2 text-terracotta text-xs font-semibold tracking-wider mb-2">
        <HelpCircle className="w-3.5 h-3.5" />
        <span className="uppercase text-[10px]">Clarification Request</span>
      </div>

      <h3 className="text-sm font-medium text-foreground mb-3 font-serif">{form.question}</h3>

      <div className="space-y-2 mb-4">
        {form.options.map((opt) => (
          <label
            key={opt.id}
            onClick={() => setSelectedId(opt.id)}
            className={`flex items-start gap-3 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
              selectedId === opt.id
                ? "bg-terracotta/10 border-terracotta text-foreground font-medium"
                : "bg-surface-subtle border-border text-foreground-muted hover:bg-surface hover:text-foreground"
            }`}
          >
            <input
              type="radio"
              name={form.id}
              checked={selectedId === opt.id}
              onChange={() => setSelectedId(opt.id)}
              className="mt-0.5 accent-terracotta"
            />
            <span className="leading-relaxed">{opt.label}</span>
          </label>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
        <button
          onClick={onSkip}
          className="px-3 py-1.5 rounded-lg text-xs text-foreground-muted hover:text-foreground hover:bg-surface-subtle transition-colors flex items-center gap-1.5"
        >
          <SkipForward className="w-3 h-3" />
          <span>Decide for me</span>
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-1.5 rounded-lg bg-terracotta hover:bg-terracotta-hover text-white font-medium text-xs transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <span>Continue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
