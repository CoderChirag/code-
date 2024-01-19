import css from "./cursor.module.css";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useTheme, type Coordinates } from "@codepp/hooks";

interface CursorProps {
  cursorPos: Coordinates | null;
}

export default function Cursor({ cursorPos }: CursorProps) {
  const theme = useTheme();
  const [cursorDisplay, setCursorDisplay] = useState<string>("block");
  const cursorAnimationRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log("cursor use effect running");
    if (cursorAnimationRef.current) {
      clearInterval(cursorAnimationRef.current);
      setCursorDisplay("block"); // setInterval would be deferred by 500ms, this setState would set display to block immediately, and thus no lag would be visible while changing cursor position
      cursorAnimationRef.current = null;
    }

    if (!cursorPos) return;

    cursorAnimationRef.current = setInterval(() => {
      setCursorDisplay((prev) => (prev === "block" ? "none" : "block"));
    }, 500);

    return () => {
      if (cursorAnimationRef.current) clearInterval(cursorAnimationRef.current);
    };
  }, [cursorPos]);

  return (
    <div
      id={css["cursor"]}
      style={{
        display: cursorPos ? cursorDisplay : "none",
        left: cursorPos ? `${cursorPos.col - 1}ch` : 0,
        top: cursorPos
          ? `calc(${cursorPos.row - 1} * ${theme.fonts.editor.lineHeight})`
          : 0,
      }}
    ></div>
  );
}
