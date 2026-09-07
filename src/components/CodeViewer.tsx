"use client";

import React, { useState } from "react";
import { Copy, Check, FileCode } from "lucide-react";

interface CodeViewerProps {
  code: string;
  title?: string;
}

export function CodeViewer({ code, title = "index.html" }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const lines = code.split("\n");
  const sizeKb = (new Blob([code]).size / 1024).toFixed(1);

  return (
    <div className="h-full flex flex-col bg-surface font-mono text-xs overflow-hidden">
      {/* Code Header bar */}
      <div className="h-9 px-4 border-b border-border bg-surface-subtle flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2 text-foreground-muted">
          <FileCode className="w-3.5 h-3.5 text-terracotta" />
          <span className="text-foreground font-medium">{title}</span>
          <span className="text-[10px] text-foreground-muted/70">
            {lines.length} lines · {sizeKb} KB
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface hover:bg-surface-subtle border border-border text-foreground-muted hover:text-foreground transition-colors text-[11px]"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-500 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content */}
      <div className="flex-1 overflow-auto p-4 leading-relaxed select-text">
        <pre className="text-foreground/90 font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
