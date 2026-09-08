<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Khayal Agentic Studio — Engineering Guide

Autonomous multi-file UI/UX studio pairing **Claude Design's** design systems with **Lovable.dev's** agentic engine.

---

## 1. Documentation & Architecture Map

Deep architecture blueprints are stored in `docs/` — read them before making architectural modifications:
* **System Guide**: [`docs/architecture.md`](file:///Users/anuragbhatt/Documents/Projects/claude-design/docs/architecture.md) (ReAct loop, storage, live preview runtime, event streams).
* **ADR 0001**: [`docs/adr/0001-agentic-studio-architecture.md`](file:///Users/anuragbhatt/Documents/Projects/claude-design/docs/adr/0001-agentic-studio-architecture.md) (Vercel AI SDK ToolLoopAgent vs single-prompt regex chat).
* **ADR 0002**: [`docs/adr/0002-workspace-storage-abstraction.md`](file:///Users/anuragbhatt/Documents/Projects/claude-design/docs/adr/0002-workspace-storage-abstraction.md) (Abstract storage layer for disk / Postgres / S3).
* **ADR 0003**: [`docs/adr/0003-native-byok-and-design-contracts.md`](file:///Users/anuragbhatt/Documents/Projects/claude-design/docs/adr/0003-native-byok-and-design-contracts.md) (BYOK multi-provider resolution & `DESIGN.md` contracts).
* **ADR 0004**: [`docs/adr/0004-multi-agent-supervisor-and-presentation-sync.md`](file:///Users/anuragbhatt/Documents/Projects/claude-design/docs/adr/0004-multi-agent-supervisor-and-presentation-sync.md) (Multi-Agent Supervisor, Client Reviewer, and Presentation Mode Live Sync).

---

## 2. Mandatory Testing Protocol

> [!IMPORTANT]
> **Every feature and bug fix requires automated tests.**
> Before concluding any task or turn, verify that all tests and TypeScript pass with zero errors:
> ```bash
> npm test
> npm run typecheck
> ```

---

## 3. Core Architectural Invariants

1. **Autonomous ReAct Tools Only**: Code generation happens via typed tools (`write_file`, `edit_file`, `read_file`, `list_files`, `fetch_asset`). Never revert to monolithic string/regex `<artifact>` extraction.
2. **Storage Abstraction**: All file access MUST go through `getWorkspaceStorage()`. Never use direct `fs` calls inside UI components or API routes.
3. **OpenAI-Compatible Gateways**: Custom endpoints (Capgemini, OpenRouter, Ollama, LiteLLM) implement `/chat/completions`. In `@ai-sdk/openai`, always resolve them via `provider.chat(modelId)` (not `provider(modelId)` which defaults to `/responses`).
4. **Surgical Diffs**: Prefer `edit_file` over full-file rewrites for iterative refinements.
5. **Brand Contracts (`DESIGN.md`)**: Generated UI must use CSS custom properties (`var(--accent)`, `var(--canvas)`, `var(--surface)`) and curated typography pairings from `src/lib/design-systems.ts`.
6. **Sandbox Security**: Never allow paths to escape `./workspaces/<projectId>/`. Block traversal attacks.

---

## 4. Key Directory Map

* `src/lib/agent/`: Autonomous Supervisor (`supervisor.ts`), Client Reviewer (`client-reviewer.ts`), model resolver (`provider.ts`), system prompt (`prompt.ts`), tools (`tools.ts`).
* `src/lib/workspace/`: Abstract `WorkspaceStorage` and filesystem engine (`fs-storage.ts`).
* `src/lib/workspace-sync.ts`: Real-time cross-tab broadcast and storage event dispatcher.
* `src/app/api/chat/route.ts`: Supervisor SSE streaming loop & independent client review dispatch.
* `src/app/api/workspaces/[projectId]/`: Dynamic asset server (`[...path]`), ZIP exporter (`export`), file tree (`files`), live filesystem watcher (`live`).
* `src/components/`: `ChatPane.tsx` (action feed & 3D laptop review deck), `LaptopReviewAnimation.tsx`, `PreviewPane.tsx` (viewport, Present button, code viewer), `PreviewFrame.tsx` (sandboxed iframe), `SettingsModal.tsx` (BYOK).
