import css from "./main-view.module.css";

import Sidebar from "@/components/panes/main-view/sidebar/sidebar";
import Solutionbar from "@/components/panes/main-view/solutionbar/solutionbar";
import EditorGroup from "./editor-group/editor-group";
import Editor from "./editor/editor";

export default function MainView() {
  return (
    <main id={css["main-view-container"]}>
      <Sidebar />
      <Solutionbar />
      <main id={css["editor-container"]}>
        <EditorGroup />
        <Editor />
      </main>
    </main>
  );
}
