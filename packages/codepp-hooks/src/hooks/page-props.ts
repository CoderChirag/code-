import { createContext, useContext } from "react";

const PagePropsContext = createContext<Record<string, any>>({});
export const PagePropsProvider = PagePropsContext.Provider;

export function usePageProps() {
  return useContext(PagePropsContext);
}
