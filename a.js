const { EventEmitter } = require("events");

const emitter = new EventEmitter();

const a = () => console.log("ab");
const b = () => console.log("b");

emitter.on("a", () => console.log("a"));

// emitter.on("a", b);

emitter.emit("a");

emitter.off("a", () => console.log("a"));

emitter.emit("a");

emitter.off("a", a);

emitter.emit("a");

emitter.on("a", a);

emitter.emit("a");
