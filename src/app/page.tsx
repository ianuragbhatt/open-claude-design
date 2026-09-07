"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChatPane } from "@/components/ChatPane";
import { PreviewPane } from "@/components/PreviewPane";
import { SettingsModal } from "@/components/SettingsModal";
import { HomeView } from "@/components/HomeView";
import { DesignSystemView } from "@/components/DesignSystemView";
import { getDesignSystem } from "@/lib/design-systems";
import { parseStreamContent } from "@/lib/parser";
import {
  type Project,
  type Message,
  type ArtifactVersion,
  type ApiSettings,
  loadSettings,
  saveSettings,
  loadProjects,
  saveProjects,
  getActiveProjectId,
  setActiveProjectId,
  createInitialDemoProject,
  createNewProject,
  DEFAULT_SETTINGS,
} from "@/lib/storage";

export default function OpenClaudeDesignStudio() {
  const [currentView, setCurrentView] = useState<"home" | "studio" | "design-system">("home");
  const [activeDesignSystemId, setActiveDesignSystemId] = useState<string>("modernist");
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [settings, setSettings] = useState<ApiSettings>(DEFAULT_SETTINGS);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingHtml, setStreamingHtml] = useState<string>("");
  const [selectedElement, setSelectedElement] = useState<{
    elementName: string;
    selector: string;
    textSnippet: string;
  } | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Initial load
  useEffect(() => {
    const loadedSettings = loadSettings();
    setSettings(loadedSettings);

    const storedProjects = loadProjects();
    const activeId = getActiveProjectId();
    let current = storedProjects.find((p) => p.id === activeId);

    if (!current) {
      current = createInitialDemoProject();
      storedProjects.unshift(current);
      saveProjects(storedProjects);
      setActiveProjectId(current.id);
    }
    setAllProjects(storedProjects);
    setProject(current);
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
    setStreamingHtml("");
    setSelectedElement(null);
  };

  const handleSelectProject = (projectId: string) => {
    const found = allProjects.find((p) => p.id === projectId);
    if (found) {
      setActiveProjectId(found.id);
      setProject(found);
      if (found.versions.length > 0 && found.activeVersionIndex >= 0) {
        setStreamingHtml(found.versions[found.activeVersionIndex].html);
      } else {
        setStreamingHtml("");
      }
      setSelectedElement(null);
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
    abortControllerRef.current = new AbortController();

    const assistantMessageId = "msg_" + Math.random().toString(36).slice(2, 9);
    let fullStreamText = "";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({
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

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullStreamText += chunk;

        const parsed = parseStreamContent(fullStreamText);

        // Only update preview if artifact is complete or significantly structured
        if (parsed.artifact?.isComplete) {
          setStreamingHtml(parsed.artifact.html);
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
                content: parsed.text,
                questionForm: parsed.questionForm,
                timestamp: Date.now(),
              },
            ],
          };
        });
      }

      // Stream completed: finalize artifact snapshot
      const finalParsed = parseStreamContent(fullStreamText);
      const finalAssistantMsg: Message = {
        id: assistantMessageId,
        role: "assistant",
        content: finalParsed.text || (finalParsed.artifact ? `Generated "${finalParsed.artifact.title}"` : ""),
        questionForm: finalParsed.questionForm,
        timestamp: Date.now(),
      };

      let newVersions = [...currentActiveProject.versions];
      let newActiveIndex = currentActiveProject.activeVersionIndex;

      if (finalParsed.artifact?.html) {
        const newVersionNumber = newVersions.length + 1;
        const newVer: ArtifactVersion = {
          id: "ver_" + Math.random().toString(36).slice(2, 9),
          versionNumber: newVersionNumber,
          title: finalParsed.artifact.title || `Iteration ${newVersionNumber}`,
          html: finalParsed.artifact.html,
          timestamp: Date.now(),
          promptSummary: content.slice(0, 60),
        };
        newVersions.push(newVer);
        newActiveIndex = newVersions.length - 1;
        setStreamingHtml(finalParsed.artifact.html);
      }

      const finalizedProject: Project = {
        ...currentActiveProject,
        messages: [...currentActiveProject.messages, userMessage, finalAssistantMsg],
        versions: newVersions,
        activeVersionIndex: newActiveIndex,
        updatedAt: Date.now(),
      };

      updateProject(finalizedProject);
    } catch (err: any) {
      if (err.name === "AbortError") {
        return;
      }
      let friendlyError = err?.message || "Failed to generate design.";
      if (friendlyError.includes("401") || friendlyError.includes("Unauthorized") || friendlyError.includes("API key")) {
        friendlyError = "API key required or invalid. Please enter your provider key in Settings to start designing.";
        setIsSettingsOpen(true);
      }

      const errorMsg: Message = {
        id: "err_" + Math.random().toString(36).slice(2, 9),
        role: "assistant",
        content: `⚠️ ${friendlyError}`,
        timestamp: Date.now(),
      };
      updateProject({
        ...currentActiveProject,
        messages: [...currentActiveProject.messages, userMessage, errorMsg],
        updatedAt: Date.now(),
      });
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleToggleTheme = () => {
    const nextTheme: "dark" | "light" = settings.theme === "dark" ? "light" : "dark";
    const updated = { ...settings, theme: nextTheme };
    setSettings(updated);
    saveSettings(updated);
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
        <div className="w-full h-full flex overflow-hidden">
          {/* Left: Chat Pane with its own header, unboxed stream, and in-composer design system selector */}
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
          />

          {/* Right: Live Canvas Preview Pane with Claude Design command ribbon */}
          <PreviewPane
            projectName={project.name}
            currentHtml={streamingHtml}
            versions={project.versions}
            activeVersionIndex={project.activeVersionIndex}
            onSelectVersion={handleSelectVersion}
            onSelectElement={(info) => setSelectedElement(info)}
            isLoading={isLoading}
            theme={settings.theme}
            onToggleTheme={handleToggleTheme}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
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
