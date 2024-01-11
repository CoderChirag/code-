import css from "./main-view.module.css";

import Sidebar from "@/components/panes/main-view/sidebar/sidebar";

export default function MainView() {
  return (
    <main className={css["main-view-container"]}>
      <Sidebar />
    </main>
  );
}
