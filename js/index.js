const { exec } = require("child_process");
const fs = require("fs");

const day = process.argv[2];

if (day) {
  execDay(day).then(console.log);
} else {
  fs.promises
    .readdir(__dirname)
    .then((dir) => dir.filter((x) => /^\d+\.js$/.test(x)))
    .then((xs) => xs.map((x) => x.split(".")[0]))
    .then((xs) => xs.sort((a, b) => a - b))
    .then((files) => files.map((file) => execDay(file)))
    .then((promises) =>
      promises.reduce(
        (acc, promise) => acc.then(() => promise).then(console.log),
        Promise.resolve()
      )
    );
}

function execDay(n) {
  return new Promise((resolve) => {
    exec(`node ${n}.js`, (error, stdout, stderr) => {
      if (error) {
        resolve(error.message);
        return;
      }
      if (stderr) {
        resolve(stderr);
        return;
      }
      resolve(stdout);
    });
  });
}
