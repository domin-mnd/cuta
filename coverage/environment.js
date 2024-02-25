console.clear();

console.log(
  "%cSome heavily modified string with %c formatter",
  "font-size:18px; background:green;"
);
console.log("Native support of utils in console: %%d-%d %%f-%f", 5, 5);
console.log(
  "Some JSON: %j",
  JSON.stringify({
    hello: "world",
  })
);
console.log("Hello world!", "This", "message", "is", "joined.");
console.info("Some important", "info.");
console.warn("Please do not do the cat!");
console.error("Oh", "shoot!");
console.debug("I debugged this shit for 2 hours");
console.trace("Trace the", "call!");


console.count("Count this dummy");
console.count("Count this dummy");
console.count("Count this dummy");
console.count();
console.count();
console.countReset();
console.countReset("Count this dummy");
