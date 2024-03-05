import { format } from "util";
import { colorLevel } from "@/color";
import { indent } from "@/indent";
import { LogLevel } from "@/level";

export function validate(data: string): string {
  return data
    .split("\n")
    .map((line, index) => (index ? indent() + line : line))
    .join("\n");
}

export function isStderr(ll: LogLevel): boolean {
  return [LogLevel.Warn, LogLevel.Error, LogLevel.Trace].includes(ll);
}

interface Writer {
  label(): Writer;
  content(...data: any[]): Writer;
  newline(): Writer;
}

export const dummy: Writer = {
  label() {
    return this;
  },
  content(..._data) {
    return this;
  },
  newline() {
    return this;
  },
};

export function write(
  ll: LogLevel,
  stdout: NodeJS.WritableStream = process.stdout,
  stderr: NodeJS.WritableStream = process.stderr,
  ignoreErrors: boolean = false
): Writer {
  const IS_STDERR = isStderr(ll);
  const writer = IS_STDERR ? stderr : stdout;
  if (ignoreErrors && IS_STDERR) return dummy;
  return {
    label() {
      writer.write(colorLevel(ll) + " ");
      return this;
    },
    content(...data: any[]) {
      writer.write(validate(format(...data)));
      return this;
    },
    newline() {
      writer.write("\n");
      return this;
    },
  };
}
