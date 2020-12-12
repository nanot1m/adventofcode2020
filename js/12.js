// @ts-check
require("./solution")({
  input: () => require("./input").fetchFromAoC(12),
  solve(input) {
    return [() => part1(input), () => part2(input)];
  },
});

const dirs = {
  E: 90,
  S: 180,
  W: 270,
  N: 0,
};

/**
 * @param {number} deg
 */
function degToDxDy(deg) {
  const dx = Math.round(Math.sin((deg * Math.PI) / 180));
  const dy = Math.round(Math.cos((deg * Math.PI) / 180));
  return { dx, dy };
}

/**
 *
 * @param {string} input
 */
function part1(input) {
  const DIRS = ["N", "E", "S", "W"];
  const [acc] = input.split("\n").reduce(
    ([totals, dir], str) => {
      switch (str[0]) {
        case "L":
          return [totals, (4 + dir - +str.slice(1) / 90) % 4];
        case "R":
          return [totals, (dir + +str.slice(1) / 90) % 4];
        case "F":
          totals[DIRS[dir]] += +str.slice(1);
          return [totals, dir];
        default:
          totals[str[0]] += +str.slice(1);
          return [totals, dir];
      }
    },
    [{ W: 0, E: 0, S: 0, N: 0 }, 1]
  );
  return Math.abs(acc.W - acc.E) + Math.abs(acc.S - acc.N);
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} angle
 */
function rotate(x, y, angle) {
  const radians = (Math.PI / 180) * angle,
    cos = Math.cos(radians),
    sin = Math.sin(radians),
    nx = cos * x + sin * y,
    ny = cos * y - sin * x;
  return [nx, ny].map(Math.round);
}

/**
 *
 * @param {string} input
 */
function part2(input) {
  const parsed = input.split("\n");

  const pos = { x: 0, y: 0 };
  const waypoint = { dx: 10, dy: 1 };

  for (const command of parsed) {
    const fn = command[0];
    const arg = Number(command.slice(1));

    switch (fn) {
      case "F": {
        pos.x += waypoint.dx * arg;
        pos.y += waypoint.dy * arg;
        break;
      }
      case "R": {
        const [dx, dy] = rotate(waypoint.dx, waypoint.dy, arg);
        waypoint.dx = dx;
        waypoint.dy = dy;
        break;
      }
      case "L": {
        const [dx, dy] = rotate(waypoint.dx, waypoint.dy, -arg);
        waypoint.dx = dx;
        waypoint.dy = dy;
        break;
      }
      default: {
        const deltas = degToDxDy(dirs[fn]);
        waypoint.dx += deltas.dx * arg;
        waypoint.dy += deltas.dy * arg;
        break;
      }
    }
  }

  return Math.abs(pos.x) + Math.abs(pos.y);
}
