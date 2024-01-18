import { useRef, useState } from "react";

interface HResizeConfig {
  minWidth?: number;
  maxWidth?: number;
}

type HResizeCursorType = "col-resize" | "e-resize" | "w-resize";

export function useHorizontalResize(
  intialWidth: number,
  config?: HResizeConfig
) {
  const { minWidth, maxWidth } = config || {};
  if (
    (minWidth && intialWidth < minWidth) ||
    (maxWidth && intialWidth > maxWidth)
  )
    intialWidth = minWidth || maxWidth || intialWidth;

  const targetClientX = useRef<number>(0);
  const [width, setWidth] = useState<number>(intialWidth);
  const [cursor, setCursor] = useState<HResizeCursorType>("col-resize");

  function hResizeMouseDownHandler(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    targetClientX.current = e.clientX;
    window.addEventListener("mousemove", resizeStartHandler);
    window.addEventListener("mouseup", resizeEndHandler);
    document.body.addEventListener("mouseleave", resizeEndHandler);
  }

  function resizeStartHandler(e: MouseEvent) {
    const clientX = e.clientX;
    const initialX = targetClientX.current;
    targetClientX.current = clientX;

    setWidth((prev) => calculateNewWidth(prev, clientX, initialX));
  }

  function calculateNewWidth(
    prevWidth: number,
    clientX: number,
    initialX: number
  ) {
    let newWidth = prevWidth + (clientX - initialX);
    setCursor("col-resize");

    if (minWidth && newWidth < minWidth) {
      newWidth = minWidth;
      targetClientX.current = initialX;
      setCursor("e-resize");
    }

    if (maxWidth && newWidth > maxWidth) {
      newWidth = maxWidth;
      targetClientX.current = initialX;
      setCursor("w-resize");
    }

    return newWidth;
  }

  function resizeEndHandler(e: MouseEvent) {
    targetClientX.current = 0;
    window.removeEventListener("mousemove", resizeStartHandler);
    window.removeEventListener("mouseup", resizeEndHandler);
    document.body.removeEventListener("mouseleave", resizeEndHandler);
  }

  return { width, cursor, hResizeMouseDownHandler };
}
