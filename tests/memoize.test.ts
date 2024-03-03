import { memoize } from "@/memoize";

describe("Incremental memoize", () => {
  const mem = memoize<number>({
    increment: true,
  });

  it("returns", () => {
    expect(mem.get("Non existent")).toBeUndefined();
  });

  it("adds", () => {
    mem.add("Some data", 15);
    expect(mem.get("Some data")).toBe(15);
    mem.add("Some data 2", 30);
    expect(mem.get("Some data 2")).toBe(30);
  });

  it("memorizes", () => {
    mem.add("Some data", 30);
    mem.add("Some data 2", 30);
    mem.add("Some data 2", -30);
    expect(mem.get("Some data")).toBe(16); // Increments instead of adding
    expect(mem.get("Some data 2")).toBe(32);
  });

  it("removes", () => {
    mem.remove("Some data");
    expect(mem.get("Some data")).toBeUndefined();
    expect(mem.get("Some data 2")).toBe(32);
  });
});

describe("Static memoize", () => {
  const mem = memoize<number>();

  it("returns", () => {
    expect(mem.get("Non existent")).toBeUndefined();
  });

  it("adds", () => {
    mem.add("Some data", 15);
    expect(mem.get("Some data")).toBe(15);
    mem.add("Some data 2", 30);
    expect(mem.get("Some data 2")).toBe(30);
  });

  it("memorizes", () => {
    mem.add("Some data", 30);
    mem.add("Some data 2", 30);
    mem.add("Some data 2", -30);
    expect(mem.get("Some data")).toBe(15); // Increments instead of adding
    expect(mem.get("Some data 2")).toBe(30);
  });

  it("removes", () => {
    mem.remove("Some data");
    expect(mem.get("Some data")).toBeUndefined();
    expect(mem.get("Some data 2")).toBe(30);
  });
});
