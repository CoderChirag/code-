import css from "./split-view.module.css";

import Sidebar from "@/components/sidebar/sidebar";

export default function SplitView() {
  return (
    <main className={css["split-view-container"]}>
      <Sidebar />
    </main>
  );
}
