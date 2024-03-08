import { CutaConsole } from "@/class";
import { init } from "@/fallback";

// Make a copy of console for fallback purposes
init(console);

// Prototype overwrite
globalThis.console = new CutaConsole(process.stdout, process.stderr);
