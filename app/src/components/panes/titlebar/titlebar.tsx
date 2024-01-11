import css from "./titlebar.module.css";

import TitleWindow from "@/components/panes/titlebar/title-window/title-window";

interface TitlebarProps {
  windowActive: boolean;
}

export default function Titlebar({ windowActive }: TitlebarProps) {
  return (
    <header className={`${css.titlebar}`}>
      <div className={css["titlebar-left"]}></div>
      <div className={css["titlebar-center"]}>
        <TitleWindow title="CODE++" windowActive={windowActive} />
      </div>
      <div className={css["titlebar-right"]}></div>
    </header>
  );
}
