import { describe, it, expect } from "vitest";
import { SPECIALISTS, buildSupervisorPrompt } from "../supervisor";

describe("Autonomous Supervisor Engine", () => {
  const context = { brandId: "linear" };

  it("should define all 5 specialist roles with avatars and descriptions", () => {
    const roles = Object.keys(SPECIALISTS);
    expect(roles).toEqual(["supervisor", "designer", "stylist", "engineer", "reviewer"]);

    expect(SPECIALISTS.supervisor.title).toBe("Creative Director");
    expect(SPECIALISTS.designer.title).toBe("UI Markup Designer");
    expect(SPECIALISTS.stylist.title).toBe("Style Specialist");
    expect(SPECIALISTS.engineer.title).toBe("Logic Engineer");
    expect(SPECIALISTS.reviewer.title).toBe("Quality Reviewer");
  });

  it("should build autonomous supervisor prompt with strategic delegation rules", () => {
    const prompt = buildSupervisorPrompt(context);
    expect(prompt).toContain("Lead Creative Director and Engineering Supervisor");
    expect(prompt).toContain("delegate_to_designer");
    expect(prompt).toContain("delegate_to_stylist");
    expect(prompt).toContain("delegate_to_engineer");
    expect(prompt).toContain("delegate_to_reviewer");
    expect(prompt).toContain("inspect_workspace");
    expect(prompt).toContain("Quality Standard");
  });
});
