"use client";

import React, { useState } from "react";
import { Copy, Check, FileCode, FileText } from "lucide-react";

interface CodeViewerProps {
  code?: string;
  title?: string;
  files?: Record<string, string>;
  selectedFile?: string;
  onSelectFile?: (file: string) => void;
}

export function CodeViewer({
  code: directCode,
  title = "index.html",
  files,
  selectedFile: initialSelected,
  onSelectFile,
}: CodeViewerProps) {
  const fileKeys = files ? Object.keys(files).sort() : [];
  const [internalSelected, setInternalSelected] = useState<string>(
    initialSelected || (fileKeys.length > 0 ? fileKeys[0] : title)
  );
  const [copied, setCopied] = useState(false);

  const activeFileName = initialSelected || internalSelected;
  const activeCode = files && files[activeFileName] !== undefined ? files[activeFileName] : directCode || "";

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const lines = activeCode.split("\n");
  const sizeKb = (new Blob([activeCode]).size / 1024).toFixed(1);

  return (
    <div className="h-full flex flex-col bg-surface font-mono text-xs overflow-hidden">
      {/* Code Header bar */}
      <div className="h-10 px-4 border-b border-border bg-surface-subtle flex items-center justify-between shrink-0 select-none">
        {/* Left: Multi-file tabs or Title */}
        <div className="flex items-center gap-2 overflow-x-auto min-w-0 pr-2">
          {fileKeys.length > 1 ? (
            fileKeys.map((file) => (
              <button
                key={file}
                onClick={() => {
                  setInternalSelected(file);
                  onSelectFile?.(file);
                }}
                className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  file === activeFileName
                    ? "bg-surface text-foreground shadow-2xs font-semibold"
                    : "text-foreground-muted hover:text-foreground hover:bg-surface/50"
                }`}
              >
                <FileText className="w-3 h-3 text-terracotta" />
                <span>{file}</span>
              </button>
            ))
          ) : (
            <div className="flex items-center gap-2 text-foreground-muted">
              <FileCode className="w-3.5 h-3.5 text-terracotta" />
              <span className="text-foreground font-medium">{activeFileName}</span>
              <span className="text-[10px] text-foreground-muted/70">
                {lines.length} lines · {sizeKb} KB
              </span>
            </div>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface hover:bg-surface-subtle border border-border text-foreground-muted hover:text-foreground transition-colors text-[11px] shrink-0"
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
          <code>{activeCode}</code>
        </pre>
      </div>
    </div>
  );
}
