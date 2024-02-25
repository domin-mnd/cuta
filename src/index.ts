import { AttributeConsole } from "@/console";

// Make a copy of console for fallback purposes
export const fall = Object.assign({}, console);

// Prototype overwrite
globalThis.console = new AttributeConsole();
