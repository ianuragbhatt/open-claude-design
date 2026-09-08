"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChatPane } from "@/components/ChatPane";
import { PreviewPane } from "@/components/PreviewPane";
import { SettingsModal } from "@/components/SettingsModal";
import { HomeView } from "@/components/HomeView";
import { DesignSystemView } from "@/components/DesignSystemView";
import { getDesignSystem } from "@/lib/design-systems";
import {
  type Project,
  type Message,
  type ArtifactVersion,
  type ApiSettings,
  type ToolInvocation,
  loadSettings,
  saveSettings,
  loadProjects,
  saveProjects,
  getActiveProjectId,
  setActiveProjectId,
  createInitialDemoProject,
  createBudgetDemoProject,
  createNewProject,
  DEFAULT_SETTINGS,
} from "@/lib/storage";
import { broadcastWorkspaceReload } from "@/lib/workspace-sync";

export default function KhayalApp() {
  const [currentView, setCurrentView] = useState<"home" | "studio" | "design-system">("home");
  const [activeDesignSystemId, setActiveDesignSystemId] = useState<string>("modernist");
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [settings, setSettings] = useState<ApiSettings>(DEFAULT_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingHtml, setStreamingHtml] = useState<string>("");
  const [reloadKey, setReloadKey] = useState(0);
  const lastErrorRef = useRef<string>("");
  const [selectedElement, setSelectedElement] = useState<{
    elementName: string;
    selector: string;
    textSnippet: string;
    breadcrumbs?: string;
  } | null>(null);
  const [activeClientReview, setActiveClientReview] = useState<any | null>(null);
  const [isClientReviewing, setIsClientReviewing] = useState<boolean>(false);

  const [chatWidth, setChatWidth] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("khayal_chat_width");
      if (saved) {
        const num = parseInt(saved, 10);
        if (!isNaN(num) && num >= 280 && num <= 720) return num;
      }
    }
    return 420;
  });
  const [isDraggingDivider, setIsDraggingDivider] = useState(false);
  const [mobileStudioTab, setMobileStudioTab] = useState<"chat" | "canvas">("canvas");

  const abortControllerRef = useRef<AbortController | null>(null);

  const handleDividerMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingDivider(true);
  };

  // Divider resize mouse event handlers
  useEffect(() => {
    if (!isDraggingDivider) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.min(Math.max(280, e.clientX), 720);
      setChatWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsDraggingDivider(false);
      localStorage.setItem("khayal_chat_width", chatWidth.toString());
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingDivider, chatWidth]);

  // Initial load
  useEffect(() => {
    const loadedSettings = loadSettings();
    setSettings(loadedSettings);

    const storedProjects = loadProjects();
    if (!storedProjects.some((p) => p.id === "budget-smart")) {
      storedProjects.unshift(createBudgetDemoProject());
      saveProjects(storedProjects);
    }
    if (!storedProjects.some((p) => p.id === "proj_demo_anthropic")) {
      storedProjects.push(createInitialDemoProject());
      saveProjects(storedProjects);
    }

    const activeId = getActiveProjectId() || "budget-smart";
    let current = storedProjects.find((p) => p.id === activeId) || storedProjects[0];

    setActiveProjectId(current.id);
    setAllProjects(storedProjects);
    setProject(current);
    if (current?.clientReview) {
      setActiveClientReview(current.clientReview);
    }
    if (current.versions.length > 0 && current.activeVersionIndex >= 0) {
      setStreamingHtml(current.versions[current.activeVersionIndex].html);
    }
  }, []);

  // Sync project changes to state & localStorage
  const updateProject = (updated: Project) => {
    setProject(updated);
    setAllProjects((prev) => {
      const index = prev.findIndex((p) => p.id === updated.id);
      const next = [...prev];
      if (index !== -1) {
        next[index] = updated;
      } else {
        next.unshift(updated);
      }
      saveProjects(next);
      return next;
    });
  };

  const handleNewProject = () => {
    const newProj = createNewProject("Untitled Design", project?.brandId || "claude-anthropic");
    const updatedList = [newProj, ...allProjects];
    setAllProjects(updatedList);
    saveProjects(updatedList);
    setActiveProjectId(newProj.id);
    setProject(newProj);
    setActiveClientReview(null);
    setIsClientReviewing(false);
    setStreamingHtml("");
    setSelectedElement(null);
    setReloadKey((prev) => prev + 1);
  };

  const handleSelectProject = (projectId: string) => {
    const found = allProjects.find((p) => p.id === projectId);
    if (found) {
      setActiveProjectId(found.id);
      setProject(found);
      setActiveClientReview(found.clientReview || null);
      setIsClientReviewing(false);
      if (found.versions.length > 0 && found.activeVersionIndex >= 0) {
        setStreamingHtml(found.versions[found.activeVersionIndex].html);
      } else {
        setStreamingHtml("");
      }
      setSelectedElement(null);
      setReloadKey((prev) => prev + 1);
    }
  };

  const handleDeleteProject = (projectId: string) => {
    if (allProjects.length <= 1) return;
    const remaining = allProjects.filter((p) => p.id !== projectId);
    setAllProjects(remaining);
    saveProjects(remaining);
    if (project?.id === projectId) {
      const nextActive = remaining[0];
      setActiveProjectId(nextActive.id);
      setProject(nextActive);
      setStreamingHtml(nextActive.versions[nextActive.activeVersionIndex]?.html || "");
    }
  };

  const handleRenameProject = (newName: string) => {
    if (!project) return;
    updateProject({ ...project, name: newName });
  };

  const handleSelectBrand = (brandId: string) => {
    if (!project) return;
    updateProject({ ...project, brandId });
  };

  const handleSelectVersion = (index: number) => {
    if (!project) return;
    if (index >= 0 && index < project.versions.length) {
      updateProject({ ...project, activeVersionIndex: index });
      setStreamingHtml(project.versions[index].html);
    }
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };

  const handleRuntimeError = (err: { message: string; filename?: string; lineno?: number }) => {
    if (isLoading) return;
    const errSig = `${err.message}_${err.lineno}`;
    if (lastErrorRef.current === errSig) return;
    lastErrorRef.current = errSig;

    const autoFixPrompt = `Runtime error detected in preview canvas: "${err.message}"${err.filename ? ` in ${err.filename}` : ""}${err.lineno ? ` (line ${err.lineno})` : ""}. Please inspect and use edit_file or write_file to fix this issue immediately.`;
    handleSendMessage(autoFixPrompt);
  };

  const handleSendMessage = async (content: string, targetProject?: Project) => {
    const currentActiveProject = targetProject || project;
    if (!currentActiveProject || isLoading) return;

    const userMessage: Message = {
      id: "msg_" + Math.random().toString(36).slice(2, 9),
      role: "user",
      content,
      timestamp: Date.now(),
    };

    const updatedMessages = [...currentActiveProject.messages, userMessage];
    updateProject({
      ...currentActiveProject,
      messages: updatedMessages,
      updatedAt: Date.now(),
    });

    const activeElementContext = selectedElement ? { ...selectedElement } : null;
    setSelectedElement(null);

    setIsLoading(true);
    setIsClientReviewing(false);
    setActiveClientReview(null);
    let receivedClientReview: any = null;
    abortControllerRef.current = new AbortController();

    const assistantMessageId = "msg_" + Math.random().toString(36).slice(2, 9);
    let accumulatedText = "";
    let accumulatedThinking = "";
    const invocations: ToolInvocation[] = [];

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({
          projectId: currentActiveProject.id,
          messages: updatedMessages,
          brandId: currentActiveProject.brandId,
          customBrand: currentActiveProject.customBrand,
          selectedElementContext: activeElementContext,
          baseUrl: settings.baseUrl,
          apiKey: settings.apiKey,
          model: settings.selectedModel,
          reasoningEffort: settings.reasoningEffort,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status} ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body available");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const jsonStr = trimmed.slice(5).trim();
          if (!jsonStr) continue;

          try {
            const event = JSON.parse(jsonStr);

            if (event.type === "client_review") {
              receivedClientReview = event.review;
              setActiveClientReview(event.review);
              setIsClientReviewing(false);
            } else if (event.type === "client_review_started") {
              setIsClientReviewing(true);
            } else if (event.type === "specialist_dispatched") {
              if (event.specialist === "reviewer") {
                setIsClientReviewing(true);
              }
            } else if (event.type === "text") {
              accumulatedText += event.text;
            } else if (event.type === "thinking") {
              accumulatedThinking += event.text;
            } else if (event.type === "tool_call") {
              const existingIdx = invocations.findIndex((inv) => inv.toolCallId === event.toolCallId);
              if (existingIdx !== -1) {
                invocations[existingIdx] = {
                  ...invocations[existingIdx],
                  state: "call",
                  args: event.args,
                  specialist: event.specialist,
                };
              } else {
                invocations.push({
                  toolCallId: event.toolCallId,
                  toolName: event.toolName,
                  args: event.args,
                  state: "call",
                  specialist: event.specialist,
                });
              }
            } else if (event.type === "tool_result") {
              const existingIdx = invocations.findIndex((inv) => inv.toolCallId === event.toolCallId);
              if (existingIdx !== -1) {
                invocations[existingIdx] = {
                  ...invocations[existingIdx],
                  state: "result",
                  result: event.result,
                  specialist: event.specialist,
                };
              } else {
                invocations.push({
                  toolCallId: event.toolCallId,
                  toolName: event.toolName,
                  state: "result",
                  result: event.result,
                  specialist: event.specialist,
                });
              }

              // Live hot-reload the canvas iframe and cross-tab presentation windows on each write or edit
              if (event.toolName === "write_file" || event.toolName === "edit_file") {
                setReloadKey((prev) => prev + 1);
                broadcastWorkspaceReload(currentActiveProject.id);
              }
            } else if (event.type === "error") {
              throw new Error(event.error);
            }
          } catch (e: any) {
            if (e.message && !e.message.includes("JSON")) {
              throw e;
            }
          }
        }

        // Live update assistant message in chat
        setProject((prev) => {
          if (!prev) return prev;
          const existing = prev.messages.filter((m) => m.id !== assistantMessageId);
          return {
            ...prev,
            messages: [
              ...existing,
              {
                id: assistantMessageId,
                role: "assistant",
                content: accumulatedText,
                thinking: accumulatedThinking,
                toolInvocations: [...invocations],
                timestamp: Date.now(),
              },
            ],
          };
        });
      }

      // Stream completed: fetch latest index.html for artifact snapshots and code viewer
      let latestHtml = "";
      try {
        const res = await fetch(`/api/workspaces/${currentActiveProject.id}/index.html?v=${Date.now()}`);
        if (res.ok) {
          latestHtml = await res.text();
        }
      } catch {}

      if (latestHtml) {
        setStreamingHtml(latestHtml);
        broadcastWorkspaceReload(currentActiveProject.id);
      }

      const finalAssistantMsg: Message = {
        id: assistantMessageId,
        role: "assistant",
        content: accumulatedText || "Design prototype assembled successfully.",
        thinking: accumulatedThinking,
        toolInvocations: [...invocations],
        timestamp: Date.now(),
      };

      const newVersions = [...currentActiveProject.versions];
      let newActiveIndex = currentActiveProject.activeVersionIndex;

      if (latestHtml) {
        const newVersionNumber = newVersions.length + 1;
        const newVer: ArtifactVersion = {
          id: "ver_" + Math.random().toString(36).slice(2, 9),
          versionNumber: newVersionNumber,
          title: `Iteration ${newVersionNumber}`,
          html: latestHtml,
          timestamp: Date.now(),
          promptSummary: content.slice(0, 60),
        };
        newVersions.push(newVer);
        newActiveIndex = newVersions.length - 1;
      }

      const finalizedProject: Project = {
        ...currentActiveProject,
        messages: [...currentActiveProject.messages, userMessage, finalAssistantMsg],
        versions: newVersions,
        activeVersionIndex: newActiveIndex,
        clientReview: receivedClientReview || activeClientReview || currentActiveProject.clientReview,
        updatedAt: Date.now(),
      };

      updateProject(finalizedProject);
      setReloadKey((prev) => prev + 1);
    } catch (err: any) {
      if (err.name === "AbortError") {
        const stoppedMsg: Message = {
          id: assistantMessageId,
          role: "assistant",
          content: accumulatedText ? `${accumulatedText} [Stopped]` : "Generation stopped.",
          thinking: accumulatedThinking,
          toolInvocations: [...invocations],
          timestamp: Date.now(),
        };

        updateProject({
          ...currentActiveProject,
          messages: [...currentActiveProject.messages, userMessage, stoppedMsg],
          updatedAt: Date.now(),
        });
        return;
      }
      let friendlyError = err?.message || "Failed to generate design.";
      if (
        friendlyError.includes("401") ||
        friendlyError.includes("Unauthorized") ||
        friendlyError.includes("API key")
      ) {
        friendlyError =
          "API key required or invalid. Please enter your provider key in Settings to start designing.";
        setIsSettingsOpen(true);
      }

      const errorMsg: Message = {
        id: "err_" + Math.random().toString(36).slice(2, 9),
        role: "assistant",
        content: `⚠️ ${friendlyError}`,
        isError: true,
        timestamp: Date.now(),
      };
      updateProject({
        ...currentActiveProject,
        messages: [...currentActiveProject.messages, userMessage, errorMsg],
        updatedAt: Date.now(),
      });
    } finally {
      setIsLoading(false);
      setIsClientReviewing(false);
      abortControllerRef.current = null;
    }
  };

  const handleToggleTheme = () => {
    const nextTheme: "dark" | "light" = settings.theme === "dark" ? "light" : "dark";
    const updated = { ...settings, theme: nextTheme };
    setSettings(updated);
    saveSettings(updated);
  };

  const handleExportProjectJson = () => {
    if (!project) return;
    const blob = new Blob([JSON.stringify(project, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const slug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    a.download = `${slug || "project"}.khayal.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleHomeSubmitPrompt = (promptText: string, brandId: string) => {
    const summary = promptText.length > 32 ? promptText.slice(0, 32) + "..." : promptText;
    const newProj = createNewProject(summary, brandId);
    const updatedList = [newProj, ...allProjects];
    setAllProjects(updatedList);
    saveProjects(updatedList);
    setActiveProjectId(newProj.id);
    setProject(newProj);
    setStreamingHtml("");
    setSelectedElement(null);
    setCurrentView("studio");

    // Immediately trigger streaming message generation
    setTimeout(() => {
      handleSendMessage(promptText, newProj);
    }, 50);
  };

  const handleOpenDesignSystem = (systemId: string) => {
    setActiveDesignSystemId(systemId);
    setCurrentView("design-system");
  };

  const handleUseDesignSystem = (systemId: string, promptText?: string) => {
    if (promptText) {
      handleHomeSubmitPrompt(promptText, systemId);
    } else {
      const sys = getDesignSystem(systemId);
      const newProj = createNewProject(`New ${sys.name} Project`, systemId);
      const updatedList = [newProj, ...allProjects];
      setAllProjects(updatedList);
      saveProjects(updatedList);
      setActiveProjectId(newProj.id);
      setProject(newProj);
      setStreamingHtml("");
      setSelectedElement(null);
      setCurrentView("studio");
    }
  };

  if (!project) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-background text-foreground-muted">
        <div className="w-6 h-6 border-2 border-terracotta/20 border-t-terracotta rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-background text-foreground overflow-hidden">
      {currentView === "home" ? (
        <HomeView
          projects={allProjects}
          activeProject={project}
          settings={settings}
          theme={settings.theme}
          onToggleTheme={handleToggleTheme}
          onUpdateSettings={(newSettings) => {
            setSettings(newSettings);
            saveSettings(newSettings);
          }}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onSelectProject={(projectId) => {
            handleSelectProject(projectId);
            setCurrentView("studio");
          }}
          onDeleteProject={handleDeleteProject}
          onNewProject={() => {
            handleNewProject();
            setCurrentView("studio");
          }}
          onSubmitPrompt={handleHomeSubmitPrompt}
          onOpenDesignSystem={handleOpenDesignSystem}
        />
      ) : currentView === "design-system" ? (
        <DesignSystemView
          initialSystemId={activeDesignSystemId}
          settings={settings}
          onUpdateSettings={(newSettings) => {
            setSettings(newSettings);
            saveSettings(newSettings);
          }}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onUseDesignSystem={handleUseDesignSystem}
          onBack={() => setCurrentView("home")}
        />
      ) : (
        <div className="w-full h-full flex flex-col overflow-hidden">
          {/* Mobile Studio View Toggle (visible only on small screens < md) */}
          <div className="md:hidden flex items-center justify-center py-2 px-3 border-b border-border bg-surface shrink-0 z-30">
            <div className="flex bg-surface-subtle p-0.5 rounded-xl border border-border text-xs w-full max-w-xs">
              <button
                type="button"
                onClick={() => setMobileStudioTab("chat")}
                className={`flex-1 py-1 px-3 rounded-lg font-medium transition-all text-xs flex items-center justify-center gap-1.5 ${
                  mobileStudioTab === "chat"
                    ? "bg-surface text-foreground shadow-2xs font-semibold"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                <span>💬</span>
                <span>Chat</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileStudioTab("canvas")}
                className={`flex-1 py-1 px-3 rounded-lg font-medium transition-all text-xs flex items-center justify-center gap-1.5 ${
                  mobileStudioTab === "canvas"
                    ? "bg-surface text-foreground shadow-2xs font-semibold"
                    : "text-foreground-muted hover:text-foreground"
                }`}
              >
                <span>🖥️</span>
                <span>Canvas</span>
              </button>
            </div>
          </div>

          <div className="flex-1 w-full h-full flex flex-col md:flex-row overflow-hidden relative">
            {/* Left: Chat Pane with custom resizable width */}
            <div
              className={`h-full ${
                mobileStudioTab === "chat" ? "flex w-full" : "hidden"
              } md:flex shrink-0`}
            >
              <ChatPane
                project={project}
                allProjects={allProjects}
                onSelectProject={handleSelectProject}
                onNewProject={handleNewProject}
                onRenameProject={handleRenameProject}
                onDeleteProject={handleDeleteProject}
                onGoHome={() => setCurrentView("home")}
                brandId={project.brandId}
                onSelectBrand={handleSelectBrand}
                customBrand={project.customBrand}
                messages={project.messages}
                isLoading={isLoading}
                onSendMessage={(content) => handleSendMessage(content)}
                onStopGeneration={handleStopGeneration}
                selectedElement={selectedElement}
                onClearSelectedElement={() => setSelectedElement(null)}
                settings={settings}
                onUpdateSettings={(newSettings) => {
                  setSettings(newSettings);
                  saveSettings(newSettings);
                }}
                onOpenSettings={() => setIsSettingsOpen(true)}
                onOpenDesignSystem={handleOpenDesignSystem}
                width={chatWidth}
                clientReview={activeClientReview || project.clientReview}
                isClientReviewing={isClientReviewing}
              />
            </div>

            {/* Resizable Divider (desktop only) */}
            <div
              onMouseDown={handleDividerMouseDown}
              className={`hidden md:flex w-1.5 hover:w-2 hover:bg-terracotta/40 cursor-col-resize items-center justify-center transition-all shrink-0 select-none z-20 ${
                isDraggingDivider ? "bg-terracotta w-2" : "bg-border/60 hover:bg-terracotta/40"
              }`}
              title="Drag to resize chat and canvas"
            >
              <div className="w-0.5 h-6 bg-foreground-muted/40 rounded-full" />
            </div>

            {/* Right: Live Canvas Preview Pane */}
            <div
              className={`flex-1 h-full min-w-0 ${
                mobileStudioTab === "canvas" ? "flex w-full" : "hidden"
              } md:flex`}
            >
              <PreviewPane
                projectId={project.id}
                projectName={project.name}
                currentHtml={streamingHtml}
                streamingCode={streamingHtml}
                versions={project.versions}
                activeVersionIndex={project.activeVersionIndex}
                onSelectVersion={handleSelectVersion}
                onSelectElement={(info) => {
                  setSelectedElement(info);
                  setMobileStudioTab("chat");
                }}
                onRuntimeError={handleRuntimeError}
                externalReloadKey={reloadKey}
                isLoading={isLoading}
                theme={settings.theme}
                onToggleTheme={handleToggleTheme}
                onOpenSettings={() => setIsSettingsOpen(true)}
                onExportProjectJson={handleExportProjectJson}
              />
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal (Global) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={(newSettings) => {
          setSettings(newSettings);
          saveSettings(newSettings);
        }}
      />
    </div>
  );
}
