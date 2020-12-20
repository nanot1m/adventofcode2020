// @ts-check

require("./solution")({
  input: () => require("./input").fetchFromAoC(20),
  solve: (input) => [() => part1(input), () => part2(input)],
});

/**
 * @typedef {string[]} Tile
 */

/**
 * @param {string} input
 */
function part1(input) {
  const tileMap = parseInput(input);
  const { corners } = getCornersAndAdjMap(tileMap);
  return corners.reduce((a, b) => a * Number(b), 1);
}

/**
 * @param {string} input
 */
function part2(input) {
  const tileMap = parseInput(input);

  const { adjMap, corners } = getCornersAndAdjMap(tileMap);

  const grid = buildGrid(tileMap, adjMap, corners[0]);

  const image = rotateImage(buildImageFromGrid(grid));

  const monsterSize = MONSTER_IMAGE.flatMap((x) =>
    x.split("").filter((y) => y === "1")
  ).length;

  const imageLen = image.flatMap((x) => x.split("").filter((y) => y === "#"))
    .length;

  return imageLen - monsterSize * countMonsters(image);
}

/**
 * @param {string} input
 *
 * @return {Map<string, Tile>}
 */
function parseInput(input) {
  const tiles = input.split("\n\n");
  /** @type {Array<[string, Tile]>} */
  const tilePairs = tiles
    .map((tile) => tile.split("\n"))
    .map(([name, ...body]) => [name.slice(5, 9), body]);
  const tileMap = new Map(tilePairs);
  return tileMap;
}

/**
 * @param {Map<string, Tile>} tileMap
 */
function getCornersAndAdjMap(tileMap) {
  let corners = [];

  /** @type {Map<string, string[]>}*/
  const adjMap = new Map();
  for (const [nameA, tileA] of tileMap) {
    const adj = [];
    for (const [nameB, tileB] of tileMap) {
      if (nameA === nameB) continue;
      if (isAdj(tileA, tileB)) adj.push(nameB);
    }
    adjMap.set(nameA, adj);
    if (adj.length === 2) {
      corners.push(nameA);
    }
  }
  return { corners, adjMap };
}

/**
 *
 * @param {Tile} sourceTile
 * @param {Tile} targetTile
 */
function isOnRight(sourceTile, targetTile) {
  return sourceTile.every(
    (tile, idx) => tile[tile.length - 1] === targetTile[idx][0]
  );
}

/**
 * @param {Tile} sourceTile
 * @param {Tile} targetTile
 */
function isOnLeft(sourceTile, targetTile) {
  return sourceTile.every(
    (tile, idx) => tile[0] === targetTile[idx][targetTile[idx].length - 1]
  );
}

/**
 * @param {Tile} sourceTile
 * @param {Tile} targetTile
 */
function isOnTop(sourceTile, targetTile) {
  return sourceTile[0] === targetTile[targetTile.length - 1];
}

/**
 * @param {Tile} sourceTile
 * @param {Tile} targetTile
 */
function isOnBot(sourceTile, targetTile) {
  return sourceTile[sourceTile.length - 1] === targetTile[0];
}

/**
 * @param {Tile} tile
 */
function rotateL(tile) {
  return Array.from(Array(tile.length), (_, idx) =>
    tile.map((l) => l[l.length - 1 - idx]).join("")
  );
}

/**
 * @param {Tile} tile
 */
function flipV(tile) {
  return Array.from(
    Array(tile.length),
    (_, idx) => tile[tile.length - 1 - idx]
  );
}

/**
 * @param {Tile} tile
 */
function flipH(tile) {
  return Array.from(Array(tile.length), (_, y) =>
    Array.from(tile[y], (_, x) => tile[y][tile[y].length - 1 - x]).join("")
  );
}

/**
 * @param {Tile} sourceTile
 * @param {Tile} targetTile
 */
function isAdj(sourceTile, targetTile) {
  for (let i = 0; i < 4; i++) {
    if (isOnTop(sourceTile, targetTile))
      return { tile: sourceTile, dir: "Top" };
    if (isOnRight(sourceTile, targetTile))
      return { tile: sourceTile, dir: "Right" };
    if (isOnBot(sourceTile, targetTile))
      return { tile: sourceTile, dir: "Bottom" };
    if (isOnLeft(sourceTile, targetTile))
      return { tile: sourceTile, dir: "Left" };
    sourceTile = flipV(sourceTile);
    if (isOnTop(sourceTile, targetTile))
      return { tile: sourceTile, dir: "Top" };
    if (isOnRight(sourceTile, targetTile))
      return { tile: sourceTile, dir: "Right" };
    if (isOnBot(sourceTile, targetTile))
      return { tile: sourceTile, dir: "Bottom" };
    if (isOnLeft(sourceTile, targetTile))
      return { tile: sourceTile, dir: "Left" };
    sourceTile = flipV(sourceTile);
    sourceTile = flipH(sourceTile);
    if (isOnTop(sourceTile, targetTile))
      return { tile: sourceTile, dir: "Top" };
    if (isOnRight(sourceTile, targetTile))
      return { tile: sourceTile, dir: "Right" };
    if (isOnBot(sourceTile, targetTile))
      return { tile: sourceTile, dir: "Bottom" };
    if (isOnLeft(sourceTile, targetTile))
      return { tile: sourceTile, dir: "Left" };
    sourceTile = flipH(sourceTile);
    sourceTile = rotateL(sourceTile);
  }
  return null;
}

