import fs from "fs/promises";
import path from "path";
import JSZip from "jszip";
import type {
  WorkspaceStorage,
  EditFileResult,
  WorkspaceSnapshot,
} from "./types";
import { getDesignSystem } from "../design-systems";

export class FsWorkspaceStorage implements WorkspaceStorage {
  private baseDir: string;

  constructor(baseDir?: string) {
    this.baseDir =
      baseDir ||
      path.resolve(process.cwd(), "workspaces");
  }

  private getProjectDir(projectId: string): string {
    const cleanId = projectId.replace(/[^a-zA-Z0-9_-]/g, "_");
    return path.join(this.baseDir, cleanId);
  }

  private sanitizePath(projectDir: string, filePath: string): string {
    const cleanRelative = filePath.replace(/^\/+/, "");
    const resolved = path.resolve(projectDir, cleanRelative);
    if (!resolved.startsWith(projectDir)) {
      throw new Error(`Security Violation: Path escapes workspace boundary: ${filePath}`);
    }
    return resolved;
  }

  async fileExists(projectId: string, filePath: string): Promise<boolean> {
    const projectDir = this.getProjectDir(projectId);
    const fullPath = this.sanitizePath(projectDir, filePath);
    try {
      await fs.access(fullPath);
      return true;
    } catch {
      return false;
    }
  }

  async readFile(projectId: string, filePath: string): Promise<string> {
    const projectDir = this.getProjectDir(projectId);
    const fullPath = this.sanitizePath(projectDir, filePath);
    try {
      return await fs.readFile(fullPath, "utf-8");
    } catch (err: any) {
      throw new Error(`File not found: ${filePath} (${err.message})`);
    }
  }

  async writeFile(projectId: string, filePath: string, content: string): Promise<void> {
    const projectDir = this.getProjectDir(projectId);
    const fullPath = this.sanitizePath(projectDir, filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content, "utf-8");
  }

  async editFile(
    projectId: string,
    filePath: string,
    targetSnippet: string,
    replacementSnippet: string
  ): Promise<EditFileResult> {
    const projectDir = this.getProjectDir(projectId);
    const fullPath = this.sanitizePath(projectDir, filePath);

    let content: string;
    try {
      content = await fs.readFile(fullPath, "utf-8");
    } catch (err: any) {
      return {
        success: false,
        error: `File "${filePath}" does not exist. Use write_file to create it first.`,
      };
    }

    if (!content.includes(targetSnippet)) {
      // Normalizing line endings for resilient matching
      const normalizedContent = content.replace(/\r\n/g, "\n");
      const normalizedTarget = targetSnippet.replace(/\r\n/g, "\n");

      if (!normalizedContent.includes(normalizedTarget)) {
        return {
          success: false,
          error: `Target snippet was not found in "${filePath}". Please inspect the file with read_file first and provide the exact matching snippet.`,
        };
      }

      const updated = normalizedContent.replace(normalizedTarget, replacementSnippet);
      await fs.writeFile(fullPath, updated, "utf-8");
      return {
        success: true,
        diffSummary: `Replaced snippet in ${filePath}`,
      };
    }

    const occurrences = content.split(targetSnippet).length - 1;
    if (occurrences > 1) {
      // Replace only the first occurrence
      const updated = content.replace(targetSnippet, replacementSnippet);
      await fs.writeFile(fullPath, updated, "utf-8");
      return {
        success: true,
        diffSummary: `Replaced first of ${occurrences} occurrences in ${filePath}`,
      };
    }

    const updated = content.replace(targetSnippet, replacementSnippet);
    await fs.writeFile(fullPath, updated, "utf-8");
    return {
      success: true,
      diffSummary: `Surgically replaced target snippet in ${filePath}`,
    };
  }

