import { fall } from ".";
import { fallback, writeln } from "@/utils";
import { memoize } from "./memoize";
import { gray, yellowBright } from "colorette";

export enum LogLevel {
  Log = "LOG",
  Info = "INFO",
  Error = "ERROR",
  Warn = "WARN",
  Debug = "DEBUG",
  Trace = "TRACE",
  Count = "COUNT",
}

export class AttributeConsole implements Console {
  private countable = false;
  private timestamp = false;
  private memCounter = memoize<number>();

  Console!: console.ConsoleConstructor;

  public get counts() {
    this.countable = true;
    return this;
  }

  public get timed() {
    this.timestamp = true;
    return this;
  }

  public log(...data: any[]): void {
    if (fallback(fall.log, data)) return;
    writeln(LogLevel.Log, ...data);
  }

  public error(...data: any[]): void {
    if (fallback(fall.error, data)) return;
    writeln(LogLevel.Error, ...data);
  }

  public info(...data: any[]): void {
    if (fallback(fall.info, data)) return;
    writeln(LogLevel.Info, ...data);
  }

  public debug(...data: any[]): void {
    if (fallback(fall.debug, data)) return;
    writeln(LogLevel.Debug, ...data);
  }

  public warn(...data: any[]): void {
    if (fallback(fall.warn, data)) return;
    writeln(LogLevel.Warn, ...data);
  }

  public trace(...data: any[]): void {
    if (fallback(fall.trace, data)) return;
    // Only v8 compatible
    const stack = new Error().stack?.split("\n");
    writeln(LogLevel.Trace, ...data);
    stack?.shift(); // Remove the Error line
    stack?.shift(); // Remove the trace caller line
    stack?.forEach((line) => {
      const parts = line.trimStart().split(" "); // 3 parts - "at", caller & path
      parts[0] = gray(parts[0]);
      parts[parts.length - 1] = gray(parts[parts.length - 1]);
      process.stderr.write("\t" + parts.join(" ") + "\n");
    });
  }

  public assert(condition?: boolean, ...data: any[]): void {}

  public clear(): void {
    fall.clear();
  }

  public count(label?: string): void {
    if (fallback(fall.count, [label])) return;
    this.memCounter.add(label ?? "default", 1);
    writeln(
      LogLevel.Count,
      (label ?? "default") + gray(":") + " " + yellowBright(this.memCounter.get(label ?? "default") ?? 0)
    );
  }

  public countReset(label?: string): void {
    if (fallback(fall.countReset, [label])) return;
    this.memCounter.remove(label ?? "default");
  }

  public dir(item?: any, options?: any): void {}
  public dirxml(...data: any[]): void {}
  public group(...data: any[]): void {}
  public groupCollapsed(...data: any[]): void {}
  public groupEnd(): void {}
  public table(tabularData?: any, properties?: string[]): void {}
  public time(label?: string): void {}
  public timeEnd(label?: string): void {}
  public timeLog(label?: string, ...data: any[]): void {}
  public timeStamp(label?: string): void {}

  public profile(label?: string): void {
    fall.profile(label);
  }
  public profileEnd(label?: string): void {
    fall.profileEnd(label);
  }
}
