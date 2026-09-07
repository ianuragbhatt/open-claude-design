"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Share2,
  Check,
  Copy,
  ChevronDown,
  ChevronRight,
  Code2,
  Pencil,
  BookOpen,
  Layers,
  Box,
  Palette,
  Type,
  Maximize2,
  Minimize2,
  ArrowUpRight,
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  Sliders,
  CheckSquare,
  Square,
  Undo2,
  Save,
  Monitor,
  Smartphone,
  Tablet,
  LayoutGrid,
  FileCode,
  X,
  Plus,
  Image as ImageIcon,
  Compass,
  Download,
  Search,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Info,
  ExternalLink,
  Eye,
} from "lucide-react";
import {
  getDesignSystem,
  getAllDesignSystems,
  updateDesignSystem,
  resetDesignSystem,
  duplicateDesignSystem,
  exportDesignSystemMarkdown,
  exportDesignSystemCss,
  exportDesignSystemJson,
  type RichDesignSystem,
  type DesignSystemSlide,
} from "@/lib/design-systems";
import type { ApiSettings } from "@/lib/storage";
import { ModelPickerPopover } from "./ModelPickerPopover";
import { formatModelName, getWcagRating } from "@/lib/formatters";

interface DesignSystemViewProps {
  initialSystemId?: string;
  settings: ApiSettings;
  onUpdateSettings: (newSettings: ApiSettings) => void;
  onOpenSettings: () => void;
  onUseDesignSystem: (systemId: string, promptText?: string) => void;
  onBack: () => void;
}

type SubNavSection =
  | "readme"
  | "templates-deck"
  | "templates-landing"
  | "templates-dashboard"
  | "components-buttons"
  | "components-badges"
  | "components-cards"
  | "components-stats"
  | "components-alerts"
  | "components-dialog"
  | "components-forms"
  | "components-navigation"
  | "components-table"
  | "foundations-color"
  | "foundations-icons"
  | "foundations-imagery"
  | "foundations-spacing"
  | "foundations-typography"
  | "theme-parameters";

const CURATED_ICONS = [
  { name: "sparkles", category: "Actions", label: "Sparkles / AI" },
  { name: "arrow-right", category: "Actions", label: "Arrow Right" },
  { name: "arrow-up-right", category: "Actions", label: "Arrow Up Right" },
  { name: "check", category: "Actions", label: "Checkmark" },
  { name: "plus", category: "Actions", label: "Plus / Create" },
  { name: "search", category: "Actions", label: "Search" },
  { name: "copy", category: "Actions", label: "Copy" },
  { name: "pencil", category: "Actions", label: "Edit / Pencil" },
  { name: "download", category: "Actions", label: "Download" },
  { name: "share-2", category: "Actions", label: "Share" },
  { name: "compass", category: "Navigation", label: "Compass" },
  { name: "layers", category: "Navigation", label: "Layers" },
  { name: "layout-grid", category: "Navigation", label: "Grid Layout" },
  { name: "chevron-right", category: "Navigation", label: "Chevron Right" },
  { name: "chevron-down", category: "Navigation", label: "Chevron Down" },
  { name: "book-open", category: "Navigation", label: "Book Open / Docs" },
  { name: "palette", category: "Interface", label: "Palette" },
  { name: "type", category: "Interface", label: "Typography" },
  { name: "sliders", category: "Interface", label: "Sliders / Knobs" },
  { name: "code-2", category: "Interface", label: "Code" },
  { name: "file-code", category: "Interface", label: "File Code" },
  { name: "eye", category: "Interface", label: "Preview / Eye" },
  { name: "box", category: "Interface", label: "Box / Primitive" },
  { name: "shield-check", category: "Status", label: "Shield Verified" },
  { name: "check-circle-2", category: "Status", label: "Success Circle" },
  { name: "alert-circle", category: "Status", label: "Alert Circle" },
  { name: "info", category: "Status", label: "Information" },
  { name: "image", category: "Media & Tech", label: "Image / Media" },
  { name: "monitor", category: "Media & Tech", label: "Desktop View" },
  { name: "tablet", category: "Media & Tech", label: "Tablet View" },
  { name: "smartphone", category: "Media & Tech", label: "Mobile View" },
];

