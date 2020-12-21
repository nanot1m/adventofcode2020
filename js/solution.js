// @ts-check
const { performance } = require("perf_hooks");

const currentDay = require("path").parse(process.argv[1]).name;

const WIDTH = 66;

const drawLine = (type) => {
  let [l, r] = type === 1 ? ["╭", "╮"] : type === 2 ? ["╰", "╯"] : ["├", "┤"];
  console.log(
    `${l}${Array(WIDTH - 2)
      .fill("─")
      .join("")}${r}`
  );
};

const drawText = (text) => console.log(`│ ${text.padEnd(WIDTH - 4, " ")} │`);

/**
 * @param {Object} config
 * @param {(day: number) => string | Promise<string>} config.input
 * @param {(input: string) => Array<() => any>} config.solve
 */
module.exports = async function solution({ input, solve }) {
  await Promise.resolve()
    .then(() => {
      drawLine(1);
      drawText("Advent of Code. Day " + currentDay);
      drawLine();
      return input(Number(currentDay));
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
