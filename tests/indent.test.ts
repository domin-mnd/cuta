import { incrementIndentation, indent } from "@/indent";
import { gray } from "ansis";
import { describe, expect, it } from "vitest";

describe("Indentation", () => {
  it("returns", () => {
    expect(indent()).toBe("");
  });

  it("increments", () => {
    incrementIndentation(2);
    expect(indent()).toBe(`${gray`|`}  ${gray`|`}  `);
    incrementIndentation(1);
    expect(indent()).toBe(`${gray`|`}  ${gray`|`}  ${gray`|`}  `);
  });

  it("decrements", () => {
    incrementIndentation(-1);
    expect(indent()).toBe(`${gray`|`}  ${gray`|`}  `);
    incrementIndentation(-1);
    expect(indent()).toBe(`${gray`|`}  `);
  });

  it("persists value", () => {
    expect(indent()).toBe(`${gray`|`}  `);
  });
});
