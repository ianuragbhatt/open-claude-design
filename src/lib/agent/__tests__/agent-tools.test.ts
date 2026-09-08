import { describe, it, expect, beforeEach, afterEach } from "vitest";
import path from "path";
import fs from "fs/promises";
import os from "os";
import { FsWorkspaceStorage } from "../../workspace/fs-storage";
import { setWorkspaceStorage } from "../../workspace";
import { createAgentTools } from "../tools";

describe("Agent Tools", () => {
  let tempDir: string;
  const projectId = "agent_test_proj";
  const mockOptions = { toolCallId: "call_1", messages: [], context: undefined as any };

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "khayal-agent-test-"));
    const storage = new FsWorkspaceStorage(tempDir);
    setWorkspaceStorage(storage);
  });

  afterEach(async () => {
    setWorkspaceStorage(null);
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch {}
  });

  it("should create file using write_file tool", async () => {
    const tools = createAgentTools(projectId);
    // @ts-ignore
    const res: any = await tools.write_file.execute(
      { path: "index.html", content: "<h1>Hello Agent</h1>" },
      mockOptions
    );

    expect(res.success).toBe(true);
    expect(res.path).toBe("index.html");
  });

  it("should perform surgical replacement with edit_file tool", async () => {
    const tools = createAgentTools(projectId);
    // @ts-ignore
    await tools.write_file.execute(
      { path: "index.html", content: "<h1>Old Heading</h1><p>Body</p>" },
      mockOptions
    );

    // @ts-ignore
    const editRes: any = await tools.edit_file.execute(
      {
        path: "index.html",
        target_snippet: "<h1>Old Heading</h1>",
        replacement_snippet: "<h1>Surgical Heading</h1>",
      },
      mockOptions
    );

    expect(editRes.success).toBe(true);

    // @ts-ignore
    const readRes: any = await tools.read_file.execute(
      { path: "index.html" },
      mockOptions
    );
    expect(readRes.content).toContain("<h1>Surgical Heading</h1>");
    expect(readRes.content).toContain("<p>Body</p>");
  });

  it("should list files using list_files tool", async () => {
    const tools = createAgentTools(projectId);
    // @ts-ignore
    await tools.write_file.execute(
      { path: "index.html", content: "HTML" },
      mockOptions
    );
    // @ts-ignore
    await tools.write_file.execute(
      { path: "styles.css", content: "CSS" },
      mockOptions
    );

    // @ts-ignore
    const listRes: any = await tools.list_files.execute(
      {},
      mockOptions
    );
    expect(listRes.success).toBe(true);
    expect(listRes.files).toContain("index.html");
    expect(listRes.files).toContain("styles.css");
  });

  it("should fetch photography and icon assets via fetch_asset tool", async () => {
    const tools = createAgentTools(projectId);
    // @ts-ignore
    const photoRes: any = await tools.fetch_asset.execute(
      { type: "photo", query: "architecture" },
      mockOptions
    );
    expect(photoRes.success).toBe(true);
    expect(photoRes.url).toContain("unsplash.com");

    // @ts-ignore
    const iconRes: any = await tools.fetch_asset.execute(
      { type: "icon", query: "sparkles" },
      mockOptions
    );
    expect(iconRes.success).toBe(true);
    expect(iconRes.iconName).toBe("sparkles");
  });
});
