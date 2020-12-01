// @ts-check

/**
 * @param {Object} config
 * @param {() => string | Promise<string>} config.input
 * @param {(input: string) => Array<() => any>} config.solve
 */
module.exports = async function solution({ input, solve }) {
  await Promise.resolve()
    .then(input)
    .then(solve)
    .then((solutions) =>
      Promise.all(
        solutions.map((solution, idx) =>
          Promise.resolve()
            .then(solution)
            .then((result) => {
              console.log(`Part ${idx + 1}: ${result}`);
            })
        )
      )
    )
    .catch(console.error);
};
