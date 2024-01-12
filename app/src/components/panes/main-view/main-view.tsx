import css from "./main-view.module.css";

import Sidebar from "@/components/panes/main-view/sidebar/sidebar";
import Solutionbar from "@/components/panes/main-view/solutionbar/solutionbar";

export default function MainView() {
  return (
    <main id={css["main-view-container"]}>
      <Sidebar />
      <Solutionbar />
    </main>
  );
}
