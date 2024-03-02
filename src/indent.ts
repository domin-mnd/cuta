import { gray } from "colorette";
import type { LogLevel } from "./console";
import { write } from "@/write";

let indentation = 0;

export function indent() {
  return (gray("|") + "  ").repeat(indentation);
}

export const IncrementIndentation =
  (amount: number) =>
  (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = function (...args: any) {
      indentation += amount;
      method.apply(this, args);
    };
  };

export const Indent =
  (ll: LogLevel) =>
  (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = function (...args: any) {
      write(ll).content(indent());
      method.apply(this, args);
    };
  };
