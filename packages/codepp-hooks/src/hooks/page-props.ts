import { useContext } from "react";
import { PagePropsContext } from "../providers/page-props";

export function usePageProps() {
  return useContext(PagePropsContext);
}
