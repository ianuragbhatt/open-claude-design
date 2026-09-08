# Khayal (خيال)

> A clean, lean, open-source AI UI designer & canvas. Live canvas preview, `DESIGN.md` brand contracts, unified BYOK LLM support, and zero monolithic bloat.

Built with **Next.js 15 (Turbopack) + React 19 + Tailwind CSS + TypeScript**.

---

## 🌟 Why Khayal?

Most AI design tools are either locked behind closed platforms or wrapped in complex monolithic daemons with background sidecars, virtual pets, and multi-gigabyte dependencies.

**Khayal** (*Arabic for Imagination / Creative Vision*) is built with simplicity first:
- **Zero background daemons or sidecars**: Runs as a single, lightweight Next.js app (`npm run dev`).
- **No vendor lock-in**: Works with any OpenAI-compatible provider (OpenRouter, LiteLLM, vLLM, Ollama, Groq, DeepSeek, etc.) by supplying a Base URL and API key.
- **Dynamic model discovery**: Automatically populates models from your endpoint's `/models` API without hardcoded model lists.
- **`DESIGN.md` brand contract system**: Ensures the AI strictly adheres to your brand palette, typography, borders, and atmosphere.

---

## ✨ Features

### 1. Khayal Homepage
- **Editorial Typography**: Styled with serif headlines (*"What should we create today?"*) with refined, warm aesthetics.
- **Hero Composer**: Prompt card equipped with brand style picker, friendly model selector pill, one-click creative inspiration chips, and launch button.
- **Brand Styles Tab**: Visual swatch palette cards, aesthetic mood tags, atmosphere badges, and an intuitive visual brand style creator.
- **Saved Designs Tab**: Easily browse, open, rename, or delete past design projects stored in local state.

### 2. 2-Pane Canvas Workspace
- **Conversational Design Brief**: Interactive chat on the left to iteratively refine prototypes and generate variations with real-world UI starters and quick enhancement prompts.
- **Live Sandboxed Preview**: Safe, isolated `<iframe>` canvas that streams live HTML/CSS updates as the model generates.
- **Click-to-Edit Mode**: Click any element or section in the preview to attach a clean, human-friendly component tag (e.g. *"Hero Section"*, *"Pricing Tier"*) for pinpoint revisions.
- **Interact Mode**: Test buttons, toggle tabs, try dropdowns, and verify interactive scripts directly inside the live prototype.

### 3. Friendly Model & Thinking Depth Popover
- Sleek model selector pill (`[Model] ⌵`).
- Choose Design Thinking Depth (*Fast Draft*, *Balanced Craft*, *Deep Thinking*).
- Formats raw technical model identifiers into clean labels (e.g. *Claude 3.7 Sonnet*, *Claude 3.5 Sonnet*, *GPT-4o*).

### 4. Brand Design Systems & Visual Creator
- **Curated Presets**: Anthropic, Linear, Stripe, Apple, Vercel, Warm Editorial, Modern SaaS, Neo-Brutalist, Modernist, and DCT Abu Dhabi.
- **Visual Brand Creator**: Designed specifically for UI/UX creators—pick colors, choose visual moods (Minimal, Editorial, SaaS, Luxury, Bold), select typography pairings, and write natural notes without prompt engineering.

### 5. Multi-Device Viewport & Export
- **Responsive Viewport Controls**: Instantly toggle between Desktop (1440px), Tablet (768px), Mobile (375px), and Responsive (100%).
- **Version Scrubber**: Step back and forth through previous iterations (`< v1 / v3 >`) to compare or revert designs.
- **One-Click Export**: Download standalone offline `.html` prototype files, copy shareable HTML, or open in fullscreen.

---

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/ianuragbhatt/khayal.git
cd khayal
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Connect Your AI Provider
1. Click the **Settings icon** in the top right.
2. Select your provider preset (**OpenRouter**, **OpenAI**, or **Local Ollama**).
3. Paste your **API Key** (or use Local Ollama with zero key required).
4. Start designing!

---

## 📁 Project Structure

```
khayal/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts      # OpenAI-compatible streaming SSE chat endpoint
│   │   │   └── models/route.ts    # Dynamic /models endpoint
│   │   ├── globals.css            # Tailwind & typography styles
│   │   ├── layout.tsx             # Root layout & app metadata
│   │   └── page.tsx               # Main entrypoint toggling Home & Canvas views
│   ├── components/
│   │   ├── ChatPane.tsx           # Left conversational brief pane
│   │   ├── CreateDesignSystemModal.tsx # Custom design system creator
│   │   ├── Header.tsx             # Main header with brand & project switchers
│   │   ├── HomeView.tsx           # Khayal homepage with hero composer & tabs
│   │   ├── KhayalLogo.tsx         # Lean & beautiful vector brand emblem
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

1. **[Claude Design by Anthropic](https://claude.ai/design)** (`https://claude.ai/design`):
   - Full credit for the visual design inspiration, editorial typography, UI aesthetic, the iconic *"What should we create?"* hero prompt composer, the model pill popover, and the conversational design-first UX.
   - *Disclaimer*: Khayal is an independent open-source project and is not affiliated with, maintained by, or endorsed by Anthropic. "Claude" is a trademark of Anthropic, PBC.

2. **[OpenDesign](https://github.com/open-design/open-design)** (`https://github.com/open-design/open-design`):
   - Full credit for the foundational inspiration behind the `DESIGN.md` brand contract protocol, brand-system prompt rules (Linear, Stripe, Apple, Vercel, etc.), iframe canvas communication, and bringing agentic design workflows to developers.
   - Huge gratitude to the OpenDesign contributors and maintainers for pioneering open-source AI design systems.

---

## 📄 License

MIT License. Free to use, modify, and distribute.
