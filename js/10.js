// @ts-check

require("./solution")({
  input: require("./input").fetchFromAoC,
  solve(input) {
    return [() => part1(input), () => part2(input)];
  },
});

/**
 *
 * @param {string} input
 */
function part1(input) {
  const adapters = new Set(input.split("\n").map(Number));

  const deviceAdapter = Math.max(...adapters) + 3;

  adapters.add(deviceAdapter);

  let cur = 0;
  const frequences = { 1: 0, 2: 0, 3: 0 };
  while (true) {
    let hasAdapter = false;
    for (let x of [1, 2, 3]) {
      if (adapters.has(cur + x)) {
        hasAdapter = true;
        frequences[x]++;
        cur += x;
        break;
      }
    }
    if (!hasAdapter) {
      break;
    }
  }

  return frequences[1] * frequences[3];
}

/**
 * @param {string} input
 */
function part2(input) {
  const adapters = new Set(input.split("\n").map(Number));
  const deviceAdapter = Math.max(...adapters) + 3;
  adapters.add(deviceAdapter);

  const memo = new Map();

  /**
   * @param {number} joltage
   */
  function count(joltage) {
    if (memo.has(joltage)) {
      return memo.get(joltage);
    }
    if (joltage === deviceAdapter) {
      return 1;
    }
    let result = 0;
    for (let x of [1, 2, 3]) {
      if (adapters.has(joltage + x)) {
        result += count(joltage + x);
      }
    }
    memo.set(joltage, result);
    return result;
  }

  return count(0);
}
