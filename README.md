# Open Claude Design

> A clean, lean, open-source **Claude Design** alternative. Live canvas preview, `DESIGN.md` brand contracts, unified BYOK LLM support, and zero monolithic bloat.

Built with **Next.js 15 (Turbopack) + React 19 + Tailwind CSS + TypeScript**.

---

## 🌟 Why Open Claude Design?

Most AI design tools are either locked behind closed platforms or wrapped in complex monolithic daemons with background sidecars, virtual pets, and multi-gigabyte dependencies.

**Open Claude Design** is built with simplicity first:
- **Zero background daemons or sidecars**: Runs as a single, lightweight Next.js app (`npm run dev`).
- **No vendor lock-in**: Works with any OpenAI-compatible provider (OpenRouter, LiteLLM, vLLM, Ollama, Groq, DeepSeek, etc.) by supplying a Base URL and API key.
- **Dynamic model discovery**: Automatically populates models from your endpoint's `/models` API without hardcoded model lists.
- **`DESIGN.md` brand contract system**: Ensures the AI strictly adheres to your brand palette, typography, borders, and atmosphere.

---

## ✨ Features

### 1. Claude Design Homepage
- **Editorial Typography**: Styled with serif headlines (*"What should we create?"*) matching the official Claude Design aesthetic.
- **Hero Composer**: Prompt card equipped with quick design system picker, model selector pill, code mode, and one-click launch.
- **Design Systems Tab**: Visual swatch palette cards, timestamps, owner badges, and a custom design system creator.
- **Projects Tab**: Easily browse, open, rename, or delete past design projects stored in local state.

### 2. 2-Pane Studio Canvas
- **Conversational Design Brief**: Interactive chat on the left to iteratively refine prototypes and generate variations.
- **Live Sandboxed Preview**: Safe, isolated `<iframe>` canvas that streams live HTML/CSS updates as the model generates.
- **Inspect & Edit Mode**: Click any element or section in the preview to attach its selector and text snippet to your next prompt for pinpoint revisions.
- **Interact Mode**: Click buttons, toggle tabs, test dropdowns, and verify interactive scripts inside the preview.

### 3. Model & Effort Picker Popover
- Recreates the Claude Design model pill (`[Model] [Effort] ⌵`).
- Choose reasoning effort (`Low`, `Medium`, `High`) for models supporting extended thinking.
- Dynamic refresh button to fetch new models from your endpoint on the fly.

### 4. Brand Design Systems (`DESIGN.md`)
Includes curated built-in presets plus the ability to create and save custom brands:
- **Linear**: Dark minimal, starlight borders, indigo-violet accents.
- **Stripe**: World-class fintech elegance, clean light mode, vibrant gradients.
- **Apple**: Human interface aesthetics, expansive whitespace, refined curves.
- **Vercel**: Developer high-contrast monochrome.
- **Warm Editorial**: Literary serif typography, warm parchment tones, magazine layout.
- **Modern SaaS**: Friendly modern startup UI with rounded cards and soft glows.
- **Neo-Brutalist**: High-energy bold borders, hard offset drop shadows, saturated pop colors.
- **Modernist**: Swiss-style typography, asymmetrical grid balance, crimson accents.
- **Claude / Anthropic**: Warm dark workspace, terracotta and amber accents.
- **DCT Abu Dhabi**: Cultural luxury, desert terracotta, and emerald oasis highlights.
- **Custom Design Systems**: Create your own brands with custom colors, mode (dark/light), and markdown design guidelines.

### 5. Multi-Device Viewport & Export
- **Responsive Viewport Controls**: Instantly toggle between Desktop (1440px), Tablet (768px), Mobile (375px), and Fluid (100%).
- **Version Scrubber**: Step back and forth through previous iterations (`< v1 / v3 >`) to compare or revert designs.
- **One-Click Export**: Inspect raw code, copy HTML/CSS to clipboard, or download standalone offline `.html` files.

---

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/ianuragbhatt/open-claude-design.git
cd open-claude-design
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Configure Your Provider
1. Click the **avatar icon (A)** in the top right or click the model selector.
2. Enter your **Base URL** (e.g. `https://openrouter.ai/api/v1` or local Ollama `http://localhost:11434/v1`) and **API Key**.
3. Click **"Fetch models from API"** to discover and select available models.
4. Start designing!

---

## 📁 Project Structure

```
open-claude-design/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts      # OpenAI-compatible streaming SSE chat endpoint
│   │   │   └── models/route.ts    # Dynamic /models endpoint
│   │   ├── globals.css            # Tailwind & typography styles
│   │   ├── layout.tsx             # Root layout & app metadata
│   │   └── page.tsx               # Main entrypoint toggling Home & Studio views
│   ├── components/
│   │   ├── ChatPane.tsx           # Left conversational brief pane
│   │   ├── CreateDesignSystemModal.tsx # Custom design system creator
│   │   ├── Header.tsx             # Studio header with brand & project switchers
│   │   ├── HomeView.tsx           # Claude Design homepage with hero composer & tabs
│   │   ├── ModelPickerPopover.tsx # Model pill dropdown with effort selector
│   │   ├── PreviewFrame.tsx       # Sandboxed iframe with inspect/edit highlighting
│   │   ├── PreviewPane.tsx        # Right canvas pane with viewport toggles
│   │   └── SettingsModal.tsx      # Unified Base URL & API Key configuration
│   └── lib/
│       ├── demo-starter.ts        # Built-in demo fintech project
│       ├── design-systems.ts      # DESIGN.md systems, swatch palettes & storage
│       ├── iframe-bridge.ts       # PostMessage bridge for element clicking & editing
│       ├── parser.ts              # Streaming artifact & question-form parser
│       ├── prompt.ts              # System prompt with DESIGN.md injection
│       └── storage.ts             # LocalStorage state management
├── package.json
└── README.md
```

## 🙏 Credits & References

This project is created for the community and is built on the inspiration and concepts of two pioneering projects:

1. **[Claude Design by Anthropic](https://claude.ai)**:
   - Full credit for the visual design inspiration, editorial typography, UI aesthetic, the iconic *"What should we create?"* hero prompt composer, the model pill popover, and the conversational design-first UX.
   - *Disclaimer*: Open Claude Design is an independent open-source project and is not affiliated with, maintained by, or endorsed by Anthropic. "Claude" is a trademark of Anthropic, PBC.

2. **[OpenDesign](https://github.com/open-design/open-design)**:
   - Full credit for the foundational inspiration behind the `DESIGN.md` brand contract protocol, brand-system prompt rules (Linear, Stripe, Apple, Vercel, etc.), iframe canvas communication, and bringing agentic design workflows to developers.
   - Huge gratitude to the OpenDesign contributors and maintainers for pioneering open-source AI design systems.

---

## 📄 License

MIT License. Free to use, modify, and distribute.
