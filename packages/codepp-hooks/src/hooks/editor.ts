import { type Dispatch, type SetStateAction, useState, useEffect } from "react";

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
  initialCursorPos: Coordinates | null = null
) {
  if (initialContent.length === 0) initialContent = [{ content: "" }];

  const [content, setContent] = useState<Content[]>(initialContent);
  const [cursorPos, setCursorPos] = useState<Coordinates | null>(
    initialCursorPos
  );
  const [activeLineNum, setActiveLineNum] = useState<number | null>(
    initialCursorPos?.row ?? null
  );

  useEffect(() => {
    if (!cursorPos) setActiveLineNum(null);
    else setActiveLineNum(cursorPos.row);
  }, [cursorPos]);

  return { content, cursorPos, activeLineNum, setContent, setCursorPos };
}
