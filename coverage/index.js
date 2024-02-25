const { exec } = require("child_process");
const { bold } = require("colorette");

exec("node ./coverage/environment.js", (error, stdout) => {
  console.log(bold("Result for 'node ./coverage/environment.js':"));
  if (error) console.error(error);
  else console.log(stdout);
});

exec("node --import=\"./dist/index.mjs\" ./coverage/environment.js", (error, stdout) => {
  console.log(bold("Result for 'node --import=\"./dist/index.mjs\" ./coverage/environment.js':"));
  if (error) console.error(error);
  else console.log(stdout);
});
