# Khayal Agentic Studio — System Architecture

## 1. Executive Summary

Khayal is an open-source, autonomous AI UI/UX design studio and canvas. It merges **Claude Design's** elite visual craft and `DESIGN.md` brand contracts with **Lovable.dev's** autonomous multi-file agentic loop, packaged as a lightweight, deployable Next.js web application.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              KHAYAL STUDIO                                  │
├──────────────────────────────────────┬──────────────────────────────────────┤
│               LEFT PANE              │              RIGHT PANE              │
│      Agentic Feed & Composer         │      Live Multi-File Canvas          │
│                                      │                                      │
│  💬 Prompt / Click-to-Edit Pin       │  🖥️ Responsive Viewports             │
│  🧠 Thinking Process (Claude 3.7)    │  🔄 Step-by-Step Hot Reload          │
│  ⚡ Live Tool Stream (Writing file…) │  🎯 Click-to-Edit Inspector          │
│  🎨 Active Brand: DESIGN.md System   │  📦 1-Click ZIP & HTML Export        │
└──────────────────┬───────────────────┴───────────────────▲──────────────────┘
                   │                                       │
                   ▼                                       │
┌──────────────────────────────────────┐                   │
│         NEXT.JS AGENT ENGINE         │                   │
│   (Vercel AI SDK: maxSteps ReAct)    │                   │
├──────────────────────────────────────┤                   │
│  • Anthropic Claude 3.7 (Thinking)   │                   │
│  • OpenAI (GPT-4o, o3-mini)          │                   │
│  • OpenRouter / DeepSeek R1          │                   │
└──────────────────┬───────────────────┘                   │
                   ▼ Tool Calls                            │
┌───────────────────────────────────────────────────────┐  │
│  TOOLS: write_file | edit_file | read_file | list     │  │
└──────────────────┬────────────────────────────────────┘  │
                   ▼                                       │
