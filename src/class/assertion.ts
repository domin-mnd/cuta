import { Fallback } from "@/fallback";
import { Primitives } from "@/class/primitives";
import { gray } from "ansis";

export class Assertion extends Primitives {
  @Fallback
  public assert(condition?: boolean, ...data: any[]): void {
    if (!condition) this.warn(gray`Assertion failed:`, ...data);
  }
}
