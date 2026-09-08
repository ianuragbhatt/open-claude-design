export interface QuestionOption {
  id: string;
  label: string;
}

export interface QuestionForm {
  id: string;
  question: string;
  options: QuestionOption[];
}

export interface ParsedArtifact {
  id: string;
  title: string;
  type: string;
  html: string;
  isComplete: boolean;
}

export interface ParsedStreamResult {
  text: string;
  thinking?: string;
  isThinking?: boolean;
  questionForm: QuestionForm | null;
  artifact: ParsedArtifact | null;
}

export function parseStreamContent(content: string): ParsedStreamResult {
  let text = content;
  let thinking = "";
  let isThinking = false;
  let questionForm: QuestionForm | null = null;
  let artifact: ParsedArtifact | null = null;

  // 1. Check for <think>...</think>
  const thinkStartIdx = text.indexOf("<think>");
  if (thinkStartIdx !== -1) {
    const thinkEndIdx = text.indexOf("</think>", thinkStartIdx);
    if (thinkEndIdx !== -1) {
      thinking = text.slice(thinkStartIdx + 7, thinkEndIdx).trim();
      text = (text.slice(0, thinkStartIdx) + "\n" + text.slice(thinkEndIdx + 8)).trim();
      isThinking = false;
    } else {
      thinking = text.slice(thinkStartIdx + 7).trim();
      text = text.slice(0, thinkStartIdx).trim();
      isThinking = true;
    }
  }

  // 2. Check for <question-form>
  const qFormMatch = text.match(/<question-form\s+id="([^"]*)"\s+question="([^"]*)">([\s\S]*?)<\/question-form>/i);
  if (qFormMatch) {
    const [fullMatch, qId, questionText, optionsContent] = qFormMatch;
    const optionMatches = optionsContent.matchAll(/<option\s+id="([^"]*)"\s+label="([^"]*)"\s*\/>/gi);
    const options: QuestionOption[] = [];
    for (const opt of optionMatches) {
      options.push({ id: opt[1], label: opt[2] });
    }
    questionForm = {
      id: qId || "q1",
      question: questionText,
      options,
    };
    text = text.replace(fullMatch, "").trim();
  }

  // 2. Check for <artifact>
  const artifactStartIdx = text.indexOf("<artifact");
  if (artifactStartIdx !== -1) {
    const beforeArtifact = text.slice(0, artifactStartIdx).trim();
    const artifactSub = text.slice(artifactStartIdx);

    const tagEndIdx = artifactSub.indexOf(">");
    if (tagEndIdx !== -1) {
      const openTag = artifactSub.slice(0, tagEndIdx + 1);
      const idMatch = openTag.match(/id="([^"]*)"/i);
      const titleMatch = openTag.match(/title="([^"]*)"/i);
      const typeMatch = openTag.match(/type="([^"]*)"/i);

      const id = idMatch ? idMatch[1] : "deliverable";
      const title = titleMatch ? titleMatch[1] : "Design Deliverable";
      const type = typeMatch ? typeMatch[1] : "html";

      const bodyStartIndex = tagEndIdx + 1;
      const closeTagIdx = artifactSub.indexOf("</artifact>");

      let html = "";
      let isComplete = false;

      if (closeTagIdx !== -1) {
        html = artifactSub.slice(bodyStartIndex, closeTagIdx).trim();
        isComplete = true;
        const afterArtifact = artifactSub.slice(closeTagIdx + "</artifact>".length).trim();
        text = [beforeArtifact, afterArtifact].filter(Boolean).join("\n\n");
      } else {
        html = artifactSub.slice(bodyStartIndex).trim();
        isComplete = false;
        text = beforeArtifact;
      }

      // Clean any accidental markdown code fences inside artifact body
      html = html.replace(/^```html\s*/i, "").replace(/```\s*$/i, "");

      artifact = {
        id,
        title,
        type,
        html,
        isComplete,
      };
    }
  }

  return {
    text,
    thinking: thinking || undefined,
    isThinking,
    questionForm,
    artifact,
  };
}
