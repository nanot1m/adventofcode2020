// @ts-check
require("./solution")({
  input: () => require("./input").fetchFromAoC(5),
  solve(input) {
    const parsed = input.split("\n");

    return [() => part1(parsed), () => part2(parsed)];
  },
});

/**
 * @param {string} line
 */
function getSeatId(line) {
  return parseInt(line.replace(/[FL]/g, "0").replace(/[BR]/g, "1"), 2);
}

/**
 * @param {string[]} lines
 */
function part1(lines) {
  return Math.max(...lines.map(getSeatId));
}

/**
 * @param {string[]} lines
 */
function part2(lines) {
  return (
    lines
      .map(getSeatId)
      .sort((a, b) => a - b)
      .find((id, idx, ids) => ids[idx + 1] - id === 2) + 1
  );
}
