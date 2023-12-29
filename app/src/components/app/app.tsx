import { useCallback, useState } from "react";
import Titlebar from "@/components/titlebar/titlebar";
import css from "./app.module.css";
import { useEvent } from "react-use";

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
    </div>
  );
}
