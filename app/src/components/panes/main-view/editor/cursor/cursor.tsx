import css from "./cursor.module.css";
import { useEffect, useState } from "react";
import { useTheme, type Coordinates } from "@codepp/hooks";

interface CursorProps {
  cursorPos: Coordinates;
}

export default function Cursor({ cursorPos }: CursorProps) {
  const theme = useTheme();
  const [cursorDisplay, setCursorDisplay] = useState<string>("block");

  useEffect(() => {
    const cursorAnimation = setInterval(() => {
      setCursorDisplay((prev) => (prev === "block" ? "none" : "block"));
    }, 500);

    return () => clearInterval(cursorAnimation);
  });

  return (
    <div
      id={css["cursor"]}
      style={{
        display: cursorDisplay,
        left: `${cursorPos.col - 1}ch`,
        top: `calc(${cursorPos.row - 1} * ${theme.fonts.editor.lineHeight})`,
      }}
    ></div>
  );
}
