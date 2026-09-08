# ADR 0003: Native Multi-Provider BYOK with DESIGN.md Brand Contracts

## Status
Accepted

## Context
Commercial alternatives like Claude Design and Lovable suffer from complementary vendor limitations:
1. **Claude Design** is restricted strictly to Anthropic subscription tiers and cannot run on alternate frontier or open-source models.
2. **Lovable** often generates generic, cliché UI components ("AI slop") because prompts lack strict brand aesthetic contracts and typography scales.
3. In Khayal's original implementation, the backend route only looked for `OPENAI_API_KEY`, completely ignoring native Anthropic `ANTHROPIC_API_KEY` credentials and crashing when users provided Claude keys.

## Decision
1. **Direct Native BYOK (Bring Your Own Key)**:
   * Direct native Anthropic Claude integration (`@ai-sdk/anthropic`) supporting Claude 3.7 Sonnet with native extended thinking mode.
   * Direct native OpenAI integration (`@ai-sdk/openai`) supporting GPT-4o and o3-mini.
   * OpenRouter support for DeepSeek R1, DeepSeek V3, and Llama 3.3.
   * Local Ollama support for offline generation.
2. **Brand Design System Contracts (`DESIGN.md`)**:
   * The agent's system prompt is enriched with strict brand contracts (`Linear`, `Stripe`, `Apple`, `Vercel`, `Warm Editorial`, `Modernist`, `Neo-Brutalist`).
   * Models are instructed to use standardized CSS custom properties (`var(--accent)`, `var(--canvas)`, `var(--surface)`), exact typography scales, and specific geometry rules rather than inventing arbitrary Tailwind color classes.

## Consequences
### Positive
* Superior Visual Taste: Brand contracts ensure generated websites look like production-grade, human-designed products rather than generic AI templates.
* Cost & Vendor Flexibility: Users can choose the most cost-effective or highest-intelligence model for their task.
* Complete Privacy: Keys are stored client-side in localStorage and transmitted only over secure headers to the provider.
