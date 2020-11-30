// @ts-check

/**
 * @param {Object} config
 * @param {() => string | Promise<string>} config.input
 * @param {(input: string) => any} config.solve
 */
module.exports = async function solution({ input, solve }) {
  await Promise.resolve()
    .then(input)
    .then(solve)
    .then((result) => (console.log(result), result))
    .catch(console.error);
};
