// @ts-check
const { performance } = require("perf_hooks");

const runningFile = require("path").parse(process.argv[1]).name;

const drawLine = (type) => {
  let [l, r] = type === 1 ? ["╭", "╮"] : type === 2 ? ["╰", "╯"] : ["├", "┤"];
  console.log(l + Array(38).fill("─").join("") + r);
};
const drawText = (text) => console.log(`│ ${text}`.padEnd(39, " ").concat("│"));
/**
 * @param {Object} config
 * @param {() => string | Promise<string>} config.input
 * @param {(input: string) => Array<() => any>} config.solve
 */
module.exports = async function solution({ input, solve }) {
  await Promise.resolve()
    .then(() => {
      drawLine(1);
      drawText("Advent of Code. Day " + runningFile);
      drawLine();
      return input();
    })
    .then(solve)
    .then((solutions) =>
      solutions.reduce((acc, solution, idx) => {
        let now = 0;
        return acc
          .then(() => {
            now = performance.now();
          })
          .then(solution)
          .then((result) => {
            drawText(`Part ${idx + 1}`);
            drawText("");
            drawText(`Result: ${result}`);
            drawText(`  Time: ${(performance.now() - now).toFixed(0)}ms`);
            drawLine(idx === solutions.length - 1 ? 2 : 0);
          });
      }, Promise.resolve())
    )
    .catch(console.error);
};
