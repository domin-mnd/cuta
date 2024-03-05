import { gray } from "ansis";
import { incrementIndentation, indent } from "@/indent";

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
