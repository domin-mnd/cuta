import {
  bold,
  green,
  inverse,
  red,
  type Color,
  yellow,
  blue,
  magenta,
  cyan,
  gray,
} from "colorette";
import { LogLevel } from "@/console";
import { format } from "util";

export function fallback(
  functionToFallback: (...data: any[]) => any,
  data: any[]
): boolean {
  /**
   * Getting path of the caller
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack#description Error.prototype.stack}
   */
  const stackPath = new Error().stack?.split("\n")[2].trim();

  // If the path includes "node_modules" then we should fallback because it is probably a package that runs console.log or functions similar
  const shouldFallback = stackPath?.includes("node_modules") ?? false;
  if (shouldFallback) functionToFallback(...data);

  return shouldFallback;
}

export function level(level: LogLevel): string {
  const colors: Record<LogLevel, Color> = {
    LOG: cyan,
    INFO: green,
    ERROR: red,
    WARN: yellow,
    DEBUG: blue,
    TRACE: magenta,
    COUNT: gray,
  };

  return colors[level](bold(inverse(" " + level + " ")));
}

export function writeln(ll: LogLevel, ...data: any[]): void {
  process[
    [LogLevel.Warn, LogLevel.Error, LogLevel.Trace].includes(ll)
      ? "stderr"
      : "stdout"
  ].write(level(ll) + " " + format(...data) + "\n");
}
