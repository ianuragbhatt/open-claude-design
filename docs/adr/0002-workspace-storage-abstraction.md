# ADR 0002: Abstract Workspace Storage Layer (Local Disk -> Database/S3)

## Status
Accepted

## Context
In monolithic desktop agents like `open-design`, projects rely on a local Electron daemon and terminal PTY (`node-pty`) running commands directly on the user's host OS. However, our goal is to deploy Khayal to cloud platforms, Docker containers, and multi-tenant environments.
Running arbitrary terminal shell commands in a cloud Docker container introduces severe security risks (container escape, arbitrary code execution), heavy process overhead, and complex state management.
Conversely, keeping project files solely in browser LocalStorage limits projects to small text blobs and breaks multi-file relative asset resolution.

## Decision
We decouple project storage into an abstract interface: `WorkspaceStorage`:
```typescript
export interface WorkspaceStorage {
  readFile(projectId: string, filePath: string): Promise<string>;
  writeFile(projectId: string, filePath: string, content: string): Promise<void>;
  editFile(projectId: string, filePath: string, targetSnippet: string, replacementSnippet: string): Promise<{ success: boolean; error?: string }>;
  listFiles(projectId: string, subDir?: string): Promise<string[]>;
  deleteFile(projectId: string, filePath: string): Promise<void>;
  createSnapshot(projectId: string, versionNumber: number, title: string): Promise<string>;
  restoreSnapshot(projectId: string, snapshotId: string): Promise<void>;
  exportZip(projectId: string): Promise<Buffer>;
}
```

* **Phase 1 (Development & Local Self-Hosting)**: Implemented via `FsWorkspaceStorage` writing to `./workspaces/<projectId>/`. All file operations are strictly path-sanitized against directory traversal attacks.
* **Phase 2 (Cloud / Production Deployment)**: Can be seamlessly replaced with `DatabaseWorkspaceStorage` (PostgreSQL / Supabase JSON tree) or S3 object storage without altering a single line of agent prompt or UI logic.

## Consequences
### Positive
* Security: Safe virtual file operations with no host bash/terminal execution.
* Real Files on Disk: Users can inspect and open real project files in their code editor right now.
* Cloud Readiness: 100% prepared for future containerization and PostgreSQL storage.
* Native Relative Paths: Relative assets (`href="styles.css"`, `<img src="hero.jpg">`) resolve naturally via `/api/workspaces/[projectId]/[...path]`.
