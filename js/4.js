// @ts-check
require("./solution")({
  input: () => require("./input").fetchFromAoC(4),
  solve(input) {
    const lines = input.split("\n");

    return [() => part1(lines), () => part2(lines)];
  },
});

const REQUIRED_FIELDS = Object.freeze([
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
]);

/**
 * @param {string[]} lines
 */
function* getPassports(lines) {
  let fields = new Map();
  for (let line of lines) {
    if (line === "") {
      yield fields;
      fields = new Map();
    } else {
      line.split(" ").forEach((pair) => {
        const [key, value] = pair.split(":");
        fields.set(key, value);
      });
    }
  }
  yield fields;
}

/**
 * @param {string[]} lines
 */
function part1(lines) {
  let validPassports = 0;

  for (const passport of getPassports(lines)) {
    validPassports += Number(
      REQUIRED_FIELDS.every((field) => passport.has(field))
    );
  }

  return validPassports;
}

const ECLs = new Set(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]);

/**
 * @param {string} field
 * @param {Map<string, string>} passport
 */
function isValidFieldInPassport(field, passport) {
  if (!passport.has(field)) {
    return false;
  }
  const value = passport.get(field);
  switch (field) {
    case "byr": {
      return Number(value) >= 1920 && Number(value) <= 2002;
    }
    case "iyr": {
      return Number(value) >= 2010 && Number(value) <= 2020;
    }
    case "eyr": {
      return Number(value) >= 2020 && Number(value) <= 2030;
    }
    case "hgt": {
      if (value.endsWith("cm"))
        return parseInt(value) >= 150 && parseInt(value) <= 193;
      if (value.endsWith("in"))
        return parseInt(value) >= 59 && parseInt(value) <= 76;
      return false;
    }
    case "hcl": {
      return /^#[0-9a-f]{6}$/.test(value);
    }
    case "ecl": {
      return ECLs.has(value);
    }
    case "pid": {
      return /^\d{9}$/.test(value);
    }
    default: {
      throw new Error("Field must be one of the " + REQUIRED_FIELDS);
    }
  }
}

/**
 * @param {string[]} lines
 */
function part2(lines) {
  let validPassports = 0;

  for (const passport of getPassports(lines)) {
    validPassports += Number(
      REQUIRED_FIELDS.every((field) => isValidFieldInPassport(field, passport))
    );
  }

  return validPassports;
}
