import {
  type Dispatch,
  type FC,
  type SetStateAction,
  createContext,
  type PropsWithChildren,
  useState,
} from "react";
import { type VirtualAppState } from "..";

export type SetActionItems = Dispatch<
  SetStateAction<VirtualAppState["actionItems"]>
>;

export type SetTheme = Dispatch<SetStateAction<VirtualAppState["theme"]>>;

interface IVirtualAppContext {
  theme: VirtualAppState["theme"];
  actionItems: VirtualAppState["actionItems"];
  virtualAppState: VirtualAppState;
  setActionItems: SetActionItems;
  setTheme: SetTheme;
}

export const VirtualAppContext = createContext<IVirtualAppContext>(
  {} as IVirtualAppContext
);

interface IProviderProps {
  initialAppState: VirtualAppState;
}

export const VirtualAppProvider: FC<PropsWithChildren<IProviderProps>> = ({
  children,
  initialAppState,
}) => {
  const [appState, setAppState] = useState<VirtualAppState>(initialAppState);

  const theme = appState.theme;
  const actionItems = appState.actionItems;

  const setActionItems: SetActionItems = (value) => {
    if (typeof value === "function")
      setAppState((prev) => ({
        ...prev,
        actionItems: value(prev.actionItems),
      }));
    else setAppState((prev) => ({ ...prev, actionItems: value }));
  };

  const setTheme: SetTheme = (value) => {
    if (typeof value === "function")
      setAppState((prev) => ({ ...prev, theme: value(prev.theme) }));
    else setAppState((prev) => ({ ...prev, theme: value }));
  };

  return (
    <VirtualAppContext.Provider
      value={{
        virtualAppState: appState,
        theme,
        actionItems,
        setActionItems,
        setTheme,
      }}
    >
      {children}
    </VirtualAppContext.Provider>
  );
};
