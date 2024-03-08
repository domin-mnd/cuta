import { Fallback } from "@/fallback";
import { Indent } from "@/indent";
import { Base } from "@/class/base";
import { LogLevel } from "@/level";
import { colorStack } from "@/color";
import { gray } from "ansis";

export class Trace extends Base {
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
}