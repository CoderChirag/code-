import css from "./app.module.css";

import { useCallback, useState } from "react";
import { useEvent } from "react-use";

import Titlebar from "@/components/panes/titlebar/titlebar";
import Statusbar from "@/components/panes/statusbar/statusbar";
import MainView from "@/components/panes/main-view/main-view";

export default function App() {
  const [windowActive, setWindowActive] = useState(true);

  const handleWindowActive = useCallback((isActive: boolean) => {
    setWindowActive(isActive);
  }, []);

  useEvent("blur", handleWindowActive.bind(null, false));
  useEvent("focus", handleWindowActive.bind(null, true));

  return (
    <div className={`${css.app}`}>
      <Titlebar windowActive={windowActive} />
      <MainView />
      <Statusbar />
    </div>
  );
}
