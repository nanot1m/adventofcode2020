// @ts-check

require("./solution")({
  input: require("./input").fetchFromAoC,
  solve(input) {
    /** @type {PasswordConfig[]} */
    const passwordConfigs = input
      .split("\n")
      .map((line) => line.split(": "))
      .map(([pattern, password]) => {
        const [patternParams, patternLetter] = pattern.split(/\s/);
        const [left, right] = patternParams.split("-").map(Number);
        return {
          password,
          pattern: {
            letter: patternLetter,
            left: left,
            right: right,
          },
        };
      });

    return [() => part1(passwordConfigs), () => part2(passwordConfigs)];
  },
});

/**
 * @typedef {Object} PasswordPattern
 * @property {string} letter
 * @property {number} left
 * @property {number} right
 *
 *
 * @typedef {Object} PasswordConfig
 * @property {string} password
 * @property {PasswordPattern} pattern
 */

/**
 * @param {PasswordConfig[]} passwordConfigs
 */
function part1(passwordConfigs) {
  /**
   * @param {PasswordConfig} passwordConfig
   */
  function checkPasword({ password, pattern }) {
    let letterCount = 0;
    for (let letter of password) {
      if (letter === pattern.letter) {
        letterCount++;
      }
    }
    return letterCount >= pattern.left && letterCount <= pattern.right;
  }

  return passwordConfigs.filter(checkPasword).length;
}

/**
 * @param {PasswordConfig[]} passwordConfigs
 */
function part2(passwordConfigs) {
  /**
   * @param {PasswordConfig} passwordConfig
   */
  function checkPasword({ password, pattern }) {
    let letterCount = 0;
    if (password[pattern.left - 1] === pattern.letter) letterCount++;
    if (password[pattern.right - 1] === pattern.letter) letterCount++;
    return letterCount === 1;
  }

  return passwordConfigs.filter(checkPasword).length;
}
