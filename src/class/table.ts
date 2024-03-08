import { fall } from "@/fallback";
import { Base } from "@/class/base";

export class Table extends Base {
  public table(tabularData?: any, properties?: string[]): void {
    /**
     * @todo Implement own table
     */
    fall.table(tabularData, properties);
  }
}
