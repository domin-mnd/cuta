import { Base } from "@/class/base";
import { fall } from "@/fallback";

export class Table extends Base {
  public table(tabularData?: any, properties?: string[]): void {
    /**
     * @todo Implement own table
     */
    fall.table(tabularData, properties);
  }
}
