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

    const zipBuffer = await storage.exportZip(projectId);
    const slug = projectId.replace(/[^a-zA-Z0-9_-]/g, "_");

    return new NextResponse(new Uint8Array(zipBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${slug}.zip"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (err: any) {
    return new NextResponse(`Export failed: ${err?.message}`, { status: 500 });
  }
}
