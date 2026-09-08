import { describe, it, expect } from "vitest";
import { buildAgentSystemPrompt } from "../prompt";

describe("buildAgentSystemPrompt", () => {
  it("includes brand guidance and design contract tokens for named design system", () => {
    const prompt = buildAgentSystemPrompt({ brandId: "modernist" });
    expect(prompt).toContain("Khayal");
    expect(prompt).toContain("write_file");
    expect(prompt).toContain("edit_file");
    expect(prompt).toContain("ACTIVE BRAND DESIGN CONTRACT & CSS TOKENS");
    expect(prompt).toContain("data-khayal-element");
  });

  it("handles freeform / bespoke mode when brandId is freeform or none", () => {
    const prompt = buildAgentSystemPrompt({ brandId: "freeform" });
    expect(prompt).toContain("DESIGN MODE: FREEFORM / BESPOKE");
    expect(prompt).not.toContain("ACTIVE BRAND DESIGN CONTRACT & CSS TOKENS");
  });

  it("prioritizes custom brand guidelines if provided", () => {
    const prompt = buildAgentSystemPrompt({
      brandId: "modernist",
      customBrand: "Brand must use electric purple #8A2BE2 and display heading in Playfair.",
    });
    expect(prompt).toContain("CUSTOM BRAND GUIDELINES");
    expect(prompt).toContain("electric purple #8A2BE2");
  });

  it("injects targeted surgical revision context when element is selected", () => {
    const prompt = buildAgentSystemPrompt({
      brandId: "linear",
      selectedElementContext: {
        elementName: "Hero CTA Button",
        selector: "#hero-button",
        textSnippet: "<button id=\"hero-button\">Get Started</button>",
        filePath: "index.html",
      },
    });
    expect(prompt).toContain("TARGETED SURGICAL REVISION CONTEXT");
    expect(prompt).toContain("Hero CTA Button");
    expect(prompt).toContain("#hero-button");
    expect(prompt).toContain("<button id=\"hero-button\">Get Started</button>");
  });
});
