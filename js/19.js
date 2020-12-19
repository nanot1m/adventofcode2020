// @ts-check

require("./solution")({
  input: () => require("./input").fetchFromAoC(19),
  solve: (input) => [() => part1(input), () => part2(input)],
});

/**
 *
 * @param {Map<string, string>} rules
 * @param {string} rule
 * @param {*} specialRules
 */
function buildRegExp(rules, rule, specialRules) {
  if (rule.includes("|")) {
    return `(${rule
      .split(" | ")
      .map((x) => buildRegExp(rules, x, specialRules))
      .join("|")})`;
  }
  if (rule.includes('"')) {
    return rule[1];
  }
  if (rule === "+") {
    return rule;
  }
  return rule
    .split(" ")
    .map((x) =>
      buildRegExp(
        rules,
        /\d+/.test(x) ? specialRules[x] || rules.get(x) : x,
        specialRules
      )
    )
    .join("");
}

/**
 * @param {string} input
 */
function part1(input) {
  const [ruleInput, lines] = input.split("\n\n").map((x) => x.split("\n"));

  // @ts-ignore
  const rules = new Map(ruleInput.map((r) => r.split(": ")));
  const regexp = new RegExp(`^${buildRegExp(rules, "0", {})}$`);

  return lines.filter((line) => regexp.test(line)).length;
}

function part2(input) {
  const [ruleInput, lines] = input.split("\n\n").map((x) => x.split("\n"));

  const rules = new Map(ruleInput.map((r) => r.split(": ")));

  const regexp = new RegExp(
    `^${buildRegExp(rules, "0", {
      8: "42 +",
      11: "42 31 | 42 42 31 31 | 42 42 42 31 31 31 | 42 42 42 42 31 31 31 31 | 42 42 42 42 42 31 31 31 31 31",
    })}$`
  );

  return lines.filter((line) => regexp.test(line)).length;
}
