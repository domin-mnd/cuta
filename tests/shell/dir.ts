console.group();
console.dir({
  someBig: "object",
  whichContains: {
    nested: "elements",
    withDifferent: "types",
    like: 3,
  },
  and: true,
});
console.groupEnd();
console.dir(
  {
    another: "dir",
    withNo: "colors",
  },
  {
    colors: false,
  },
);
