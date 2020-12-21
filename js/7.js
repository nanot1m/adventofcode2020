// @ts-check
require("./solution")({
  input: require("./input").fetchFromAoC,
  solve(input) {
    return [() => part1(input), () => part2(input)];
  },
});

/**
 * @param {string} line
 *
 * @returns {[string, Map<string, number>]}
 */
function parseLine(line) {
  const [bagName, containsString] = line.slice(0, -1).split(" bags contain ");
  if (containsString === "no other bags") {
    return [bagName, new Map()];
  }

  /** @type [string, number][] */
  const contains = containsString.split(", ").map((slice) => {
    const [_, count, bagName] = /(\d+)\s(\w+\s\w+)\s\w+/.exec(slice);
    return [bagName, Number(count)];
  });

  return [bagName, new Map(contains)];
}

/**
 * @param {string} input
 */
function parseInput(input) {
  return new Map(input.split("\n").map(parseLine));
}

/**
 * @param {string} input
 */
function part1(input) {
  const parsed = parseInput(input);
  const myBag = "shiny gold";

  /**
   * @param {Map<string, number>} containsMap
   */
  function hasBag(containsMap) {
    return [...containsMap].some(
      ([bag]) => bag === myBag || hasBag(parsed.get(bag))
    );
  }

  return [...parsed]
    .filter(([bag]) => bag !== myBag)
    .map(([_, contains]) => Number(hasBag(contains)))
    .reduce((a, b) => a + b, 0);
}

/**
 * @param {string} input
 */
function part2(input) {
  const parsed = parseInput(input);
  const myBag = "shiny gold";

  /**
   * @param {Map<string, number>} containsMap
   */
  function countBags(containsMap) {
    return [...containsMap]
      .map(([bag, count]) => count + count * countBags(parsed.get(bag)))
      .reduce((a, b) => a + b, 0);
  }

  return countBags(parsed.get(myBag));
}
