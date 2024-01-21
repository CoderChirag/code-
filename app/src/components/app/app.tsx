import css from "./app.module.css";

import { useCallback, useEffect, useState } from "react";

import Titlebar from "@/components/panes/titlebar/titlebar";
import Statusbar from "@/components/panes/statusbar/statusbar";
import MainView from "@/components/panes/main-view/main-view";

export default function App() {
  const [windowActive, setWindowActive] = useState(true);

  const handleWindowActive = useCallback((e: Event) => {
    setWindowActive(true);
  }, []);

  const handleWindowInActive = useCallback((e: Event) => {
    setWindowActive(false);
  }, []);

  useEffect(() => {
    window.addEventListener("blur", handleWindowInActive);
    window.addEventListener("focus", handleWindowActive);
    return () => {
      window.removeEventListener("blur", handleWindowInActive);
      window.removeEventListener("focus", handleWindowActive);
    };
  }, [handleWindowActive, handleWindowInActive]);

  // useEvent("blur", handleWindowActive.bind(null, false));
  // useEvent("focus", handleWindowActive.bind(null, true));

  return (
    <div className={`${css.app}`}>
      <Titlebar windowActive={windowActive} />
      <MainView />
      <Statusbar />
    </div>
  );
}
