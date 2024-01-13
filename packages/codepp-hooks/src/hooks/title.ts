import { useContext } from "react";
import { VirtualAppContext } from "../providers/virtual-app";

export function useTitle() {
  const { virtualAppState } = useContext(VirtualAppContext);
  return { title: virtualAppState.title };
}
