import { EventEmitter } from "node:events";

type EventName =
  | keyof DocumentEventMap
  | keyof WindowEventMap
  | keyof HTMLElementEventMap
  | "off";
type Target = Document | Window | HTMLElement;
type EventHandler = (event: Event) => void;

class VirtualEvent extends EventEmitter {
  static interceptors: Record<EventName, EventHandler[]> = {} as Record<
    EventName,
    EventHandler[]
  >;

  constructor() {
    super();
  }

  emit(
    eventName: EventName,
    event: Event,
    interceptorsAllowed: boolean
  ): boolean;
  emit(eventName: "off", target: Target): boolean;
  emit(
    eventName: EventName,
    event: Event | Target,
    interceptorsAllowed: boolean = true
  ) {
    if (eventName === "off") {
      return super.emit(eventName, event);
    }

    const emitResult = super.emit(eventName, event);

    if (interceptorsAllowed) {
      if (!VirtualEvent.interceptors[eventName]) return emitResult;
      VirtualEvent.interceptors[eventName].forEach((interceptor) => {
        interceptor(event as Event);
      });
    }

    return emitResult;
  }
}

const virtualEvent = new VirtualEvent();

export function useEvent() {
  function addEventListener(
    eventName: EventName,
    target: Target,
    handler: EventHandler,
    interceptorsAllowed: boolean = true
  ) {
    const newHandler = (event: Event) => {
      if (event.target !== target) return;
      handler(event);
    };

    virtualEvent.on(eventName, newHandler);

    const emitHandler = (event: Event) => {
      virtualEvent.emit(eventName, event, interceptorsAllowed);
    };

    const offHandler = (selector: Target) => {
      if (selector !== target) return;
      target.removeEventListener(eventName, emitHandler);
      console.log("removed", eventName, target);
      virtualEvent.off(eventName, newHandler);
      virtualEvent.off("off", offHandler);
    };

    virtualEvent.on("off", offHandler);

    target.addEventListener(eventName, emitHandler);
  }

  function removeEventListener(
    eventName: EventName,
    target: Target,
    handler: EventHandler
  ) {
    virtualEvent.emit("off", target);
  }

  function addInterceptor(eventName: EventName, handler: EventHandler) {
    if (!VirtualEvent.interceptors[eventName])
      VirtualEvent.interceptors[eventName] = [];

    VirtualEvent.interceptors[eventName].push(handler);
  }

  function removeInterceptor(eventName: EventName, handler: EventHandler) {
    if (!VirtualEvent.interceptors[eventName]) return;

    VirtualEvent.interceptors[eventName] = VirtualEvent.interceptors[
      eventName
    ].filter((interceptor) => interceptor !== handler);
  }

  return {
    addEventListener,
    removeEventListener,
    addInterceptor,
    removeInterceptor,
  };
}
