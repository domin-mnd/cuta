import { format } from "util";
import { LogLevel } from "@/console";
import { colorLevel } from "@/color";
import { indent } from "@/indent";

export function validateString(data: string): string {
  return data
    .split("\n")
    .map((line, index) => index ? indent() + line : line)
    .join("\n");
}

export function stdType(ll: LogLevel): "stderr" | "stdout" {
  return [LogLevel.Warn, LogLevel.Error, LogLevel.Trace].includes(ll)
    ? "stderr"
    : "stdout";
}

interface Writer {
  label(): Writer;
  content(...data: any[]): Writer;
  newline(): Writer;
}

export function write(ll: LogLevel): Writer {
  const type = stdType(ll);
  return {
    label() {
      process[type].write(colorLevel(ll) + " ");
      return this;
    },
    content(...data: any[]) {
      process[type].write(validateString(format(...data)));
      return this;
    },
    newline() {
      process[type].write("\n");
      return this;
    },
  };
}
