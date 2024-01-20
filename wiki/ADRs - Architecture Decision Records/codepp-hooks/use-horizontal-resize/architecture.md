# `useHorizontalResize()`

## Introduction

This is a custom hook provided by `@codepp/hooks`, to implement the functionality of **Horizontal Resizer**.

## Objective of the Hook

The hook should provide capability to any `div` element to resize the width of any **UI Component**.

## Implementation

- The hook is defined as:

  ```tsx
  interface HResizeConfig {
    minWidth?: number;
    maxWidth?: number;
  }
  type HResizeCursorType = "col-resize" | "e-resize" | "w-resize";

  function useHorizontalResize(
    intialWidth: number,
    config?: HResizeConfig
  ): {
    width: number;
    cursor: HResizeCursorType;
    hResizeMouseDownHandler: (e: React.MouseEvent<HTMLElement>) => void;
  };
  ```

  <br>

### Integration

- For using this, user have to provide `initialWidth`, and `config`, as shown above.
  <br>
- The `width` property returned by the hook, should be passed as style parameter to the **UI Component** which should **resizable**
  <br>
- The `cursor`, property returned, should be passed as style parameter to the `div`, which should become **horizontally draggable.**
  <br>
- The `hResizeMouseDownHandler`, should be passed to the `handleMouseDown` event of the `div`, which should become **horizontally draggable.**

### Breakdown of implementation by the Hook

- It maintains **2 states and 1 ref**:
  - `width`: The current width of the Component. Initialized to `initialWidth`.
    <br>
  - `cursor`: The current cursor type. Initialized by `"col-resize"`.
    <br>
  - `ref: targetClientX`: Stores the **X-Coordinate** of the draggable div. Initialized by `0`.
    <br>
- The hook starts its functionality, whenever the mouse button is pressed on the **resizable div** (`mouseDown` event triggered):

  - Firstly, it stores the current **X-Coordinate** to the `targetClientX`.
    <br>
  - Then it just adds 3 new `eventListeners`:
    `tsx
window.addEventListener("mousemove", resizeStartHandler);
window.addEventListener("mouseup", resizeEndHandler);
document.body.addEventListener("mouseleave", resizeEndHandler);
`
    <br>

- Now, whenever mouse is moved (mouse click button is still down), it triggers `mousemove` event, which does the following:

  ```tsx
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
  ```

  <br>

- Whenever, mouse click button is unpressed or mouse cursor leaves the DOM document body, `mouseup` and `mouseleave` events are triggered respectively, which sets the `targetClientX` ref to `0`, and clears out all 3 events (`mousemove`, `mouseup` and `mouseleave`), as the drag is now completed.
