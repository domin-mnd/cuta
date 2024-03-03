import { gray } from "colorette";
import { write } from "@/write";
import type { LogLevel } from "@/level";

let indentation = 0;

export function indent() {
  return (gray("|") + "  ").repeat(indentation);
}

export const incrementIndentation = (amount: number) => (indentation += amount);

export const Indent =
  (ll: LogLevel) =>
  (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = function (...args: any) {
      write(ll).content(indent());
      method.apply(this, args);
    };
  };
