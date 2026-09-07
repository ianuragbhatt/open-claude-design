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
    <div className="my-3 p-4 bg-[#1a1b20] border border-amber-500/30 rounded-2xl shadow-lg">
      <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>Clarification Request</span>
      </div>

      <h3 className="text-sm font-medium text-white mb-3">{form.question}</h3>

      <div className="space-y-2 mb-4">
        {form.options.map((opt) => (
          <label
            key={opt.id}
            onClick={() => setSelectedId(opt.id)}
            className={`flex items-start gap-3 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
              selectedId === opt.id
                ? "bg-amber-500/10 border-amber-500/50 text-white"
                : "bg-white/5 border-white/5 text-neutral-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <input
              type="radio"
              name={form.id}
              checked={selectedId === opt.id}
              onChange={() => setSelectedId(opt.id)}
              className="mt-0.5 accent-amber-500"
            />
            <span className="leading-relaxed">{opt.label}</span>
          </label>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
        <button
          onClick={onSkip}
          className="px-3 py-1.5 rounded-lg text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
        >
          <SkipForward className="w-3 h-3" />
          <span>Decide for me</span>
        </button>
        <button
          onClick={handleConfirm}
          className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm shadow-amber-500/20"
        >
          <span>Continue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
