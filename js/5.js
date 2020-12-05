// @ts-check
require("./solution")({
  input: () => require("./input").fetchFromAoC(5),
  solve(input) {
    const parsed = input.split("\n");

    return [() => part1(parsed), () => part2(parsed)];
  },
});

/**
 * @param {(x: T) => boolean} isInLeftSide
 * @param {Iterable<T>} xs
 * @param {number} left
 * @param {number} right
 *
 * @template T
 */
function binSearch(isInLeftSide, xs, left, right) {
  for (const x of xs) {
    if (isInLeftSide(x)) {
      right = right - Math.ceil((right - left) / 2);
    } else {
      left = right - Math.floor((right - left) / 2);
    }
  }
  return left;
}

/**
 * @param {string} line
 */
function getSeatId(line) {
  const row = binSearch((ch) => ch === "F", line.slice(0, 7), 0, 127);
  const col = binSearch((ch) => ch === "L", line.slice(7), 0, 7);
  return row * 8 + col;
}

/**
 * @param {string[]} lines
 */
function part1(lines) {
  return Math.max(...lines.map(getSeatId));
}

/**
 * @param {any} lines
 */
function part2(lines) {
  const ids = new Set(lines.map(getSeatId));
  for (let i = 0; i < 128 * 8; i++) {
    if (!ids.has(i) && ids.has(i - 1) && ids.has(i + 1)) {
      return i;
    }
  }
}
