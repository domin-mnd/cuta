import { inspect } from "util";
import { Base } from "@/class/base";
import { Fallback } from "@/fallback";
import { Indent } from "@/indent";
import { LogLevel } from "@/level";

export class Directory extends Base {
  @Fallback
  @Indent(LogLevel.Dir)
  public dir(item?: any, options?: any): void {
    this.writer(LogLevel.Dir)
      .label()
      // Not using newline because of first element indent escape
      .content(`\n${inspect(item, { colors: true, ...options })}`)
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
}
