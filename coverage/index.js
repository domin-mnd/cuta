const { exec } = require("child_process");
const { bold } = require("colorette");

exec("node ./coverage/environment.js", (error, stdout, stderr) => {
  console.log(bold("Result for 'node ./coverage/environment.js':"));
  if (error) return console.error(error);
  console.log("stdout:");
  console.log(stdout);
  console.log("stderr:");
  console.log(stderr);
});

exec("node --import=\"./dist/index.mjs\" ./coverage/environment.js", (error, stdout, stderr) => {
  console.log(bold("Result for 'node --import=\"./dist/index.mjs\" ./coverage/environment.js':"));
  if (error) return console.error(error);
  console.log("stdout:");
  console.log(stdout);
  console.log("stderr:");
  console.log(stderr);
});
