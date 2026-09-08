# ADR 0004: Autonomous Multi-Agent Supervisor, Detached Client Reviewer, and Presentation Mode Live Sync

## Status
Accepted

## Context
Commercial web design tools such as Lovable.dev and Claude Design / v0 employ single-agent linear prompts or monolithic single-file generation. This introduces several severe limitations:
1. **Single-Agent Cognitive Overload**: Writing comprehensive HTML markup, complete design-system CSS, complex JavaScript state logic, and quality assurance in a single model turn frequently leads to incomplete implementations, skipped features, or HTTP stream timeouts.
2. **Authorship Bias in Quality Checks**: When an agent checks its own code, confirmation bias causes it to overlook visual hierarchy bugs, token deviations, or missing interactions.
3. **Rigid Script Pipelines**: Rigid, hardcoded agent chains (Agent A always calls Agent B then Agent C) lack real-world adaptability for surgical updates or small prompt refinements.
4. **Lack of Fullscreen Presentation**: Users evaluating designs need to view prototypes in a standalone, distraction-free browser tab that stays continuously in sync as the studio AI makes updates.

## Decision
We architected a 4-tier collaborative autonomous multi-agent system paired with real-time inter-tab presentation sync:

### 1. Autonomous Lead Creative Director & Supervisor (`supervisor.ts`)
The Lead Supervisor operates autonomously rather than following a static pipeline. It evaluates the project brief and workspace state, dynamically dispatching specialized subagents:
* `delegate_to_designer`: Drafts semantic HTML5, Lucide icons, and `data-khayal-element` hooks.
* `delegate_to_stylist`: Authors design system CSS custom properties (`var(--canvas)`, `var(--surface)`, `var(--accent)`), glass cards, and responsive layout.
* `delegate_to_engineer`: Implements stateful JavaScript, DOM events, canvas charts, and `localStorage` persistence.
* `delegate_to_reviewer`: Inspects DOM element IDs, validates syntax, and executes surgical `edit_file` diffs.
* `inspect_workspace`: Inspects current files and directory structures before deciding on delegation.

### 2. Independent Non-Biased Client Reviewer (`client-reviewer.ts`)
A completely detached auditor persona with **zero authorship bias**. Upon prototype assembly, it performs an audit from the standpoint of an executive client, outputting:
* Overall Quality Score (0–100) and Letter Grade (A+, A, B, C, F)
* Visual Polish & Design System Fidelity Verdict
* Functional Completeness Verdict
* Client Strengths & Polish Opportunities Punch List

### 3. Signature 3D Laptop Review Animation (`LaptopReviewAnimation.tsx`)
A 3D-perspective MacBook model docks above the chatbox. When the client review begins, the laptop lid opens (`rotateX(-75deg)` $\rightarrow$ `rotateX(0deg)`), screen glow casts onto the keyboard, a laser scanner beam sweeps the mock UI, and an animated score counter transitions to the final score.

### 4. Fullscreen Presentation Mode & Multi-Channel Cross-Tab Live Sync
* A prominent **"Present"** button opens `/api/workspaces/[projectId]/index.html?present=1` in a new browser tab.
* Injected bridge script detects standalone presentation mode, rendering a discreet floating pill (`● Live Synced | Presentation`).
* Any change made by the AI agent or user immediately refreshes the presentation tab via three redundant sync channels:
  1. `BroadcastChannel`: Intra-browser messaging with 0ms latency.
  2. `localStorage` storage events: Cross-tab fallback.
  3. Server-Sent Events (`/api/workspaces/[projectId]/live`): Filesystem watcher detects changes on disk and pushes live reload events.

## Consequences
### Positive
* **Superior Architectural Separation**: HTML markup, design-system styling, and frontend logic are authored by dedicated specialist personas with deep domain prompts.
* **Objective Verification**: The independent reviewer provides honest scores (e.g. 2/100 for stubs, 91/100 for production apps) and actionable feedback.
* **Instant Presentation Feedback**: Stakeholders can keep a fullscreen presentation tab open on a separate monitor while continuing to prompt Khayal in the studio, seeing live updates with zero manual refreshes.

### Negative / Trade-offs
* Multiple LLM tool delegations consume more token steps than a single monolithic prompt, mitigated by focused specialist roles and surgical diffs.
