// @ts-check
require("./solution")({
  input: () => require("./input").fetchFromAoC(13),
  solve(input) {
    return [() => part1(input), () => part2(input)];
  },
});

/**
 * @param {string} params
 */
function part1(params) {
  const lines = params.split("\n");
  const ttime = +lines[0];
  const buses = lines[1]
    .split(",")
    .filter((x) => x !== "x")
    .map(Number)
    .map((id) => [id * Math.ceil(ttime / id), id])
    .sort((a, b) => a[0] - b[0]);
  return (buses[0][0] - ttime) * buses[0][1];
}

/**
 * @param {string} params
 */
function part2(params) {
  const buses = params
    .split("\n")[1]
    .split(",")
    .map(Number)
    .reduce(
      ({ step, result }, bus, offset) => {
        if (!isNaN(bus)) {
          while ((result + offset) % bus !== 0) {
            result += step;
          }
          step *= bus;
        }
        return { result, step };
      },
      { step: 1, result: 1 }
    );
  return buses.result;
}
