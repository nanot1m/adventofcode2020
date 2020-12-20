// @ts-check
require("./env");
const https = require("https");

const SESSION = process.env.SESSION;

module.exports = {
  /**
   * Reads input from `input/day{N}.input.txt` file
   *
   * @param {number} dayN
   * @param {boolean} [trim]
   */
  readFromFileSystem(dayN, trim = true) {
    const name = require("path").join(
      __dirname,
      "..",
      "input",
      `day${dayN}.input.txt`
    );
    let input = require("fs").readFileSync(name, "utf8");
    if (trim) input = input.trim();
    return input;
  },
  /**
   * Fetches input for given day from adventofcode.com
   *
   * @param {number} dayN
   * @param {boolean} [trim]
   *
   * @returns {Promise<string>}
   */
  fetchFromAoC(dayN, trim = true) {
    if (SESSION == null) {
      console.error(
        [
          'Environment variable "SESSION" is not provided.',
          "Please login at https://adventofcode.com/2019/auth/login",
          'and set value from cookie "session" as an env variable "SESSION"',
        ].join(" ")
      );
      process.exit(1);
    }

    return new Promise((resolve, reject) => {
      let text = "";
      const req = https.get(
        `https://adventofcode.com/2020/day/${dayN}/input`,
        { headers: { cookie: `session=${SESSION}` } },
        (res) => {
          res.on("data", (chunk) => {
            text += chunk;
          });
          res.on("end", () => {
            resolve(trim ? text.trim() : text);
          });
          res.on("error", reject);
        }
      );
      req.on("error", reject);
      req.end();
    });
  },
};
