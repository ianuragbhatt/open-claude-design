import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { getWorkspaceStorage } from "@/lib/workspace";
import { IFRAME_BRIDGE_SCRIPT } from "@/lib/iframe-bridge";

export const runtime = "nodejs";

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".htm": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ projectId: string; path: string[] }> }
) {
  try {
    const { projectId, path: pathSegments } = await context.params;
    if (!projectId) {
      return new NextResponse("Project ID is required", { status: 400 });
    }

    const relativePath = pathSegments && pathSegments.length > 0 ? pathSegments.join("/") : "index.html";
    const storage = getWorkspaceStorage();

    // Ensure project is initialized
    const exists = await storage.fileExists(projectId, relativePath);
    if (!exists) {
      if (relativePath === "index.html") {
        await storage.ensureProject(projectId);
      } else {
        return new NextResponse(`File not found: ${relativePath}`, { status: 404 });
      }
    }

    const ext = path.extname(relativePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "text/plain; charset=utf-8";

    let content = await storage.readFile(projectId, relativePath);

    // If serving HTML, inject the interactive bridge before closing body or head
    if (ext === ".html" || ext === ".htm") {
      const bridgeTag = IFRAME_BRIDGE_SCRIPT;
      if (content.includes("</body>")) {
        content = content.replace("</body>", `${bridgeTag}\n</body>`);
      } else if (content.includes("</html>")) {
        content = content.replace("</html>", `${bridgeTag}\n</html>`);
      } else {
        content = `${content}\n${bridgeTag}`;
      }
    }

    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (err: any) {
    return new NextResponse(`Error serving workspace asset: ${err?.message}`, {
      status: 500,
    });
  }
}
