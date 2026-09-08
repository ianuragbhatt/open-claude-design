# ADR 0001: Autonomous Agentic ReAct Engine over Single-Prompt Chat

## Status
Accepted

## Context
The initial implementation of this tool relied on a single-prompt chat completion model where the AI was prompted to wrap an entire monolithic HTML file inside an `<artifact type="html">...</artifact>` XML tag.
This caused critical failures in real-world usage:
1. **Fragility & Parser Failures**: Modern frontier models (GPT-4o, Claude 3.5, DeepSeek) frequently output standard markdown (````html ... ````) or raw HTML rather than custom XML tags. When this occurred, the regex parser failed silently, leaving the canvas blank and rendering raw code in chat.
2. **The Monolithic Rewrite Bottleneck**: Small user revision requests (e.g. "change this button color to blue") forced the model to re-generate the entire 2,000-line HTML document from scratch, introducing high latency, token waste, and accidental regressions.
3. **No File Awareness or Self-Correction**: The model had no tools to inspect existing files, create multi-file modular codebases, or detect runtime errors.

## Decision
We replace the single-turn chat completion with an **Autonomous ReAct Agent Loop** powered by the **Vercel AI SDK** (`streamText({ maxSteps: 10, tools })`):
1. The agent is provided typed virtual file tools: `list_files`, `read_file`, `write_file`, `edit_file`, and `delete_file`.
2. For small revisions, the agent executes `edit_file` to perform surgical diff replacements (`target_snippet` $\rightarrow$ `replacement_snippet`) without touching the rest of the file.
3. Every tool call and result is streamed live to the UI as an interactive action feed (e.g. `📝 Wrote index.html`, `⚡ Updated styles.css`).
4. Runtime errors in the preview canvas are captured and fed back into the agent loop for automated self-healing before completion.

## Consequences
### Positive
* 100% reliable execution: Native tool calling eliminates regex parsing bugs entirely.
* Sub-second surgical edits: Changing a section takes 2 seconds instead of 45 seconds of full-page re-generation.
* Multi-file project support: Real websites with separate CSS, JS, and subpages.
* Self-correcting: Syntax errors and missing libraries are repaired automatically.

### Negative / Trade-offs
* Requires multiple agent loop steps (up to `maxSteps`), requiring careful token management and abort signals.
