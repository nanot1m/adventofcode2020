// @ts-check
const Lexer = require("./lexer");
const Parser = require("./parser");

require("./solution")({
  input: require("./input").fetchFromAoC,
  solve: (input) => [() => part1(input), () => part2(input)],
});

const lexer = new Lexer()
  .addRule(/\s+/, () => {})
  .addRule(/\d+/, (lexeme) => lexeme)
  .addRule(/[\(\+\*\)]/, (lexeme) => lexeme);

const operator = {
  "+": (a, b) => a + b,
  "*": (a, b) => a * b,
};

/**
 * @param {string} input
 * @param {Parser} parser
 */
function parse(input, parser) {
  lexer.setInput(input);
  const tokens = [];
  let token;
  while ((token = lexer.lex())) tokens.push(token);
  return parser.parse(tokens);
}

/**
 * @param {Parser} parser
 *
 * @returns {(input: string) => number}
 */
function evaluateWithParser(parser) {
  return (input) => {
    const stack = [];
    parse(input, parser).forEach(function (c) {
      switch (c) {
        case "+":
        case "-":
        case "*":
        case "/": {
          const b = +stack.pop();
          const a = +stack.pop();
          stack.push(operator[c](a, b));
          break;
        }
        default:
          stack.push(c);
      }
    });
    return stack.pop();
  };
}

/**
 * @param {string} input
 */
function part1(input) {
  const parser = new Parser({
    "+": { precedence: 1, associativity: "left" },
    "*": { precedence: 1, associativity: "left" },
  });

  return input
    .split("\n")
    .map(evaluateWithParser(parser))
    .reduce((a, b) => a + b);
}

/**
 * @param {string} input
 */
function part2(input) {
  const parser = new Parser({
    "+": { precedence: 2, associativity: "left" },
    "*": { precedence: 1, associativity: "left" },
  });

  return input
    .split("\n")
    .map(evaluateWithParser(parser))
    .reduce((a, b) => a + b);
}
