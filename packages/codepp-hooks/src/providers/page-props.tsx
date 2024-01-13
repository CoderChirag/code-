import { createContext } from "react";

export const PagePropsContext = createContext<Record<string, any>>({});
export const PagePropsProvider = PagePropsContext.Provider;
