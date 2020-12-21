// @ts-check
require("./solution")({
  input: require("./input").fetchFromAoC,
  solve(input) {
    return [() => part1(input), () => part2(input)];
  },
});

/**
 * @param {string} input
 */
function part1(input) {
  const [rules, , tickets] = input.split("\n\n");

  const validValues = new Set();

  for (const rule of rules.split("\n")) {
    const [_, ranges] = rule.split(": ");
    for (const range of ranges.split(" or ")) {
      const [left, right] = range.split("-").map(Number);
      for (let i = left; i <= right; i++) {
        validValues.add(i);
      }
    }
  }

  const ticketValues = tickets.split("\n").slice(1);

  let result = 0;
  for (const line of ticketValues) {
    for (const value of line.split(",").map(Number)) {
      if (!validValues.has(value)) {
        result += value;
      }
    }
  }

  return result;
}

/**
 * @param {string} input
 */
function part2(input) {
  const [rules, ticket, tickets] = input.split("\n\n");

  const fieldDefs = parseFieldDefs(rules);

  const myTicketValues = ticket.split("\n")[1].split(",");

  const possibleTicketFields = getPossibleTicketFields(
    fieldDefs,
    myTicketValues.length,
    rules,
    tickets
  );

  let result = 1;

  getTicketFields(possibleTicketFields).forEach((key, idx) => {
    if (key.startsWith("departure")) {
      result = result * +myTicketValues[idx];
    }
  });

  return result;
}

/**
 * @param {string[][]} ticketFields
 */
function getTicketFields(ticketFields) {
  /** @type [number, string[]][] */
  const ticketFieldsIndexed = ticketFields.map((fields, idx) => [idx, fields]);
  ticketFieldsIndexed.sort((a, b) => a[1].length - b[1].length);

  /** @type {Set<string>} */
  const fieldsMemo = new Set();

  /** @type {string[]} */
  const myTicketFields = [];
  ticketFieldsIndexed.forEach(([idx, fieldsList]) => {
    const value = fieldsList.filter((x) => !fieldsMemo.has(x))[0];
    fieldsMemo.add(value);
    myTicketFields[idx] = value;
  });

  return myTicketFields;
}

/**
 * @param {Map<string, Set<number>>} fieldDefs
 * @param {number} ticketValuesCount
 * @param {string} rules
 * @param {string} tickets
 */
function getPossibleTicketFields(fieldDefs, ticketValuesCount, rules, tickets) {
  const allFields = [...fieldDefs.keys()];
  const ticketFields = Array.from(Array(ticketValuesCount), () => allFields);

  for (const line of getValidTickets(rules, tickets)) {
    line
      .split(",")
      .map(Number)
      .forEach((value, idx) => {
        ticketFields[idx] = ticketFields[idx].filter((key) =>
          fieldDefs.get(key).has(value)
        );
      });
  }

  return ticketFields;
}

/**
 * @param {string} rules
 */
function parseFieldDefs(rules) {
  /** @type {Map<string, Set<number>>} */
  const fieldDefs = new Map();

  for (const rule of rules.split("\n")) {
    const [name, ranges] = rule.split(": ");

    /** @type {Set<number>} */
    const values = new Set();

    for (const range of ranges.split(" or ")) {
      const [left, right] = range.split("-").map(Number);
      for (let i = left; i <= right; i++) {
        values.add(i);
      }
    }

    fieldDefs.set(name, values);
  }

  return fieldDefs;
}

/**
 * @param {string} rules
 * @param {string} tickets
 */
function getValidTickets(rules, tickets) {
  const validValues = new Set();

  for (const rule of rules.split("\n")) {
    const [_, ranges] = rule.split(": ");
    for (const range of ranges.split(" or ")) {
      const [left, right] = range.split("-").map(Number);
      for (let i = left; i <= right; i++) {
        validValues.add(i);
      }
    }
  }

  const ticketValues = tickets.split("\n").slice(1);

  let result = [];
  outer: for (const line of ticketValues) {
    for (const value of line.split(",").map(Number)) {
      if (!validValues.has(value)) {
        continue outer;
      }
    }
    result.push(line);
  }

  return result;
}
