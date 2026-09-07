"use client";

import React, { useEffect, useRef, useState } from "react";
import { injectBridgeIntoHtml } from "@/lib/iframe-bridge";

interface PreviewFrameProps {
  html: string;
  mode: "interact" | "inspect";
  onSelectElement: (info: { elementName: string; selector: string; textSnippet: string }) => void;
  isLoading?: boolean;
}

export function PreviewFrame({
  html,
  mode,
  onSelectElement,
  isLoading,
}: PreviewFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [bridgeReady, setBridgeReady] = useState(false);

  // Injected HTML
  const preparedHtml = React.useMemo(() => {
    if (!html) return "";
    return injectBridgeIntoHtml(html);
  }, [html]);

  // Listen for iframe messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== "object") return;
      if (event.data.type === "BRIDGE_READY") {
        setBridgeReady(true);
        // Send initial mode
        iframeRef.current?.contentWindow?.postMessage({ type: "SET_MODE", mode }, "*");
      } else if (event.data.type === "ELEMENT_SELECTED") {
        onSelectElement({
          elementName: event.data.elementName,
          selector: event.data.selector,
          textSnippet: event.data.textSnippet,
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [mode, onSelectElement]);

  // Sync mode changes to iframe
  useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: "SET_MODE", mode }, "*");
    }
  }, [mode, bridgeReady]);

  if (!html && isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 bg-[#0a0a0c]">
        <div className="w-8 h-8 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin mb-3" />
        <p className="text-xs font-medium">Generating prototype...</p>
      </div>
    );
  }

  if (!html) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 bg-[#0a0a0c] p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-3">
          <span className="text-xl">✨</span>
        </div>
        <p className="text-sm font-medium text-neutral-300 mb-1">Canvas is ready</p>
        <p className="text-xs text-neutral-500 max-w-sm">
          Describe the interface, landing page, or dashboard you want to design on the left to start.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative bg-white overflow-hidden">
      <iframe
        ref={iframeRef}
        srcDoc={preparedHtml}
        title="Prototype Preview"
        sandbox="allow-scripts allow-modals allow-same-origin allow-forms"
        className="w-full h-full border-none"
      />
    </div>
  );
}
