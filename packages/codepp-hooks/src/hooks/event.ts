type Target = Element | HTMLElement | Window | Document;

type TEventMapKeys<T> = T extends HTMLElement
  ? keyof HTMLElementEventMap
  : T extends Element
    ? keyof ElementEventMap
    : T extends Window
      ? keyof WindowEventMap
      : keyof DocumentEventMap;

class VirtualDOMEventEmitter {
  #events: Record<
    TEventMapKeys<Target>,
    { handler: EventListener; emitHandler: EventListener; target: Target }[]
  >;
  #globalEvents: Record<TEventMapKeys<Target>, EventListener[]>;

  constructor() {
    this.#events = {} as Record<
      TEventMapKeys<Target>,
      { handler: EventListener; emitHandler: EventListener; target: Target }[]
    >;
    this.#globalEvents = {} as Record<TEventMapKeys<Target>, EventListener[]>;
  }

  public addEventListener: <T extends Target>(
    target: T,
    eventName: TEventMapKeys<T>,
    handler: EventListener
  ) => void = (target, eventName, handler) => {
    if (!this.#events[eventName]) this.#events[eventName] = [];
    if (
      this.#events[eventName].findIndex(
        (item) => item.target === target && item.handler === handler
      ) !== -1
    )
      return;

    const emitHandler = (event: Event) => {
      this.emit(eventName, target, event, handler);
    };
    this.#events[eventName].push({ handler, emitHandler, target });
    target.addEventListener(eventName, emitHandler);
  };

  removeEventListener: <T extends Target>(
    target: T,
    eventName: TEventMapKeys<T>,
    handler: EventListener
  ) => void = (target, eventName, handler) => {
    if (!this.#events[eventName]) return;

    const { emitHandler } =
      this.#events[eventName].find(
        (item) => item.target === target && item.handler === handler
      ) || {};

    this.#events[eventName] = this.#events[eventName].filter(
      (item) => item.target !== target && item.handler !== handler
    );

    if (emitHandler) target.removeEventListener(eventName, emitHandler);
  };

  emit<T extends Target>(
    eventName: TEventMapKeys<T>,
    target: T,
    event: Event,
    handler: EventListener
  ): void {
    if (!this.#events[eventName]) return;

    this.#events[eventName]
      .filter((item) => item.target === target && item.handler === handler)
      .forEach(({ handler }) => handler(event));

    this.#globalEvents?.[eventName]?.forEach((handler) => handler(event));
  }

  addGlobalEventListener: (
    eventName: TEventMapKeys<Target>,
    handler: EventListener
  ) => void = (eventName, handler) => {
    if (!this.#globalEvents[eventName]) this.#globalEvents[eventName] = [];

    if (this.#globalEvents[eventName].includes(handler)) return;

    this.#globalEvents[eventName].push(handler);
  };

  removeGlobalEventListener: (
    eventName: TEventMapKeys<Target>,
    handler: EventListener
  ) => void = (eventName, handler) => {
    if (!this.#globalEvents[eventName]) return;

    this.#globalEvents[eventName] = this.#globalEvents[eventName].filter(
      (item) => item !== handler
    );
  };
}

let virtualDOMEventEmitter: VirtualDOMEventEmitter;

export function useEvent() {
  if (!virtualDOMEventEmitter)
    virtualDOMEventEmitter = new VirtualDOMEventEmitter();

  const {
    addEventListener,
    removeEventListener,
    addGlobalEventListener,
    removeGlobalEventListener,
  } = virtualDOMEventEmitter;

  return {
    addEventListener,
    removeEventListener,
    addGlobalEventListener,
    removeGlobalEventListener,
  };
}
