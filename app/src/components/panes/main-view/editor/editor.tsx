import css from "./editor.module.css";
import { type MouseEventHandler, useCallback, useEffect } from "react";
import { useEditor } from "@codepp/hooks";
import Cursor from "./cursor/cursor";

export default function Editor() {
  const { content, cursorPos, activeLineNum, setCursorPos } = useEditor([
    { content: "a&nbsp;bcd&nbsp;1234567" },
    { content: "a&nbsp;bcd&nbsp;1234567" },
    { content: "a&nbsp;bcd&nbsp;1234567" },
  ]);

  function handleEditorFocus(e: React.MouseEvent) {
    const row = e.currentTarget.children.length - 1;
    const col =
      document.querySelectorAll<HTMLDivElement>(
        `.${css["editor-line-code-container"]}`
      )[row - 1]?.children.length + 1 || 1;
    setCursorPos({
      row,
      col,
    });
  }

  function handleEditorLineFocus(e: React.MouseEvent) {
    e.stopPropagation();
    const row = parseInt((e.target as HTMLElement).dataset.row as string);
    const col =
      document.querySelectorAll<HTMLDivElement>(
        `.${css["editor-line-code-container"]}`
      )[row - 1]?.children.length + 1 || 1;
    setCursorPos({ row, col });
  }

  const handleEditorSpanFocus: MouseEventHandler = useCallback(
    (e) => {
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

  const handleEditorOutFocus = useCallback(
    (e: MouseEvent) => {
      if (!(e.target as Element)?.closest(`#${css["editor"]}`))
        setCursorPos(null);
    },
    [setCursorPos]
  );

  useEffect(() => {
    document.addEventListener("click", handleEditorOutFocus);

    return () => {
      document.removeEventListener("click", handleEditorOutFocus);
    };
  }, [handleEditorOutFocus]);

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
        <div id={css["editor"]} onClick={handleEditorFocus}>
          {content.map(({ content: line }, lineNum) => (
            <div
              key={lineNum + 1}
              className={`${css["editor-line"]} ${
                activeLineNum === lineNum + 1 ? css["active"] : ""
              }`}
              data-row={lineNum + 1}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={css["editor-line-code-container"]}
                data-row={lineNum + 1}
              >
                {line.split("&nbsp;").map((phrase, phraseInd) =>
                  phraseInd < line.split("&nbsp;").length - 1
                    ? [
                        phrase.split("").map((char, charInd) => (
                          <span
                            key={`${lineNum}_${phraseInd}_${charInd}`}
                            className={css["code"]}
                            data-row={lineNum + 1}
                            onClick={handleEditorSpanFocus}
                          >
                            {char}
                          </span>
                        )),
                        <span
                          key={`${lineNum}_${phraseInd}_space`}
                          className={css["code"]}
                          data-row={lineNum + 1}
                          onClick={handleEditorSpanFocus}
                        >
                          &nbsp;
                        </span>,
                      ]
                    : phrase.split("").map((char, charInd) => (
                        <span
                          key={`${lineNum}_${phraseInd}_${charInd}`}
                          className={css["code"]}
                          data-row={lineNum + 1}
                          onClick={handleEditorSpanFocus}
                        >
                          {char}
                        </span>
                      ))
                )}
              </div>
              <div
                className={css["editor-line-nocode-container"]}
                data-row={lineNum + 1}
                onClick={handleEditorLineFocus}
              ></div>
            </div>
          ))}
          <Cursor cursorPos={cursorPos} />
        </div>
      </div>
    </div>
  );
}
