export interface WorkspaceFile {
  path: string;
  content: string;
  updatedAt: number;
  size: number;
}

export interface EditFileResult {
  success: boolean;
  error?: string;
  diffSummary?: string;
}

export interface WorkspaceSnapshot {
  id: string;
  versionNumber: number;
  title: string;
  timestamp: number;
  files: Record<string, string>;
}

export interface WorkspaceStorage {
  /**
   * Reads a file from the project workspace.
   */
  readFile(projectId: string, filePath: string): Promise<string>;

  /**
   * Writes or overwrites a file in the project workspace.
   */
  writeFile(projectId: string, filePath: string, content: string): Promise<void>;

  /**
   * Surgically edits a file by replacing a unique target snippet with replacement content.
   */
  editFile(
    projectId: string,
    filePath: string,
    targetSnippet: string,
    replacementSnippet: string
  ): Promise<EditFileResult>;

  /**
   * Lists all file paths (relative to workspace root) in the project.
   */
  listFiles(projectId: string, subDir?: string): Promise<string[]>;

  /**
   * Deletes a file from the project workspace.
   */
  deleteFile(projectId: string, filePath: string): Promise<void>;

  /**
   * Checks if a file exists in the workspace.
   */
  fileExists(projectId: string, filePath: string): Promise<boolean>;

  /**
   * Ensures the project workspace is initialized with seed files if empty.
   */
  ensureProject(
    projectId: string,
    brandId?: string,
    initialHtml?: string
  ): Promise<void>;

  /**
   * Takes a snapshot commit of the workspace file tree.
   */
  createSnapshot(
    projectId: string,
    versionNumber: number,
    title: string
  ): Promise<string>;

  /**
   * Restores a past snapshot commit.
   */
  restoreSnapshot(projectId: string, snapshotId: string): Promise<void>;

  /**
   * Lists all past snapshots for a project.
   */
  listSnapshots(projectId: string): Promise<WorkspaceSnapshot[]>;

  /**
   * Bundles the entire workspace into a ZIP archive buffer for download.
   */
  exportZip(projectId: string): Promise<Buffer>;
}
