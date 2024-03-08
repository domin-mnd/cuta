import type { LogLevel } from "@/level";
import { write } from "@/write";
import { gray } from "ansis";

let indentation = 0;

export function indent() {
  return `${gray`|`}  `.repeat(indentation);
}

export const incrementIndentation = (amount: number) =>
  (indentation += amount);

export const Indent =
  (ll: LogLevel) =>
  (
    _target: unknown,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    const method = descriptor.value;
    descriptor.value = function (...args: unknown[]) {
      write(ll).content(indent());
      method.apply(this, args);
    };
  };
