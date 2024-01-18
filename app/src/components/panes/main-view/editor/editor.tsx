import css from "./editor.module.css";
import parse from "html-react-parser";
import { useEditor } from "@codepp/hooks";
import Cursor from "./cursor/cursor";

export default function Editor() {
  const { content, cursorPos } = useEditor(
    [
      { content: "a&nbsp;bcd&nbsp;1234567" },
      { content: "a&nbsp;bcd&nbsp;1234567" },
      { content: "a&nbsp;bcd&nbsp;1234567" },
    ],
    { row: 3, col: 4 }
  );
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
            <div key={lineNum + 1} className={css["editor-line"]}>
              {parse(
                line
                  .split("&nbsp;")
                  .map((phrase) =>
                    phrase
                      .split("")
                      .map(
                        (char) =>
                          `<span className=${css["code"]}>${char}</span>`
                      )
                      .join("")
                  )
                  .join(`<span className=${css["code"]}>&nbsp;</span>`)
              )}
            </div>
          ))}
          <Cursor cursorPos={cursorPos} />
        </div>
      </div>
    </div>
  );
}
