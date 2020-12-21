// @ts-check
require("./solution")({
  input: require("./input").fetchFromAoC,
  solve(input) {
    const parsed = input.split("\n\n");

    return [() => part1(parsed), () => part2(parsed)];
  },
});

/**
 * @param {string[]} groups
 */
function part1(groups) {
  return groups
    .map((g) => new Set(g.replace(/\s/g, "")).size)
    .reduce((a, b) => a + b);
}

/**
 * @param {string[]} groups
 */
function part2(groups) {
  return groups
    .map((g) => {
      return g
        .split("\n")
        .map((line) => line.split(""))
        .reduce((acc, line) => {
          const memo = new Set(line);
          return acc.filter((x) => memo.has(x));
        }).length;
    })
    .reduce((a, b) => a + b);
}
