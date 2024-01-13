import {
  default as React,
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

interface IVirtualAppContext {
  virtualAppState: VirtualAppState;
  setActionItems: SetActionItems;
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

  const setActionItems: SetActionItems = (value) => {
    if (typeof value === "function")
      setAppState((prev) => ({
        ...prev,
        actionItems: value(prev.actionItems),
      }));
    else setAppState((prev) => ({ ...prev, actionItems: value }));
  };

  return (
    <VirtualAppContext.Provider
      value={{ virtualAppState: appState, setActionItems }}
    >
      {children}
    </VirtualAppContext.Provider>
  );
};
