import { useRef, useState } from "react";
import css from "./solutionbar.module.css";
import { useHorizontalResize } from "@codepp/hooks";

export default function Solutionbar() {
  const { width, cursor, hResizeMouseDownHandler } = useHorizontalResize(250, {
    minWidth: 150,
    maxWidth: 750,
  });

  return (
    <aside style={{ width: `${width}px` }} id={css.solutionbar}>
      <div
        id={css["solutionbar-resizer"]}
        style={{ cursor }}
        onMouseDown={hResizeMouseDownHandler}
      ></div>
    </aside>
  );
}
