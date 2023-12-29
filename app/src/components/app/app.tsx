import css from "./app.module.css";

import { useCallback, useState } from "react";
import { useEvent } from "react-use";

import Titlebar from "@/components/titlebar/titlebar";
import Statusbar from "@/components/statusbar/statusbar";
import SplitView from "@/components/split-view/split-view";

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
      <SplitView />
      <Statusbar />
    </div>
  );
}
