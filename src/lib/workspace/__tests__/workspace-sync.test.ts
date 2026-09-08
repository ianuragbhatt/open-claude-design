import { describe, it, expect, vi, beforeEach } from "vitest";
import { broadcastWorkspaceReload } from "../../workspace-sync";

describe("broadcastWorkspaceReload", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should not crash in non-window environment", () => {
    // When window is undefined (e.g. Node server-side)
    expect(() => broadcastWorkspaceReload("proj_1")).not.toThrow();
  });

  it("should post message via BroadcastChannel and update localStorage", () => {
    const postMessageMock = vi.fn();
    const closeMock = vi.fn();

    // Mock global window & BroadcastChannel
    const globalAny = global as any;
    const originalWindow = globalAny.window;
    const originalLocalStorage = globalAny.localStorage;

    const storageMap: Record<string, string> = {};
    globalAny.window = {};
    globalAny.localStorage = {
      setItem: vi.fn((key: string, val: string) => {
        storageMap[key] = val;
      }),
      getItem: vi.fn((key: string) => storageMap[key] || null),
    };

    globalAny.BroadcastChannel = class {
      name: string;
      constructor(name: string) {
        this.name = name;
      }
      postMessage = postMessageMock;
      close = closeMock;
    };

    broadcastWorkspaceReload("budget-smart");

    expect(postMessageMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "RELOAD",
        projectId: "budget-smart",
      })
    );
    expect(closeMock).toHaveBeenCalled();
    expect(globalAny.localStorage.setItem).toHaveBeenCalledWith(
      "khayal_workspace_reload_budget-smart",
      expect.any(String)
    );

    // Cleanup
    globalAny.window = originalWindow;
    globalAny.localStorage = originalLocalStorage;
    delete globalAny.BroadcastChannel;
  });
});
