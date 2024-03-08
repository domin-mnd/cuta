import { Fallback } from "@/fallback";
import { LogLevel } from "@/level";
import { incrementIndentation, indent } from "@/indent";
import { Base } from "@/class/base";
import { gray } from "ansis";

export class Group extends Base {
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

  public groupCollapsed(...data: any[]): void {
    return this.group(...data);
  }

  @Fallback
  public groupEnd(): void {
    incrementIndentation(-1);
  }
}
