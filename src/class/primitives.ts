import { Fallback } from "@/fallback";
import { LogLevel } from "@/level";
import { Indent } from "@/indent";
import { Base } from "@/class/base";

export class Primitives extends Base {
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
}
