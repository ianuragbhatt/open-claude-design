/**
 * Workspace Real-Time Cross-Tab Synchronization
 *
 * Broadcasts reload notifications to any active Presentation tabs or external windows
 * viewing the workspace when files are modified by the agent or user.
 */

export function broadcastWorkspaceReload(projectId: string): void {
  if (typeof window === "undefined" || !projectId) return;

  const timestamp = Date.now();

  // 1. BroadcastChannel (0ms latency intra-browser sync across tabs)
  try {
    if (typeof BroadcastChannel !== "undefined") {
      const bc = new BroadcastChannel(`khayal_workspace_${projectId}`);
      bc.postMessage({ type: "RELOAD", projectId, timestamp });
      bc.close();
    }
  } catch {}

  // 2. LocalStorage storage event (inter-tab event fallback)
  try {
    localStorage.setItem(`khayal_workspace_reload_${projectId}`, String(timestamp));
  } catch {}
}
