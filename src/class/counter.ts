import { Fallback } from "@/fallback";
import { LogLevel } from "@/level";
import { Indent } from "@/indent";
import { Base } from "@/class/base";
import { gray, yellowBright } from "ansis";

export class Counter extends Base {
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
        yellowBright(
          (this.memCounter.get(label ?? "default") ?? 0).toString(),
        ),
      )
      .newline();
  }

  @Fallback
  public countReset(label?: string): void {
    this.memCounter.remove(label ?? "default");
  }
}
