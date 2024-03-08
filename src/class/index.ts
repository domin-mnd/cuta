import { Base } from "@/class/base";
import { Counter } from "@/class/counter";
import { Directory } from "@/class/directory";
import { Mirror } from "@/class/mirror";
import { Primitives } from "@/class/primitives";
import { Table } from "@/class/table";
import { Timer } from "@/class/timer";
import { Trace } from "@/class/trace";
import { Assertion } from "@/class/assertion";
import { Group } from "@/class/group";
import { applyMixins } from "@/mixins";

export interface CutaConsole extends Console {}
export class CutaConsole extends Base {}
applyMixins(CutaConsole, [
  Base,
  Assertion,
  Counter,
  Directory,
  Group,
  Mirror,
  Primitives,
  Table,
  Timer,
  Trace,
]);