/**
 * @param {string} tileName
 * @param {Tile} tile
 * @param {Map<string, string[]>} adjMap
 * @param {Map<string, Tile>} tileMap
 */
function getRotatedTiles(tileName, tile, adjMap, tileMap) {
  const adjTiles = adjMap.get(tileName);
  const tiles = [];
  for (const adjTile of adjTiles) {
    const rotatedTile = isAdj(tileMap.get(adjTile), tile);
    tiles.push({ ...rotatedTile, name: adjTile });
  }
  return tiles;
}

const MONSTER_IMAGE = [
  "                  # ",
  "#    ##    ##    ###",
  " #  #  #  #  #  #   ",
].map((x) => x.replace(/\s/g, "0").replace(/\#/g, "1"));

const MONSTER_WIDTH = MONSTER_IMAGE[0].length;

/**
 * @param {Tile} image
 */
function countMonsters(image) {
  let result = 0;
  for (let y = 0; y < image.length - 2; y++) {
    for (let x = 0; x < image[y].length - MONSTER_WIDTH; x++) {
      result += Number(isMonsterAtPos(image, x, y));
    }
  }
  return result;
}

/**
 * @param {Tile} image
 * @param {number} x
 * @param {number} y
 */
function isMonsterAtPos(image, x, y) {
  for (let dy = 0; dy < MONSTER_IMAGE.length; dy++) {
    const slice = image[y + dy]
      .slice(x, x + MONSTER_WIDTH)
      .replace(/\./g, "0")
      .replace(/\#/g, "1");
    const sliceBits = parseInt(slice, 2);
    const monsterBits = parseInt(MONSTER_IMAGE[dy], 2);
    if ((sliceBits & monsterBits) !== monsterBits) {
      return false;
    }
  }
  return true;
}

/**
 * @param {Map<string, Tile>} tileMap
 * @param {Map<string, string[]>} adjMap
 * @param {string} init
 */
function buildGrid(tileMap, adjMap, init) {
  /** @type {Record<number, Record<number, Tile>>} */
  const grid = { 0: { 0: tileMap.get(init) } };
  /** @type {Array<[string, Tile, {x: number, y: number}]>} */
  const queue = [[init, tileMap.get(init), { x: 0, y: 0 }]];

  let visited = new Set();
  while (queue.length) {
    const [tileName, tile, { x, y }] = queue.shift();
    if (visited.has(tileName)) {
      continue;
    }
    visited.add(tileName);
    const rotatedTiles = getRotatedTiles(tileName, tile, adjMap, tileMap);
    for (const rotatedTile of rotatedTiles) {
      let pos = { x, y };
      switch (rotatedTile.dir) {
        case "Top": {
          pos = { x, y: y + 1 };
          break;
        }
        case "Right": {
          pos = { x: x - 1, y };
          break;
        }
        case "Bottom": {
          pos = { x, y: y - 1 };
          break;
        }
        case "Left": {
          pos = { x: x + 1, y };
          break;
        }
      }
      grid[pos.y] = grid[pos.y] || {};
      grid[pos.y][pos.x] = rotatedTile.tile;
      queue.push([rotatedTile.name, rotatedTile.tile, pos]);
    }
  }

  return grid;
}

/**
 * @param {Tile} image
 */
function rotateImage(image) {
  for (let i = 0; i < 4; i++) {
    if (countMonsters(image) > 0) break;
    image = flipH(image);

    if (countMonsters(image) > 0) break;
    image = flipH(image);
    image = flipV(image);

    if (countMonsters(image) > 0) break;
    image = flipV(image);
    image = rotateL(image);
  }
  return image;
}

/**
 * @param {Record<string, Record<string, Tile>>} grid
 */
function buildImageFromGrid(grid) {
  const ys = Object.keys(grid).map(Number);
  const xs = Object.keys(grid[0]).map(Number);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);

  let image = [];

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      let tile = grid[y][x].slice(1, -1);
      tile.forEach((line, lineY) => {
        const iY = y * tile.length + lineY + Math.abs(minY) * tile.length;
        image[iY] = image[iY] ?? "";
        image[iY] += line.slice(1, -1);
      });
    }
  }
  return image;
}
