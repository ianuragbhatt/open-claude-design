"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, Star, Sparkles, ChevronDown, ChevronUp, ShieldCheck, X } from "lucide-react";
import type { ClientReviewResult } from "@/lib/agent/client-reviewer";

interface LaptopReviewAnimationProps {
  isReviewing: boolean;
  reviewResult: ClientReviewResult | null;
  projectName?: string;
  onDismiss?: () => void;
}

export function LaptopReviewAnimation({
  isReviewing,
  reviewResult,
  projectName = "Prototype",
  onDismiss,
}: LaptopReviewAnimationProps) {
  const [isLidOpen, setIsLidOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Trigger 3D lid opening animation with realistic physics delay
  useEffect(() => {
    if (isReviewing || reviewResult) {
      const timer = setTimeout(() => setIsLidOpen(true), 150);
      return () => clearTimeout(timer);
    } else {
      setIsLidOpen(false);
      setScanProgress(0);
    }
  }, [isReviewing, reviewResult]);

  // Animated scan progress counter when reviewing
  useEffect(() => {
    if (!isReviewing) {
      if (reviewResult) setScanProgress(reviewResult.score || 95);
      return;
    }
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 94) return 94;
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 180);
    return () => clearInterval(interval);
  }, [isReviewing, reviewResult]);

  if (!isReviewing && !reviewResult) {
    return null;
  }

  return (
    <div className="w-full px-3 py-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="bg-surface border border-border/80 rounded-xl p-3.5 shadow-xl relative overflow-hidden backdrop-blur-md bg-opacity-95">
        {/* Ambient Top Glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-accent/15 blur-2xl pointer-events-none rounded-full" />

        {/* Header Bar */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold tracking-tight text-foreground">
                  Independent Client Review
                </span>
                {isReviewing ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-accent/10 border border-accent/25 text-accent animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
                    Live Audit in Progress
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    <Star className="w-2.5 h-2.5 fill-emerald-400" />
                    Score: {reviewResult?.score || 95}/100 ({reviewResult?.grade || "A+"})
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {reviewResult && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-foreground-muted hover:text-foreground text-[11px] font-medium flex items-center gap-1 px-2 py-1 rounded-md hover:bg-surface-subtle transition-colors"
              >
                <span>{isExpanded ? "Less" : "Verdict"}</span>
                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            )}
            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                className="text-foreground-muted hover:text-foreground p-1 rounded-md hover:bg-surface-subtle transition-colors"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 3D Laptop Inspection Display */}
        <div className="flex items-center justify-center py-2 select-none">
          <div className="relative flex flex-col items-center" style={{ perspective: "1000px" }}>
            
            {/* Display Lid (Opens via 3D rotateX) */}
            <div
              className="relative w-48 h-28 bg-[#18191f] border-[1.5px] border-[#383a45] rounded-t-lg shadow-2xl overflow-hidden transition-transform duration-700 ease-out origin-bottom flex flex-col justify-between"
              style={{
                transform: isLidOpen ? "rotateX(0deg)" : "rotateX(-75deg)",
                transformStyle: "preserve-3d",
                boxShadow: isLidOpen
                  ? "0 -10px 30px rgba(94, 106, 210, 0.2), 0 0 15px rgba(0, 0, 0, 0.8)"
                  : "0 2px 10px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Camera Notch */}
              <div className="w-full py-0.5 flex justify-center bg-[#121318]">
                <div className="w-1 h-1 rounded-full bg-[#2a2c35] border border-[#3c3e4a]" />
              </div>

              {/* Screen Canvas Mockup */}
              <div className="flex-1 m-1 bg-[#0d0e14] border border-[#252836] rounded-sm relative overflow-hidden flex flex-col p-1.5">
                {/* Mock Browser Header */}
                <div className="flex items-center justify-between border-b border-[#202230] pb-1 mb-1">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <span className="text-[7px] text-[#6b7280] font-mono truncate max-w-[80px]">
                    {projectName}
                  </span>
                  <div className="w-2" />
                </div>

                {/* Mock App Content Skeleton */}
                <div className="flex-1 flex flex-col gap-1 opacity-80">
                  <div className="flex gap-1">
                    <div className="w-1/3 h-4 bg-accent/20 rounded-xs" />
                    <div className="w-1/3 h-4 bg-emerald-500/15 rounded-xs" />
                    <div className="w-1/3 h-4 bg-purple-500/15 rounded-xs" />
                  </div>
                  <div className="flex-1 bg-[#161822] rounded-xs p-1 flex items-center justify-center">
                    <div className="w-full flex items-center justify-between text-[7px] text-[#8e95aa]">
                      <span>Audit: {scanProgress}%</span>
                      <Sparkles className="w-2.5 h-2.5 text-accent animate-spin" />
                    </div>
                  </div>
                </div>

                {/* Sweeping Laser Scanner Beam */}
                <div
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-80 pointer-events-none"
                  style={{
                    animation: isReviewing ? "scannerSweep 1.8s infinite ease-in-out" : "none",
                    top: isReviewing ? undefined : "50%",
                  }}
                />
              </div>

              {/* Display Chin */}
              <div className="h-1.5 bg-[#14151a] flex items-center justify-center">
                <span className="text-[5px] text-[#4b4e5f] font-bold tracking-widest uppercase">Khayal Studio</span>
              </div>
            </div>

            {/* Laptop Base / Keyboard Chassis */}
            <div className="w-56 h-3 bg-gradient-to-b from-[#2e303d] to-[#1e1f29] rounded-b-md border-t border-[#454859] shadow-lg flex items-center justify-center relative">
              {/* Trackpad Notch cutout */}
              <div className="w-8 h-1 bg-[#14151c] rounded-b-xs border-b border-[#3c3e4e]" />
            </div>

            {/* Table Shadow */}
            <div className="w-60 h-2 bg-black/40 blur-sm rounded-full -mt-0.5" />
          </div>
        </div>

        {/* Review Status Details */}
        <div className="mt-1">
          {isReviewing ? (
            <p className="text-xs text-foreground-muted text-center animate-pulse">
              Independent Client Reviewer is auditing rendered layout, color contrast, and interactive responsiveness...
            </p>
          ) : (
            <div>
              <p className="text-xs font-medium text-foreground text-center">
                {reviewResult?.headline || "Design and engineering specifications fully approved."}
              </p>
              
              {/* Expanded Critique & Strengths */}
              {isExpanded && reviewResult && (
                <div className="mt-3 pt-2.5 border-t border-border/60 text-xs space-y-2 animate-in fade-in duration-200">
                  <div className="bg-surface-subtle p-2.5 rounded-lg border border-border/50">
                    <span className="font-semibold text-foreground text-[11px] uppercase tracking-wider block mb-1">
                      Visual Polish & Usability Verdict:
                    </span>
                    <p className="text-foreground-muted text-xs leading-relaxed">
                      {reviewResult.visualPolishVerdict}
                    </p>
                  </div>

                  {reviewResult.strengths && reviewResult.strengths.length > 0 && (
                    <div className="space-y-1">
                      <span className="font-semibold text-emerald-400 text-[11px] uppercase tracking-wider block">
                        Client Strengths:
                      </span>
                      {reviewResult.strengths.map((str, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-foreground-muted text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {reviewResult.polishNotes && reviewResult.polishNotes.length > 0 && (
                    <div className="space-y-1 pt-1">
                      <span className="font-semibold text-amber-400 text-[11px] uppercase tracking-wider block">
                        Polish Opportunities:
                      </span>
                      {reviewResult.polishNotes.map((note, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-foreground-muted text-xs">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{note}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scannerSweep {
          0% { top: 10%; opacity: 0; }
          20% { opacity: 0.9; }
          80% { opacity: 0.9; }
          100% { top: 85%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
