// @ts-check
require("./solution")({
  input: () => "12,20,0,6,1,17,7",
  solve(input) {
    return [() => part1(input), () => part2(input)];
  },
});

/**
 * @param {number} n
 * @param {string} input
 */
function getNth(n, input) {
  const nums = input.split(",").map(Number);
  const memo = new Map(nums.map((num, idx) => [num, idx]));

  let lastNum = nums.pop();
  for (let curIdx = nums.length; curIdx < n - 1; curIdx++) {
    const lastNumIdx = memo.get(lastNum) ?? curIdx;
    memo.set(lastNum, curIdx);
    lastNum = curIdx - lastNumIdx;
  }

  return lastNum;
}

/**
 * @param {string} input
 */
function part1(input) {
  return getNth(2020, input);
}

/**
 * @param {string} input
 */
function part2(input) {
  return getNth(30000000, input);
}
