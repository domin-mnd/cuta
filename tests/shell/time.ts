console.time("Hello world!");
console.time();
setTimeout(() => {
  console.timeEnd("Hello world!");
}, 2000);
console.timeEnd();
