import { bold, gray } from "ansis";
import { colors, type LogLevel } from "@/level";

export function colorLevel(level: LogLevel): string {
  return colors[level](bold.inverse` ${level} `);
}

export function colorStack(line: string): string {
  const parts = line.trimStart().split(" "); // 3 parts - "at", caller & path
  parts[0] = gray(parts[0]);
  parts[parts.length - 1] = gray(parts[parts.length - 1]);
  return "\n     " + parts.join(" ");
}
