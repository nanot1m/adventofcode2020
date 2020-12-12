// @ts-check
require("./solution")({
  input: () => require("./input").fetchFromAoC(11),
  solve(input) {
    return [() => part1(input), () => part2(input)];
  },
});

/**
 *
 * @param {string[][]} map
 * @param {(ch: string, x: number, y: number) => string} cb
 */
function transformMap(map, cb) {
  let changed = false;
  let newMap = map.map((row) => [...row]);
  map.forEach((row, y) => {
    row.forEach((ch, x) => {
      newMap[y][x] = cb(ch, x, y);
      if (newMap[y][x] !== ch) changed = true;
    });
  });
  return changed ? newMap : map;
}

// prettier-ignore
const deltas = [
  [-1, -1], [0, -1], [1, -1],
  [-1,  0],          [1,  0],
  [-1,  1], [0,  1], [1,  1],
]

/**
 * @param {string[][]} map
 * @param {number} x
 * @param {number} y
 */
function getAdjOccupiedCount(map, x, y) {
  return deltas
    .map(([dx, dy]) => map[dy + y] && map[dy + y][dx + x])
    .filter((ch) => ch === "#").length;
}

/**
 *
 * @param {string} input
 */
function part1(input) {
  let seatMap = input.split("\n").map((l) => l.split(""));

  while (true) {
    const newMap = transformMap(seatMap, (ch, x, y) => {
      const occCount = getAdjOccupiedCount(seatMap, x, y);
      if (ch === "L" && occCount === 0) {
        return "#";
      }
      if (ch === "#" && occCount > 3) {
        return "L";
      }
      return ch;
    });

    if (seatMap === newMap) {
      break;
    }

    seatMap = newMap;
  }

  return seatMap
    .map((row) => row.filter((x) => x === "#").length)
    .reduce((a, b) => a + b, 0);
}

/**
 * @param {string[][]} map
 * @param {number} x
 * @param {number} y
 */
function getVisibleOccupiedCount(map, x, y) {
  return deltas.filter(([dx, dy]) => {
    let x2 = x + dx;
    let y2 = y + dy;
    let ch = map[y2] && map[y2][x2];
    while (ch === ".") {
      x2 += dx;
      y2 += dy;
      ch = map[y2] && map[y2][x2];
    }
    return ch === "#";
  }).length;
}

/**
 *
 * @param {string} input
 */
function part2(input) {
  let map = input.split("\n").map((l) => l.split(""));

  while (true) {
    const newMap = transformMap(map, (ch, x, y) => {
      const occCount = getVisibleOccupiedCount(map, x, y);
      if (ch === "L" && occCount === 0) {
        return "#";
      }
      if (ch === "#" && occCount > 4) {
        return "L";
      }
      return ch;
    });

    if (map === newMap) {
      break;
    }

    map = newMap;
  }

  return map
    .map((row) => row.filter((x) => x === "#").length)
    .reduce((a, b) => a + b, 0);
}
