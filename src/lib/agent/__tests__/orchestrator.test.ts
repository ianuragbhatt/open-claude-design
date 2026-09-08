import { describe, it, expect } from "vitest";
import { AGENT_PHASES } from "../orchestrator";
import {
  buildArchitectPrompt,
  buildMarkupDesignerPrompt,
  buildStylistPrompt,
  buildEngineerPrompt,
  buildReviewerPrompt,
} from "../prompt";

describe("Multi-Agent Orchestrator", () => {
  const context = { brandId: "linear" };

  it("should define all 5 specialized agent phases with badges and avatars", () => {
    const phases = Object.keys(AGENT_PHASES);
    expect(phases).toEqual(["architect", "designer", "stylist", "engineer", "reviewer"]);

    expect(AGENT_PHASES.architect.badge).toBe("Architect");
    expect(AGENT_PHASES.designer.badge).toBe("Designer");
    expect(AGENT_PHASES.stylist.badge).toBe("Stylist");
    expect(AGENT_PHASES.engineer.badge).toBe("Engineer");
    expect(AGENT_PHASES.reviewer.badge).toBe("Reviewer");
  });

  it("should generate specialized prompt for System Architect", () => {
    const prompt = buildArchitectPrompt(context);
    expect(prompt).toContain("SYSTEM ARCHITECT");
    expect(prompt).toContain("Architecture Blueprint");
  });

  it("should generate specialized prompt for UI Markup Designer", () => {
    const prompt = buildMarkupDesignerPrompt(context);
    expect(prompt).toContain("UI/UX MARKUP DESIGNER");
    expect(prompt).toContain("write_file");
    expect(prompt).toContain("index.html");
  });

  it("should generate specialized prompt for Style Specialist", () => {
    const prompt = buildStylistPrompt(context);
    expect(prompt).toContain("STYLE & DESIGN SYSTEM SPECIALIST");
    expect(prompt).toContain("styles.css");
  });

  it("should generate specialized prompt for Logic Engineer", () => {
    const prompt = buildEngineerPrompt(context);
    expect(prompt).toContain("FRONTEND LOGIC ENGINEER");
    expect(prompt).toContain("script.js");
  });

  it("should generate specialized prompt for Quality Reviewer", () => {
    const prompt = buildReviewerPrompt(context);
    expect(prompt).toContain("QUALITY REVIEWER & LINTER");
    expect(prompt).toContain("edit_file");
  });
});