export function DesignSystemView({
  initialSystemId = "modernist",
  settings,
  onUpdateSettings,
  onOpenSettings,
  onUseDesignSystem,
  onBack,
}: DesignSystemViewProps) {
  const [activeSystemId, setActiveSystemId] = useState<string>(initialSystemId);
  const [currentSystem, setCurrentSystem] = useState<RichDesignSystem>(
    getDesignSystem(initialSystemId)
  );
  const [activeSection, setActiveSection] = useState<SubNavSection>("readme");
  const [isSystemMenuOpen, setIsSystemMenuOpen] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isFullscreenDeck, setIsFullscreenDeck] = useState(false);

  // View state for components & templates (preview vs code)
  const [codeViewMode, setCodeViewMode] = useState<"preview" | "code">("preview");
  const [landingViewport, setLandingViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Edit Drawer / Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<"deck" | "landing" | "component" | "tokens">("deck");
  const [editContent, setEditContent] = useState("");

  // Figma import modal
  const [isFigmaModalOpen, setIsFigmaModalOpen] = useState(false);
  const [figmaInput, setFigmaInput] = useState("");

  // Chat bar state in left sidebar
  const [chatInput, setChatInput] = useState("");
  const [isModelPickerOpen, setIsModelPickerOpen] = useState(false);
  const [isAiModifying, setIsAiModifying] = useState(false);

  // Foundations interactive state
  const [specimenText, setSpecimenText] = useState("The quick brown fox jumps over the lazy dog.");
  const [iconCategory, setIconCategory] = useState("All");
  const [iconSearch, setIconSearch] = useState("");
  const [iconStrokeWidth, setIconStrokeWidth] = useState<number>(1.75);

  const imageUploadRef = useRef<HTMLInputElement>(null);

  // Navigation group collapsed state
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({
    templates: false,
    components: false,
    foundations: false,
    theme: false,
  });

  const allSystems = getAllDesignSystems();

  useEffect(() => {
    const sys = getDesignSystem(activeSystemId);
    setCurrentSystem(sys);
    setActiveSlideIndex(0);
  }, [activeSystemId]);

  // Keyboard navigation for presentation deck
  useEffect(() => {
    if (activeSection !== "templates-deck") return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveSlideIndex((prev) =>
          prev < currentSystem.templates.deck.slides.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowLeft") {
        setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Escape" && isFullscreenDeck) {
        setIsFullscreenDeck(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, currentSystem.templates.deck.slides.length, isFullscreenDeck]);

  const toggleGroup = (group: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const handleDownloadFile = (content: string, filename: string, mimeType = "text/plain") => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDuplicateSystem = () => {
    const duplicated = duplicateDesignSystem(currentSystem.id);
    setActiveSystemId(duplicated.id);
    setCurrentSystem(duplicated);
    handleCopy("", "duplicate");
  };

  // Modify live token in state & storage
  const handleTokenColorChange = (index: number, newHex: string) => {
    const updatedColors = [...currentSystem.foundations.colors];
    updatedColors[index] = { ...updatedColors[index], hex: newHex };
    const updated = {
      ...currentSystem,
      accentColor: index === 0 ? newHex : currentSystem.accentColor,
      foundations: {
        ...currentSystem.foundations,
        colors: updatedColors,
      },
    };
    setCurrentSystem(updated);
    updateDesignSystem(updated);
  };

  const handleTogglePublished = () => {
    const updated = { ...currentSystem, published: !currentSystem.published };
    setCurrentSystem(updated);
    updateDesignSystem(updated);
  };

  const handleSetOrgDefault = () => {
    const updated = { ...currentSystem, isOrgDefault: true };
    setCurrentSystem(updated);
    updateDesignSystem(updated);
  };

  const handleResetSystem = () => {
    resetDesignSystem(currentSystem.id);
    setCurrentSystem(getDesignSystem(currentSystem.id));
  };

  // Image color extraction for left sidebar screenshot card
  const handleScreenshotReferenceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          canvas.width = 100;
          canvas.height = 100;
          ctx.drawImage(img, 0, 0, 100, 100);
          const p1 = ctx.getImageData(50, 50, 1, 1).data;
          const toHex = (r: number, g: number, b: number) =>
            "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
          const extractedHex = toHex(p1[0], p1[1], p1[2]);
          handleTokenColorChange(0, extractedHex);
        } catch {
          // ignore
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Open edit modal for active item
  const openEditor = (target: "deck" | "landing" | "component" | "tokens") => {
    setEditTarget(target);
    if (target === "deck") {
      setEditContent(JSON.stringify(currentSystem.templates.deck.slides, null, 2));
    } else if (target === "landing") {
      setEditContent(JSON.stringify(currentSystem.templates.landing, null, 2));
    } else if (target === "tokens") {
      setEditContent(currentSystem.tokensCss);
    } else {
      const compKey = activeSection.replace("components-", "") as keyof typeof currentSystem.components;
      const comp = currentSystem.components[compKey] || currentSystem.components.buttons;
      setEditContent(comp.previewCode);
    }
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    try {
      if (editTarget === "deck") {
        const parsedSlides = JSON.parse(editContent);
        const updated = {
          ...currentSystem,
          templates: {
            ...currentSystem.templates,
            deck: {
              ...currentSystem.templates.deck,
              slides: parsedSlides,
            },
          },
        };
        setCurrentSystem(updated);
        updateDesignSystem(updated);
      } else if (editTarget === "landing") {
        const parsedLanding = JSON.parse(editContent);
        const updated = {
          ...currentSystem,
          templates: {
            ...currentSystem.templates,
            landing: parsedLanding,
          },
        };
        setCurrentSystem(updated);
        updateDesignSystem(updated);
      } else if (editTarget === "tokens") {
        const updated = { ...currentSystem, tokensCss: editContent };
        setCurrentSystem(updated);
        updateDesignSystem(updated);
      } else {
        const compKey = activeSection.replace("components-", "") as keyof typeof currentSystem.components;
        const updated = {
          ...currentSystem,
          components: {
            ...currentSystem.components,
            [compKey]: {
              ...(currentSystem.components[compKey] || { name: compKey, description: "" }),
              previewCode: editContent,
            },
          },
        };
        setCurrentSystem(updated);
        updateDesignSystem(updated);
      }
      setIsEditModalOpen(false);
    } catch {
      alert("Invalid format. Please ensure your syntax is correct.");
    }
  };

  // Conversational AI adjustment using /api/chat or reactive color keywords
  const handleSendChat = async () => {
    if (!chatInput.trim() || isAiModifying) return;
    const prompt = chatInput.trim();
    setChatInput("");
    setIsAiModifying(true);

    const lower = prompt.toLowerCase();
    const colorMap: Record<string, string> = {
      blue: "#2563eb",
      indigo: "#4f46e5",
      red: "#e11d48",
      emerald: "#10b981",
      purple: "#9333ea",
      cyan: "#06b6d4",
      amber: "#d97706",
      violet: "#8b5cf6",
      terracotta: "#d97757",
      coral: "#e28767",
    };

    let appliedDirect = false;
    for (const [colName, colHex] of Object.entries(colorMap)) {
      if (lower.includes(colName)) {
        handleTokenColorChange(0, colHex);
        appliedDirect = true;
        break;
      }
    }

    // If API settings are configured, also perform conversational refinement
    if (!appliedDirect && settings.apiKey) {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [
              {
                role: "user",
                content: `You are adjusting design system tokens for "${currentSystem.name}". Current accent: ${currentSystem.accentColor}, background dark: ${currentSystem.bgDark}. Request: ${prompt}. Respond with a brief 1-sentence confirmation.`,
              },
            ],
            brandId: currentSystem.id,
            baseUrl: settings.baseUrl,
            apiKey: settings.apiKey,
            model: settings.selectedModel,
          }),
        });
        if (res.ok) {
          // confirmed
        }
      } catch {
        // fallback
      }
    }

    setIsAiModifying(false);
  };

  const activeSlide: DesignSystemSlide =
    currentSystem.templates.deck.slides[activeSlideIndex] ||
    currentSystem.templates.deck.slides[0];

  const modelInfo = formatModelName(settings.selectedModel);

  // Filtered icons
  const filteredIcons = CURATED_ICONS.filter((item) => {
    const matchCat = iconCategory === "All" || item.category === iconCategory;
    const matchSearch =
      !iconSearch.trim() ||
      item.name.toLowerCase().includes(iconSearch.toLowerCase()) ||
      item.label.toLowerCase().includes(iconSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="w-full h-full flex flex-col bg-background text-foreground overflow-hidden font-sans select-none">
      {/* ─── TOP HEADER ──────────────────────────────────────────────────────── */}
      <header className="h-12 w-full px-4 border-b border-border bg-surface flex items-center justify-between shrink-0 z-30">
        {/* Left: Brand Dropdown & Tab */}
        <div className="flex items-center gap-3">
          {/* Brand Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setIsSystemMenuOpen(!isSystemMenuOpen)}
              className="flex items-center gap-2 px-2.5 py-1 rounded-lg hover:bg-surface-subtle border border-transparent hover:border-border text-sm font-semibold text-foreground transition-all"
            >
              <div
                className="w-3 h-3 rounded-full shrink-0 shadow-2xs"
                style={{ backgroundColor: currentSystem.accentColor }}
              />
              <span>{currentSystem.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-foreground-muted" />
            </button>

            {isSystemMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsSystemMenuOpen(false)}
                />
                <div className="absolute top-full mt-1.5 left-0 w-80 bg-surface border border-border rounded-xl shadow-2xl p-2 z-50 text-xs animate-in fade-in zoom-in-95 duration-100 max-h-[420px] overflow-y-auto">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground-muted px-2 py-1 mb-1 border-b border-border flex items-center justify-between">
                    <span>Curated Design Systems</span>
                    <span className="font-mono text-[9px]">{allSystems.length} available</span>
                  </div>
                  <div className="space-y-1">
                    {allSystems.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setActiveSystemId(s.id);
                          setIsSystemMenuOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg flex items-center justify-between transition-colors ${
                          s.id === activeSystemId
                            ? "bg-terracotta/10 text-terracotta font-medium border border-terracotta/20"
                            : "hover:bg-surface-subtle text-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-6 h-4 rounded border border-border overflow-hidden flex shrink-0">
                            {s.swatchColors?.map((c, i) => (
                              <div
                                key={i}
                                className="flex-1 h-full"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                          <div className="truncate">
                            <span className="font-medium">{s.name}</span>
                            <span className="text-[10px] text-foreground-muted block truncate">
                              {s.category || s.badge}
                            </span>
                          </div>
                        </div>
                        {s.id === activeSystemId && (
                          <Check className="w-3.5 h-3.5 text-terracotta shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="h-4 w-px bg-border mx-1" />

          {/* Design System View Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-subtle border border-border text-xs font-medium text-foreground shadow-2xs">
            <Palette className="w-3.5 h-3.5 text-terracotta" />
            <span>Design System Studio</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-xs text-foreground-muted">
            <span>·</span>
            <span>{currentSystem.category || "Design Contract"}</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDuplicateSystem}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border hover:bg-surface-subtle text-xs font-medium text-foreground transition-colors shadow-2xs"
            title="Duplicate as new custom design system"
          >
            <Copy className="w-3.5 h-3.5 text-foreground-muted" />
            <span>{copiedToken === "duplicate" ? "Duplicated!" : "Duplicate"}</span>
          </button>

          <button
            onClick={() => {
              const md = exportDesignSystemMarkdown(currentSystem);
              handleDownloadFile(md, `${currentSystem.id}-DESIGN.md`, "text/markdown");
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border hover:bg-surface-subtle text-xs font-medium text-foreground transition-colors shadow-2xs"
            title="Download DESIGN.md contract"
          >
            <Download className="w-3.5 h-3.5 text-foreground-muted" />
            <span>Export DESIGN.md</span>
          </button>

          <button
            onClick={() => handleCopy(window.location.href, "share")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-surface-subtle text-xs font-medium text-foreground transition-colors shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5 text-foreground-muted" />
            <span>{copiedToken === "share" ? "Copied!" : "Share"}</span>
          </button>

          <button
            onClick={onBack}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-terracotta hover:bg-terracotta-400 text-white text-xs font-medium transition-colors shadow-xs"
          >
            <span>Back to Studio</span>
          </button>
        </div>
      </header>

      {/* ─── MAIN WORKSPACE (Left context + Center subnav + Right content) ──── */}
      <div className="flex-1 w-full flex overflow-hidden">
        {/* LEFT COLUMN: CONTEXT & CHAT BAR */}
        <aside className="w-[300px] max-w-[26vw] h-full border-r border-border bg-surface flex flex-col justify-between shrink-0">
          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            <div>
              <h2 className="font-editorial text-xl font-normal tracking-tight text-foreground">
                Start with context
              </h2>
              <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                Teach Claude your brand foundations or connect design assets.
              </p>
            </div>

            {/* Context option cards */}
            <div className="space-y-2.5">
              <div className="w-full text-left p-3.5 rounded-xl border border-terracotta/40 bg-terracotta/5 flex items-center gap-3 shadow-2xs">
                <div className="w-8 h-8 rounded-lg bg-terracotta/15 flex items-center justify-center text-terracotta shrink-0">
                  <Palette className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-medium text-xs text-foreground block">
                    Active Design System
                  </span>
                  <span className="text-[11px] text-terracotta block truncate font-semibold">
                    {currentSystem.name}
                  </span>
                </div>
              </div>

              <button
                onClick={() => imageUploadRef.current?.click()}
                className="w-full text-left p-3.5 rounded-xl border border-border bg-surface hover:bg-surface-subtle flex items-center gap-3 transition-colors cursor-pointer group"
              >
                <input
                  ref={imageUploadRef}
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotReferenceUpload}
                  className="hidden"
                />
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-medium text-xs text-foreground block">
                    Upload Screenshot
                  </span>
                  <span className="text-[11px] text-foreground-muted block truncate">
                    Extract palette & tone
                  </span>
                </div>
              </button>

              <button
                onClick={() => setIsFigmaModalOpen(true)}
                className="w-full text-left p-3.5 rounded-xl border border-border bg-surface hover:bg-surface-subtle flex items-center gap-3 transition-colors cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600 shrink-0 group-hover:scale-105 transition-transform">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-medium text-xs text-foreground block">
                    Figma & Repo Tokens
                  </span>
                  <span className="text-[11px] text-foreground-muted block truncate">
                    Import token specification
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Bottom: Conversational brief composer */}
          <div className="p-4 border-t border-border bg-surface-subtle/50">
            <div className="bg-surface border border-border rounded-2xl p-3 focus-within:border-terracotta transition-colors shadow-2xs">
              <textarea
                rows={2}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendChat();
                  }
                }}
                placeholder="Adjust palette, fonts, or rules with AI..."
                className="w-full bg-transparent text-xs text-foreground placeholder-foreground-muted/60 focus:outline-none resize-none leading-relaxed"
              />

              <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                <button
                  onClick={() => setIsModelPickerOpen(true)}
                  className="px-2 py-0.5 rounded-md bg-surface-subtle border border-border text-[10px] font-medium text-foreground-muted hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  <span>{modelInfo.displayName}</span>
                  <ChevronDown className="w-2.5 h-2.5" />
                </button>

                <button
                  onClick={handleSendChat}
                  disabled={!chatInput.trim() || isAiModifying}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                    chatInput.trim() && !isAiModifying
                      ? "bg-terracotta text-white shadow-xs"
                      : "bg-surface-subtle text-foreground-muted/50 cursor-not-allowed"
                  }`}
                  title="Send modification"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* CENTER SUB-NAV PANEL */}
        <nav className="w-56 h-full border-r border-border bg-surface flex flex-col shrink-0 overflow-y-auto select-none p-3 space-y-4">
          {/* Readme Section Link */}
          <div>
            <button
              onClick={() => setActiveSection("readme")}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition-colors ${
                activeSection === "readme"
                  ? "bg-surface-subtle text-foreground font-semibold border border-border shadow-2xs"
                  : "text-foreground-muted hover:text-foreground hover:bg-surface-subtle/50"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-foreground-muted" />
              <span>Readme</span>
            </button>
          </div>

          {/* Group: Templates */}
          <div>
            <button
              onClick={() => toggleGroup("templates")}
              className="w-full text-left text-[11px] font-semibold text-foreground-muted hover:text-foreground flex items-center justify-between px-2.5 py-1"
            >
              <span className="uppercase tracking-wider">Templates</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  collapsedGroups.templates ? "-rotate-90" : ""
                }`}
              />
            </button>
            {!collapsedGroups.templates && (
              <div className="mt-1 space-y-0.5 pl-2">
                <button
                  onClick={() => setActiveSection("templates-deck")}
                  className={`w-full text-left px-2.5 py-1 rounded-md text-xs transition-colors ${
                    activeSection === "templates-deck"
                      ? "text-terracotta font-medium bg-terracotta/10"
                      : "text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
                  }`}
                >
                  Deck (8 Slides)
                </button>
                <button
                  onClick={() => setActiveSection("templates-landing")}
                  className={`w-full text-left px-2.5 py-1 rounded-md text-xs transition-colors ${
                    activeSection === "templates-landing"
                      ? "text-terracotta font-medium bg-terracotta/10"
                      : "text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
                  }`}
                >
                  Landing Page
                </button>
                <button
                  onClick={() => setActiveSection("templates-dashboard")}
                  className={`w-full text-left px-2.5 py-1 rounded-md text-xs transition-colors ${
                    activeSection === "templates-dashboard"
                      ? "text-terracotta font-medium bg-terracotta/10"
                      : "text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
                  }`}
                >
                  SaaS Dashboard
                </button>
              </div>
            )}
          </div>

          {/* Group: Components */}
          <div>
            <button
              onClick={() => toggleGroup("components")}
              className="w-full text-left text-[11px] font-semibold text-foreground-muted hover:text-foreground flex items-center justify-between px-2.5 py-1"
            >
              <span className="uppercase tracking-wider">Components</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  collapsedGroups.components ? "-rotate-90" : ""
                }`}
              />
            </button>
            {!collapsedGroups.components && (
              <div className="mt-1 space-y-0.5 pl-2">
                {[
                  { id: "components-buttons", label: "Buttons & actions" },
                  { id: "components-badges", label: "Badges & tags" },
                  { id: "components-cards", label: "Cards & containers" },
                  { id: "components-stats", label: "KPI metrics & stats" },
                  { id: "components-alerts", label: "Alerts & callouts" },
                  { id: "components-dialog", label: "Dialog & modals" },
                  { id: "components-forms", label: "Forms & inputs" },
                  { id: "components-navigation", label: "Navigation" },
                  { id: "components-table", label: "Data table" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as SubNavSection)}
                    className={`w-full text-left px-2.5 py-1 rounded-md text-xs transition-colors ${
                      activeSection === item.id
                        ? "text-terracotta font-medium bg-terracotta/10"
                        : "text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Group: Foundations */}
          <div>
            <button
              onClick={() => toggleGroup("foundations")}
              className="w-full text-left text-[11px] font-semibold text-foreground-muted hover:text-foreground flex items-center justify-between px-2.5 py-1"
            >
              <span className="uppercase tracking-wider">Foundations</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  collapsedGroups.foundations ? "-rotate-90" : ""
                }`}
              />
            </button>
            {!collapsedGroups.foundations && (
              <div className="mt-1 space-y-0.5 pl-2">
                {[
                  { id: "foundations-color", label: "Color & WCAG" },
                  { id: "foundations-icons", label: "Icons" },
                  { id: "foundations-imagery", label: "Imagery & art direction" },
                  { id: "foundations-spacing", label: "Spacing & elevation" },
                  { id: "foundations-typography", label: "Typography" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as SubNavSection)}
                    className={`w-full text-left px-2.5 py-1 rounded-md text-xs transition-colors ${
                      activeSection === item.id
                        ? "text-terracotta font-medium bg-terracotta/10"
                        : "text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Group: Theme */}
          <div>
            <button
              onClick={() => toggleGroup("theme")}
              className="w-full text-left text-[11px] font-semibold text-foreground-muted hover:text-foreground flex items-center justify-between px-2.5 py-1"
            >
              <span className="uppercase tracking-wider">Theme</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${
                  collapsedGroups.theme ? "-rotate-90" : ""
                }`}
              />
            </button>
            {!collapsedGroups.theme && (
              <div className="mt-1 space-y-0.5 pl-2">
                <button
                  onClick={() => setActiveSection("theme-parameters")}
                  className={`w-full text-left px-2.5 py-1 rounded-md text-xs transition-colors ${
                    activeSection === "theme-parameters"
                      ? "text-terracotta font-medium bg-terracotta/10"
                      : "text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
                  }`}
                >
                  Parameters & Specs
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* RIGHT MAIN CONTENT DISPLAY */}
        <main className="flex-1 h-full overflow-y-auto bg-background p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* ─── SECTION 1: README ────────────────────────────────────────── */}
            {activeSection === "readme" && (
              <div className="space-y-8 animate-in fade-in duration-200">
                {/* Status Card Banner */}
                <div className="border border-border rounded-2xl bg-surface p-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl border border-border overflow-hidden flex flex-col shadow-sm">
                        <div
                          className="h-9 w-full flex items-center justify-center"
                          style={{ backgroundColor: currentSystem.accentColor }}
                        >
                          <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                            {currentSystem.name.slice(0, 3)}
                          </span>
                        </div>
                        <div className="h-5 w-full flex">
                          {currentSystem.swatchColors?.slice(1, 4).map((col, idx) => (
                            <div
                              key={idx}
                              className="flex-1 h-full"
                              style={{ backgroundColor: col }}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <h1 className="font-editorial text-3xl font-medium tracking-tight text-foreground">
                          {currentSystem.name}
                        </h1>
                        <span className="text-[11px] text-foreground-muted">
                          {currentSystem.category || currentSystem.badge}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onUseDesignSystem(currentSystem.id)}
                      className="px-4 py-2 rounded-xl bg-terracotta hover:bg-terracotta-400 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm shadow-terracotta/20 self-start sm:self-auto"
                    >
                      <span>Use this system</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-subtle border border-border text-xs text-foreground-muted mb-4">
                    This design system is available for your team&apos;s new projects. You can keep editing it in the chat or tweak foundations.
                  </div>

                  {/* Publication Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleTogglePublished}
                        className="flex items-center gap-2 text-xs text-foreground font-medium hover:text-terracotta transition-colors cursor-pointer"
                      >
                        {currentSystem.published ? (
                          <CheckSquare className="w-4 h-4 text-terracotta" />
                        ) : (
                          <Square className="w-4 h-4 text-foreground-muted" />
                        )}
                        <span>Published</span>
                      </button>

                      <button
                        onClick={handleSetOrgDefault}
                        className={`text-xs px-2.5 py-1 rounded-md border transition-colors ${
                          currentSystem.isOrgDefault
                            ? "bg-surface-subtle text-foreground border-border font-medium"
                            : "border-border text-foreground-muted hover:text-foreground hover:bg-surface-subtle"
                        }`}
                      >
                        {currentSystem.isOrgDefault ? "Org Default" : "Set as org default"}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditor("tokens")}
                        className="text-xs text-terracotta hover:underline font-medium flex items-center gap-1"
                      >
                        <Pencil className="w-3 h-3" />
                        <span>Edit tokens</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Readme Content Section */}
                <div className="border border-border rounded-2xl bg-surface p-8 space-y-6 shadow-xs">
                  <div className="border-b border-border pb-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted block mb-1">
                      Readme
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground font-editorial">
                      {currentSystem.readme.headline}
                    </h2>
                  </div>

                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {currentSystem.readme.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <h3 className="text-sm font-semibold text-foreground">How to use this</h3>
                    <ul className="space-y-2.5 text-xs text-foreground-muted leading-relaxed">
                      {currentSystem.readme.howToUse.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-terracotta font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-border">
                    <h3 className="text-sm font-semibold text-foreground">Direction</h3>
                    <p className="text-xs text-foreground-muted leading-relaxed">
                      {currentSystem.readme.direction}
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <h3 className="text-sm font-semibold text-foreground">
                      Package Files & Manifest Catalog
                    </h3>
                    <div className="bg-surface-subtle border border-border rounded-xl p-4 font-mono text-xs text-foreground space-y-2">
                      {currentSystem.readme.manifestFiles.map((file, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-terracotta font-bold">•</span>
                          <span className="text-foreground font-medium">{file.path}</span>
                          <span className="text-foreground-muted">— {file.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── SECTION 2: TEMPLATES > DECK (INTERACTIVE PRESENTATION) ──── */}
            {activeSection === "templates-deck" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted block mb-0.5">
                      Templates
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground font-editorial">
                      {currentSystem.templates.deck.name}
                    </h2>
                    <p className="text-xs text-foreground-muted mt-1 max-w-2xl leading-relaxed">
                      {currentSystem.templates.deck.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsFullscreenDeck(!isFullscreenDeck)}
                      className="px-3 py-1.5 rounded-lg border border-border hover:bg-surface-subtle text-xs font-medium text-foreground flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Maximize2 className="w-3 h-3 text-foreground-muted" />
                      <span>{isFullscreenDeck ? "Exit Fullscreen" : "Present"}</span>
                    </button>
                    <button
                      onClick={() => openEditor("deck")}
                      className="px-3 py-1.5 rounded-lg border border-border hover:bg-surface-subtle text-xs font-medium text-foreground flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Pencil className="w-3 h-3 text-terracotta" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() =>
                        onUseDesignSystem(
                          currentSystem.id,
                          `Create a ${currentSystem.name} pitch deck presentation with 8 slides.`
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-terracotta hover:bg-terracotta-400 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>Open in Studio</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Presentation Deck Viewer */}
                <div className="border border-border rounded-2xl bg-surface p-4 shadow-sm flex flex-col md:flex-row gap-4 min-h-[500px]">
                  {/* Left thumbnail strip */}
                  <div className="w-full md:w-40 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-[520px] shrink-0 pr-1 pb-1">
                    {currentSystem.templates.deck.slides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`text-left rounded-lg p-2.5 border transition-all shrink-0 ${
                          idx === activeSlideIndex
                            ? "border-terracotta ring-2 ring-terracotta/20 bg-terracotta/5"
                            : "border-border hover:border-foreground-muted/40 bg-surface-subtle"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-foreground-muted mb-1">
                          <span className="font-bold">Slide {slide.id}</span>
                          <span className="text-[9px] uppercase px-1 py-0.5 rounded bg-surface border border-border">
                            {slide.type}
                          </span>
                        </div>
                        <div className="h-12 w-full bg-surface rounded border border-border/50 flex flex-col justify-center px-2 overflow-hidden">
                          <span className="text-[9px] font-bold text-foreground truncate block">
                            {slide.title}
                          </span>
                          <span className="text-[8px] text-foreground-muted truncate block">
                            {slide.category || slide.subtitle}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Main Active Slide Display with interactive presentation controls */}
                  <div className="flex-1 bg-surface-subtle border border-border rounded-xl p-8 flex flex-col justify-between relative shadow-inner min-h-[440px]">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-[#e11d48] mb-2">
                        <span style={{ color: currentSystem.accentColor }}>
                          {activeSlide.category || "DESIGN CONTRACT"}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-foreground-muted text-[10px] font-mono">
                            Slide {activeSlide.id} of {currentSystem.templates.deck.slides.length}
                          </span>
                        </div>
                      </div>
                      <div
                        className="w-full h-0.5 mb-8"
                        style={{ backgroundColor: currentSystem.accentColor }}
                      />

                      {/* Slide Core Content */}
                      <div className="max-w-xl space-y-4">
                        <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground leading-none font-editorial">
                          {activeSlide.title}
                        </h3>

                        {activeSlide.subtitle && (
                          <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
                            {activeSlide.subtitle}
                          </p>
                        )}

                        {activeSlide.items && activeSlide.items.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                            {activeSlide.items.map((item, i) => (
                              <div
                                key={i}
                                className="p-3.5 bg-surface border border-border rounded-xl text-xs text-foreground font-medium shadow-2xs"
                              >
                                {item}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Interactive Slide Player Controls Bar */}
                    <div className="pt-6 mt-8 border-t border-border flex items-center justify-between text-xs text-foreground-muted">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : 0))
                          }
                          disabled={activeSlideIndex === 0}
                          className="px-2.5 py-1 rounded bg-surface border border-border hover:bg-surface-subtle disabled:opacity-40 transition-colors flex items-center gap-1"
                        >
                          <ArrowLeft className="w-3 h-3" />
                          <span>Prev</span>
                        </button>
                        <button
                          onClick={() =>
                            setActiveSlideIndex((prev) =>
                              prev < currentSystem.templates.deck.slides.length - 1
                                ? prev + 1
                                : prev
                            )
                          }
                          disabled={
                            activeSlideIndex === currentSystem.templates.deck.slides.length - 1
                          }
                          className="px-2.5 py-1 rounded bg-surface border border-border hover:bg-surface-subtle disabled:opacity-40 transition-colors flex items-center gap-1"
                        >
                          <span>Next</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <span className="text-[10px] text-foreground-muted ml-2">
                          Use ← → arrow keys
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleCopy(
                              JSON.stringify(activeSlide, null, 2),
                              `slide_${activeSlide.id}`
                            )
                          }
                          className="text-[11px] text-foreground-muted hover:text-terracotta flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>
                            {copiedToken === `slide_${activeSlide.id}`
                              ? "Copied!"
                              : "Copy Slide JSON"}
                          </span>
                        </button>
                        <span>{activeSlide.date || "2026 Edition"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── SECTION 3: TEMPLATES > LANDING (MULTI-VIEWPORT) ──────────── */}
            {activeSection === "templates-landing" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted block mb-0.5">
                      Templates
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground font-editorial">
                      {currentSystem.templates.landing.name}
                    </h2>
                    <p className="text-xs text-foreground-muted mt-1 max-w-2xl leading-relaxed">
                      {currentSystem.templates.landing.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Viewport switcher */}
                    <div className="flex items-center bg-surface-subtle border border-border rounded-lg p-0.5">
                      <button
                        onClick={() => setLandingViewport("desktop")}
                        className={`p-1.5 rounded ${
                          landingViewport === "desktop"
                            ? "bg-surface text-foreground shadow-2xs"
                            : "text-foreground-muted"
                        }`}
                        title="Desktop 1440px"
                      >
                        <Monitor className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setLandingViewport("tablet")}
                        className={`p-1.5 rounded ${
                          landingViewport === "tablet"
                            ? "bg-surface text-foreground shadow-2xs"
                            : "text-foreground-muted"
                        }`}
                        title="Tablet 768px"
                      >
                        <Tablet className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setLandingViewport("mobile")}
                        className={`p-1.5 rounded ${
                          landingViewport === "mobile"
                            ? "bg-surface text-foreground shadow-2xs"
                            : "text-foreground-muted"
                        }`}
                        title="Mobile 375px"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => openEditor("landing")}
                      className="px-3 py-1.5 rounded-lg border border-border hover:bg-surface-subtle text-xs font-medium text-foreground flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Pencil className="w-3 h-3 text-terracotta" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() =>
                        onUseDesignSystem(
                          currentSystem.id,
                          `Build a high-converting responsive landing page using ${currentSystem.name} design tokens.`
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-terracotta hover:bg-terracotta-400 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>Open in Studio</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Landing Live Preview Container */}
                <div className="flex justify-center bg-surface-subtle/30 p-4 rounded-2xl border border-border">
                  <div
                    style={{
                      width:
                        landingViewport === "mobile"
                          ? "375px"
                          : landingViewport === "tablet"
                          ? "768px"
                          : "100%",
                      maxWidth: "100%",
                    }}
                    className="border border-border rounded-2xl bg-surface p-8 shadow-sm space-y-10 transition-all duration-200 overflow-hidden"
                  >
                    {/* Mock Navbar */}
                    <div className="flex items-center justify-between pb-4 border-b border-border">
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: currentSystem.accentColor }}
                        />
                        <span>{currentSystem.name}</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted">
                        <span>Solutions</span>
                        <span>Design Tokens</span>
                        <span>Showcase</span>
                      </div>
                      <button
                        style={{ backgroundColor: currentSystem.accentColor }}
                        className="px-3 py-1 text-white font-bold text-xs rounded-lg"
                      >
                        Launch Studio
                      </button>
                    </div>

                    {/* Hero Block */}
                    <div className="text-center max-w-2xl mx-auto py-6 space-y-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-surface-subtle border border-border text-foreground-muted">
                        Verified Design System
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight font-editorial">
                        {currentSystem.templates.landing.heroTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                        {currentSystem.templates.landing.heroSubtitle}
                      </p>
                      <div className="pt-2 flex justify-center gap-3">
                        <button
                          style={{ backgroundColor: currentSystem.accentColor }}
                          className="px-5 py-2.5 text-white font-bold text-xs rounded-xl shadow-sm hover:opacity-90 transition-opacity"
                        >
                          {currentSystem.templates.landing.ctaText}
                        </button>
                        <button className="px-5 py-2.5 border border-border bg-surface text-foreground font-medium text-xs rounded-xl hover:bg-surface-subtle">
                          Explore Tokens
                        </button>
                      </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                      {currentSystem.templates.landing.features.map((f, i) => (
                        <div
                          key={i}
                          className="p-5 rounded-xl border border-border bg-surface-subtle/50 space-y-2"
                        >
                          <h4 className="text-xs font-bold text-foreground">{f.title}</h4>
                          <p className="text-[11px] text-foreground-muted leading-relaxed">
                            {f.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── SECTION 4: TEMPLATES > DASHBOARD (SAAS APP STARTER) ──────── */}
            {activeSection === "templates-dashboard" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted block mb-0.5">
                      Templates
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground font-editorial">
                      {currentSystem.templates.dashboard?.name || `${currentSystem.name} SaaS Dashboard`}
                    </h2>
                    <p className="text-xs text-foreground-muted mt-1 max-w-2xl leading-relaxed">
                      {currentSystem.templates.dashboard?.description ||
                        `Production SaaS analytics dashboard template designed with ${currentSystem.name} tokens.`}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onUseDesignSystem(
                          currentSystem.id,
                          `Create a modern analytics and operations SaaS dashboard using ${currentSystem.name} design tokens.`
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-terracotta hover:bg-terracotta-400 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>Open in Studio</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Dashboard Starter Card */}
                <div className="border border-border rounded-2xl bg-surface p-6 shadow-sm space-y-6">
                  {/* KPI Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(
                      currentSystem.templates.dashboard?.metrics || [
                        { label: "Active Workspaces", value: "2,840", change: "+14.2%", positive: true },
                        { label: "Design System Drift", value: "0.2%", change: "-8.1%", positive: true },
                        { label: "Average Render Time", value: "18ms", change: "-22%", positive: true },
                      ]
                    ).map((m, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-border bg-surface-subtle/50 space-y-1.5"
                      >
                        <span className="text-[10px] uppercase font-semibold text-foreground-muted block">
                          {m.label}
                        </span>
                        <div className="text-2xl font-bold text-foreground font-editorial">
                          {m.value}
                        </div>
                        <span
                          style={{ color: m.positive ? "#10b981" : "#ef4444" }}
                          className="text-[11px] font-semibold block"
                        >
                          {m.change}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Activity Table */}
                  <div className="border border-border rounded-xl overflow-hidden text-xs">
                    <div className="p-3 bg-surface-subtle font-semibold border-b border-border text-foreground flex items-center justify-between">
                      <span>Recent System Activity</span>
                      <span className="text-[10px] text-foreground-muted font-normal">Real-time sync</span>
                    </div>
                    <table className="w-full text-left">
                      <thead className="text-[10px] uppercase font-semibold text-foreground-muted bg-surface-subtle/40 border-b border-border">
                        <tr>
                          <th className="p-3">Event</th>
                          <th className="p-3">Author</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-right">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {(
                          currentSystem.templates.dashboard?.recentActivity || [
                            { title: "Tokens synchronized with repository", user: "Lead Designer", status: "Published", date: "Just now" },
                            { title: "New Deck presentation template generated", user: "Product Lead", status: "Active", date: "12m ago" },
                            { title: "WCAG 2.1 accessibility audit completed", user: "System Agent", status: "Passed (AAA)", date: "1h ago" },
                          ]
                        ).map((row, i) => (
                          <tr key={i} className="hover:bg-surface-subtle/40">
                            <td className="p-3 font-medium text-foreground">{row.title}</td>
                            <td className="p-3 text-foreground-muted">{row.user}</td>
                            <td className="p-3">
                              <span
                                style={{
                                  backgroundColor: `${currentSystem.accentColor}15`,
                                  color: currentSystem.accentColor,
                                }}
                                className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                              >
                                {row.status}
                              </span>
                            </td>
                            <td className="p-3 text-right text-foreground-muted">{row.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ─── SECTION 5: COMPONENTS (All 9 Patterns) ──────────────────── */}
            {activeSection.startsWith("components-") && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {(() => {
                  const compKey = activeSection.replace(
                    "components-",
                    ""
                  ) as keyof typeof currentSystem.components;
                  const component =
                    currentSystem.components[compKey] || {
                      name: compKey.replace("-", " ").toUpperCase(),
                      description: `Reusable ${compKey} component pattern for ${currentSystem.name}.`,
                      previewCode: `<div class="p-4 text-xs">Sample component code</div>`,
                    };

                  return (
                    <>
                      <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                        <div>
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted block mb-0.5">
                            Components
                          </span>
                          <h2 className="text-2xl font-bold tracking-tight text-foreground font-editorial capitalize">
                            {component.name}
                          </h2>
                          <p className="text-xs text-foreground-muted mt-1 max-w-2xl leading-relaxed">
                            {component.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-surface-subtle border border-border rounded-lg p-0.5">
                            <button
                              onClick={() => setCodeViewMode("preview")}
                              className={`px-2.5 py-1 text-xs rounded font-medium ${
                                codeViewMode === "preview"
                                  ? "bg-surface text-foreground shadow-2xs"
                                  : "text-foreground-muted"
                              }`}
                            >
                              Preview
                            </button>
                            <button
                              onClick={() => setCodeViewMode("code")}
                              className={`px-2.5 py-1 text-xs rounded font-medium ${
                                codeViewMode === "code"
                                  ? "bg-surface text-foreground shadow-2xs"
                                  : "text-foreground-muted"
                              }`}
                            >
                              Source
                            </button>
                          </div>

                          <button
                            onClick={() => openEditor("component")}
                            className="px-3 py-1.5 rounded-lg border border-border hover:bg-surface-subtle text-xs font-medium text-foreground flex items-center gap-1.5 transition-colors shadow-2xs"
                          >
                            <Pencil className="w-3 h-3 text-terracotta" />
                            <span>Edit</span>
                          </button>
                        </div>
                      </div>

                      {/* Component Content */}
                      <div className="border border-border rounded-2xl bg-surface p-6 shadow-sm">
                        {codeViewMode === "preview" ? (
                          <div className="p-8 bg-surface-subtle/40 border border-dashed border-border rounded-xl flex items-center justify-center">
                            <div
                              className="w-full max-w-xl"
                              dangerouslySetInnerHTML={{
                                __html: component.previewCode,
                              }}
                            />
                          </div>
                        ) : (
                          <div className="relative">
                            <button
                              onClick={() => handleCopy(component.previewCode, "code")}
                              className="absolute top-3 right-3 px-2.5 py-1 rounded bg-surface border border-border text-[11px] text-foreground-muted hover:text-foreground flex items-center gap-1 shadow-2xs"
                            >
                              {copiedToken === "code" ? (
                                <Check className="w-3 h-3 text-emerald-500" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                              <span>{copiedToken === "code" ? "Copied" : "Copy"}</span>
                            </button>
                            <pre className="bg-surface-subtle p-4 rounded-xl text-xs font-mono text-foreground overflow-x-auto">
                              <code>{component.previewCode}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {/* ─── SECTION 6: FOUNDATIONS > COLOR & WCAG CONTRAST ──────────── */}
            {activeSection === "foundations-color" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-border pb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted block mb-0.5">
                    Foundations
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground font-editorial">
                    Color Palette & WCAG 2.1 Accessibility
                  </h2>
                  <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                    Semantic color hierarchy for {currentSystem.name}. Click any swatch to modify live tokens.
                  </p>
                </div>

                {/* Color Swatch Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {currentSystem.foundations.colors.map((c, idx) => {
                    const canvasHex = currentSystem.bgDark ? "#121110" : "#faf9f5";
                    const wcag = getWcagRating(c.hex, canvasHex);

                    return (
                      <div
                        key={c.varName}
                        className="border border-border rounded-xl bg-surface p-4 space-y-3 shadow-xs"
                      >
                        <div
                          className="h-20 w-full rounded-lg border border-border shadow-inner relative group flex items-end justify-between p-2"
                          style={{ backgroundColor: c.hex }}
                        >
                          <span className="text-[9px] font-mono font-bold bg-black/70 text-white px-1.5 py-0.5 rounded backdrop-blur-sm">
                            WCAG {wcag.normalText} ({wcag.ratioStr})
                          </span>
                          <input
                            type="color"
                            value={c.hex.startsWith("#") ? c.hex : "#888888"}
                            onChange={(e) => handleTokenColorChange(idx, e.target.value)}
                            className="opacity-0 group-hover:opacity-100 absolute inset-0 w-full h-full cursor-pointer"
                            title="Click to tweak color"
                          />
                          <span className="text-[10px] font-mono font-bold bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-sm pointer-events-none">
                            {c.hex.toUpperCase()}
                          </span>
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-xs text-foreground">{c.name}</h4>
                            <button
                              onClick={() => handleCopy(c.varName, c.varName)}
                              className="text-[10px] text-foreground-muted hover:text-terracotta flex items-center gap-1 font-mono"
                              title="Copy variable"
                            >
                              <span>{copiedToken === c.varName ? "Copied" : "Copy"}</span>
                              <Copy className="w-2.5 h-2.5" />
                            </button>
                          </div>
                          <span className="text-[11px] font-mono text-terracotta block mt-0.5">
                            {c.varName}
                          </span>
                          <p className="text-[11px] text-foreground-muted mt-1 leading-relaxed">
                            {c.role}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Semantic Status Colors */}
                <div className="border border-border rounded-xl bg-surface p-5 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
                    Semantic Status Signals
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { role: "Success", hex: "#10b981", name: "Emerald Verified" },
                      { role: "Warning", hex: "#f59e0b", name: "Amber Caution" },
                      { role: "Error", hex: "#ef4444", name: "Crimson Danger" },
                      { role: "Info", hex: "#3b82f6", name: "Sky Informational" },
                    ].map((s) => (
                      <div key={s.role} className="p-3 rounded-lg border border-border bg-surface-subtle space-y-2">
                        <div className="w-full h-4 rounded" style={{ backgroundColor: s.hex }} />
                        <span className="text-[10px] font-semibold text-foreground-muted uppercase block">
                          {s.role}
                        </span>
                        <span className="text-xs font-mono font-bold text-foreground block">{s.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── SECTION 7: FOUNDATIONS > ICONS (CURATED LUCIDE CATALOG) ─── */}
            {activeSection === "foundations-icons" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-border pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted block mb-0.5">
                      Foundations
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground font-editorial">
                      Iconography Architecture
                    </h2>
                    <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                      Lucide Icon catalog calibrated for {currentSystem.name}. Consistent 24x24 optical grid.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-foreground-muted">Stroke:</span>
                    <div className="flex items-center bg-surface-subtle border border-border rounded-lg p-0.5 text-xs">
                      {[1.5, 1.75, 2.0].map((sw) => (
                        <button
                          key={sw}
                          onClick={() => setIconStrokeWidth(sw)}
                          className={`px-2 py-1 rounded font-mono ${
                            iconStrokeWidth === sw ? "bg-surface text-foreground shadow-2xs font-bold" : "text-foreground-muted"
                          }`}
                        >
                          {sw}px
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                    {["All", "Actions", "Navigation", "Interface", "Status", "Media & Tech"].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setIconCategory(cat)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                          iconCategory === cat
                            ? "bg-terracotta text-white shadow-2xs"
                            : "bg-surface border border-border text-foreground-muted hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full sm:w-48">
                    <Search className="w-3.5 h-3.5 text-foreground-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filter icons..."
                      value={iconSearch}
                      onChange={(e) => setIconSearch(e.target.value)}
                      className="w-full bg-surface-subtle border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-terracotta"
                    />
                  </div>
                </div>

                {/* Icons Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {filteredIcons.map((ic) => (
                    <button
                      key={ic.name}
                      onClick={() => handleCopy(`<i data-lucide="${ic.name}"></i>`, ic.name)}
                      className="p-3.5 rounded-xl border border-border bg-surface hover:border-terracotta/40 hover:bg-surface-subtle flex flex-col items-center justify-center gap-2 text-center transition-all group shadow-2xs cursor-pointer"
                    >
                      <div
                        className="w-8 h-8 rounded-lg bg-surface-subtle group-hover:bg-terracotta/10 flex items-center justify-center text-foreground group-hover:text-terracotta transition-colors"
                      >
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 w-full">
                        <span className="text-[11px] font-medium text-foreground truncate block">
                          {ic.name}
                        </span>
                        <span className="text-[9px] text-foreground-muted truncate block">
                          {copiedToken === ic.name ? "Copied code!" : ic.category}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ─── SECTION 8: FOUNDATIONS > IMAGERY & ART DIRECTION ─────────── */}
            {activeSection === "foundations-imagery" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-border pb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted block mb-0.5">
                    Foundations
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground font-editorial">
                    Imagery, Aspect Ratios & Art Direction
                  </h2>
                  <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                    Visual photographic composition and media rules governing {currentSystem.name}.
                  </p>
                </div>

                {/* Aspect Ratio Presets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { ratio: "16:9", label: "Landscape Hero", desc: "Full-width headers, showcase banners, and presentation covers" },
                    { ratio: "4:3", label: "Editorial Card", desc: "Story cards, feature highlights, and blog thumbnails" },
                    { ratio: "1:1", label: "Square Aspect", desc: "User avatars, app icon badges, and square product tiles" },
                    { ratio: "9:16", label: "Vertical Story", desc: "Mobile-first mockups, feed stories, and drawer reels" },
                  ].map((item) => (
                    <div key={item.ratio} className="p-4 rounded-xl border border-border bg-surface space-y-3 shadow-2xs">
                      <div className="w-full h-24 rounded-lg bg-surface-subtle border border-border flex items-center justify-center text-xs font-mono font-bold text-foreground">
                        {item.ratio}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-foreground">{item.label}</h4>
                        <p className="text-[11px] text-foreground-muted mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Atmosphere & Backdrop Card */}
                <div className="border border-border rounded-xl bg-surface p-6 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
                    Atmosphere & Surface Lighting
                  </h3>
                  <div
                    style={{
                      background: currentSystem.bgDark
                        ? `radial-gradient(circle at 50% 0%, ${currentSystem.accentColor}25 0%, #121110 70%)`
                        : `radial-gradient(circle at 50% 0%, ${currentSystem.accentColor}15 0%, #faf9f5 70%)`,
                    }}
                    className="h-32 rounded-xl border border-border p-6 flex items-center justify-between shadow-inner"
                  >
                    <div>
                      <span className="text-xs font-bold text-foreground block">
                        Signature Brand Mood
                      </span>
                      <p className="text-[11px] text-foreground-muted mt-1 max-w-sm">
                        {currentSystem.readme.direction}
                      </p>
                    </div>
                    <div
                      className="w-10 h-10 rounded-full shadow-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: currentSystem.accentColor }}
                    >
                      ✦
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── SECTION 9: FOUNDATIONS > SPACING & ELEVATION ─────────────── */}
            {activeSection === "foundations-spacing" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-border pb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted block mb-0.5">
                    Foundations
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground font-editorial">
                    Spacing, Radius & Geometry
                  </h2>
                  <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                    Mathematical grid spacing and corner radius rules.
                  </p>
                </div>

                {/* Spacing Scale */}
                <div className="border border-border rounded-xl bg-surface p-6 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
                    Spacing Scale Tokens
                  </h3>
                  <div className="space-y-3">
                    {currentSystem.foundations.spacing.map((s) => (
                      <div key={s.name} className="flex items-center gap-4 text-xs font-mono">
                        <span className="w-28 text-terracotta font-medium">{s.name}</span>
                        <span className="w-16 text-foreground-muted">{s.value}</span>
                        <div
                          className="h-3 rounded bg-terracotta/40"
                          style={{ width: `calc(${s.value} * 3)` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Radius Tokens */}
                <div className="border border-border rounded-xl bg-surface p-6 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
                    Corner Geometry & Radius
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {currentSystem.foundations.radii.map((r) => (
                      <div
                        key={r.name}
                        className="p-4 border border-border bg-surface-subtle text-center space-y-2"
                        style={{ borderRadius: r.value }}
                      >
                        <span className="text-[11px] font-mono text-terracotta block">
                          {r.name}
                        </span>
                        <span className="text-base font-bold text-foreground block">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Elevation Shadows */}
                <div className="border border-border rounded-xl bg-surface p-6 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
                    Elevation & Drop Shadows
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(
                      currentSystem.foundations.elevation || [
                        { name: "Elevation 0", value: "none", desc: "Flush with canvas" },
                        { name: "Elevation 1", value: "0 1px 3px 0 rgba(0,0,0,0.08)", desc: "Soft resting card" },
                        { name: "Elevation 2", value: "0 4px 6px -1px rgba(0,0,0,0.1)", desc: "Floating dropdown" },
                      ]
                    ).map((e, idx) => (
                      <div
                        key={idx}
                        style={{ boxShadow: e.value }}
                        className="p-4 rounded-xl border border-border bg-surface space-y-1"
                      >
                        <h4 className="font-bold text-xs text-foreground">{e.name}</h4>
                        <p className="text-[11px] text-foreground-muted">{e.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── SECTION 10: FOUNDATIONS > TYPOGRAPHY ─────────────────────── */}
            {activeSection === "foundations-typography" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-border pb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted block mb-0.5">
                    Foundations
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground font-editorial">
                    Typography Scale & Font Hierarchy
                  </h2>
                  <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                    Type specimens configured for {currentSystem.name}.
                  </p>
                </div>

                {/* Font families card */}
                <div className="border border-border rounded-xl bg-surface p-5 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
                    Active Font Families
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-surface-subtle border border-border">
                      <span className="text-[10px] font-semibold text-foreground-muted uppercase block">
                        Display Font
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {currentSystem.foundations.typography.displayFont}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-subtle border border-border">
                      <span className="text-[10px] font-semibold text-foreground-muted uppercase block">
                        Body Font
                      </span>
                      <span className="text-sm font-bold text-foreground">
                        {currentSystem.foundations.typography.bodyFont}
                      </span>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-subtle border border-border">
                      <span className="text-[10px] font-semibold text-foreground-muted uppercase block">
                        Monospace Font
                      </span>
                      <span className="text-sm font-mono font-bold text-foreground">
                        {currentSystem.foundations.typography.monoFont}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Live Specimen Tester */}
                <div className="border border-border rounded-xl bg-surface p-5 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-foreground-muted block">
                    Interactive Specimen Tester
                  </label>
                  <input
                    type="text"
                    value={specimenText}
                    onChange={(e) => setSpecimenText(e.target.value)}
                    className="w-full bg-surface-subtle border border-border rounded-lg p-2.5 text-xs text-foreground focus:outline-none focus:border-terracotta"
                    placeholder="Type custom text to preview typography live..."
                  />
                </div>

                {/* Scale Specimen */}
                <div className="border border-border rounded-xl bg-surface p-6 space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
                    Type Scale Specimen
                  </h3>
                  <div className="divide-y divide-border space-y-4">
                    {currentSystem.foundations.typography.scale.map((spec, i) => (
                      <div key={i} className="pt-4 first:pt-0">
                        <div className="flex items-center justify-between text-[11px] text-foreground-muted mb-1 font-mono">
                          <span>{spec.name}</span>
                          <span>
                            {spec.size} · weight {spec.weight}
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: spec.size,
                            fontWeight: spec.weight,
                            fontFamily: currentSystem.foundations.typography.displayFont,
                          }}
                          className="text-foreground tracking-tight"
                        >
                          {specimenText || spec.sample}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─── SECTION 11: THEME PARAMETERS ─────────────────────────────── */}
            {activeSection === "theme-parameters" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted block mb-0.5">
                      Theme
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground font-editorial">
                      Parameters & Token Stylesheets
                    </h2>
                    <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                      Direct CSS variable definitions, JSON token trees, and master DESIGN.md specifications.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleResetSystem}
                      className="px-3 py-1.5 rounded-lg border border-border hover:bg-surface-subtle text-xs font-medium text-foreground flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Undo2 className="w-3 h-3" />
                      <span>Reset to Defaults</span>
                    </button>
                    <button
                      onClick={() => openEditor("tokens")}
                      className="px-3 py-1.5 rounded-lg bg-terracotta hover:bg-terracotta-400 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Edit Raw Tokens</span>
                    </button>
                  </div>
                </div>

                {/* DESIGN.md Master Contract */}
                <div className="border border-border rounded-xl bg-surface p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-terracotta" />
                      <span className="text-xs font-mono font-bold text-foreground">DESIGN.md (Brand Contract)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleCopy(exportDesignSystemMarkdown(currentSystem), "designMd")
                        }
                        className="text-xs text-foreground-muted hover:text-foreground flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedToken === "designMd" ? "Copied" : "Copy Markdown"}</span>
                      </button>
                      <button
                        onClick={() => {
                          const md = exportDesignSystemMarkdown(currentSystem);
                          handleDownloadFile(md, `${currentSystem.id}-DESIGN.md`, "text/markdown");
                        }}
                        className="text-xs text-terracotta hover:underline font-medium flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                  <pre className="bg-surface-subtle p-4 rounded-xl text-xs font-mono text-foreground overflow-x-auto max-h-60">
                    <code>{exportDesignSystemMarkdown(currentSystem)}</code>
                  </pre>
                </div>

                {/* Tokens.css Viewer */}
                <div className="border border-border rounded-xl bg-surface p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-foreground">tokens.css</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(currentSystem.tokensCss, "tokensCss")}
                        className="text-xs text-foreground-muted hover:text-foreground flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedToken === "tokensCss" ? "Copied" : "Copy CSS"}</span>
                      </button>
                      <button
                        onClick={() =>
                          handleDownloadFile(
                            currentSystem.tokensCss,
                            `${currentSystem.id}-tokens.css`,
                            "text/css"
                          )
                        }
                        className="text-xs text-terracotta hover:underline font-medium flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                  <pre className="bg-surface-subtle p-4 rounded-xl text-xs font-mono text-foreground overflow-x-auto max-h-60">
                    <code>{currentSystem.tokensCss}</code>
                  </pre>
                </div>

                {/* Theme.json Viewer */}
                <div className="border border-border rounded-xl bg-surface p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-foreground">theme.json</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(currentSystem.themeJson, "themeJson")}
                        className="text-xs text-foreground-muted hover:text-foreground flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedToken === "themeJson" ? "Copied" : "Copy JSON"}</span>
                      </button>
                      <button
                        onClick={() =>
                          handleDownloadFile(
                            currentSystem.themeJson,
                            `${currentSystem.id}-theme.json`,
                            "application/json"
                          )
                        }
                        className="text-xs text-terracotta hover:underline font-medium flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                  <pre className="bg-surface-subtle p-4 rounded-xl text-xs font-mono text-foreground overflow-x-auto max-h-60">
                    <code>{currentSystem.themeJson}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ─── EDIT MODAL / DRAWER ─────────────────────────────────────────────── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[85vh]">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-subtle/50">
              <div className="flex items-center gap-2">
                <Pencil className="w-4 h-4 text-terracotta" />
                <h3 className="font-bold text-sm text-foreground capitalize">
                  Edit {editTarget}
                </h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg hover:bg-surface text-foreground-muted hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <textarea
                rows={16}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full bg-surface-subtle border border-border rounded-xl p-4 font-mono text-xs text-foreground focus:outline-none focus:border-terracotta resize-none"
              />
            </div>

            <div className="px-6 py-3 border-t border-border flex items-center justify-end gap-2 bg-surface-subtle/50">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-surface transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-lg bg-terracotta hover:bg-terracotta-400 text-white text-xs font-medium transition-colors shadow-xs"
              >
                Save & Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── FIGMA MODAL ────────────────────────────────────────────────────── */}
      {isFigmaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-surface border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-purple-600" />
                <h3 className="font-bold text-sm text-foreground">Import Figma Design Tokens</h3>
              </div>
              <button
                onClick={() => setIsFigmaModalOpen(false)}
                className="p-1 text-foreground-muted hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-3 text-xs">
              <p className="text-foreground-muted">
                Paste your Figma Tokens Studio JSON or design token payload to map variables:
              </p>
              <textarea
                rows={6}
                value={figmaInput}
                onChange={(e) => setFigmaInput(e.target.value)}
                placeholder='{ "colors": { "primary": "#6366f1" } }'
                className="w-full bg-surface-subtle border border-border rounded-xl p-3 font-mono text-xs text-foreground focus:outline-none focus:border-terracotta resize-none"
              />
            </div>
            <div className="px-6 py-3 border-t border-border flex items-center justify-end gap-2 bg-surface-subtle/50">
              <button
                onClick={() => setIsFigmaModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-surface"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  try {
                    const parsed = JSON.parse(figmaInput);
                    if (parsed.colors?.primary) handleTokenColorChange(0, parsed.colors.primary);
                    setIsFigmaModalOpen(false);
                  } catch {
                    alert("Invalid JSON format");
                  }
                }}
                className="px-4 py-2 rounded-lg bg-terracotta text-white text-xs font-medium shadow-xs"
              >
                Apply Figma Tokens
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Model Picker Popover */}
      {isModelPickerOpen && (
        <ModelPickerPopover
          isOpen={isModelPickerOpen}
          onClose={() => setIsModelPickerOpen(false)}
          settings={settings}
          onSelectModel={(model: string) => {
            onUpdateSettings({ ...settings, selectedModel: model });
            setIsModelPickerOpen(false);
          }}
          onSelectEffort={(effort: "low" | "medium" | "high") =>
            onUpdateSettings({ ...settings, reasoningEffort: effort })
          }
          onOpenSettings={onOpenSettings}
          onRefreshModels={async () => {}}
          isRefreshingModels={false}
        />
      )}
    </div>
  );
}

