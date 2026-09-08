import { describe, it, expect } from "vitest";
import { IFRAME_BRIDGE_SCRIPT, injectBridgeIntoHtml } from "@/lib/iframe-bridge";

describe("Iframe Inspector Bridge & Click-to-Edit Contract", () => {
  it("should have a valid bridge script with single script container", () => {
    expect(IFRAME_BRIDGE_SCRIPT).toContain('<script id="khayal-bridge">');
    expect(IFRAME_BRIDGE_SCRIPT.trim().endsWith("</script>")).toBe(true);

    // Verify no illegal nested script open tags that cause syntax error: Unexpected token '<'
    const occurrences = (IFRAME_BRIDGE_SCRIPT.match(/<script/g) || []).length;
    expect(occurrences).toBe(1);
  });

  it("should contain inspect mode event listeners and cursor styles", () => {
    expect(IFRAME_BRIDGE_SCRIPT).toContain("body.khayal-inspect-active");
    expect(IFRAME_BRIDGE_SCRIPT).toContain("cursor: crosshair");
    expect(IFRAME_BRIDGE_SCRIPT).toContain(".khayal-inspect-hover");
    expect(IFRAME_BRIDGE_SCRIPT).toContain(".khayal-inspect-selected");
    expect(IFRAME_BRIDGE_SCRIPT).toContain("SET_MODE");
    expect(IFRAME_BRIDGE_SCRIPT).toContain("ELEMENT_SELECTED");
  });

  it("should inject bridge into complete HTML document properly", () => {
    const raw = `<!DOCTYPE html>
<html>
<head><title>App</title></head>
<body>
  <div class="card" data-khayal-element="card-1">Hello World</div>
</body>
</html>`;

    const injected = injectBridgeIntoHtml(raw);
    expect(injected).toContain('id="khayal-bridge"');
    expect(injected).toContain("</html>");
    // Ensure no duplicate injection if run twice
    const doubleInjected = injectBridgeIntoHtml(injected);
    const scriptTags = (doubleInjected.match(/<script id="khayal-bridge">/g) || []).length;
    expect(scriptTags).toBe(1);
  });

  it("should wrap HTML fragments with boilerplate and bridge", () => {
    const fragment = `<div class="p-4 bg-red-500">Fragment Content</div>`;
    const injected = injectBridgeIntoHtml(fragment);

    expect(injected).toContain("<!DOCTYPE html>");
    expect(injected).toContain("cdn.tailwindcss.com");
    expect(injected).toContain('id="khayal-bridge"');
  });

  it("should support element hierarchy resolution keywords", () => {
    // Check that target semantic elements are covered in the bridge
    const targetTags = ["button", "a", "header", "nav", "section", "aside", "main", "footer"];
    for (const tag of targetTags) {
      expect(IFRAME_BRIDGE_SCRIPT).toContain(`'${tag}'`);
    }
  });
});
