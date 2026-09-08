import { describe, it, expect, beforeEach, afterEach } from "vitest";
import path from "path";
import fs from "fs/promises";
import os from "os";
import { FsWorkspaceStorage } from "../../workspace/fs-storage";
import { setWorkspaceStorage } from "../../workspace";
import { runIndependentClientReview, type ClientReviewResult } from "../client-reviewer";

describe("Independent Client Reviewer", () => {
  let tempDir: string;
  const projectId = "client_review_test";

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "khayal-review-test-"));
    const storage = new FsWorkspaceStorage(tempDir);
    setWorkspaceStorage(storage);

    await storage.writeFile(projectId, "index.html", "<!DOCTYPE html><html><body><h1>Budget</h1></body></html>");
    await storage.writeFile(projectId, "styles.css", ":root { --canvas: #000; }");
    await storage.writeFile(projectId, "script.js", "console.log('ready');");
  });

  afterEach(async () => {
    setWorkspaceStorage(null);
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch {}
  });

  it("should have client review structure defined with scores and grades", () => {
    const mockResult: ClientReviewResult = {
      score: 96,
      grade: "A+",
      status: "approved",
      headline: "Outstanding prototype",
      visualPolishVerdict: "Pixel-perfect tokens",
      functionalCompleteness: "All features operational",
      strengths: ["Clean code", "Great tokens"],
      polishNotes: ["Minor spacing adjustment"],
    };

    expect(mockResult.score).toBe(96);
    expect(mockResult.grade).toBe("A+");
    expect(mockResult.status).toBe("approved");
    expect(mockResult.strengths).toHaveLength(2);
  });

  it("should run independent client review on deliverables", async () => {
    const review = await runIndependentClientReview({
      projectId,
      brandId: "linear",
      userPrompt: "Create a modern budgeting application",
      modelOptions: {
        modelId: "anthropic.claude-sonnet-5",
        baseUrl: "https://openai.generative.engine.capgemini.com/v1",
        apiKey: "M9uMcd3fkP1HZgBEU1amb4dXhOpdjvfI5WQuj77x",
      },
    });

    expect(review).toBeDefined();
    expect(typeof review.score).toBe("number");
    expect(review.score).toBeGreaterThanOrEqual(0);
    expect(review.grade).toBeDefined();
    expect(review.status).toBeDefined();
    expect(review.visualPolishVerdict).toBeDefined();
    console.log("Stub Review Output:", review.score, review.grade, review.headline);
  }, 30000);

  it("should audit budget-smart project deliverables with high score", async () => {
    setWorkspaceStorage(new FsWorkspaceStorage(path.resolve(process.cwd(), "workspaces")));

    const review = await runIndependentClientReview({
      projectId: "budget-smart",
      brandId: "linear",
      userPrompt: "Create a modern, complete, and production-grade Budgeting and Savings web application called SmartBudget Vault using the Linear design system.",
      modelOptions: {
        modelId: "anthropic.claude-sonnet-5",
        baseUrl: "https://openai.generative.engine.capgemini.com/v1",
        apiKey: "M9uMcd3fkP1HZgBEU1amb4dXhOpdjvfI5WQuj77x",
      },
    });

    expect(review).toBeDefined();
    expect(review.score).toBeGreaterThanOrEqual(80);
    expect(review.status).toBe("approved");
    console.log("Budget-Smart Real Review Output:", review.score, review.grade, review.headline);
  }, 30000);
});
