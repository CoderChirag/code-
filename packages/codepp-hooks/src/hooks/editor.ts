import { useState } from "react";

export interface Coordinates {
  row: number;
  col: number;
}

interface Content {
  metaData?: Record<string, any>;
  content: string;
}

export function useEditor(
  initialContent: Content[] = [{ content: "" }],
  initialCursorPos: Coordinates = { row: 1, col: 1 }
) {
  if (initialContent.length === 0) initialContent = [{ content: "" }];

  const [content, setContent] = useState<Content[]>(initialContent);
  const [cursorPos, setCursorPos] = useState<Coordinates>(initialCursorPos);

  return { content, cursorPos, setContent, setCursorPos };
}
