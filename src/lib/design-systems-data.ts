// Curated, 100% production-ready Design Systems
// Complete with Deck presentation templates, Landing page starters, 6 live component playgrounds,
// Foundations (Colors, Typography, Spacing, Geometry), and editable CSS / JSON tokens.

import type { RichDesignSystem } from "./design-systems";

export const RICH_DESIGN_SYSTEMS: RichDesignSystem[] = [
  {
    "id": "modernist",
    "name": "Modernist",
    "category": "Swiss Graphic",
    "badge": "Swiss Graphic",
    "description": "Swiss-school modernism: a strict grid, Archivo everywhere, square corners, strong rules and one red accent on a near-white ground.",
    "accentColor": "#e11d48",
    "bgDark": false,
    "swatchColors": [
      "#e11d48",
      "#18181b",
      "#fafafa",
      "#fb7185"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": true,
    "promptGuidance": "DESIGN SYSTEM: MODERNIST\n- Atmosphere: Swiss-school modernism: a strict grid, Archivo everywhere, square corners, strong rules and one red accent on a near-white ground.\n- Palette: Accent #e11d48, Canvas #fafafa, Surface #e11d48.\n- Typography: Archivo for headlines, Archivo for body copy.\n- Geometry: 0px radius, 2px border width.\n- Visual details: Rigid, unapologetic Swiss precision. Layout is dominated by asymmetrical grids, strong 2px horizontal rules, oversized black sans-serif typography, flush-left alignment, and sparing pops of intense vermilion crimson.",
    "readme": {
      "headline": "Modernist design system",
      "description": "Swiss-school modernism: a strict grid, Archivo everywhere, square corners, strong rules and one red accent on a near-white ground. Rigid, unapologetic Swiss precision. Layout is dominated by asymmetrical grids, strong 2px horizontal rules, oversized black sans-serif typography, flush-left alignment, and sparing pops of intense vermilion crimson.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "Rigid, unapologetic Swiss precision. Layout is dominated by asymmetrical grids, strong 2px horizontal rules, oversized black sans-serif typography, flush-left alignment, and sparing pops of intense vermilion crimson.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Modernist tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Modernist",
            "subtitle": "Swiss-school modernism: a strict grid, Archivo everywhere, square corners, strong rules and one red accent on a near-white ground.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Modernist.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 0px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Swiss Graphic.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Modernist.",
            "type": "quadrants",
            "items": [
              "Accent: #e11d48",
              "Display: Archivo",
              "Radius: 0px",
              "Border: 2px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Modernist works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Modernist tokens and patterns.",
        "heroTitle": "Build Faster with Modernist",
        "heroSubtitle": "Crafted with Archivo typography, 0px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "Archivo Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "0px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Modernist tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #e11d48; color: #ffffff; border-radius: 0px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 2px solid #e11d48; color: #e11d48; border-radius: 0px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 0px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #e11d4822; color: #e11d48; border-radius: 0px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 0px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Modernist.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 0px; border: 2px solid #e4e4e7;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #e11d48;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 0px; border: 2px solid #e4e4e7;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #e11d48;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 0px; border: 2px solid #e4e4e7;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #e11d48;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 0px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #e11d48; border-radius: 0px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Modernist focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Modernist Pro\" style=\"border-radius: 0px; border: 2px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 0px; border: 2px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">Swiss-school modernism: a strict grid, Archivo everywhere, square corners, strong rules and one red accent on a near-white ground.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 0px; border: 2px solid #e4e4e7;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #e11d48;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Modernist\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #e11d48;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #e11d48; border-radius: 0px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 0px; border: 2px solid #e4e4e7;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #e11d48;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#e11d48</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">Archivo</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#e11d48",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#fafafa",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#e11d48",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#18181b",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#71717a",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#e4e4e7",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "Archivo, system-ui, sans-serif",
        "bodyFont": "Archivo, system-ui, sans-serif",
        "monoFont": "JetBrains Mono, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Modernist Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "Swiss-school modernism: a strict grid, Archivo everywhere, square corners, strong rules and one red accent on a near-white ground."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "0px"
        },
        {
          "name": "--radius-button",
          "value": "0px"
        },
        {
          "name": "--radius-card",
          "value": "0px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #e11d48;\n  --color-accent-subtle: #e11d4822;\n  --color-bg: #fafafa;\n  --color-surface: #e11d48;\n  --color-fg: #18181b;\n  --color-muted: #71717a;\n  --color-border: #e4e4e7;\n  \n  --font-display: \"Archivo\", system-ui, sans-serif;\n  --font-body: \"Archivo\", system-ui, sans-serif;\n  --font-mono: \"JetBrains Mono\", monospace;\n  \n  --radius-base: 0px;\n  --border-width-base: 2px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Modernist\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#e11d48\",\n      \"bg\": \"#fafafa\",\n      \"surface\": \"#e11d48\",\n      \"fg\": \"#18181b\",\n      \"muted\": \"#71717a\",\n      \"border\": \"#e4e4e7\"\n    },\n    \"typography\": {\n      \"display\": \"Archivo\",\n      \"body\": \"Archivo\",\n      \"mono\": \"JetBrains Mono\"\n    },\n    \"geometry\": {\n      \"radius\": \"0px\",\n      \"borderWidth\": \"2px\"\n    }\n  }\n}"
  },
  {
    "id": "claude",
    "name": "Claude (Anthropic)",
    "category": "AI & LLM",
    "badge": "Official Theme",
    "description": "Warm espresso & ivory canvas, refined Newsreader serif typography, and signature terracotta accents.",
    "accentColor": "#d97757",
    "bgDark": true,
    "swatchColors": [
      "#1f1e1c",
      "#282724",
      "#d97757",
      "#faf9f5"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: CLAUDE (ANTHROPIC)\n- Atmosphere: Warm espresso & ivory canvas, refined Newsreader serif typography, and signature terracotta accents.\n- Palette: Accent #d97757, Canvas #1f1e1c, Surface #282724.\n- Typography: Newsreader for headlines, Inter for body copy.\n- Geometry: 16px radius, 1px border width.\n- Visual details: Warm literary salon aesthetic. Newsreader serif headlines, generous editorial margins, terracotta primary accents, and subtle ivory and dark espresso surfaces.",
    "readme": {
      "headline": "Claude (Anthropic) design system",
      "description": "Warm espresso & ivory canvas, refined Newsreader serif typography, and signature terracotta accents. Warm literary salon aesthetic. Newsreader serif headlines, generous editorial margins, terracotta primary accents, and subtle ivory and dark espresso surfaces.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "Warm literary salon aesthetic. Newsreader serif headlines, generous editorial margins, terracotta primary accents, and subtle ivory and dark espresso surfaces.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Claude (Anthropic) tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Claude (Anthropic)",
            "subtitle": "Warm espresso & ivory canvas, refined Newsreader serif typography, and signature terracotta accents.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Claude (Anthropic).",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 16px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for AI & LLM.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Claude (Anthropic).",
            "type": "quadrants",
            "items": [
              "Accent: #d97757",
              "Display: Newsreader",
              "Radius: 16px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Claude (Anthropic) works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Claude (Anthropic) tokens and patterns.",
        "heroTitle": "Build Faster with Claude (Anthropic)",
        "heroSubtitle": "Crafted with Newsreader typography, 16px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "Newsreader Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "16px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Claude (Anthropic) tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #d97757; color: #ffffff; border-radius: 16px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #d97757; color: #d97757; border-radius: 16px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 16px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #d9775722; color: #d97757; border-radius: 16px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 16px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Claude (Anthropic).",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 16px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #d97757;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 16px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #d97757;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 16px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #d97757;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 16px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #d97757; border-radius: 16px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Claude (Anthropic) focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Claude (Anthropic) Pro\" style=\"border-radius: 16px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 16px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">Warm espresso & ivory canvas, refined Newsreader serif typography, and signature terracotta accents.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 16px; border: 1px solid #3f3f46;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #d97757;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Claude (Anthropic)\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #d97757;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #d97757; border-radius: 16px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 16px; border: 1px solid #3f3f46;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #d97757;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#d97757</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">Newsreader</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#d97757",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#1f1e1c",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#282724",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#ffffff",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#a1a1aa",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#27272a",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "Newsreader, system-ui, sans-serif",
        "bodyFont": "Inter, system-ui, sans-serif",
        "monoFont": "Anthropic Mono, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Claude (Anthropic) Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "Warm espresso & ivory canvas, refined Newsreader serif typography, and signature terracotta accents."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "16px"
        },
        {
          "name": "--radius-button",
          "value": "16px"
        },
        {
          "name": "--radius-card",
          "value": "16px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #d97757;\n  --color-accent-subtle: #d9775722;\n  --color-bg: #1f1e1c;\n  --color-surface: #282724;\n  --color-fg: #ffffff;\n  --color-muted: #a1a1aa;\n  --color-border: #27272a;\n  \n  --font-display: \"Newsreader\", system-ui, sans-serif;\n  --font-body: \"Inter\", system-ui, sans-serif;\n  --font-mono: \"Anthropic Mono\", monospace;\n  \n  --radius-base: 16px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Claude (Anthropic)\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#d97757\",\n      \"bg\": \"#1f1e1c\",\n      \"surface\": \"#282724\",\n      \"fg\": \"#ffffff\",\n      \"muted\": \"#a1a1aa\",\n      \"border\": \"#27272a\"\n    },\n    \"typography\": {\n      \"display\": \"Newsreader\",\n      \"body\": \"Inter\",\n      \"mono\": \"Anthropic Mono\"\n    },\n    \"geometry\": {\n      \"radius\": \"16px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  },
  {
    "id": "linear-app",
    "name": "Linear",
    "category": "Productivity & SaaS",
    "badge": "Dark Precision",
    "description": "Dark precision engineering, starlight borders, signature indigo-violet accent.",
    "accentColor": "#5e6ad2",
    "bgDark": true,
    "swatchColors": [
      "#08090a",
      "#191a1b",
      "#5e6ad2",
      "#7170ff"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: LINEAR\n- Atmosphere: Dark precision engineering, starlight borders, signature indigo-violet accent.\n- Palette: Accent #5e6ad2, Canvas #08090a, Surface #191a1b.\n- Typography: Inter Variable for headlines, Inter Variable for body copy.\n- Geometry: 10px radius, 1px border width.\n- Visual details: Engineered for speed and keyboard shortcuts. Starlight glass headers, subtle 1px translucent borders, deep black elevation, and vibrant indigo-violet buttons.",
    "readme": {
      "headline": "Linear design system",
      "description": "Dark precision engineering, starlight borders, signature indigo-violet accent. Engineered for speed and keyboard shortcuts. Starlight glass headers, subtle 1px translucent borders, deep black elevation, and vibrant indigo-violet buttons.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "Engineered for speed and keyboard shortcuts. Starlight glass headers, subtle 1px translucent borders, deep black elevation, and vibrant indigo-violet buttons.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Linear tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Linear",
            "subtitle": "Dark precision engineering, starlight borders, signature indigo-violet accent.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Linear.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 10px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Productivity & SaaS.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Linear.",
            "type": "quadrants",
            "items": [
              "Accent: #5e6ad2",
              "Display: Inter Variable",
              "Radius: 10px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Linear works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Linear tokens and patterns.",
        "heroTitle": "Build Faster with Linear",
        "heroSubtitle": "Crafted with Inter Variable typography, 10px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "Inter Variable Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "10px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Linear tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #5e6ad2; color: #ffffff; border-radius: 10px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #5e6ad2; color: #5e6ad2; border-radius: 10px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 10px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #5e6ad222; color: #5e6ad2; border-radius: 10px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 10px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Linear.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 10px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #5e6ad2;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 10px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #5e6ad2;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 10px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #5e6ad2;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 10px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #5e6ad2; border-radius: 10px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Linear focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Linear Pro\" style=\"border-radius: 10px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 10px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">Dark precision engineering, starlight borders, signature indigo-violet accent.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 10px; border: 1px solid #3f3f46;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #5e6ad2;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Linear\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #5e6ad2;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #5e6ad2; border-radius: 10px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 10px; border: 1px solid #3f3f46;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #5e6ad2;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#5e6ad2</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">Inter Variable</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#5e6ad2",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#08090a",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#191a1b",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#ffffff",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#a1a1aa",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#27272a",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "Inter Variable, system-ui, sans-serif",
        "bodyFont": "Inter Variable, system-ui, sans-serif",
        "monoFont": "JetBrains Mono, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Linear Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "Dark precision engineering, starlight borders, signature indigo-violet accent."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "10px"
        },
        {
          "name": "--radius-button",
          "value": "10px"
        },
        {
          "name": "--radius-card",
          "value": "10px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #5e6ad2;\n  --color-accent-subtle: #5e6ad222;\n  --color-bg: #08090a;\n  --color-surface: #191a1b;\n  --color-fg: #ffffff;\n  --color-muted: #a1a1aa;\n  --color-border: #27272a;\n  \n  --font-display: \"Inter Variable\", system-ui, sans-serif;\n  --font-body: \"Inter Variable\", system-ui, sans-serif;\n  --font-mono: \"JetBrains Mono\", monospace;\n  \n  --radius-base: 10px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Linear\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#5e6ad2\",\n      \"bg\": \"#08090a\",\n      \"surface\": \"#191a1b\",\n      \"fg\": \"#ffffff\",\n      \"muted\": \"#a1a1aa\",\n      \"border\": \"#27272a\"\n    },\n    \"typography\": {\n      \"display\": \"Inter Variable\",\n      \"body\": \"Inter Variable\",\n      \"mono\": \"JetBrains Mono\"\n    },\n    \"geometry\": {\n      \"radius\": \"10px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  },
  {
    "id": "stripe",
    "name": "Stripe",
    "category": "Fintech & Crypto",
    "badge": "Fintech Elegance",
    "description": "World-class fintech design. Crisp light mode, vibrant gradient accents, precision typography.",
    "accentColor": "#635bff",
    "bgDark": false,
    "swatchColors": [
      "#ffffff",
      "#635bff",
      "#00d4ff",
      "#0a2540"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: STRIPE\n- Atmosphere: World-class fintech design. Crisp light mode, vibrant gradient accents, precision typography.\n- Palette: Accent #635bff, Canvas #00d4ff, Surface #ffffff.\n- Typography: S\u00f6hne for headlines, S\u00f6hne for body copy.\n- Geometry: 12px radius, 1px border width.\n- Visual details: Crisp fintech elegance. Pristine white canvas, slate text, vibrant cyan-to-purple gradient ribbons, and clean metric cards with tabular numbers.",
    "readme": {
      "headline": "Stripe design system",
      "description": "World-class fintech design. Crisp light mode, vibrant gradient accents, precision typography. Crisp fintech elegance. Pristine white canvas, slate text, vibrant cyan-to-purple gradient ribbons, and clean metric cards with tabular numbers.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "Crisp fintech elegance. Pristine white canvas, slate text, vibrant cyan-to-purple gradient ribbons, and clean metric cards with tabular numbers.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Stripe tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Stripe",
            "subtitle": "World-class fintech design. Crisp light mode, vibrant gradient accents, precision typography.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Stripe.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 12px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Fintech & Crypto.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Stripe.",
            "type": "quadrants",
            "items": [
              "Accent: #635bff",
              "Display: S\u00f6hne",
              "Radius: 12px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Stripe works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Stripe tokens and patterns.",
        "heroTitle": "Build Faster with Stripe",
        "heroSubtitle": "Crafted with S\u00f6hne typography, 12px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "S\u00f6hne Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "12px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Stripe tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #635bff; color: #ffffff; border-radius: 12px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #635bff; color: #635bff; border-radius: 12px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 12px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #635bff22; color: #635bff; border-radius: 12px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 12px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Stripe.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 12px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #635bff;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 12px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #635bff;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 12px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #635bff;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 12px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #635bff; border-radius: 12px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Stripe focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Stripe Pro\" style=\"border-radius: 12px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 12px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">World-class fintech design. Crisp light mode, vibrant gradient accents, precision typography.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 12px; border: 1px solid #e4e4e7;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #635bff;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Stripe\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #635bff;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #635bff; border-radius: 12px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 12px; border: 1px solid #e4e4e7;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #635bff;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#635bff</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">S\u00f6hne</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#635bff",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#00d4ff",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#ffffff",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#18181b",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#71717a",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#e4e4e7",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "S\u00f6hne, system-ui, sans-serif",
        "bodyFont": "S\u00f6hne, system-ui, sans-serif",
        "monoFont": "Roboto Mono, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Stripe Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "World-class fintech design. Crisp light mode, vibrant gradient accents, precision typography."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "12px"
        },
        {
          "name": "--radius-button",
          "value": "12px"
        },
        {
          "name": "--radius-card",
          "value": "12px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #635bff;\n  --color-accent-subtle: #635bff22;\n  --color-bg: #00d4ff;\n  --color-surface: #ffffff;\n  --color-fg: #18181b;\n  --color-muted: #71717a;\n  --color-border: #e4e4e7;\n  \n  --font-display: \"S\u00f6hne\", system-ui, sans-serif;\n  --font-body: \"S\u00f6hne\", system-ui, sans-serif;\n  --font-mono: \"Roboto Mono\", monospace;\n  \n  --radius-base: 12px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Stripe\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#635bff\",\n      \"bg\": \"#00d4ff\",\n      \"surface\": \"#ffffff\",\n      \"fg\": \"#18181b\",\n      \"muted\": \"#71717a\",\n      \"border\": \"#e4e4e7\"\n    },\n    \"typography\": {\n      \"display\": \"S\\u00f6hne\",\n      \"body\": \"S\\u00f6hne\",\n      \"mono\": \"Roboto Mono\"\n    },\n    \"geometry\": {\n      \"radius\": \"12px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  },
  {
    "id": "apple",
    "name": "Apple",
    "category": "Media & Consumer",
    "badge": "Human Interface",
    "description": "Human Interface elegance. Expansive whitespace, subtle typography, and refined curves.",
    "accentColor": "#0071e3",
    "bgDark": false,
    "swatchColors": [
      "#ffffff",
      "#f5f5f7",
      "#0071e3",
      "#1d1d1f"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: APPLE\n- Atmosphere: Human Interface elegance. Expansive whitespace, subtle typography, and refined curves.\n- Palette: Accent #0071e3, Canvas #0071e3, Surface #ffffff.\n- Typography: SF Pro Display for headlines, SF Pro Text for body copy.\n- Geometry: 18px radius, 1px border width.\n- Visual details: Pure, spacious, distraction-free design. Generous line heights, subtle translucent dividers, large rounded corners, and classic Apple blue CTAs.",
    "readme": {
      "headline": "Apple design system",
      "description": "Human Interface elegance. Expansive whitespace, subtle typography, and refined curves. Pure, spacious, distraction-free design. Generous line heights, subtle translucent dividers, large rounded corners, and classic Apple blue CTAs.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "Pure, spacious, distraction-free design. Generous line heights, subtle translucent dividers, large rounded corners, and classic Apple blue CTAs.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Apple tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Apple",
            "subtitle": "Human Interface elegance. Expansive whitespace, subtle typography, and refined curves.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Apple.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 18px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Media & Consumer.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Apple.",
            "type": "quadrants",
            "items": [
              "Accent: #0071e3",
              "Display: SF Pro Display",
              "Radius: 18px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Apple works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Apple tokens and patterns.",
        "heroTitle": "Build Faster with Apple",
        "heroSubtitle": "Crafted with SF Pro Display typography, 18px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "SF Pro Display Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "18px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Apple tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #0071e3; color: #ffffff; border-radius: 18px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #0071e3; color: #0071e3; border-radius: 18px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 18px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #0071e322; color: #0071e3; border-radius: 18px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 18px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Apple.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 18px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #0071e3;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 18px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #0071e3;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 18px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #0071e3;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 18px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #0071e3; border-radius: 18px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Apple focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Apple Pro\" style=\"border-radius: 18px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 18px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">Human Interface elegance. Expansive whitespace, subtle typography, and refined curves.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 18px; border: 1px solid #e4e4e7;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #0071e3;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Apple\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #0071e3;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #0071e3; border-radius: 18px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 18px; border: 1px solid #e4e4e7;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #0071e3;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#0071e3</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">SF Pro Display</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#0071e3",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#0071e3",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#ffffff",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#18181b",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#71717a",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#e4e4e7",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "SF Pro Display, system-ui, sans-serif",
        "bodyFont": "SF Pro Text, system-ui, sans-serif",
        "monoFont": "SF Mono, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Apple Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "Human Interface elegance. Expansive whitespace, subtle typography, and refined curves."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "18px"
        },
        {
          "name": "--radius-button",
          "value": "18px"
        },
        {
          "name": "--radius-card",
          "value": "18px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #0071e3;\n  --color-accent-subtle: #0071e322;\n  --color-bg: #0071e3;\n  --color-surface: #ffffff;\n  --color-fg: #18181b;\n  --color-muted: #71717a;\n  --color-border: #e4e4e7;\n  \n  --font-display: \"SF Pro Display\", system-ui, sans-serif;\n  --font-body: \"SF Pro Text\", system-ui, sans-serif;\n  --font-mono: \"SF Mono\", monospace;\n  \n  --radius-base: 18px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Apple\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#0071e3\",\n      \"bg\": \"#0071e3\",\n      \"surface\": \"#ffffff\",\n      \"fg\": \"#18181b\",\n      \"muted\": \"#71717a\",\n      \"border\": \"#e4e4e7\"\n    },\n    \"typography\": {\n      \"display\": \"SF Pro Display\",\n      \"body\": \"SF Pro Text\",\n      \"mono\": \"SF Mono\"\n    },\n    \"geometry\": {\n      \"radius\": \"18px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  },
  {
    "id": "vercel",
    "name": "Vercel",
    "category": "Developer Tools",
    "badge": "High Contrast",
    "description": "Monochrome, high-contrast developer aesthetic with razor-sharp geometric precision.",
    "accentColor": "#000000",
    "bgDark": true,
    "swatchColors": [
      "#000000",
      "#18181b",
      "#ededed",
      "#ffffff"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: VERCEL\n- Atmosphere: Monochrome, high-contrast developer aesthetic with razor-sharp geometric precision.\n- Palette: Accent #000000, Canvas #000000, Surface #18181b.\n- Typography: Geist for headlines, Geist for body copy.\n- Geometry: 6px radius, 1px border width.\n- Visual details: Achromatic developer contrast. Bento box modular layout, sharp uppercase micro-labels, 1px solid borders, and pure black and white surfaces.",
    "readme": {
      "headline": "Vercel design system",
      "description": "Monochrome, high-contrast developer aesthetic with razor-sharp geometric precision. Achromatic developer contrast. Bento box modular layout, sharp uppercase micro-labels, 1px solid borders, and pure black and white surfaces.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "Achromatic developer contrast. Bento box modular layout, sharp uppercase micro-labels, 1px solid borders, and pure black and white surfaces.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Vercel tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Vercel",
            "subtitle": "Monochrome, high-contrast developer aesthetic with razor-sharp geometric precision.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Vercel.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 6px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Developer Tools.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Vercel.",
            "type": "quadrants",
            "items": [
              "Accent: #000000",
              "Display: Geist",
              "Radius: 6px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Vercel works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Vercel tokens and patterns.",
        "heroTitle": "Build Faster with Vercel",
        "heroSubtitle": "Crafted with Geist typography, 6px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "Geist Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "6px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Vercel tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #000000; color: #ffffff; border-radius: 6px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #000000; color: #000000; border-radius: 6px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 6px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #00000022; color: #000000; border-radius: 6px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 6px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Vercel.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 6px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #000000;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 6px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #000000;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 6px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #000000;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 6px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #000000; border-radius: 6px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Vercel focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Vercel Pro\" style=\"border-radius: 6px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 6px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">Monochrome, high-contrast developer aesthetic with razor-sharp geometric precision.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 6px; border: 1px solid #3f3f46;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #000000;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Vercel\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #000000;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #000000; border-radius: 6px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 6px; border: 1px solid #3f3f46;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #000000;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#000000</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">Geist</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#000000",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#000000",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#18181b",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#ffffff",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#a1a1aa",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#27272a",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "Geist, system-ui, sans-serif",
        "bodyFont": "Geist, system-ui, sans-serif",
        "monoFont": "Geist Mono, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Vercel Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "Monochrome, high-contrast developer aesthetic with razor-sharp geometric precision."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "6px"
        },
        {
          "name": "--radius-button",
          "value": "6px"
        },
        {
          "name": "--radius-card",
          "value": "6px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #000000;\n  --color-accent-subtle: #00000022;\n  --color-bg: #000000;\n  --color-surface: #18181b;\n  --color-fg: #ffffff;\n  --color-muted: #a1a1aa;\n  --color-border: #27272a;\n  \n  --font-display: \"Geist\", system-ui, sans-serif;\n  --font-body: \"Geist\", system-ui, sans-serif;\n  --font-mono: \"Geist Mono\", monospace;\n  \n  --radius-base: 6px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Vercel\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#000000\",\n      \"bg\": \"#000000\",\n      \"surface\": \"#18181b\",\n      \"fg\": \"#ffffff\",\n      \"muted\": \"#a1a1aa\",\n      \"border\": \"#27272a\"\n    },\n    \"typography\": {\n      \"display\": \"Geist\",\n      \"body\": \"Geist\",\n      \"mono\": \"Geist Mono\"\n    },\n    \"geometry\": {\n      \"radius\": \"6px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  },
  {
    "id": "notion",
    "name": "Notion",
    "category": "Productivity & SaaS",
    "badge": "Minimal Canvas",
    "description": "Clean editorial canvas, warm paper tones, and minimal document hierarchy.",
    "accentColor": "#0075de",
    "bgDark": false,
    "swatchColors": [
      "#ffffff",
      "#f6f5f4",
      "#31302e",
      "#0075de"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: NOTION\n- Atmosphere: Clean editorial canvas, warm paper tones, and minimal document hierarchy.\n- Palette: Accent #0075de, Canvas #31302e, Surface #ffffff.\n- Typography: Lyon Display for headlines, Inter for body copy.\n- Geometry: 6px radius, 1px border width.\n- Visual details: Warm minimal workspace. Parchment backgrounds, understated gray borders, subtle hover pill highlights, and editorial typography.",
    "readme": {
      "headline": "Notion design system",
      "description": "Clean editorial canvas, warm paper tones, and minimal document hierarchy. Warm minimal workspace. Parchment backgrounds, understated gray borders, subtle hover pill highlights, and editorial typography.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "Warm minimal workspace. Parchment backgrounds, understated gray borders, subtle hover pill highlights, and editorial typography.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Notion tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Notion",
            "subtitle": "Clean editorial canvas, warm paper tones, and minimal document hierarchy.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Notion.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 6px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Productivity & SaaS.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Notion.",
            "type": "quadrants",
            "items": [
              "Accent: #0075de",
              "Display: Lyon Display",
              "Radius: 6px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Notion works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Notion tokens and patterns.",
        "heroTitle": "Build Faster with Notion",
        "heroSubtitle": "Crafted with Lyon Display typography, 6px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "Lyon Display Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "6px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Notion tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #0075de; color: #ffffff; border-radius: 6px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #0075de; color: #0075de; border-radius: 6px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 6px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #0075de22; color: #0075de; border-radius: 6px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 6px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Notion.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 6px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #0075de;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 6px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #0075de;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 6px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #0075de;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 6px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #0075de; border-radius: 6px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Notion focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Notion Pro\" style=\"border-radius: 6px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 6px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">Clean editorial canvas, warm paper tones, and minimal document hierarchy.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 6px; border: 1px solid #e4e4e7;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #0075de;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Notion\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #0075de;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #0075de; border-radius: 6px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 6px; border: 1px solid #e4e4e7;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #0075de;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#0075de</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">Lyon Display</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#0075de",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#31302e",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#ffffff",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#18181b",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#71717a",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#e4e4e7",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "Lyon Display, system-ui, sans-serif",
        "bodyFont": "Inter, system-ui, sans-serif",
        "monoFont": "ia-writer-mono, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Notion Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "Clean editorial canvas, warm paper tones, and minimal document hierarchy."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "6px"
        },
        {
          "name": "--radius-button",
          "value": "6px"
        },
        {
          "name": "--radius-card",
          "value": "6px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #0075de;\n  --color-accent-subtle: #0075de22;\n  --color-bg: #31302e;\n  --color-surface: #ffffff;\n  --color-fg: #18181b;\n  --color-muted: #71717a;\n  --color-border: #e4e4e7;\n  \n  --font-display: \"Lyon Display\", system-ui, sans-serif;\n  --font-body: \"Inter\", system-ui, sans-serif;\n  --font-mono: \"ia-writer-mono\", monospace;\n  \n  --radius-base: 6px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Notion\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#0075de\",\n      \"bg\": \"#31302e\",\n      \"surface\": \"#ffffff\",\n      \"fg\": \"#18181b\",\n      \"muted\": \"#71717a\",\n      \"border\": \"#e4e4e7\"\n    },\n    \"typography\": {\n      \"display\": \"Lyon Display\",\n      \"body\": \"Inter\",\n      \"mono\": \"ia-writer-mono\"\n    },\n    \"geometry\": {\n      \"radius\": \"6px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  },
  {
    "id": "airbnb",
    "name": "Airbnb",
    "category": "Consumer & Travel",
    "badge": "Hospitality",
    "description": "Friendly consumer hospitality design with vibrant coral accents and tactile cards.",
    "accentColor": "#ff385c",
    "bgDark": false,
    "swatchColors": [
      "#ffffff",
      "#ff385c",
      "#222222",
      "#f7f7f7"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: AIRBNB\n- Atmosphere: Friendly consumer hospitality design with vibrant coral accents and tactile cards.\n- Palette: Accent #ff385c, Canvas #222222, Surface #ffffff.\n- Typography: Cereal for headlines, Cereal for body copy.\n- Geometry: 16px radius, 1px border width.\n- Visual details: Consumer warmth and hospitality. Tactile rounded cards, signature rausch coral highlights, generous photography viewports, and clean search bars.",
    "readme": {
      "headline": "Airbnb design system",
      "description": "Friendly consumer hospitality design with vibrant coral accents and tactile cards. Consumer warmth and hospitality. Tactile rounded cards, signature rausch coral highlights, generous photography viewports, and clean search bars.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "Consumer warmth and hospitality. Tactile rounded cards, signature rausch coral highlights, generous photography viewports, and clean search bars.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Airbnb tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Airbnb",
            "subtitle": "Friendly consumer hospitality design with vibrant coral accents and tactile cards.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Airbnb.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 16px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Consumer & Travel.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Airbnb.",
            "type": "quadrants",
            "items": [
              "Accent: #ff385c",
              "Display: Cereal",
              "Radius: 16px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Airbnb works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Airbnb tokens and patterns.",
        "heroTitle": "Build Faster with Airbnb",
        "heroSubtitle": "Crafted with Cereal typography, 16px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "Cereal Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "16px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Airbnb tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #ff385c; color: #ffffff; border-radius: 16px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #ff385c; color: #ff385c; border-radius: 16px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 16px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #ff385c22; color: #ff385c; border-radius: 16px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 16px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Airbnb.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 16px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #ff385c;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 16px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #ff385c;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 16px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #ff385c;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 16px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #ff385c; border-radius: 16px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Airbnb focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Airbnb Pro\" style=\"border-radius: 16px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 16px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">Friendly consumer hospitality design with vibrant coral accents and tactile cards.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 16px; border: 1px solid #e4e4e7;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #ff385c;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Airbnb\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #ff385c;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #ff385c; border-radius: 16px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 16px; border: 1px solid #e4e4e7;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #ff385c;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#ff385c</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">Cereal</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#ff385c",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#222222",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#ffffff",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#18181b",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#71717a",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#e4e4e7",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "Cereal, system-ui, sans-serif",
        "bodyFont": "Cereal, system-ui, sans-serif",
        "monoFont": "Courier New, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Airbnb Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "Friendly consumer hospitality design with vibrant coral accents and tactile cards."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "16px"
        },
        {
          "name": "--radius-button",
          "value": "16px"
        },
        {
          "name": "--radius-card",
          "value": "16px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #ff385c;\n  --color-accent-subtle: #ff385c22;\n  --color-bg: #222222;\n  --color-surface: #ffffff;\n  --color-fg: #18181b;\n  --color-muted: #71717a;\n  --color-border: #e4e4e7;\n  \n  --font-display: \"Cereal\", system-ui, sans-serif;\n  --font-body: \"Cereal\", system-ui, sans-serif;\n  --font-mono: \"Courier New\", monospace;\n  \n  --radius-base: 16px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Airbnb\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#ff385c\",\n      \"bg\": \"#222222\",\n      \"surface\": \"#ffffff\",\n      \"fg\": \"#18181b\",\n      \"muted\": \"#71717a\",\n      \"border\": \"#e4e4e7\"\n    },\n    \"typography\": {\n      \"display\": \"Cereal\",\n      \"body\": \"Cereal\",\n      \"mono\": \"Courier New\"\n    },\n    \"geometry\": {\n      \"radius\": \"16px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  },
  {
    "id": "figma",
    "name": "Figma",
    "category": "Design & Creative",
    "badge": "Creative Canvas",
    "description": "Deep designer dark mode, vibrant multi-colored tool badges, and crisp UI borders.",
    "accentColor": "#0d99ff",
    "bgDark": true,
    "swatchColors": [
      "#1e1e1e",
      "#2c2c2c",
      "#0d99ff",
      "#ffffff"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: FIGMA\n- Atmosphere: Deep designer dark mode, vibrant multi-colored tool badges, and crisp UI borders.\n- Palette: Accent #0d99ff, Canvas #1e1e1e, Surface #2c2c2c.\n- Typography: Whyte Inktrap for headlines, Whyte for body copy.\n- Geometry: 8px radius, 1px border width.\n- Visual details: Creative tool canvas. Dark workspace, precision tooltips, floating toolbars, colorful multiplayer cursor pills, and dense controls.",
    "readme": {
      "headline": "Figma design system",
      "description": "Deep designer dark mode, vibrant multi-colored tool badges, and crisp UI borders. Creative tool canvas. Dark workspace, precision tooltips, floating toolbars, colorful multiplayer cursor pills, and dense controls.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "Creative tool canvas. Dark workspace, precision tooltips, floating toolbars, colorful multiplayer cursor pills, and dense controls.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Figma tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Figma",
            "subtitle": "Deep designer dark mode, vibrant multi-colored tool badges, and crisp UI borders.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Figma.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 8px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Design & Creative.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Figma.",
            "type": "quadrants",
            "items": [
              "Accent: #0d99ff",
              "Display: Whyte Inktrap",
              "Radius: 8px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Figma works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Figma tokens and patterns.",
        "heroTitle": "Build Faster with Figma",
        "heroSubtitle": "Crafted with Whyte Inktrap typography, 8px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "Whyte Inktrap Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "8px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Figma tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #0d99ff; color: #ffffff; border-radius: 8px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #0d99ff; color: #0d99ff; border-radius: 8px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 8px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #0d99ff22; color: #0d99ff; border-radius: 8px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 8px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Figma.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #0d99ff;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #0d99ff;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #0d99ff;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 8px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #0d99ff; border-radius: 8px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Figma focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Figma Pro\" style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">Deep designer dark mode, vibrant multi-colored tool badges, and crisp UI borders.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #0d99ff;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Figma\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #0d99ff;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #0d99ff; border-radius: 8px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #0d99ff;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#0d99ff</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">Whyte Inktrap</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#0d99ff",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#1e1e1e",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#2c2c2c",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#ffffff",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#a1a1aa",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#27272a",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "Whyte Inktrap, system-ui, sans-serif",
        "bodyFont": "Whyte, system-ui, sans-serif",
        "monoFont": "JetBrains Mono, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Figma Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "Deep designer dark mode, vibrant multi-colored tool badges, and crisp UI borders."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "8px"
        },
        {
          "name": "--radius-button",
          "value": "8px"
        },
        {
          "name": "--radius-card",
          "value": "8px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #0d99ff;\n  --color-accent-subtle: #0d99ff22;\n  --color-bg: #1e1e1e;\n  --color-surface: #2c2c2c;\n  --color-fg: #ffffff;\n  --color-muted: #a1a1aa;\n  --color-border: #27272a;\n  \n  --font-display: \"Whyte Inktrap\", system-ui, sans-serif;\n  --font-body: \"Whyte\", system-ui, sans-serif;\n  --font-mono: \"JetBrains Mono\", monospace;\n  \n  --radius-base: 8px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Figma\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#0d99ff\",\n      \"bg\": \"#1e1e1e\",\n      \"surface\": \"#2c2c2c\",\n      \"fg\": \"#ffffff\",\n      \"muted\": \"#a1a1aa\",\n      \"border\": \"#27272a\"\n    },\n    \"typography\": {\n      \"display\": \"Whyte Inktrap\",\n      \"body\": \"Whyte\",\n      \"mono\": \"JetBrains Mono\"\n    },\n    \"geometry\": {\n      \"radius\": \"8px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  },
  {
    "id": "github",
    "name": "GitHub",
    "category": "Developer Tools",
    "badge": "Primer System",
    "description": "World standard developer interface with crisp neutral borders and emerald accents.",
    "accentColor": "#2da44e",
    "bgDark": false,
    "swatchColors": [
      "#ffffff",
      "#f6f8fa",
      "#2da44e",
      "#24292f"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: GITHUB\n- Atmosphere: World standard developer interface with crisp neutral borders and emerald accents.\n- Palette: Accent #2da44e, Canvas #2da44e, Surface #ffffff.\n- Typography: -apple-system, BlinkMacSystemFont for headlines, -apple-system, BlinkMacSystemFont for body copy.\n- Geometry: 6px radius, 1px border width.\n- Visual details: GitHub Primer standard. Neutral gray dividers, green pull request status badges, tabular repository cards, and functional layout.",
    "readme": {
      "headline": "GitHub design system",
      "description": "World standard developer interface with crisp neutral borders and emerald accents. GitHub Primer standard. Neutral gray dividers, green pull request status badges, tabular repository cards, and functional layout.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "GitHub Primer standard. Neutral gray dividers, green pull request status badges, tabular repository cards, and functional layout.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on GitHub tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "GitHub",
            "subtitle": "World standard developer interface with crisp neutral borders and emerald accents.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for GitHub.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 6px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Developer Tools.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering GitHub.",
            "type": "quadrants",
            "items": [
              "Accent: #2da44e",
              "Display: -apple-system, BlinkMacSystemFont",
              "Radius: 6px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how GitHub works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming GitHub tokens and patterns.",
        "heroTitle": "Build Faster with GitHub",
        "heroSubtitle": "Crafted with -apple-system, BlinkMacSystemFont typography, 6px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "-apple-system, BlinkMacSystemFont Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "6px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with GitHub tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #2da44e; color: #ffffff; border-radius: 6px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #2da44e; color: #2da44e; border-radius: 6px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 6px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #2da44e22; color: #2da44e; border-radius: 6px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 6px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in GitHub.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 6px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #2da44e;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 6px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #2da44e;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 6px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #2da44e;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 6px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #2da44e; border-radius: 6px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with GitHub focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"GitHub Pro\" style=\"border-radius: 6px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 6px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">World standard developer interface with crisp neutral borders and emerald accents.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 6px; border: 1px solid #e4e4e7;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #2da44e;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      GitHub\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #2da44e;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #2da44e; border-radius: 6px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 6px; border: 1px solid #e4e4e7;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #2da44e;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#2da44e</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">-apple-system, BlinkMacSystemFont</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#2da44e",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#2da44e",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#ffffff",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#18181b",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#71717a",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#e4e4e7",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        "bodyFont": "-apple-system, BlinkMacSystemFont, system-ui, sans-serif",
        "monoFont": "ui-monospace, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "GitHub Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "World standard developer interface with crisp neutral borders and emerald accents."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "6px"
        },
        {
          "name": "--radius-button",
          "value": "6px"
        },
        {
          "name": "--radius-card",
          "value": "6px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #2da44e;\n  --color-accent-subtle: #2da44e22;\n  --color-bg: #2da44e;\n  --color-surface: #ffffff;\n  --color-fg: #18181b;\n  --color-muted: #71717a;\n  --color-border: #e4e4e7;\n  \n  --font-display: \"-apple-system, BlinkMacSystemFont\", system-ui, sans-serif;\n  --font-body: \"-apple-system, BlinkMacSystemFont\", system-ui, sans-serif;\n  --font-mono: \"ui-monospace\", monospace;\n  \n  --radius-base: 6px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"GitHub\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#2da44e\",\n      \"bg\": \"#2da44e\",\n      \"surface\": \"#ffffff\",\n      \"fg\": \"#18181b\",\n      \"muted\": \"#71717a\",\n      \"border\": \"#e4e4e7\"\n    },\n    \"typography\": {\n      \"display\": \"-apple-system, BlinkMacSystemFont\",\n      \"body\": \"-apple-system, BlinkMacSystemFont\",\n      \"mono\": \"ui-monospace\"\n    },\n    \"geometry\": {\n      \"radius\": \"6px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  },
  {
    "id": "supabase",
    "name": "Supabase",
    "category": "Developer & Database",
    "badge": "Terminal Dark",
    "description": "High-contrast developer dark canvas with emerald neon highlights and monospaced data.",
    "accentColor": "#3ecf8e",
    "bgDark": true,
    "swatchColors": [
      "#171717",
      "#1c1c1c",
      "#3ecf8e",
      "#ededed"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: SUPABASE\n- Atmosphere: High-contrast developer dark canvas with emerald neon highlights and monospaced data.\n- Palette: Accent #3ecf8e, Canvas #171717, Surface #1c1c1c.\n- Typography: Circular for headlines, Circular for body copy.\n- Geometry: 8px radius, 1px border width.\n- Visual details: Database console precision. Dark panels, electric emerald highlights, monospaced SQL logs, and clean tabular data rows.",
    "readme": {
      "headline": "Supabase design system",
      "description": "High-contrast developer dark canvas with emerald neon highlights and monospaced data. Database console precision. Dark panels, electric emerald highlights, monospaced SQL logs, and clean tabular data rows.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "Database console precision. Dark panels, electric emerald highlights, monospaced SQL logs, and clean tabular data rows.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Supabase tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Supabase",
            "subtitle": "High-contrast developer dark canvas with emerald neon highlights and monospaced data.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Supabase.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 8px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Developer & Database.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Supabase.",
            "type": "quadrants",
            "items": [
              "Accent: #3ecf8e",
              "Display: Circular",
              "Radius: 8px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Supabase works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Supabase tokens and patterns.",
        "heroTitle": "Build Faster with Supabase",
        "heroSubtitle": "Crafted with Circular typography, 8px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "Circular Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "8px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Supabase tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #3ecf8e; color: #ffffff; border-radius: 8px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #3ecf8e; color: #3ecf8e; border-radius: 8px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 8px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #3ecf8e22; color: #3ecf8e; border-radius: 8px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 8px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Supabase.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #3ecf8e;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #3ecf8e;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #3ecf8e;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 8px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #3ecf8e; border-radius: 8px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Supabase focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Supabase Pro\" style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">High-contrast developer dark canvas with emerald neon highlights and monospaced data.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #3ecf8e;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Supabase\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #3ecf8e;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #3ecf8e; border-radius: 8px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #3ecf8e;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#3ecf8e</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">Circular</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#3ecf8e",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#171717",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#1c1c1c",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#ffffff",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#a1a1aa",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#27272a",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "Circular, system-ui, sans-serif",
        "bodyFont": "Circular, system-ui, sans-serif",
        "monoFont": "Source Code Pro, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Supabase Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "High-contrast developer dark canvas with emerald neon highlights and monospaced data."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "8px"
        },
        {
          "name": "--radius-button",
          "value": "8px"
        },
        {
          "name": "--radius-card",
          "value": "8px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #3ecf8e;\n  --color-accent-subtle: #3ecf8e22;\n  --color-bg: #171717;\n  --color-surface: #1c1c1c;\n  --color-fg: #ffffff;\n  --color-muted: #a1a1aa;\n  --color-border: #27272a;\n  \n  --font-display: \"Circular\", system-ui, sans-serif;\n  --font-body: \"Circular\", system-ui, sans-serif;\n  --font-mono: \"Source Code Pro\", monospace;\n  \n  --radius-base: 8px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Supabase\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#3ecf8e\",\n      \"bg\": \"#171717\",\n      \"surface\": \"#1c1c1c\",\n      \"fg\": \"#ffffff\",\n      \"muted\": \"#a1a1aa\",\n      \"border\": \"#27272a\"\n    },\n    \"typography\": {\n      \"display\": \"Circular\",\n      \"body\": \"Circular\",\n      \"mono\": \"Source Code Pro\"\n    },\n    \"geometry\": {\n      \"radius\": \"8px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  },
  {
    "id": "raycast",
    "name": "Raycast",
    "category": "macOS & Luxury",
    "badge": "Command Center",
    "description": "macOS spotlight luxury aesthetic, deep dark canvas, hotkey pills, and vibrant red/coral pop.",
    "accentColor": "#ff6363",
    "bgDark": true,
    "swatchColors": [
      "#07080a",
      "#101111",
      "#ff6363",
      "#f9f9f9"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: RAYCAST\n- Atmosphere: macOS spotlight luxury aesthetic, deep dark canvas, hotkey pills, and vibrant red/coral pop.\n- Palette: Accent #ff6363, Canvas #07080a, Surface #101111.\n- Typography: Inter for headlines, Inter for body copy.\n- Geometry: 12px radius, 1px border width.\n- Visual details: macOS power-launcher aesthetic. Obsidian frosted glass panels, hotkey shortcut badges (\u2318K), and crimson command ribbons.",
    "readme": {
      "headline": "Raycast design system",
      "description": "macOS spotlight luxury aesthetic, deep dark canvas, hotkey pills, and vibrant red/coral pop. macOS power-launcher aesthetic. Obsidian frosted glass panels, hotkey shortcut badges (\u2318K), and crimson command ribbons.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "macOS power-launcher aesthetic. Obsidian frosted glass panels, hotkey shortcut badges (\u2318K), and crimson command ribbons.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Raycast tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Raycast",
            "subtitle": "macOS spotlight luxury aesthetic, deep dark canvas, hotkey pills, and vibrant red/coral pop.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Raycast.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 12px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for macOS & Luxury.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Raycast.",
            "type": "quadrants",
            "items": [
              "Accent: #ff6363",
              "Display: Inter",
              "Radius: 12px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Raycast works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Raycast tokens and patterns.",
        "heroTitle": "Build Faster with Raycast",
        "heroSubtitle": "Crafted with Inter typography, 12px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "Inter Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "12px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Raycast tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #ff6363; color: #ffffff; border-radius: 12px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #ff6363; color: #ff6363; border-radius: 12px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 12px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #ff636322; color: #ff6363; border-radius: 12px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 12px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Raycast.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 12px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #ff6363;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 12px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #ff6363;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 12px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #ff6363;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 12px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #ff6363; border-radius: 12px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Raycast focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Raycast Pro\" style=\"border-radius: 12px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 12px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">macOS spotlight luxury aesthetic, deep dark canvas, hotkey pills, and vibrant red/coral pop.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 12px; border: 1px solid #3f3f46;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #ff6363;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Raycast\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #ff6363;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #ff6363; border-radius: 12px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 12px; border: 1px solid #3f3f46;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #ff6363;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#ff6363</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">Inter</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#ff6363",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#07080a",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#101111",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#ffffff",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#a1a1aa",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#27272a",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "Inter, system-ui, sans-serif",
        "bodyFont": "Inter, system-ui, sans-serif",
        "monoFont": "JetBrains Mono, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Raycast Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "macOS spotlight luxury aesthetic, deep dark canvas, hotkey pills, and vibrant red/coral pop."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "12px"
        },
        {
          "name": "--radius-button",
          "value": "12px"
        },
        {
          "name": "--radius-card",
          "value": "12px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #ff6363;\n  --color-accent-subtle: #ff636322;\n  --color-bg: #07080a;\n  --color-surface: #101111;\n  --color-fg: #ffffff;\n  --color-muted: #a1a1aa;\n  --color-border: #27272a;\n  \n  --font-display: \"Inter\", system-ui, sans-serif;\n  --font-body: \"Inter\", system-ui, sans-serif;\n  --font-mono: \"JetBrains Mono\", monospace;\n  \n  --radius-base: 12px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Raycast\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#ff6363\",\n      \"bg\": \"#07080a\",\n      \"surface\": \"#101111\",\n      \"fg\": \"#ffffff\",\n      \"muted\": \"#a1a1aa\",\n      \"border\": \"#27272a\"\n    },\n    \"typography\": {\n      \"display\": \"Inter\",\n      \"body\": \"Inter\",\n      \"mono\": \"JetBrains Mono\"\n    },\n    \"geometry\": {\n      \"radius\": \"12px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  },
  {
    "id": "resend",
    "name": "Resend",
    "category": "Email & SaaS",
    "badge": "Monochrome Precision",
    "description": "Minimalist black and white email platform design with crisp orange highlight accents.",
    "accentColor": "#ff801f",
    "bgDark": true,
    "swatchColors": [
      "#000000",
      "#111111",
      "#ff801f",
      "#ffffff"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: RESEND\n- Atmosphere: Minimalist black and white email platform design with crisp orange highlight accents.\n- Palette: Accent #ff801f, Canvas #000000, Surface #111111.\n- Typography: Inter for headlines, Inter for body copy.\n- Geometry: 8px radius, 1px border width.\n- Visual details: Clean email developer experience. Ultra-dark canvases, orange status beacons, clean code inspection blocks, and minimal whitespace.",
    "readme": {
      "headline": "Resend design system",
      "description": "Minimalist black and white email platform design with crisp orange highlight accents. Clean email developer experience. Ultra-dark canvases, orange status beacons, clean code inspection blocks, and minimal whitespace.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "Clean email developer experience. Ultra-dark canvases, orange status beacons, clean code inspection blocks, and minimal whitespace.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Resend tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Resend",
            "subtitle": "Minimalist black and white email platform design with crisp orange highlight accents.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Resend.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 8px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Email & SaaS.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Resend.",
            "type": "quadrants",
            "items": [
              "Accent: #ff801f",
              "Display: Inter",
              "Radius: 8px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Resend works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Resend tokens and patterns.",
        "heroTitle": "Build Faster with Resend",
        "heroSubtitle": "Crafted with Inter typography, 8px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "Inter Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "8px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Resend tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #ff801f; color: #ffffff; border-radius: 8px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #ff801f; color: #ff801f; border-radius: 8px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 8px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #ff801f22; color: #ff801f; border-radius: 8px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 8px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Resend.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #ff801f;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #ff801f;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #ff801f;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 8px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #ff801f; border-radius: 8px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Resend focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Resend Pro\" style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">Minimalist black and white email platform design with crisp orange highlight accents.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #ff801f;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Resend\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #ff801f;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #ff801f; border-radius: 8px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #ff801f;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#ff801f</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">Inter</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#ff801f",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#000000",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#111111",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#ffffff",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#a1a1aa",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#27272a",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "Inter, system-ui, sans-serif",
        "bodyFont": "Inter, system-ui, sans-serif",
        "monoFont": "Geist Mono, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Resend Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "Minimalist black and white email platform design with crisp orange highlight accents."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "8px"
        },
        {
          "name": "--radius-button",
          "value": "8px"
        },
        {
          "name": "--radius-card",
          "value": "8px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #ff801f;\n  --color-accent-subtle: #ff801f22;\n  --color-bg: #000000;\n  --color-surface: #111111;\n  --color-fg: #ffffff;\n  --color-muted: #a1a1aa;\n  --color-border: #27272a;\n  \n  --font-display: \"Inter\", system-ui, sans-serif;\n  --font-body: \"Inter\", system-ui, sans-serif;\n  --font-mono: \"Geist Mono\", monospace;\n  \n  --radius-base: 8px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Resend\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#ff801f\",\n      \"bg\": \"#000000\",\n      \"surface\": \"#111111\",\n      \"fg\": \"#ffffff\",\n      \"muted\": \"#a1a1aa\",\n      \"border\": \"#27272a\"\n    },\n    \"typography\": {\n      \"display\": \"Inter\",\n      \"body\": \"Inter\",\n      \"mono\": \"Geist Mono\"\n    },\n    \"geometry\": {\n      \"radius\": \"8px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  },
  {
    "id": "warp",
    "name": "Warp",
    "category": "Terminal & CLI",
    "badge": "Modern Terminal",
    "description": "Next-generation command terminal interface with glowing cyan prompts and dark obsidian panels.",
    "accentColor": "#00dfa2",
    "bgDark": true,
    "swatchColors": [
      "#161412",
      "#1f1d1b",
      "#00dfa2",
      "#faf9f6"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: WARP\n- Atmosphere: Next-generation command terminal interface with glowing cyan prompts and dark obsidian panels.\n- Palette: Accent #00dfa2, Canvas #161412, Surface #1f1d1b.\n- Typography: Space Grotesk for headlines, Inter for body copy.\n- Geometry: 8px radius, 1px border width.\n- Visual details: Terminal reimagined. Command block containers, neon cyan prompt indicators, terminal dark background, and block action drawers.",
    "readme": {
      "headline": "Warp design system",
      "description": "Next-generation command terminal interface with glowing cyan prompts and dark obsidian panels. Terminal reimagined. Command block containers, neon cyan prompt indicators, terminal dark background, and block action drawers.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "Terminal reimagined. Command block containers, neon cyan prompt indicators, terminal dark background, and block action drawers.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Warp tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Warp",
            "subtitle": "Next-generation command terminal interface with glowing cyan prompts and dark obsidian panels.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Warp.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 8px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Terminal & CLI.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Warp.",
            "type": "quadrants",
            "items": [
              "Accent: #00dfa2",
              "Display: Space Grotesk",
              "Radius: 8px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Warp works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Warp tokens and patterns.",
        "heroTitle": "Build Faster with Warp",
        "heroSubtitle": "Crafted with Space Grotesk typography, 8px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "Space Grotesk Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "8px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Warp tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #00dfa2; color: #ffffff; border-radius: 8px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #00dfa2; color: #00dfa2; border-radius: 8px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 8px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #00dfa222; color: #00dfa2; border-radius: 8px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 8px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Warp.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #00dfa2;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #00dfa2;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #00dfa2;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 8px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #00dfa2; border-radius: 8px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Warp focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Warp Pro\" style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">Next-generation command terminal interface with glowing cyan prompts and dark obsidian panels.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #00dfa2;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Warp\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #00dfa2;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #00dfa2; border-radius: 8px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 8px; border: 1px solid #3f3f46;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #00dfa2;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#00dfa2</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">Space Grotesk</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#00dfa2",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#161412",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#1f1d1b",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#ffffff",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#a1a1aa",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#27272a",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "Space Grotesk, system-ui, sans-serif",
        "bodyFont": "Inter, system-ui, sans-serif",
        "monoFont": "Warp Mono, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Warp Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "Next-generation command terminal interface with glowing cyan prompts and dark obsidian panels."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "8px"
        },
        {
          "name": "--radius-button",
          "value": "8px"
        },
        {
          "name": "--radius-card",
          "value": "8px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #00dfa2;\n  --color-accent-subtle: #00dfa222;\n  --color-bg: #161412;\n  --color-surface: #1f1d1b;\n  --color-fg: #ffffff;\n  --color-muted: #a1a1aa;\n  --color-border: #27272a;\n  \n  --font-display: \"Space Grotesk\", system-ui, sans-serif;\n  --font-body: \"Inter\", system-ui, sans-serif;\n  --font-mono: \"Warp Mono\", monospace;\n  \n  --radius-base: 8px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Warp\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#00dfa2\",\n      \"bg\": \"#161412\",\n      \"surface\": \"#1f1d1b\",\n      \"fg\": \"#ffffff\",\n      \"muted\": \"#a1a1aa\",\n      \"border\": \"#27272a\"\n    },\n    \"typography\": {\n      \"display\": \"Space Grotesk\",\n      \"body\": \"Inter\",\n      \"mono\": \"Warp Mono\"\n    },\n    \"geometry\": {\n      \"radius\": \"8px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  },
  {
    "id": "warm-editorial",
    "name": "Warm Editorial",
    "category": "Publication & Print",
    "badge": "Editorial Magazine",
    "description": "Literary, thoughtful design with serif typography, warm parchment tones, and magazine layout.",
    "accentColor": "#b45309",
    "bgDark": false,
    "swatchColors": [
      "#fbf9f5",
      "#f4efe6",
      "#b45309",
      "#1c1917"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: WARM EDITORIAL\n- Atmosphere: Literary, thoughtful design with serif typography, warm parchment tones, and magazine layout.\n- Palette: Accent #b45309, Canvas #b45309, Surface #fbf9f5.\n- Typography: Newsreader for headlines, Newsreader Text for body copy.\n- Geometry: 4px radius, 1px border width.\n- Visual details: Literary editorial aesthetic. Cream parchment canvas, warm terracotta drop caps, delicate hairline rules, and generous reading measure.",
    "readme": {
      "headline": "Warm Editorial design system",
      "description": "Literary, thoughtful design with serif typography, warm parchment tones, and magazine layout. Literary editorial aesthetic. Cream parchment canvas, warm terracotta drop caps, delicate hairline rules, and generous reading measure.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "Literary editorial aesthetic. Cream parchment canvas, warm terracotta drop caps, delicate hairline rules, and generous reading measure.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Warm Editorial tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Warm Editorial",
            "subtitle": "Literary, thoughtful design with serif typography, warm parchment tones, and magazine layout.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Warm Editorial.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 4px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Publication & Print.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Warm Editorial.",
            "type": "quadrants",
            "items": [
              "Accent: #b45309",
              "Display: Newsreader",
              "Radius: 4px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Warm Editorial works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Warm Editorial tokens and patterns.",
        "heroTitle": "Build Faster with Warm Editorial",
        "heroSubtitle": "Crafted with Newsreader typography, 4px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "Newsreader Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "4px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Warm Editorial tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #b45309; color: #ffffff; border-radius: 4px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #b45309; color: #b45309; border-radius: 4px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 4px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #b4530922; color: #b45309; border-radius: 4px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 4px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Warm Editorial.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 4px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #b45309;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 4px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #b45309;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 4px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #b45309;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 4px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #b45309; border-radius: 4px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Warm Editorial focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Warm Editorial Pro\" style=\"border-radius: 4px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 4px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">Literary, thoughtful design with serif typography, warm parchment tones, and magazine layout.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 4px; border: 1px solid #e4e4e7;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #b45309;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Warm Editorial\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #b45309;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #b45309; border-radius: 4px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 4px; border: 1px solid #e4e4e7;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #b45309;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#b45309</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">Newsreader</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#b45309",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#b45309",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#fbf9f5",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#18181b",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#71717a",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#e4e4e7",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "Newsreader, system-ui, sans-serif",
        "bodyFont": "Newsreader Text, system-ui, sans-serif",
        "monoFont": "Courier Prime, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Warm Editorial Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "Literary, thoughtful design with serif typography, warm parchment tones, and magazine layout."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "4px"
        },
        {
          "name": "--radius-button",
          "value": "4px"
        },
        {
          "name": "--radius-card",
          "value": "4px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #b45309;\n  --color-accent-subtle: #b4530922;\n  --color-bg: #b45309;\n  --color-surface: #fbf9f5;\n  --color-fg: #18181b;\n  --color-muted: #71717a;\n  --color-border: #e4e4e7;\n  \n  --font-display: \"Newsreader\", system-ui, sans-serif;\n  --font-body: \"Newsreader Text\", system-ui, sans-serif;\n  --font-mono: \"Courier Prime\", monospace;\n  \n  --radius-base: 4px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Warm Editorial\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#b45309\",\n      \"bg\": \"#b45309\",\n      \"surface\": \"#fbf9f5\",\n      \"fg\": \"#18181b\",\n      \"muted\": \"#71717a\",\n      \"border\": \"#e4e4e7\"\n    },\n    \"typography\": {\n      \"display\": \"Newsreader\",\n      \"body\": \"Newsreader Text\",\n      \"mono\": \"Courier Prime\"\n    },\n    \"geometry\": {\n      \"radius\": \"4px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  },
  {
    "id": "neobrutalism",
    "name": "Neo-Brutalist",
    "category": "Playful & Bold",
    "badge": "Playful Bold",
    "description": "High-energy bold design. Heavy black borders, hard drop shadows, vibrant pop colors.",
    "accentColor": "#facc15",
    "bgDark": false,
    "swatchColors": [
      "#fef08a",
      "#a7f3d0",
      "#facc15",
      "#000000"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: NEO-BRUTALIST\n- Atmosphere: High-energy bold design. Heavy black borders, hard drop shadows, vibrant pop colors.\n- Palette: Accent #facc15, Canvas #facc15, Surface #fef08a.\n- Typography: Public Sans for headlines, Public Sans for body copy.\n- Geometry: 0px radius, 3px border width.\n- Visual details: Playful, rebellious energy. Thick 3px/4px solid black outlines, hard unblurred offset shadows, pastel yellow and mint surfaces, and badge rotations.",
    "readme": {
      "headline": "Neo-Brutalist design system",
      "description": "High-energy bold design. Heavy black borders, hard drop shadows, vibrant pop colors. Playful, rebellious energy. Thick 3px/4px solid black outlines, hard unblurred offset shadows, pastel yellow and mint surfaces, and badge rotations.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "Playful, rebellious energy. Thick 3px/4px solid black outlines, hard unblurred offset shadows, pastel yellow and mint surfaces, and badge rotations.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Neo-Brutalist tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Neo-Brutalist",
            "subtitle": "High-energy bold design. Heavy black borders, hard drop shadows, vibrant pop colors.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Neo-Brutalist.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 0px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Playful & Bold.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Neo-Brutalist.",
            "type": "quadrants",
            "items": [
              "Accent: #facc15",
              "Display: Public Sans",
              "Radius: 0px",
              "Border: 3px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Neo-Brutalist works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Neo-Brutalist tokens and patterns.",
        "heroTitle": "Build Faster with Neo-Brutalist",
        "heroSubtitle": "Crafted with Public Sans typography, 0px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "Public Sans Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "0px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Neo-Brutalist tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #facc15; color: #ffffff; border-radius: 0px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 3px solid #facc15; color: #facc15; border-radius: 0px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 0px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #facc1522; color: #facc15; border-radius: 0px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 0px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Neo-Brutalist.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 0px; border: 3px solid #e4e4e7;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #facc15;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 0px; border: 3px solid #e4e4e7;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #facc15;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 0px; border: 3px solid #e4e4e7;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #facc15;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 0px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #facc15; border-radius: 0px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Neo-Brutalist focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Neo-Brutalist Pro\" style=\"border-radius: 0px; border: 3px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 0px; border: 3px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">High-energy bold design. Heavy black borders, hard drop shadows, vibrant pop colors.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 0px; border: 3px solid #e4e4e7;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #facc15;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Neo-Brutalist\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #facc15;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #facc15; border-radius: 0px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 0px; border: 3px solid #e4e4e7;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #facc15;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#facc15</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">Public Sans</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#facc15",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#facc15",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#fef08a",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#18181b",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#71717a",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#e4e4e7",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "Public Sans, system-ui, sans-serif",
        "bodyFont": "Public Sans, system-ui, sans-serif",
        "monoFont": "Space Mono, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Neo-Brutalist Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "High-energy bold design. Heavy black borders, hard drop shadows, vibrant pop colors."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "0px"
        },
        {
          "name": "--radius-button",
          "value": "0px"
        },
        {
          "name": "--radius-card",
          "value": "0px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #facc15;\n  --color-accent-subtle: #facc1522;\n  --color-bg: #facc15;\n  --color-surface: #fef08a;\n  --color-fg: #18181b;\n  --color-muted: #71717a;\n  --color-border: #e4e4e7;\n  \n  --font-display: \"Public Sans\", system-ui, sans-serif;\n  --font-body: \"Public Sans\", system-ui, sans-serif;\n  --font-mono: \"Space Mono\", monospace;\n  \n  --radius-base: 0px;\n  --border-width-base: 3px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Neo-Brutalist\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#facc15\",\n      \"bg\": \"#facc15\",\n      \"surface\": \"#fef08a\",\n      \"fg\": \"#18181b\",\n      \"muted\": \"#71717a\",\n      \"border\": \"#e4e4e7\"\n    },\n    \"typography\": {\n      \"display\": \"Public Sans\",\n      \"body\": \"Public Sans\",\n      \"mono\": \"Space Mono\"\n    },\n    \"geometry\": {\n      \"radius\": \"0px\",\n      \"borderWidth\": \"3px\"\n    }\n  }\n}"
  },
  {
    "id": "modern-saas",
    "name": "Modern SaaS",
    "category": "Startup SaaS",
    "badge": "Startup SaaS",
    "description": "Vibrant, friendly, high-converting modern startup UI with rounded cards and soft glows.",
    "accentColor": "#3b82f6",
    "bgDark": false,
    "swatchColors": [
      "#ffffff",
      "#eff6ff",
      "#3b82f6",
      "#1e293b"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: MODERN SAAS\n- Atmosphere: Vibrant, friendly, high-converting modern startup UI with rounded cards and soft glows.\n- Palette: Accent #3b82f6, Canvas #3b82f6, Surface #ffffff.\n- Typography: Plus Jakarta Sans for headlines, Inter for body copy.\n- Geometry: 14px radius, 1px border width.\n- Visual details: High-converting SaaS. Soft rounded corners, subtle blue ambient shadows, feature grids with colorful icon badges, and star ratings.",
    "readme": {
      "headline": "Modern SaaS design system",
      "description": "Vibrant, friendly, high-converting modern startup UI with rounded cards and soft glows. High-converting SaaS. Soft rounded corners, subtle blue ambient shadows, feature grids with colorful icon badges, and star ratings.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "High-converting SaaS. Soft rounded corners, subtle blue ambient shadows, feature grids with colorful icon badges, and star ratings.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Modern SaaS tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Modern SaaS",
            "subtitle": "Vibrant, friendly, high-converting modern startup UI with rounded cards and soft glows.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Modern SaaS.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 14px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Startup SaaS.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Modern SaaS.",
            "type": "quadrants",
            "items": [
              "Accent: #3b82f6",
              "Display: Plus Jakarta Sans",
              "Radius: 14px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Modern SaaS works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Modern SaaS tokens and patterns.",
        "heroTitle": "Build Faster with Modern SaaS",
        "heroSubtitle": "Crafted with Plus Jakarta Sans typography, 14px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "Plus Jakarta Sans Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "14px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Modern SaaS tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #3b82f6; color: #ffffff; border-radius: 14px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #3b82f6; color: #3b82f6; border-radius: 14px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 14px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #3b82f622; color: #3b82f6; border-radius: 14px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 14px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Modern SaaS.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 14px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #3b82f6;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 14px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #3b82f6;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 14px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #3b82f6;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 14px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #3b82f6; border-radius: 14px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Modern SaaS focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Modern SaaS Pro\" style=\"border-radius: 14px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 14px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">Vibrant, friendly, high-converting modern startup UI with rounded cards and soft glows.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 14px; border: 1px solid #e4e4e7;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #3b82f6;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Modern SaaS\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #3b82f6;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #3b82f6; border-radius: 14px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 14px; border: 1px solid #e4e4e7;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #3b82f6;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#3b82f6</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">Plus Jakarta Sans</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#3b82f6",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#3b82f6",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#ffffff",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#18181b",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#71717a",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#e4e4e7",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "Plus Jakarta Sans, system-ui, sans-serif",
        "bodyFont": "Inter, system-ui, sans-serif",
        "monoFont": "JetBrains Mono, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Modern SaaS Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "Vibrant, friendly, high-converting modern startup UI with rounded cards and soft glows."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "14px"
        },
        {
          "name": "--radius-button",
          "value": "14px"
        },
        {
          "name": "--radius-card",
          "value": "14px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #3b82f6;\n  --color-accent-subtle: #3b82f622;\n  --color-bg: #3b82f6;\n  --color-surface: #ffffff;\n  --color-fg: #18181b;\n  --color-muted: #71717a;\n  --color-border: #e4e4e7;\n  \n  --font-display: \"Plus Jakarta Sans\", system-ui, sans-serif;\n  --font-body: \"Inter\", system-ui, sans-serif;\n  --font-mono: \"JetBrains Mono\", monospace;\n  \n  --radius-base: 14px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Modern SaaS\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#3b82f6\",\n      \"bg\": \"#3b82f6\",\n      \"surface\": \"#ffffff\",\n      \"fg\": \"#18181b\",\n      \"muted\": \"#71717a\",\n      \"border\": \"#e4e4e7\"\n    },\n    \"typography\": {\n      \"display\": \"Plus Jakarta Sans\",\n      \"body\": \"Inter\",\n      \"mono\": \"JetBrains Mono\"\n    },\n    \"geometry\": {\n      \"radius\": \"14px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  },
  {
    "id": "material",
    "name": "Material Design",
    "category": "Enterprise & Mobile",
    "badge": "Material 3",
    "description": "Google Material You design system with tonal surface elevation, generous rounded corners, and dynamic color.",
    "accentColor": "#6750a4",
    "bgDark": false,
    "swatchColors": [
      "#fffbfe",
      "#f3edf7",
      "#6750a4",
      "#1c1b1f"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: MATERIAL DESIGN\n- Atmosphere: Google Material You design system with tonal surface elevation, generous rounded corners, and dynamic color.\n- Palette: Accent #6750a4, Canvas #6750a4, Surface #fffbfe.\n- Typography: Roboto Flex for headlines, Roboto for body copy.\n- Geometry: 24px radius, 1px border width.\n- Visual details: Material 3 design system. Tonal color containers, generous pill radiuses, floating action buttons, and elevation shadow tiers.",
    "readme": {
      "headline": "Material Design design system",
      "description": "Google Material You design system with tonal surface elevation, generous rounded corners, and dynamic color. Material 3 design system. Tonal color containers, generous pill radiuses, floating action buttons, and elevation shadow tiers.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "Material 3 design system. Tonal color containers, generous pill radiuses, floating action buttons, and elevation shadow tiers.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Material Design tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Material Design",
            "subtitle": "Google Material You design system with tonal surface elevation, generous rounded corners, and dynamic color.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Material Design.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 24px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Enterprise & Mobile.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Material Design.",
            "type": "quadrants",
            "items": [
              "Accent: #6750a4",
              "Display: Roboto Flex",
              "Radius: 24px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Material Design works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Material Design tokens and patterns.",
        "heroTitle": "Build Faster with Material Design",
        "heroSubtitle": "Crafted with Roboto Flex typography, 24px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "Roboto Flex Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "24px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Material Design tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #6750a4; color: #ffffff; border-radius: 24px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #6750a4; color: #6750a4; border-radius: 24px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 24px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #6750a422; color: #6750a4; border-radius: 24px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 24px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Material Design.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 24px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #6750a4;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 24px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #6750a4;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 24px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #6750a4;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 24px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #6750a4; border-radius: 24px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Material Design focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Material Design Pro\" style=\"border-radius: 24px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 24px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">Google Material You design system with tonal surface elevation, generous rounded corners, and dynamic color.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 24px; border: 1px solid #e4e4e7;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #6750a4;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Material Design\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #6750a4;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #6750a4; border-radius: 24px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 24px; border: 1px solid #e4e4e7;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #6750a4;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#6750a4</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">Roboto Flex</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#6750a4",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#6750a4",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#fffbfe",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#18181b",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#71717a",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#e4e4e7",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "Roboto Flex, system-ui, sans-serif",
        "bodyFont": "Roboto, system-ui, sans-serif",
        "monoFont": "Roboto Mono, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Material Design Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "Google Material You design system with tonal surface elevation, generous rounded corners, and dynamic color."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "24px"
        },
        {
          "name": "--radius-button",
          "value": "24px"
        },
        {
          "name": "--radius-card",
          "value": "24px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #6750a4;\n  --color-accent-subtle: #6750a422;\n  --color-bg: #6750a4;\n  --color-surface: #fffbfe;\n  --color-fg: #18181b;\n  --color-muted: #71717a;\n  --color-border: #e4e4e7;\n  \n  --font-display: \"Roboto Flex\", system-ui, sans-serif;\n  --font-body: \"Roboto\", system-ui, sans-serif;\n  --font-mono: \"Roboto Mono\", monospace;\n  \n  --radius-base: 24px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Material Design\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#6750a4\",\n      \"bg\": \"#6750a4\",\n      \"surface\": \"#fffbfe\",\n      \"fg\": \"#18181b\",\n      \"muted\": \"#71717a\",\n      \"border\": \"#e4e4e7\"\n    },\n    \"typography\": {\n      \"display\": \"Roboto Flex\",\n      \"body\": \"Roboto\",\n      \"mono\": \"Roboto Mono\"\n    },\n    \"geometry\": {\n      \"radius\": \"24px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  },
  {
    "id": "shadcn",
    "name": "Shadcn UI",
    "category": "Modern Minimal",
    "badge": "Zinc Neutral",
    "description": "Ultra-clean accessible UI system built on zinc neutral grays, subtle borders, and pristine typography.",
    "accentColor": "#18181b",
    "bgDark": false,
    "swatchColors": [
      "#ffffff",
      "#f4f4f5",
      "#18181b",
      "#71717a"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: SHADCN UI\n- Atmosphere: Ultra-clean accessible UI system built on zinc neutral grays, subtle borders, and pristine typography.\n- Palette: Accent #18181b, Canvas #18181b, Surface #ffffff.\n- Typography: Geist for headlines, Geist for body copy.\n- Geometry: 8px radius, 1px border width.\n- Visual details: Modern developer standard. Zinc grays, subtle 1px borders, accessible Radix-style interactive components, and clean typography.",
    "readme": {
      "headline": "Shadcn UI design system",
      "description": "Ultra-clean accessible UI system built on zinc neutral grays, subtle borders, and pristine typography. Modern developer standard. Zinc grays, subtle 1px borders, accessible Radix-style interactive components, and clean typography.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "Modern developer standard. Zinc grays, subtle 1px borders, accessible Radix-style interactive components, and clean typography.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Shadcn UI tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Shadcn UI",
            "subtitle": "Ultra-clean accessible UI system built on zinc neutral grays, subtle borders, and pristine typography.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Shadcn UI.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 8px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Modern Minimal.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Shadcn UI.",
            "type": "quadrants",
            "items": [
              "Accent: #18181b",
              "Display: Geist",
              "Radius: 8px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Shadcn UI works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Shadcn UI tokens and patterns.",
        "heroTitle": "Build Faster with Shadcn UI",
        "heroSubtitle": "Crafted with Geist typography, 8px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "Geist Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "8px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Shadcn UI tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #18181b; color: #ffffff; border-radius: 8px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #18181b; color: #18181b; border-radius: 8px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 8px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #18181b22; color: #18181b; border-radius: 8px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 8px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Shadcn UI.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 8px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #18181b;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 8px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #18181b;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 8px; border: 1px solid #e4e4e7;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #18181b;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 8px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #18181b; border-radius: 8px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Shadcn UI focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Shadcn UI Pro\" style=\"border-radius: 8px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 8px; border: 1px solid #e4e4e7;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">Ultra-clean accessible UI system built on zinc neutral grays, subtle borders, and pristine typography.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 8px; border: 1px solid #e4e4e7;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #18181b;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Shadcn UI\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #18181b;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #18181b; border-radius: 8px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 8px; border: 1px solid #e4e4e7;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #18181b;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#18181b</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">Geist</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#18181b",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#18181b",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#ffffff",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#18181b",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#71717a",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#e4e4e7",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "Geist, system-ui, sans-serif",
        "bodyFont": "Geist, system-ui, sans-serif",
        "monoFont": "Geist Mono, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Shadcn UI Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "Ultra-clean accessible UI system built on zinc neutral grays, subtle borders, and pristine typography."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "8px"
        },
        {
          "name": "--radius-button",
          "value": "8px"
        },
        {
          "name": "--radius-card",
          "value": "8px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #18181b;\n  --color-accent-subtle: #18181b22;\n  --color-bg: #18181b;\n  --color-surface: #ffffff;\n  --color-fg: #18181b;\n  --color-muted: #71717a;\n  --color-border: #e4e4e7;\n  \n  --font-display: \"Geist\", system-ui, sans-serif;\n  --font-body: \"Geist\", system-ui, sans-serif;\n  --font-mono: \"Geist Mono\", monospace;\n  \n  --radius-base: 8px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Shadcn UI\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#18181b\",\n      \"bg\": \"#18181b\",\n      \"surface\": \"#ffffff\",\n      \"fg\": \"#18181b\",\n      \"muted\": \"#71717a\",\n      \"border\": \"#e4e4e7\"\n    },\n    \"typography\": {\n      \"display\": \"Geist\",\n      \"body\": \"Geist\",\n      \"mono\": \"Geist Mono\"\n    },\n    \"geometry\": {\n      \"radius\": \"8px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  },
  {
    "id": "spotify",
    "name": "Spotify",
    "category": "Media & Entertainment",
    "badge": "Audio Dark",
    "description": "Rich obsidian dark workspace, electric emerald neon accents, and tactile media cards.",
    "accentColor": "#1ed760",
    "bgDark": true,
    "swatchColors": [
      "#121212",
      "#181818",
      "#1ed760",
      "#ffffff"
    ],
    "owner": "Included",
    "updatedAt": "Built-in",
    "published": true,
    "isOrgDefault": false,
    "promptGuidance": "DESIGN SYSTEM: SPOTIFY\n- Atmosphere: Rich obsidian dark workspace, electric emerald neon accents, and tactile media cards.\n- Palette: Accent #1ed760, Canvas #121212, Surface #181818.\n- Typography: Circular Spotify for headlines, Circular Spotify for body copy.\n- Geometry: 16px radius, 1px border width.\n- Visual details: Audio media aesthetic. Pure black and charcoal layered surfaces, vibrant electric green play buttons, and tactile media album tiles.",
    "readme": {
      "headline": "Spotify design system",
      "description": "Rich obsidian dark workspace, electric emerald neon accents, and tactile media cards. Audio media aesthetic. Pure black and charcoal layered surfaces, vibrant electric green play buttons, and tactile media album tiles.",
      "howToUse": [
        "Link the stylesheet from every page \u2014 <link rel=\"stylesheet\" href=\"styles.css\"> \u2014 and take every color, font, spacing, radius and shadow from its variables.",
        "Build with the component patterns below rather than inventing parallel ones; copy the markup directly into your application.",
        "templates/ holds starting points a consuming project can copy whole (Deck presentation and Landing page).",
        "The whole system is derived from theme.json. To change the look, edit the tokens in Theme Parameters."
      ],
      "direction": "Audio media aesthetic. Pure black and charcoal layered surfaces, vibrant electric green play buttons, and tactile media album tiles.",
      "manifestFiles": [
        {
          "path": "components/navigation.html",
          "description": "the header bar pattern."
        },
        {
          "path": "components/table.html",
          "description": "a data table with themed header and row rules."
        },
        {
          "path": "components/dialog.html",
          "description": "a modal over its backdrop at the top elevation."
        },
        {
          "path": "theme.html",
          "description": "the theme parameters rendered as a reference sheet."
        },
        {
          "path": "templates/landing/",
          "description": "a starter page consuming the system the intended way."
        },
        {
          "path": "templates/deck/",
          "description": "a slide presentation starter consuming the system tokens."
        }
      ]
    },
    "templates": {
      "deck": {
        "name": "Deck",
        "description": "A multi-slide presentation starter on Spotify tokens with title, agenda, metrics, and data tables.",
        "slides": [
          {
            "id": 1,
            "label": "1",
            "category": "DESIGN SYSTEMS",
            "title": "Spotify",
            "subtitle": "Rich obsidian dark workspace, electric emerald neon accents, and tactile media cards.",
            "author": "Design Team",
            "date": "2026 Edition",
            "type": "cover"
          },
          {
            "id": 2,
            "label": "2",
            "category": "INDEX",
            "title": "Contents",
            "type": "toc",
            "items": [
              "01 Foundations & Principles",
              "02 Token System",
              "03 Component Library",
              "04 Templates & Patterns"
            ]
          },
          {
            "id": 3,
            "label": "3",
            "category": "01",
            "title": "Foundations",
            "subtitle": "Core principles, typography, and color discipline for Spotify.",
            "type": "divider",
            "accentBg": true
          },
          {
            "id": 4,
            "label": "4",
            "category": "STRUCTURE",
            "title": "Layout Architecture",
            "subtitle": "Spacing, alignment, and geometry engineered with 16px radius.",
            "type": "columns",
            "items": [
              "Visual balance tailored for Media & Entertainment.",
              "Strict token contracts ensure high aesthetic consistency."
            ]
          },
          {
            "id": 5,
            "label": "5",
            "category": "TOKENS",
            "title": "Design Tokens",
            "subtitle": "Semantic token definitions powering Spotify.",
            "type": "quadrants",
            "items": [
              "Accent: #1ed760",
              "Display: Circular Spotify",
              "Radius: 16px",
              "Border: 1px"
            ]
          },
          {
            "id": 6,
            "label": "6",
            "category": "DATA",
            "title": "Benchmark Metrics",
            "subtitle": "Accessibility compliance, contrast ratio, and rendering efficiency.",
            "type": "table"
          },
          {
            "id": 7,
            "label": "7",
            "category": "QUOTE",
            "title": "Design Philosophy",
            "subtitle": "\"Design is not just what it looks like and feels like. Design is how Spotify works.\"",
            "type": "quote"
          },
          {
            "id": 8,
            "label": "8",
            "category": "02",
            "title": "Component System",
            "subtitle": "Production-ready UI building blocks for digital products.",
            "type": "divider",
            "accentBg": true
          }
        ]
      },
      "landing": {
        "name": "Landing",
        "description": "A starter marketing landing page consuming Spotify tokens and patterns.",
        "heroTitle": "Build Faster with Spotify",
        "heroSubtitle": "Crafted with Circular Spotify typography, 16px geometry, and high-fidelity design standards.",
        "ctaText": "Get Started",
        "features": [
          {
            "title": "Circular Spotify Typography",
            "desc": "Harmonious type hierarchy designed for readability and aesthetic presence."
          },
          {
            "title": "16px Geometry",
            "desc": "Consistent component boundaries that reinforce brand identity across screens."
          },
          {
            "title": "Token First",
            "desc": "Every visible element maps directly to semantic CSS variables."
          }
        ]
      }
    },
    "components": {
      "buttons": {
        "name": "Buttons & tags",
        "description": "Interactive button controls and badge tags styled with Spotify tokens.",
        "previewCode": "<div class=\"flex flex-wrap items-center gap-3\">\n  <button style=\"background-color: #1ed760; color: #ffffff; border-radius: 16px;\" class=\"px-5 py-2.5 font-bold text-xs shadow-sm hover:opacity-90 transition-all\">Primary Button</button>\n  <button style=\"border: 1px solid #1ed760; color: #1ed760; border-radius: 16px;\" class=\"px-5 py-2.5 font-bold text-xs bg-transparent hover:bg-black/5 transition-all\">Outline Action</button>\n  <button style=\"border-radius: 16px;\" class=\"px-4 py-2 text-xs font-medium bg-neutral-200/50 text-neutral-700 hover:bg-neutral-200 transition-all\">Secondary</button>\n  <span style=\"background-color: #1ed76022; color: #1ed760; border-radius: 16px;\" class=\"px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase\">Tag 01</span>\n  <span style=\"border-radius: 16px;\" class=\"px-2 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600 border border-neutral-300\">Default Badge</span>\n</div>"
      },
      "cards": {
        "name": "Cards",
        "description": "Content surfaces, metrics, and elevation hierarchy in Spotify.",
        "previewCode": "<div class=\"grid grid-cols-1 md:grid-cols-2 gap-4\">\n  <div style=\"border-radius: 16px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface shadow-sm\">\n    <div style=\"color: #1ed760;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">SECTION 01</div>\n    <h3 class=\"text-xl font-bold mb-2 tracking-tight\">Structured Container</h3>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">Cards avoid arbitrary styles in favor of crisp token borders, balanced padding, and legible copy.</p>\n  </div>\n  <div style=\"border-radius: 16px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface-subtle\">\n    <div style=\"color: #1ed760;\" class=\"text-[10px] font-bold uppercase tracking-widest mb-1\">METRIC 02</div>\n    <div class=\"text-3xl font-black tracking-tight mb-1\">99.9%</div>\n    <p class=\"text-xs text-foreground-muted leading-relaxed\">System token compliance score across responsive breakpoints.</p>\n  </div>\n</div>"
      },
      "dialog": {
        "name": "Dialog",
        "description": "Modal dialog, alert actions, and backdrop treatments.",
        "previewCode": "<div style=\"border-radius: 16px; border: 1px solid #3f3f46;\" class=\"p-6 bg-surface max-w-md shadow-2xl\">\n  <div class=\"flex items-center justify-between pb-3 mb-4 border-b border-border\">\n    <h4 class=\"font-bold text-sm\">Publish Design System</h4>\n    <span style=\"color: #1ed760;\" class=\"text-xs font-mono font-bold\">ESC</span>\n  </div>\n  <p class=\"text-xs text-foreground-muted leading-relaxed mb-6\">Are you sure you want to update this design system? Consuming projects will inherit these updated tokens.</p>\n  <div class=\"flex items-center justify-end gap-2 pt-3 border-t border-border\">\n    <button style=\"border-radius: 16px;\" class=\"px-4 py-2 text-xs font-medium border border-border\">Cancel</button>\n    <button style=\"background-color: #1ed760; border-radius: 16px;\" class=\"px-4 py-2 text-xs font-bold text-white\">Save Changes</button>\n  </div>\n</div>"
      },
      "forms": {
        "name": "Forms",
        "description": "Inputs, select fields, and labels with Spotify focus states.",
        "previewCode": "<div class=\"space-y-4 max-w-md\">\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Project Title</label>\n    <input type=\"text\" value=\"Spotify Pro\" style=\"border-radius: 16px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\" />\n  </div>\n  <div>\n    <label class=\"block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5\">Description</label>\n    <textarea rows=\"2\" style=\"border-radius: 16px; border: 1px solid #3f3f46;\" class=\"w-full bg-surface px-3 py-2 text-xs focus:outline-none\">Rich obsidian dark workspace, electric emerald neon accents, and tactile media cards.</textarea>\n  </div>\n</div>"
      },
      "navigation": {
        "name": "Navigation",
        "description": "Top header navigation bar and brand anchor patterns.",
        "previewCode": "<div style=\"border-radius: 16px; border: 1px solid #3f3f46;\" class=\"px-6 py-3 flex items-center justify-between bg-surface\">\n  <div class=\"flex items-center gap-6\">\n    <div class=\"font-bold text-sm tracking-tight flex items-center gap-2\">\n      <span style=\"background-color: #1ed760;\" class=\"w-3 h-3 rounded-full inline-block\"></span>\n      Spotify\n    </div>\n    <nav class=\"hidden sm:flex items-center gap-4 text-xs font-medium text-foreground-muted\">\n      <a href=\"#\" style=\"color: #1ed760;\" class=\"font-bold\">Overview</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Tokens</a>\n      <a href=\"#\" class=\"hover:text-foreground\">Components</a>\n    </nav>\n  </div>\n  <button style=\"background-color: #1ed760; border-radius: 16px;\" class=\"text-white text-xs font-bold px-4 py-1.5\">New Project</button>\n</div>"
      },
      "table": {
        "name": "Table",
        "description": "Themed data table with headers, row rules, and cell alignments.",
        "previewCode": "<table style=\"border-radius: 16px; border: 1px solid #3f3f46;\" class=\"w-full text-left text-xs overflow-hidden\">\n  <thead class=\"bg-surface-subtle text-foreground-muted font-bold text-[10px] uppercase\">\n    <tr>\n      <th class=\"py-2.5 px-3\">Token</th>\n      <th class=\"py-2.5 px-3\">Variable Value</th>\n      <th class=\"py-2.5 px-3 text-right\">Status</th>\n    </tr>\n  </thead>\n  <tbody class=\"divide-y divide-border bg-surface text-[11px]\">\n    <tr>\n      <td style=\"color: #1ed760;\" class=\"py-2 px-3 font-mono font-bold\">--color-accent</td>\n      <td class=\"py-2 px-3 font-mono\">#1ed760</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n    <tr>\n      <td class=\"py-2 px-3 font-mono font-bold\">--font-display</td>\n      <td class=\"py-2 px-3\">Circular Spotify</td>\n      <td class=\"py-2 px-3 text-right text-emerald-600 font-bold\">ACTIVE</td>\n    </tr>\n  </tbody>\n</table>"
      }
    },
    "foundations": {
      "colors": [
        {
          "name": "Accent Color",
          "varName": "--color-accent",
          "hex": "#1ed760",
          "role": "Primary CTA, active states, focus highlight"
        },
        {
          "name": "Background",
          "varName": "--color-bg",
          "hex": "#121212",
          "role": "Canvas background"
        },
        {
          "name": "Surface",
          "varName": "--color-surface",
          "hex": "#181818",
          "role": "Cards, modals, and panel surfaces"
        },
        {
          "name": "Text Primary",
          "varName": "--color-fg",
          "hex": "#ffffff",
          "role": "High-contrast headings and body copy"
        },
        {
          "name": "Text Muted",
          "varName": "--color-muted",
          "hex": "#a1a1aa",
          "role": "Secondary labels and metadata"
        },
        {
          "name": "Border Rule",
          "varName": "--color-border",
          "hex": "#27272a",
          "role": "Card borders and dividers"
        }
      ],
      "typography": {
        "displayFont": "Circular Spotify, system-ui, sans-serif",
        "bodyFont": "Circular Spotify, system-ui, sans-serif",
        "monoFont": "Courier New, monospace",
        "scale": [
          {
            "name": "Display 4XL",
            "size": "48px",
            "weight": "800",
            "sample": "Spotify Display"
          },
          {
            "name": "Display 3XL",
            "size": "36px",
            "weight": "700",
            "sample": "Harmonious Typography"
          },
          {
            "name": "Title 2XL",
            "size": "24px",
            "weight": "600",
            "sample": "Section Heading"
          },
          {
            "name": "Header XL",
            "size": "18px",
            "weight": "600",
            "sample": "Card Feature Title"
          },
          {
            "name": "Body Base",
            "size": "14px",
            "weight": "400",
            "sample": "Rich obsidian dark workspace, electric emerald neon accents, and tactile media cards."
          },
          {
            "name": "Caption SM",
            "size": "11px",
            "weight": "500",
            "sample": "MICRO LABELS AND METADATA"
          }
        ]
      },
      "spacing": [
        {
          "name": "--space-1",
          "value": "4px"
        },
        {
          "name": "--space-2",
          "value": "8px"
        },
        {
          "name": "--space-4",
          "value": "16px"
        },
        {
          "name": "--space-6",
          "value": "24px"
        },
        {
          "name": "--space-8",
          "value": "32px"
        }
      ],
      "radii": [
        {
          "name": "--radius-base",
          "value": "16px"
        },
        {
          "name": "--radius-button",
          "value": "16px"
        },
        {
          "name": "--radius-card",
          "value": "16px"
        }
      ]
    },
    "tokensCss": ":root {\n  --color-accent: #1ed760;\n  --color-accent-subtle: #1ed76022;\n  --color-bg: #121212;\n  --color-surface: #181818;\n  --color-fg: #ffffff;\n  --color-muted: #a1a1aa;\n  --color-border: #27272a;\n  \n  --font-display: \"Circular Spotify\", system-ui, sans-serif;\n  --font-body: \"Circular Spotify\", system-ui, sans-serif;\n  --font-mono: \"Courier New\", monospace;\n  \n  --radius-base: 16px;\n  --border-width-base: 1px;\n  \n  --space-1: 4px;\n  --space-2: 8px;\n  --space-4: 16px;\n  --space-6: 24px;\n  --space-8: 32px;\n}",
    "themeJson": "{\n  \"name\": \"Spotify\",\n  \"version\": \"1.0.0\",\n  \"tokens\": {\n    \"colors\": {\n      \"accent\": \"#1ed760\",\n      \"bg\": \"#121212\",\n      \"surface\": \"#181818\",\n      \"fg\": \"#ffffff\",\n      \"muted\": \"#a1a1aa\",\n      \"border\": \"#27272a\"\n    },\n    \"typography\": {\n      \"display\": \"Circular Spotify\",\n      \"body\": \"Circular Spotify\",\n      \"mono\": \"Courier New\"\n    },\n    \"geometry\": {\n      \"radius\": \"16px\",\n      \"borderWidth\": \"1px\"\n    }\n  }\n}"
  }
];
