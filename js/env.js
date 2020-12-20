const fs = require("fs");
const path = require("path");
fs.readFileSync(path.resolve(__dirname, "../.env"), "utf8")
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split("=").map((x) => x.trim()))
  .forEach(([key, value]) => (process.env[key] = value));
