import type { LogLevel } from "@/level";
import { memoize } from "@/memoize";
import { write } from "@/write";
import type { ConsoleConstructorOptions } from "console";

export class Base {
  protected memTimestamp = memoize<number>();
  protected memCounter = memoize<number>({ increment: true });
  private options?: ConsoleConstructorOptions;
  private stdout?: NodeJS.WritableStream;

  // Overloading constructor because of ConsoleConstructor
  constructor(options: ConsoleConstructorOptions);
  constructor(
    stdout: NodeJS.WritableStream,
    stderr?: NodeJS.WritableStream,
    ignoreErrors?: boolean,
  );
  constructor(
    stdout: NodeJS.WritableStream | ConsoleConstructorOptions,
    private stderr?: NodeJS.WritableStream,
    private ignoreErrors?: boolean,
  ) {
    if ("stdout" in stdout) {
      this.options = stdout;
      this.stdout = stdout.stdout;
    } else {
      this.stdout = stdout;
    }
  }

  protected writer(ll: LogLevel) {
    return write(
      ll,
      this.stdout,
      this.stderr ?? this.options?.stderr,
      this.ignoreErrors ?? this.options?.ignoreErrors,
    );
  }
}