  async listFiles(projectId: string, subDir = ""): Promise<string[]> {
    const projectDir = this.getProjectDir(projectId);
    const targetDir = this.sanitizePath(projectDir, subDir);

    try {
      await fs.access(targetDir);
    } catch {
      return [];
    }

    const files: string[] = [];

    const walk = async (currentDir: string) => {
      const entries = await fs.readdir(currentDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name.startsWith(".") || entry.name === "node_modules") continue;

        const entryPath = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
          await walk(entryPath);
        } else if (entry.isFile()) {
          const relPath = path.relative(projectDir, entryPath);
          files.push(relPath);
        }
      }
    };

    await walk(targetDir);
    return files.sort();
  }

  async deleteFile(projectId: string, filePath: string): Promise<void> {
    const projectDir = this.getProjectDir(projectId);
    const fullPath = this.sanitizePath(projectDir, filePath);
    try {
      await fs.unlink(fullPath);
    } catch {
      // ignore if already gone
    }
  }

  async ensureProject(
    projectId: string,
    brandId = "linear",
    initialHtml?: string
  ): Promise<void> {
    const projectDir = this.getProjectDir(projectId);
    await fs.mkdir(projectDir, { recursive: true });

    const indexPath = path.join(projectDir, "index.html");
    const hasIndex = await this.fileExists(projectId, "index.html");

    if (hasIndex) return;

    if (initialHtml && initialHtml.trim()) {
      await this.writeFile(projectId, "index.html", initialHtml.trim());
      return;
    }

    // Seed project with high-craft brand design contract
    const brand = getDesignSystem(brandId);
    const displayFont = brand.foundations?.typography?.displayFont || "Inter";
    const bodyFont = brand.foundations?.typography?.bodyFont || "Plus Jakarta Sans";

    const seedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Khayal Prototype</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400..600;1,6..72,400..600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="stylesheet" href="styles.css">
</head>
<body class="bg-[var(--canvas)] text-[var(--foreground)] min-h-screen font-sans antialiased">
  <main id="app" class="w-full">
    <!-- Initial Canvas Scaffolding -->
    <header data-khayal-element="nav-header" class="border-b border-[var(--border)] px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 rounded-md bg-[var(--accent)] flex items-center justify-center text-white font-bold text-xs">K</div>
        <span class="font-semibold text-sm tracking-tight">${brand.name} Workspace</span>
      </div>
      <nav class="flex items-center gap-4 text-xs text-[var(--foreground-muted)]">
        <a href="#features" class="hover:text-[var(--foreground)] transition-colors">Features</a>
        <a href="#showcase" class="hover:text-[var(--foreground)] transition-colors">Showcase</a>
        <button class="px-3 py-1.5 rounded-lg bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity">Get Started</button>
      </nav>
    </header>

    <section data-khayal-element="hero-section" class="py-20 px-6 max-w-4xl mx-auto text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--accent)] font-medium mb-6">
        <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
        <span>Ready for your creative brief</span>
      </div>
      <h1 class="text-4xl sm:text-5xl font-bold tracking-tight mb-4 font-display">
        Craft something extraordinary
      </h1>
      <p class="text-sm text-[var(--foreground-muted)] max-w-xl mx-auto mb-8 leading-relaxed">
        Describe the interface, landing page, or dashboard you want to design. The agent will craft components, write responsive styles, and assemble your vision live.
      </p>
    </section>
  </main>

  <script src="script.js"></script>
</body>
</html>`;

    const seedCss = `:root {
  --accent: ${brand.accentColor || "#d97757"};
  --canvas: ${brand.bgDark ? "#0f1115" : "#fafafa"};
  --surface: ${brand.bgDark ? "#1a1d24" : "#ffffff"};
  --foreground: ${brand.bgDark ? "#f3f4f6" : "#111827"};
  --foreground-muted: ${brand.bgDark ? "#9ca3af" : "#6b7280"};
  --border: ${brand.bgDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)"};
  --font-display: "${displayFont}", sans-serif;
  --font-body: "${bodyFont}", sans-serif;
}

body {
  background-color: var(--canvas);
  color: var(--foreground);
  font-family: var(--font-body);
}

.font-display {
  font-family: var(--font-display);
}
`;

    const seedJs = `// Khayal Interactive Bridge
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
`;

    await this.writeFile(projectId, "index.html", seedHtml);
    await this.writeFile(projectId, "styles.css", seedCss);
    await this.writeFile(projectId, "script.js", seedJs);
  }

  async createSnapshot(
    projectId: string,
    versionNumber: number,
    title: string
  ): Promise<string> {
    const projectDir = this.getProjectDir(projectId);
    const snapshotsDir = path.join(projectDir, ".snapshots");
    await fs.mkdir(snapshotsDir, { recursive: true });

    const files = await this.listFiles(projectId);
    const fileMap: Record<string, string> = {};

    for (const file of files) {
      fileMap[file] = await this.readFile(projectId, file);
    }

    const snapshotId = `ver_${versionNumber}_${Date.now()}`;
    const snapshot: WorkspaceSnapshot = {
      id: snapshotId,
      versionNumber,
      title,
      timestamp: Date.now(),
      files: fileMap,
    };

    await fs.writeFile(
      path.join(snapshotsDir, `${snapshotId}.json`),
      JSON.stringify(snapshot, null, 2),
      "utf-8"
    );

    return snapshotId;
  }

  async restoreSnapshot(projectId: string, snapshotId: string): Promise<void> {
    const projectDir = this.getProjectDir(projectId);
    const snapshotPath = path.join(projectDir, ".snapshots", `${snapshotId}.json`);

    const raw = await fs.readFile(snapshotPath, "utf-8");
    const snapshot: WorkspaceSnapshot = JSON.parse(raw);

    for (const [filePath, content] of Object.entries(snapshot.files)) {
      await this.writeFile(projectId, filePath, content);
    }
  }

  async listSnapshots(projectId: string): Promise<WorkspaceSnapshot[]> {
    const projectDir = this.getProjectDir(projectId);
    const snapshotsDir = path.join(projectDir, ".snapshots");
    try {
      const entries = await fs.readdir(snapshotsDir);
      const snapshots: WorkspaceSnapshot[] = [];
      for (const entry of entries) {
        if (entry.endsWith(".json")) {
          const raw = await fs.readFile(path.join(snapshotsDir, entry), "utf-8");
          snapshots.push(JSON.parse(raw));
        }
      }
      return snapshots.sort((a, b) => b.timestamp - a.timestamp);
    } catch {
      return [];
    }
  }

  async exportZip(projectId: string): Promise<Buffer> {
    const zip = new JSZip();
    const files = await this.listFiles(projectId);

    for (const file of files) {
      const content = await this.readFile(projectId, file);
      zip.file(file, content);
    }

    return await zip.generateAsync({ type: "nodebuffer" });
  }
}
