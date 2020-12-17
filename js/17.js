// @ts-check
require("./solution")({
  input: () => require("./input").fetchFromAoC(17),
  solve: (input) => [() => part1(input), () => part2(input)],
});

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
function* getNeighbourPositions3d(x, y, z) {
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
        yield [+x + dx, +y + dy, +z + dz];
      }
    }
  }
}

/**
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} w
 */
function* getNeighbourPositions4d(x, y, z, w) {
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
        for (let dw = -1; dw <= 1; dw++) {
          yield [x + dx, y + dy, z + dz, w + dw];
        }
      }
    }
  }
}

/**
 * @param {Record<number,Record<number, Record<number,string>>>} map
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
function getActiveNeighboursCount3d(map, x, y, z) {
  let result = 0;
  for (const [x2, y2, z2] of getNeighbourPositions3d(x, y, z)) {
    if (x !== x2 || y !== y2 || z !== z2) {
      const ch = map[z2]?.[y2]?.[x2];
      if (ch === "#") result++;
    }
  }
  return result;
}

/**
 * @param {Record<number,Record<number, Record<number,Record<number, string>>>>} map
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} w
 */
function getActiveNeighboursCount4d(map, x, y, z, w) {
  let result = 0;
  for (const [x2, y2, z2, w2] of getNeighbourPositions4d(x, y, z, w)) {
    if (x !== x2 || y !== y2 || z !== z2 || w !== w2) {
      const ch = map[w2]?.[z2]?.[y2]?.[x2];
      if (ch === "#") result++;
    }
  }
  return result;
}

/**
 * @param {Record<number,Record<number, Record<number,string>>>} map
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {string} val
 */
function set3d(map, x, y, z, val) {
  map[z] = map[z] || {};
  map[z][y] = map[z][y] || {};
  map[z][y][x] = val;
}

/**
 * @param {Record<number,Record<number, Record<number,Record<number, string>>>>} map
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} w
 * @param {string} val
 */
function set4d(map, x, y, z, w, val) {
  map[w] = map[w] || {};
  map[w][z] = map[w][z] || {};
  map[w][z][y] = map[w][z][y] || {};
  map[w][z][y][x] = val;
}

/**
 *
 * @param {Record<number, Record<number,Record<number, string>>>} map
 * @param {(ch: string, x: number, y: number, z: number) => void} cb
 */
function walk3d(map, cb) {
  Object.entries(map).forEach(([z, slice]) => {
    Object.entries(slice).forEach(([y, row]) => {
      Object.entries(row).forEach(([x, ch]) => {
        cb(ch, +x, +y, +z);
      });
    });
  });
}

/**
 * @param {string} input
 */
function part1(input) {
  /** @type {Record<number,Record<number, Record<number,string>>>} */
  let map = {};

  input.split("\n").forEach((line, y) => {
    line.split("").forEach((ch, x) => {
      set3d(map, x, y, 0, ch);
    });
  });

  for (let i = 0; i < 6; i++) {
    /** @type {Record<number,Record<number, Record<number,string>>>} */
    let nextMap = {};

    walk3d(map, (ch, x, y, z) => {
      for (const [x2, y2, z2] of getNeighbourPositions3d(x, y, z)) {
        const ch = map[z2]?.[y2]?.[x2];
        const nCount = getActiveNeighboursCount3d(map, x2, y2, z2);
        if (ch === "#") {
          if (nCount === 2 || nCount === 3) {
            set3d(nextMap, x2, y2, z2, "#");
          }
        } else {
          if (nCount === 3) {
            set3d(nextMap, x2, y2, z2, "#");
          }
        }
      }
    });

    map = nextMap;
  }

  let result = 0;

  walk3d(map, (ch) => {
    result += Number(ch === "#");
  });

  return result;
}

/**
 *
 * @param {Record<number,Record<number, Record<number,Record<number, string>>>>} map
 * @param {(ch: string, x: number, y: number, z: number, w: number) => void} cb
 */
function walk4d(map, cb) {
  Object.entries(map).forEach(([w, slice3]) => {
    Object.entries(slice3).forEach(([z, slice]) => {
      Object.entries(slice).forEach(([y, row]) => {
        Object.entries(row).forEach(([x, ch]) => {
          cb(ch, +x, +y, +z, +w);
        });
      });
    });
  });
}

/**
 * @param {string} input
 */
function part2(input) {
  /** @type {Record<number,Record<number, Record<number,Record<number, string>>>>} */
  let map = {};

  input.split("\n").forEach((line, y) => {
    line.split("").forEach((ch, x) => {
      set4d(map, x, y, 0, 0, ch);
    });
  });

  for (let i = 0; i < 6; i++) {
    /** @type {Record<number,Record<number, Record<number,Record<number, string>>>>} */
    let nextMap = {};
    /** @type {Record<number,Record<number, Record<number,Record<number, string>>>>} */
    let visited = {};

    walk4d(map, (ch, x, y, z, w) => {
      for (const [x2, y2, z2, w2] of getNeighbourPositions4d(x, y, z, w)) {
        const ch = map[w2]?.[z2]?.[y2]?.[x2];
        const nCount = getActiveNeighboursCount4d(map, x2, y2, z2, w2);
        if (ch === "#") {
          if (nCount === 2 || nCount === 3) {
            set4d(nextMap, x2, y2, z2, w2, "#");
          }
        } else {
          if (nCount === 3) {
            set4d(nextMap, x2, y2, z2, w2, "#");
          }
        }
      }
    });

    map = nextMap;
  }

  let result = 0;

  walk4d(map, (ch) => {
    result += Number(ch === "#");
  });

  return result;
}
