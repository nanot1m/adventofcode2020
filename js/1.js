// @ts-check

require("./solution")({
  input: () => require("./input").fetchFromAoC(1),
  solve(input) {
    const numbers = input.split("\n").map(Number);

    return [() => part1(numbers), () => part2(numbers)];
  },
});

/**
 * @param {number[]} xs
 */
function part1(xs) {
  return findTwo(xs, 2020, 0, xs.length);
}

/**
 * @param {number[]} xs
 */
function part2(xs) {
  for (let i = xs.length - 1; i > 2; i--) {
    const x = 2020 - xs[i];
    const result = findTwo(xs, x, 0, i);
    if (result) {
      return result * xs[i];
    }
  }

  return null;
}

/**
 * @param {number[]} xs
 * @param {number} target
 * @param {number} left
 * @param {number} right
 */
function findTwo(xs, target, left, right) {
  const memo = new Set();
  for (let i = left; i < right; i++) {
    let x = target - xs[i];
    if (memo.has(x)) {
      return xs[i] * x;
    }
    memo.add(xs[i]);
  }
  return null;
}
