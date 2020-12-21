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
  let lines = input.split("\n");
  let mask = [];
  let memory = new Map();

  for (let line of lines) {
    if (line.startsWith("mask")) {
      mask = line.split("").slice(7).reverse();
      continue;
    }

    let [_, addrress, value] = /mem\[(\d+)\] = (\d+)/.exec(line);

    const bits = Number(value).toString(2).split("").reverse();

    const withMask = mask
      .map((m, idx) => (m === "X" ? bits[idx] || "0" : m))
      .reverse();

    memory.set(addrress, parseInt(withMask.join(""), 2));
  }

  return sum(memory.values());
}

/**
 * @param {string} input
 */
function part2(input) {
  let lines = input.split("\n");
  let mask = [];
  let memory = new Map();

  for (let line of lines) {
    if (line.startsWith("mask")) {
      mask = line.split("").slice(7).reverse();
      continue;
    }

    let [_, addrress, value] = /mem\[(\d+)\] = (\d+)/.exec(line);

    const bits = Number(addrress).toString(2).split("").reverse();

    const withMask = mask
      .map((m, idx) => (m === "X" ? "X" : m === "1" ? "1" : bits[idx] || "0"))
      .reverse();

    getAllVariations(withMask)
      .map((x) => parseInt(x.join(""), 2))
      .forEach((mem) => {
        memory.set(mem, +value);
      });
  }

  return sum(memory.values());
}

/**
 *
 * @param {Iterable<number>} xs
 */
function sum(xs) {
  let result = 0;
  for (const x of xs) {
    result += x;
  }
  return result;
}

/**
 * @param {string[]} bits
 */
function getAllVariations(bits) {
  const result = [];

  /**
   * @param {string[]} bits
   * @param {string[]} acc
   */
  function helper(bits, acc) {
    if (bits.length === 0) {
      result.push(acc);
      return;
    }

    const bit = bits[0];
    if (bit === "X") {
      helper(bits.slice(1), acc.concat("0"));
      helper(bits.slice(1), acc.concat("1"));
    } else {
      helper(bits.slice(1), acc.concat(bit));
    }
  }

  helper(bits.slice(), []);
  return result;
}
