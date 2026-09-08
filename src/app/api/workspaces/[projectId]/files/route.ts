import { NextRequest, NextResponse } from "next/server";
import { getWorkspaceStorage } from "@/lib/workspace";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await context.params;
    if (!projectId) {
      return new NextResponse("Project ID is required", { status: 400 });
    }

    const storage = getWorkspaceStorage();
    await storage.ensureProject(projectId);

    const searchParams = req.nextUrl.searchParams;
    const requestedPath = searchParams.get("path");

    if (requestedPath) {
      const exists = await storage.fileExists(projectId, requestedPath);
      if (!exists) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
      }
      const content = await storage.readFile(projectId, requestedPath);
      return NextResponse.json({ path: requestedPath, content });
    }

    const files = await storage.listFiles(projectId);
    const fileContents: Record<string, string> = {};

    for (const file of files) {
      // Only include text files for code viewer
      if (file.match(/\.(html|css|js|json|svg|md|txt)$/i)) {
        fileContents[file] = await storage.readFile(projectId, file);
      }
    }

    return NextResponse.json({
      projectId,
      files,
      fileContents,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}
