import css from "./titlebar.module.css";

export default function Titlebar() {
  return (
    <div className={css.titlebar}>
      <div className={css["titlebar-left"]}></div>
      <div className={css["titlebar-center"]}></div>
      <div className={css["titlebar-right"]}></div>
    </div>
  );
}
