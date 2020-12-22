// @ts-check

require("./solution")({
  input: require("./input").readFromFileSystem,
  solve: (input) => [() => part1(input), () => part2(input)],
});

/**
 * @param {string} input
 */
function part1(input) {
  const [deck1, deck2] = input
    .split("\n\n")
    .map((x) => x.split("\n").slice(1).map(Number));

  while (deck1.length > 0 && deck2.length > 0) {
    const c1 = deck1.shift();
    const c2 = deck2.shift();

    if (c1 > c2) {
      deck1.push(c1, c2);
    } else {
      deck2.push(c2, c1);
    }
  }

  const winnerDeck = deck1.length > 0 ? deck1 : deck2;
  const len = winnerDeck.length;
  return winnerDeck.reduce((a, b, i) => a + b * (len - i), 0);
}

/**
 * @param {string} input
 */
function part2(input) {
  const [deck1, deck2] = input
    .split("\n\n")
    .map((x) => x.split("\n").slice(1).map(Number));

  /**
   * @param {number[]} deck1
   * @param {number[]} deck2
   *
   * @return {0 | 1}
   */
  function play(deck1, deck2) {
    const memo = new Set();
    while (deck1.length > 0 && deck2.length > 0) {
      const key = deck1.join() + "|" + deck2.join();
      if (memo.has(key)) {
        return 0;
      }
      memo.add(key);
      const c1 = deck1.shift();
      const c2 = deck2.shift();

      let winner = 0;
      if (deck1.length >= c1 && deck2.length >= c2) {
        winner = play(deck1.slice(0, c1), deck2.slice(0, c2));
      } else {
        winner = c1 > c2 ? 0 : 1;
      }

      if (winner === 0) {
        deck1.push(c1, c2);
      } else {
        deck2.push(c2, c1);
      }
    }

    return deck1.length > 0 ? 0 : 1;
  }

  const winner = play(deck1, deck2);

  const winnerDeck = winner === 0 ? deck1 : deck2;
  const len = winnerDeck.length;
  return winnerDeck.reduce((a, b, i) => a + b * (len - i), 0);
}
