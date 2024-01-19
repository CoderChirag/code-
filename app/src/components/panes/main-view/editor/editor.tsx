import css from "./editor.module.css";
import { useCallback, useEffect } from "react";
import parse from "html-react-parser";
import { useEditor } from "@codepp/hooks";
import Cursor from "./cursor/cursor";

export default function Editor() {
  const { content, cursorPos, activeLineNum, setCursorPos } = useEditor([
    { content: "a&nbsp;bcd&nbsp;1234567" },
    { content: "a&nbsp;bcd&nbsp;1234567" },
    { content: "a&nbsp;bcd&nbsp;1234567" },
  ]);

  function handleEditorLineFocus(e: React.MouseEvent) {
    const col = (e.target as HTMLElement).children.length + 1;
    const row = parseInt((e.target as HTMLElement).dataset.row as string);
    setCursorPos({ row, col });
  }

  const handleEditorSpanFocus = useCallback(
    (e: MouseEvent) => {
      e.stopPropagation();
      const target = e.target as HTMLElement;
      const targetRect = target.getBoundingClientRect();
      const row = parseInt(target.dataset.row as string);
      let col = Array.from(target.parentElement!.children).indexOf(target) + 1;

      if (e.clientX > (targetRect.left + targetRect.right) / 2) {
        col++;
      }
      setCursorPos({ row, col });
    },
    [setCursorPos]
  );

  useEffect(() => {
    console.log("editor use effect running");
    const selectors = document.querySelectorAll(`.${css["code"]}`)!;

    selectors.forEach((selector) => {
      selector.removeEventListener(
        "click",
        handleEditorSpanFocus as (e: Event) => void
      );
      selector.addEventListener(
        "click",
        handleEditorSpanFocus as (e: Event) => void
      );
    });

    return () =>
      selectors.forEach((selector) =>
        selector.removeEventListener(
          "click",
          handleEditorSpanFocus as (e: Event) => void
        )
      );
  }, [content, handleEditorSpanFocus]);

  return (
    <div id={css["editor-container-outer"]}>
      <div id={css["editor-container-inner"]}>
        <div id={css["line-number-container"]}>
          {content.map((line, lineNum) => (
            <div key={lineNum + 1} className={css["line-number"]}>
              {lineNum + 1}
            </div>
          ))}
        </div>
        <div id={css["editor"]}>
          {content.map(({ content: line }, lineNum) => (
            <div
              key={lineNum + 1}
              className={`${css["editor-line"]} ${
                activeLineNum === lineNum + 1 ? css["active"] : ""
              }`}
              onClick={handleEditorLineFocus}
              data-row={lineNum + 1}
            >
              {parse(
                line
                  .split("&nbsp;")
                  .map((phrase) =>
                    phrase
                      .split("")
                      .map(
                        (char) =>
                          `<span className=${css["code"]} data-row="${
                            lineNum + 1
                          }" >${char}</span>`
                      )
                      .join("")
                  )
                  .join(
                    `<span className=${css["code"]} data-row="${
                      lineNum + 1
                    }">&nbsp;</span>`
                  )
              )}
            </div>
          ))}
          <Cursor cursorPos={cursorPos} />
        </div>
      </div>
    </div>
  );
}
