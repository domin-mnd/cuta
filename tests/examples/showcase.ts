console.log(
  "%cSome heavily modified string with %c formatter",
  "font-size:18px; background:green;",
);
console.log(
  "Native support of utils in console: %%d-%d %%f-%f",
  5,
  5,
);
console.group("More groups");
console.log(
  "Some JSON: %j",
  JSON.stringify({
    hello: "world",
  }),
);
console.log("Lorem ipsum", "dolor", "sit amet");
console.groupCollapsed("Some groupCollapsed");
console.info("Lorem ipsum", "dolor", "sit amet");
console.warn("Lorem ipsum", "dolor", "sit amet");
console.assert(true === (false as true), "Lorem ipsum", "assertion");
console.assert(true === true, "Lorem ipsum", "assertion");
console.error("Lorem ipsum", "dolor", "sit amet");
console.groupEnd();
console.debug("I debugged this shit for 2 hours");
console.trace("Lorem ipsum", "trace");
console.time();
console.time("Timer 1");
console.count("Counter 1");
console.count("Counter 1");
console.count("Counter 1");
console.dir({
  someBig: "object",
  whichContains: {
    nested: "elements",
    withDifferent: "types",
    like: 3,
  },
  and: true,
});
console.count();
console.count();
console.countReset();
console.countReset("Counter 1");
console.timeEnd();
console.timeEnd("Timer 1");
