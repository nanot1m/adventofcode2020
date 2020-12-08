// @ts-check

require("./solution")({
  input: () => require("./input").fetchFromAoC(8),
  solve(input) {
    return [() => part1(input), () => part2(input)];
  },
});

/**
 * @param {string} input
 *
 * @returns {[string, number][]}
 */
function parseInput(input) {
  return input
    .split("\n")
    .map((x) => x.split(" "))
    .map(([l, r]) => [l, Number(r)]);
}

/**
 * @param {[string, number][]} instructions
 */
function runProgram(instructions) {
  const computer = {
    state: "init",
    ip: 0,
    acc: 0,
  };

  const visited = {};

  while (true) {
    if (computer.ip === instructions.length) {
      computer.state = "terminated";
      return computer;
    }

    if (visited[computer.ip]) {
      computer.state = "in_cycle";
      return computer;
    }
    visited[computer.ip] = true;

    const [command, arg] = instructions[computer.ip];

    switch (command) {
      case "acc": {
        computer.acc += arg;
        computer.ip++;
        break;
      }
      case "jmp": {
        computer.ip += arg;
        break;
      }
      case "nop": {
        computer.ip++;
        break;
      }
    }
  }
}

/**
 * @param {string} input
 */
function part1(input) {
  return runProgram(parseInput(input)).acc;
}

/**
 * @param {string} input
 */
function part2(input) {
  const instructions = parseInput(input);

  for (let index = 0; index < instructions.length; index++) {
    const [command, arg] = instructions[index];

    if (command === "acc") {
      continue;
    }

    const patchedCommand = command === "nop" ? "jmp" : "nop";

    /** @type [string, number][] */
    const patchedInstructions = [
      ...instructions.slice(0, index),
      [patchedCommand, arg],
      ...instructions.slice(index + 1),
    ];

    const computer = runProgram(patchedInstructions);
    if (computer.state === "terminated") {
      return computer.acc;
    }
  }
}
