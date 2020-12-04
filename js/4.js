// @ts-check
require("./solution")({
  input: () => require("./input").fetchFromAoC(4),
  solve(input) {
    const lines = input
      .split("\n\n")
      .map((docLines) => docLines.split(/\s/))
      .map((docPairs) => docPairs.map((pair) => pair.split(":")))
      .map((/** @type [string, string][] */ docPairs) => new Map(docPairs));

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
 * @param {Map<string, string>[]} passports
 */
function part1(passports) {
  return passports.filter((passport) =>
    REQUIRED_FIELDS.every((field) => passport.has(field))
  ).length;
}

const ECLs = new Set(["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]);

/**
 * @param {string} field
 * @param {string} value
 */
function isValidFieldInPassport(field, value) {
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
 * @param {Map<string, string>[]} passports
 */
function part2(passports) {
  return passports.filter((passport) =>
    REQUIRED_FIELDS.every(
      (field) =>
        passport.has(field) &&
        isValidFieldInPassport(field, passport.get(field))
    )
  ).length;
}
