import TitleWindow from "@/components/title-window/title-window";
import css from "./titlebar.module.css";

interface TitlebarProps {
  windowActive: boolean;
}

export default function Titlebar({windowActive}: TitlebarProps) {
  return (
    <div className={`${css.titlebar}`}>
      <div className={css["titlebar-left"]}></div>
      <div className={css["titlebar-center"]}>
        <TitleWindow title="CODE++" windowActive={windowActive} />
      </div>
      <div className={css["titlebar-right"]}></div>
    </div>
  );
}
