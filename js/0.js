// @ts-check
require("./solution")({
  input: () => require("./input").readFromFileSystem(0),
  solve: (input) => [() => input],
});
