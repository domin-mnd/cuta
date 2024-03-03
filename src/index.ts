import { NewConsole } from "@/console";
import { init } from "@/fallback";

// Make a copy of console for fallback purposes
init(console);

// Prototype overwrite
globalThis.console = new NewConsole();
