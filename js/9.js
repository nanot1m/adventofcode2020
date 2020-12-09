// @ts-check

require("./solution")({
  input: () => require("./input").fetchFromAoC(9),
  solve(input) {
    return [() => part1(input), () => part2(input)];
  },
});

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
      return true;
    }
    memo.add(xs[i]);
  }
  return false;
}

/**
 * @param {string} input
 */
function part1(input) {
  const preamble = 25;
  const nums = input.split("\n").map(Number);

  for (let i = preamble; i < nums.length; i++) {
    if (!findTwo(nums, nums[i], i - preamble, i)) {
      return nums[i];
    }
  }
}

/**
 * @param {string} input
 */
function part2(input) {
  const target = part1(input);

  const nums = input.split("\n").map(Number);

  for (let i = 0; i < nums.length - 1; i++) {
    let sum = nums[i];
    let j = i + 1;
    for (j; j < nums.length; j++) {
      sum += nums[j];
      if (sum >= target) break;
    }
    if (sum === target) {
      const slice = nums.slice(i, j + 1);
      return Math.max(...slice) + Math.min(...slice);
    }
  }
}
