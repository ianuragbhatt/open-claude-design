import { WorkspaceStorage } from "./types";
import { FsWorkspaceStorage } from "./fs-storage";

let storageInstance: WorkspaceStorage | null = null;

export function getWorkspaceStorage(): WorkspaceStorage {
  if (!storageInstance) {
    storageInstance = new FsWorkspaceStorage();
  }
  return storageInstance;
}

export function setWorkspaceStorage(storage: WorkspaceStorage | null): void {
  storageInstance = storage;
}

export * from "./types";
export { FsWorkspaceStorage } from "./fs-storage";
