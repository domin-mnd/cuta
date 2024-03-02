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
  white,
  black,
  redBright,
} from "colorette";
import { LogLevel } from "@/console";

const colors: Record<LogLevel, Color> = {
  LOG: cyan,
  INFO: green,
  ERROR: red,
  WARN: yellow,
  DEBUG: blue,
  TRACE: magenta,
  COUNT: gray,
  TIMER: white,
  DIR: black,
  DIRXML: black,
  GROUP: redBright,
};

export function colorLevel(level: LogLevel): string {
  return colors[level](bold(inverse(" " + level + " ")));
}

export function colorStack(line: string): string {
  const parts = line.trimStart().split(" "); // 3 parts - "at", caller & path
  parts[0] = gray(parts[0]);
  parts[parts.length - 1] = gray(parts[parts.length - 1]);
  return "\n\t" + parts.join(" ");
}
