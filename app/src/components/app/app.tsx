import Titlebar from "../titlebar/titlebar";
import css from "./app.module.css";

export default function App() {
  return (
    <div className={css.app}>
      <Titlebar />
    </div>
  );
}
