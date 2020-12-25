// @ts-check

require("./solution")({
  input: require("./input").fetchFromAoC,
  solve: (input) => [() => part1(input)],
});

/**
 *
 * @param {number} b
 * @param {number} e
 * @param {number} m
 */
function powerMod(b, e, m) {
  let x = 1;
  while (e > 0) {
    if (e % 2 == 1) {
      x = (b * x) % m;
      e = e - 1;
    } else {
      b = (b * b) % m;
      e = e / 2;
    }
  }
  return x;
}

/**
 *
 * @param {number} subjectNumber
 * @param {number} loopSize
 */
function transformSubjectNumber(subjectNumber, loopSize) {
  return powerMod(subjectNumber, loopSize, 20201227);
}

/**
 *
 * @param {number} target
 */
function getLoopSize(target) {
  let i = 1;
  while (transformSubjectNumber(7, i) !== target) {
    i++;
  }
  return i;
}

/**
 *
 * @param {string} input
 */
function part1(input) {
  const [cardKey, doorKey] = input.split("\n").map(Number);
  return transformSubjectNumber(doorKey, getLoopSize(cardKey));
}
