console.log("Hello world!");
console.group();
console.log(
  "%cMessage with",
  "font-size:18px; background:green;",
  "\n",
  "new line",
);
console.log("Some format specifiers %%d-%d %%f-%f", 5, 5);
console.log("Some objects", {
  hello: "world",
});
