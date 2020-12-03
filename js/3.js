// @ts-check

require("./solution")({
  input: () => require("./input").fetchFromAoC(3),
  solve(input) {
    const map = calc.bind(null, input.split("\n"));

    return [
      () => calc(map, 3, 1),
      () =>
        [
          [1, 1],
          [3, 1],
          [5, 1],
          [7, 1],
          [1, 2],
        ].reduce((acc, [dx, dy]) => calc(map, dx, dy) * acc, 1),
    ];
  },
});

/**
 * @param {string[]} map
 * @param {number} dx
 * @param {number} dy
 */
function calc(map, dx, dy) {
  let treesCount = 0;

  for (let x = 0, y = 0; y < map.length; x += dx, y += dy)
    treesCount += Number(map[y][x % map[0].length] === "#");

  return treesCount;
}
