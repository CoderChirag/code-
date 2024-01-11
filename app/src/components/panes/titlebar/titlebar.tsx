import css from "./titlebar.module.css";

import TitleWindow from "@/components/panes/titlebar/title-window/title-window";

interface TitlebarProps {
  windowActive: boolean;
}

export default function Titlebar({ windowActive }: TitlebarProps) {
  return (
    <header id={css.titlebar}>
      <div id={css["titlebar-left"]}></div>
      <div id={css["titlebar-center"]}>
        <TitleWindow title="CODE++" windowActive={windowActive} />
      </div>
      <div id={css["titlebar-right"]}></div>
    </header>
  );
}
