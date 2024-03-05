import { write } from "@/write";
import { memoize } from "@/memoize";
import { gray, yellowBright } from "ansis";
import { inspect } from "util";
import { Indent, incrementIndentation, indent } from "@/indent";
import { Fallback, fall } from "@/fallback";
import { colorStack } from "@/color";
import { LogLevel } from "@/level";
import type { ConsoleConstructorOptions } from "console";

export class CutaConsole implements Console {
  private memCounter = memoize<number>({ increment: true });
  private memTimestamp = memoize<number>();
  private options?: ConsoleConstructorOptions;
  private stdout?: NodeJS.WritableStream;

  Console!: console.ConsoleConstructor;

  // Overloading constructor because of ConsoleConstructor
  constructor(options: ConsoleConstructorOptions);
  constructor(
    stdout: NodeJS.WritableStream,
    stderr?: NodeJS.WritableStream,
    ignoreErrors?: boolean
  );
  constructor(
    stdout: NodeJS.WritableStream | ConsoleConstructorOptions,
    private stderr?: NodeJS.WritableStream,
    private ignoreErrors?: boolean
  ) {
    if ("stdout" in stdout) {
      this.options = stdout;
      this.stdout = stdout.stdout;
    } else {
      this.stdout = stdout;
    }
  }

  private writer(ll: LogLevel) {
    return write(
      ll,
      this.stdout,
      this.stderr ?? this.options?.stderr,
      this.ignoreErrors ?? this.options?.ignoreErrors
    );
  }

  @Fallback
  @Indent(LogLevel.Log)
  public log(...data: any[]): void {
    this.writer(LogLevel.Log)
      .label()
      .content(...data)
      .newline();
  }

  @Fallback
  @Indent(LogLevel.Error)
  public error(...data: any[]): void {
    this.writer(LogLevel.Error)
      .label()
      .content(...data)
      .newline();
  }

  @Fallback
  @Indent(LogLevel.Info)
  public info(...data: any[]): void {
    this.writer(LogLevel.Info)
      .label()
      .content(...data)
      .newline();
  }

  @Fallback
  @Indent(LogLevel.Debug)
  public debug(...data: any[]): void {
    this.writer(LogLevel.Debug)
      .label()
      .content(...data)
      .newline();
  }

  @Fallback
  @Indent(LogLevel.Warn)
  public warn(...data: any[]): void {
    this.writer(LogLevel.Warn)
      .label()
      .content(...data)
      .newline();
  }

  @Fallback
  @Indent(LogLevel.Trace)
  public trace(...data: any[]): void {
    // Only v8 compatible
    const stack = new Error().stack?.split("\n");
    stack?.splice(0, 4); // Remove the Error line, trace caller line, fallback & indent decorators
    const writer = this.writer(LogLevel.Trace).label();
    if (data.length) writer.content(...data).content(gray`:`);
    writer.content((stack?.map(colorStack) ?? []).join("")).newline();
  }

  @Fallback
  public assert(condition?: boolean, ...data: any[]): void {
    if (!condition) this.warn(gray`Assertion failed:`, ...data);
  }

  public clear(): void {
    fall.clear();
  }

  @Fallback
  @Indent(LogLevel.Count)
  public count(label?: string): void {
    this.memCounter.add(label ?? "default", 1);
    this.writer(LogLevel.Count)
      .label()
      .content(label ?? "default")
      .content(gray`:`)
      .content(" ")
      .content(
        yellowBright((this.memCounter.get(label ?? "default") ?? 0).toString())
      )
      .newline();
  }

  @Fallback
  public countReset(label?: string): void {
    this.memCounter.remove(label ?? "default");
  }

  @Fallback
  @Indent(LogLevel.Dir)
  public dir(item?: any, options?: any): void {
    this.writer(LogLevel.Dir)
      .label()
      // Not using newline because of first element indent escape
      .content("\n" + inspect(item, { colors: true, ...options }))
      .newline();
  }

  @Fallback
  @Indent(LogLevel.DirXML)
  public dirxml(...data: any[]): void {
    this.writer(LogLevel.DirXML)
      .label()
      .content(...data)
      .newline();
  }

  @Fallback
  public group(...data: any[]): void {
    if (data.length)
      this.writer(LogLevel.Group)
        .content(indent())
        .label()
        .content(...data)
        .content(gray`:`)
        .newline();
    incrementIndentation(1);
  }

  public groupCollapsed = this.group;

  @Fallback
  public groupEnd(): void {
    incrementIndentation(-1);
  }

  public table(tabularData?: any, properties?: string[]): void {
    /**
     * @todo Implement own table
     */
    fall.table(tabularData, properties);
  }

  @Fallback
  public time(label?: string): void {
    this.memTimestamp.add(label ?? "default", performance.now());
  }

  @Fallback
  public timeEnd(label?: string): void {
    performance.now();
    const startDate = this.memTimestamp.get(label ?? "default");
    if (!startDate)
      return this.warn(
        `No such label '${label ?? "default"}' for console.timeEnd()`
      );

    this.timeLog(label ?? "default");
    this.memTimestamp.remove(label ?? "default");
  }

  @Fallback
  @Indent(LogLevel.Timer)
  public timeLog(label?: string, ...data: any[]): void {
    const startDate = this.memTimestamp.get(label ?? "default");
    const endDate = performance.now();

    if (!startDate)
      return this.warn(
        `No such label '${label ?? "default"}' for console.timeLog()`
      );

    const writer = this.writer(LogLevel.Timer)
      .label()
      .content(label ?? "default")
      .content(gray`:`)
      .content(" ")
      .content(
        yellowBright(parseFloat((endDate - startDate).toFixed(3)).toString())
      )
      .content("ms")
      .newline();
    if (!data.length) return;
    writer
      .content("\t")
      .content(...data)
      .newline();
  }

  public timeStamp(label?: string): void {
    /**
     * @todo Implement own timestamp
     */
    fall.timeStamp(label);
  }

  public profile = fall.profile;
  public profileEnd = fall.profileEnd;
}
