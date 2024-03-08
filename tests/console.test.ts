import { spawnSync } from "child_process";
import { join } from "path";
import {
  black,
  blue,
  cyan,
  gray,
  green,
  magenta,
  red,
  redBright,
  white,
  yellow,
  yellowBright,
} from "ansis";
import { describe, expect, it } from "vitest";

interface ShellReturn {
  stdout: string;
  stderr: string;
}

function shell(
  executable: keyof Console,
  modify?: boolean,
): ShellReturn {
  const options = [
    "tsm",
    "--no-warnings",
    modify ? "--import=./dist/index.mjs" : "",
    join(__dirname, `./shell/${executable}.ts`),
  ];

  // Using tsm instead of tsx because of node flag support ^
  const data = spawnSync("pnpm.cmd", options);
  return {
    stdout: data.stdout.toString(),
    stderr: data.stderr.toString(),
  };
}

describe("Modified console log", async () => {
  // Getting data of every shell script
  const data: Record<keyof Console, ShellReturn> = Object.keys(
    console,
  ).reduce(
    (prev, cur) =>
      Object.assign(prev, {
        [cur]: shell(cur as keyof Console, true),
      }),
    {},
  ) as Record<keyof Console, ShellReturn>;

  it("log", () => {
    const expectedData = `${cyan.bold.inverse` LOG `} Hello world!
${gray`|`}  ${cyan.bold.inverse` LOG `} Message with 
${gray`|`}   new line
${gray`|`}  ${cyan.bold.inverse` LOG `} Some format specifiers %d-5 %f-5
${gray`|`}  ${cyan.bold.inverse` LOG `} Some objects { hello: 'world' }
`;
    expect(data.log.stdout).toBe(expectedData);
    expect(data.log.stderr).toBe("");
  });

  it("error", () => {
    expect(data.error.stdout).toBe("");
    expect(data.error.stderr).toBe(
      `${red.bold.inverse` ERROR `} Hello world!\n`,
    );
  });

  it("debug", () => {
    expect(data.debug.stdout).toBe(
      `${blue.bold.inverse` DEBUG `} Hello world!\n`,
    );
    expect(data.debug.stderr).toBe("");
  });

  it("warn", () => {
    expect(data.warn.stdout).toBe("");
    expect(data.warn.stderr).toBe(
      `${yellow.bold.inverse` WARN `} Hello world!\n`,
    );
  });

  it("trace", () => {
    expect(data.trace.stdout).toBe("");
    // Test for no label trace
    expect(data.trace.stderr).toContain(
      `${magenta.bold.inverse` TRACE `} \n     ${gray("at")}`,
    );
    // Test for grouped & labeled trace
    expect(data.trace.stderr).toContain(
      `${magenta.bold
        .inverse` TRACE `} Hello world!${gray`:`}\n${gray`|`}       ${gray(
        "at",
      )} `,
    );
  });

  it("info", () => {
    expect(data.info.stdout).toBe(
      `${green.bold.inverse` INFO `} Hello world!\n`,
    );
    expect(data.info.stderr).toBe("");
  });

  it("assert", () => {
    expect(data.assert.stdout).toBe("");
    expect(data.assert.stderr).toBe(
      `${yellow.bold.inverse` WARN `} ${gray(
        "Assertion failed:",
      )} Hello world!\n`,
    );
  });

  it("clear", () => {
    expect(data.clear.stdout).toBe("");
  });

  it("count", () => {
    const expectedData = `${gray.bold
      .inverse` COUNT `} Hello world!${gray`:`} ${yellowBright`1`}
${gray.bold.inverse` COUNT `} default${gray`:`} ${yellowBright`1`}
${gray.bold
  .inverse` COUNT `} Hello world!${gray`:`} ${yellowBright`2`}
${gray.bold.inverse` COUNT `} Counter${gray`:`} ${yellowBright`1`}
${gray.bold.inverse` COUNT `} default${gray`:`} ${yellowBright`2`}
${gray.bold.inverse` COUNT `} default${gray`:`} ${yellowBright`3`}
${gray.bold.inverse` COUNT `} default${gray`:`} ${yellowBright`1`}
`;
    expect(data.count.stdout).toBe(expectedData);
    expect(data.count.stderr).toBe("");
  });

  it("countReset", () => {
    const expectedData = `${gray.bold
      .inverse` COUNT `} default${gray`:`} ${yellowBright`1`}
${gray.bold.inverse` COUNT `} default${gray`:`} ${yellowBright`1`}
${gray.bold
  .inverse` COUNT `} Hello world!${gray`:`} ${yellowBright`1`}
`;
    expect(data.countReset.stdout).toBe(expectedData);
    expect(data.countReset.stderr).toBe("");
  });

  it("dir", () => {
    const expectedData = `${gray`|`}  ${black.bold.inverse` DIR `} 
${gray`|`}  {
${gray`|`}    someBig: ${green`'object'`},
${gray`|`}    whichContains: { nested: ${green`'elements'`}, withDifferent: ${green`'types'`}, like: ${yellow`3`} },
${gray`|`}    and: ${yellow`true`}
${gray`|`}  }
${black.bold.inverse` DIR `} 
{ another: 'dir', withNo: 'colors' }
`;
    expect(data.dir.stdout).toBe(expectedData);
    expect(data.dir.stderr).toBe("");
  });

  it("dirxml", () => {
    const expectedData = `${black.bold.inverse` DIRXML `} Hello world!
${gray`|`}  ${black.bold.inverse` DIRXML `} {
${gray`|`}    some: 'object',
${gray`|`}    withFlattened: 'keys',
${gray`|`}    and: 'different types',
${gray`|`}    like: 2
${gray`|`}  }
`;
    expect(data.dirxml.stdout).toBe(expectedData);
    expect(data.dirxml.stderr).toBe("");
  });

  it("group", () => {
    const expectedData = `${green.bold.inverse` INFO `} Hello world!
${redBright.bold.inverse` GROUP `} Group 3${gray`:`}
${gray`|`}  ${gray`|`}  ${redBright.bold
      .inverse` GROUP `} Group 4${gray`:`}
`;
    expect(data.group.stdout).toBe(expectedData);
    expect(data.group.stderr).toBe(
      `${gray`|`}  ${gray`|`}  ${gray`|`}  ${yellow.bold
        .inverse` WARN `} Hello world!\n`,
    );
  });

  it("groupCollapsed", () => {
    expect(data.groupCollapsed.stdout).toBe(data.group.stdout);
    expect(data.groupCollapsed.stderr).toBe(data.group.stderr);
  });

  it("groupEnd", () => {
    const expectedData = `${gray`|`}  ${green.bold.inverse` INFO `} Hello world!
${gray`|`}  ${gray`|`}  ${gray`|`}  ${redBright.bold
      .inverse` GROUP `} Group${gray`:`}
`;
    expect(data.groupEnd.stdout).toBe(expectedData);
    expect(data.groupEnd.stderr).toBe(
      `${yellow.bold.inverse` WARN `} Hello world!\n`,
    );
  });

  it("table", async () => {
    const unmodified = shell("table", false);
    expect(data.table.stdout).toBe(unmodified.stdout);
    expect(data.table.stderr).toBe(unmodified.stderr);
  });

  it("time", () => {
    const expectedData = [
      `${white.bold.inverse` TIMER `} default${gray`:`} `,
      "ms",
      // \x1b[93m for bright yellow, resets with yellowBright() at the end
      `${white.bold
        .inverse` TIMER `} Hello world!${gray`:`} \x1b[93m2`,
    ];
    expectedData.forEach(expected =>
      expect(data.time.stdout).toContain(expected),
    );
    expect(data.time.stderr).toBe("");
  });

  it("timeLog", () => {
    const expectedData = [
      `${white.bold.inverse` TIMER `} default${gray`:`} `,
      "ms",
    ];
    expectedData.forEach(expected =>
      expect(data.timeLog.stdout).toContain(expected),
    );
    expect(data.timeLog.stderr).toBe(
      `${yellow.bold
        .inverse` WARN `} No such label 'Hello world!' for console.timeLog()\n`,
    );
  });

  it("timeEnd", () => {
    const expectedData = [
      `${white.bold.inverse` TIMER `} default${gray`:`} `,
      "ms",
    ];
    expectedData.forEach(expected =>
      expect(data.timeEnd.stdout).toContain(expected),
    );
    expect(data.timeEnd.stderr).toBe(
      `${yellow.bold
        .inverse` WARN `} No such label 'default' for console.timeEnd()\n`,
    );
  });
});
