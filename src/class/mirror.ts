import { fall } from "@/fallback";
import { Base } from "@/class/base";

export class Mirror extends Base {
  public profile(label?: string): void {
    return fall.profile(label);
  }
  
  public profileEnd(label?: string): void {
    return fall.profileEnd(label);
  }

  public clear(): void {
    return fall.clear();
  }
}
