import { Fallback, fall } from "@/fallback";
import { Primitives } from "@/class/primitives";
import { LogLevel } from "@/level";
import { Indent } from "@/indent";
import { gray, yellowBright } from "ansis";

export class Timer extends Primitives {
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
        `No such label '${label ?? "default"}' for console.timeEnd()`,
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
        `No such label '${label ?? "default"}' for console.timeLog()`,
      );

    const writer = this.writer(LogLevel.Timer)
      .label()
      .content(label ?? "default")
      .content(gray`:`)
      .content(" ")
      .content(
        yellowBright(
          parseFloat((endDate - startDate).toFixed(3)).toString(),
        ),
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
}
