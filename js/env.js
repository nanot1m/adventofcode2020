const fs = require("fs");
const path = require("path");

const envPath = path.resolve(__dirname, "../.env");

if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("=").map((x) => x.trim()))
    .forEach(([key, value]) => (process.env[key] = value));
}