┌───────────────────────────────────────────────────────┐  │
│  WORKSPACE STORAGE (Abstract Interface)               │  │
│  • Phase 1 (Now): Local disk (./workspaces/[id]/*)    │──┘
│  • Phase 2 (Deploy): Postgres / Supabase / S3         │ (Serves relative files,
└───────────────────────────────────────────────────────┘  CSS, JS & images)
```

---

## 2. Core Architectural Pillars

### Pillar 1: The Autonomous Agent Loop (ReAct)
Unlike basic chat wrappers that force models to dump 2,000 lines of monolithic HTML inside a fragile chat text response, Khayal runs an **autonomous multi-step ReAct loop** powered by the Vercel AI SDK (`streamText({ maxSteps: 10, tools })`):
1. **Plan & Reason**: Model evaluates the project brief against the active `DESIGN.md` brand contract and inspects existing files.
2. **Execute Tools**: Calls typed tools (`list_files`, `read_file`, `write_file`, `edit_file`).
3. **Stream Events**: Every tool invocation (`tool-call` and `tool-result`) streams live to the UI as collapsible action steps.
4. **Iterate & Self-Heal**: If runtime errors occur or adjustments are needed, the agent loops and executes surgical fixes.

### Pillar 2: Workspace Storage Layer (`WorkspaceStorage`)
Projects are real multi-file codebases, not in-memory text blobs.
* **Abstract Interface**: All file operations adhere to `WorkspaceStorage`:
  * `readFile(projectId, path)`
  * `writeFile(projectId, path, content)`
  * `editFile(projectId, path, targetSnippet, replacementSnippet)`
  * `listFiles(projectId, subDir)`
  * `deleteFile(projectId, path)`
  * `createSnapshot(projectId, version, title)`
  * `restoreSnapshot(projectId, snapshotId)`
  * `exportZip(projectId)`
* **Phase 1 (Development / Local Server)**: `FsWorkspaceStorage` saves files to `./workspaces/<projectId>/`. Path sanitization strictly enforces that paths cannot escape the project boundary.
* **Phase 2 (Cloud / Docker Deployment)**: Easily swapped for `DatabaseWorkspaceStorage` (PostgreSQL / Supabase JSON tree or S3 blob storage) without modifying any agent or UI logic.

### Pillar 3: Live Preview Runtime (`/api/workspaces/...`)
* The live canvas is an isolated `<iframe>` pointing to `/api/workspaces/[projectId]/index.html`.
* This internal route serves files directly with accurate MIME types (`text/html`, `text/css`, `application/javascript`, `image/svg+xml`).
* **Relative Links Work Out-of-the-Box**: `<link rel="stylesheet" href="styles.css">`, `<script src="script.js">`, and `<a href="pricing.html">` work natively just like a real web server.
* An interactive bridge script (`iframe-bridge.js`) is automatically injected into HTML responses.

### Pillar 4: Bi-Directional Click-to-Edit
* In "Click to Edit" mode, hovering over canvas elements highlights them with an interactive outline.
* Clicking an element extracts:
  * Element name (from `data-khayal-element="hero-section"` or semantic tags)
  * CSS selector path
  * Outer HTML snippet
  * Target file path (e.g. `index.html`)
* When the user prompts *"Make this headline larger and change button to primary accent"*, the agent receives this targeted coordinate and executes a surgical `edit_file` diff on that exact block.

### Pillar 5: Self-Healing Runtime Error Loop
* The injected bridge listens for `window.onerror` and `unhandledrejection`.
* If an error occurs, it emits `RUNTIME_ERROR` to the host parent window.
* The system automatically feeds the error back to the agent:
  `"Runtime Error: ReferenceError: lucide is not defined at script.js:14"`
* The agent automatically calls `edit_file` or `write_file` to fix the bug before completing the turn.

### Pillar 6: Design System Engine (`DESIGN.md`)
* The agent is strictly bound to pre-curated brand design systems (`Linear`, `Stripe`, `Apple`, `Vercel`, `Warm Editorial`, `Modernist`, `Neo-Brutalist`).
* When generating or editing, the system prompt injects exact CSS tokens (`var(--accent)`, `var(--canvas)`, `var(--surface)`), font pairings, and geometry rules.
* Guarantees world-class aesthetic craft and prevents generic "AI slop".

### Pillar 7: Multi-Model BYOK Freedom
* **Native Anthropic**: Claude 3.7 Sonnet (with extended thinking mode), Claude 3.5 Sonnet, Haiku.
* **Native OpenAI**: GPT-4o, o3-mini.
* **OpenRouter**: DeepSeek R1, DeepSeek V3, Llama 3.3.
* **Local Ollama**: `http://localhost:11434/v1` for 100% offline generation.
* Credentials are securely held in the user's browser session.

### Pillar 8: Delivery & 1-Click Export
* **Download Full Project (.zip)**: Bundles the entire workspace folder into a clean ZIP archive ready for Netlify, Vercel, or GitHub.
* **Copy Shareable HTML**: Inlined single-file preview.
* **Export Project State (.json)**: Full session and version history backup.

### Pillar 9: Autonomous Multi-Agent Supervisor & Specialist Delegation
Rather than relying on a rigid, single-agent prompt loop, Khayal features an **Autonomous Creative Director & Supervisor**:
* Dynamically inspects the workspace (`inspect_workspace`) and summons specialists based on context:
  * 🎨 **UI Markup Designer** (`delegate_to_designer`): Semantic HTML5, accessibility landmarks, Lucide icons, and `data-khayal-element` hooks.
  * 💅 **Style Specialist** (`delegate_to_stylist`): Design system CSS custom properties, responsive layout, and glass elevation.
  * ⚡ **Frontend Logic Engineer** (`delegate_to_engineer`): Stateful JavaScript, interactive DOM manipulation, canvas charts, and `localStorage` persistence.
  * 🔍 **Quality Reviewer** (`delegate_to_reviewer`): DOM element validation, syntax audits, and surgical diff execution.

### Pillar 10: Independent Non-Biased Client Reviewer Agent
* Operates as a completely detached external auditor with **zero authorship bias**.
* Evaluates deliverables against executive client criteria: visual polish, hierarchy, brand contract adherence, and interactive completeness.
* Outputs a quantitative score (0–100), letter grade (A+, A, B), visual verdict, and polish punch list.

### Pillar 11: Signature 3D Laptop Review Animation
* A sleek CSS 3D-perspective MacBook model positioned directly above the chat composer.
* Realistic 3D opening lid (`rotateX(-75deg)` ➔ `rotateX(0deg)`), ambient keyboard glow, sweeping laser scanner beam, and dynamic score counter.
* Expandable critique drawer displaying strengths and polish recommendations.

### Pillar 12: Fullscreen Presentation Mode & Multi-Channel Live Cross-Tab Sync
* **1-Click Presentation**: Opens the workspace in a standalone fullscreen browser tab via the **"Present"** button (`/api/workspaces/[projectId]/index.html?present=1`).
* **Real-Time Zero-Latency Sync**: As the agent or user makes modifications in the studio, changes are automatically pushed to the presentation tab via three redundant channels:
  1. `BroadcastChannel`: Instant intra-browser messaging (0ms latency).
  2. `localStorage` storage events: Cross-tab event fallback.
  3. Server-Sent Events (`/api/workspaces/[projectId]/live`): Filesystem watcher detects any file changes on disk and pushes live reloads.
* **Subtle Status Pill**: Displays a discreet floating badge (`● Live Synced | Presentation`) with debounced smooth reloading.

---

## 3. Directory Layout

```
khayal/
├── docs/
│   ├── architecture.md           # This document
│   └── adr/                      # Architectural Decision Records
│       ├── 0001-agentic-studio-architecture.md
│       ├── 0002-workspace-storage-abstraction.md
│       ├── 0003-native-byok-and-design-contracts.md
│       └── 0004-multi-agent-supervisor-and-presentation-sync.md
├── workspaces/                   # Local workspace project files (gitignored)
│   └── [projectId]/
│       ├── index.html
│       ├── styles.css
│       └── script.js
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts                    # Autonomous Supervisor loop & Client Review endpoint
│   │   │   ├── models/route.ts                  # Endpoint discovery
│   │   │   └── workspaces/
│   │   │       └── [projectId]/
│   │   │           ├── [...path]/route.ts       # Dynamic iframe asset server & bridge injector
│   │   │           ├── export/route.ts          # 1-Click ZIP project packager
│   │   │           ├── files/route.ts           # Workspace file tree inspector
│   │   │           └── live/route.ts            # SSE filesystem watcher for real-time live reload
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx                             # Main orchestrator & studio state
│   ├── components/
│   │   ├── ChatPane.tsx                         # Agent action stream & composer
│   │   ├── LaptopReviewAnimation.tsx            # 3D animated laptop review deck
│   │   ├── PreviewFrame.tsx                     # Sandboxed iframe with bridge
│   │   ├── PreviewPane.tsx                      # Viewport controls, Present button, code viewer, export
│   │   └── SettingsModal.tsx                    # Multi-provider BYOK config
│   └── lib/
│       ├── agent/
│       │   ├── client-reviewer.ts               # Independent non-biased client review agent
│       │   ├── prompt.ts                        # Role-specialized system prompts & DESIGN.md contracts
│       │   ├── provider.ts                      # Multi-model client resolver (Capgemini gateway, OpenAI, Anthropic)
│       │   ├── supervisor.ts                    # Autonomous Supervisor engine & specialist delegation
│       │   └── tools.ts                         # Typed agent tools (Zod + execution)
│       ├── workspace/
│       │   ├── types.ts                         # Storage abstraction interface
│       │   ├── fs-storage.ts                    # Local filesystem implementation
│       │   └── index.ts                         # Storage singleton factory
│       ├── design-systems.ts                    # Curated brand contracts & tokens
│       ├── iframe-bridge.ts                     # Injected inspect, error, and presentation live sync bridge
│       └── workspace-sync.ts                    # Inter-tab broadcast channel & storage sync broadcaster
├── AGENTS.md                                    # Agent manual & testing policy
└── package.json
```
