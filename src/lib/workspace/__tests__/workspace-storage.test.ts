import { describe, it, expect, beforeEach, afterEach } from "vitest";
import path from "path";
import fs from "fs/promises";
import os from "os";
import { FsWorkspaceStorage } from "../fs-storage";

describe("FsWorkspaceStorage", () => {
  let tempDir: string;
  let storage: FsWorkspaceStorage;
  const testProjectId = "test_project_123";

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "khayal-test-"));
    storage = new FsWorkspaceStorage(tempDir);
  });

  afterEach(async () => {
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch {}
  });

  it("should write and read files in workspace", async () => {
    await storage.writeFile(testProjectId, "index.html", "<h1>Hello Khayal</h1>");
    const content = await storage.readFile(testProjectId, "index.html");
    expect(content).toBe("<h1>Hello Khayal</h1>");
  });

  it("should write files in subdirectories automatically creating folders", async () => {
    await storage.writeFile(testProjectId, "src/components/button.html", "<button>Click</button>");
    const content = await storage.readFile(testProjectId, "src/components/button.html");
    expect(content).toBe("<button>Click</button>");
  });

  it("should surgically edit files using targetSnippet and replacementSnippet", async () => {
    const original = `<header>
  <h1>Old Title</h1>
  <button class="bg-blue-500">Submit</button>
</header>`;
    await storage.writeFile(testProjectId, "index.html", original);

    const result = await storage.editFile(
      testProjectId,
      "index.html",
      "<h1>Old Title</h1>",
      "<h1>New Modern Title</h1>"
    );

    expect(result.success).toBe(true);
    const updated = await storage.readFile(testProjectId, "index.html");
    expect(updated).toContain("<h1>New Modern Title</h1>");
    expect(updated).toContain('<button class="bg-blue-500">Submit</button>');
  });

  it("should return helpful error if target snippet does not exist", async () => {
    await storage.writeFile(testProjectId, "index.html", "<h1>Title</h1>");
    const result = await storage.editFile(
      testProjectId,
      "index.html",
      "<h2>Nonexistent</h2>",
      "<h2>New</h2>"
    );

    expect(result.success).toBe(false);
    expect(result.error).toContain("Target snippet was not found");
  });

  it("should prevent directory traversal attacks outside workspace", async () => {
    await expect(
      storage.writeFile(testProjectId, "../../../etc/evil.txt", "evil")
    ).rejects.toThrow(/Security Violation/);

    await expect(
      storage.readFile(testProjectId, "../../secret.txt")
    ).rejects.toThrow(/Security Violation/);
  });

  it("should initialize project with seed files and brand tokens", async () => {
    await storage.ensureProject(testProjectId, "linear");
    const files = await storage.listFiles(testProjectId);

    expect(files).toContain("index.html");
    expect(files).toContain("styles.css");
    expect(files).toContain("script.js");

    const css = await storage.readFile(testProjectId, "styles.css");
    expect(css).toContain("--accent");
    expect(css).toContain("--canvas");

    const html = await storage.readFile(testProjectId, "index.html");
    expect(html).toContain("Linear Workspace");
  });

  it("should create and restore workspace snapshots", async () => {
    await storage.writeFile(testProjectId, "index.html", "Version 1");
    const snapshotId = await storage.createSnapshot(testProjectId, 1, "V1 Initial");

    // Modify file
    await storage.writeFile(testProjectId, "index.html", "Version 2 modified");
    expect(await storage.readFile(testProjectId, "index.html")).toBe("Version 2 modified");

    // Restore V1
    await storage.restoreSnapshot(testProjectId, snapshotId);
    expect(await storage.readFile(testProjectId, "index.html")).toBe("Version 1");
  });

  it("should export workspace as a valid zip buffer", async () => {
    await storage.writeFile(testProjectId, "index.html", "<h1>Test</h1>");
    await storage.writeFile(testProjectId, "styles.css", "body { color: red; }");

    const zipBuffer = await storage.exportZip(testProjectId);
    expect(zipBuffer).toBeInstanceOf(Buffer);
    expect(zipBuffer.length).toBeGreaterThan(100);
  });
});
