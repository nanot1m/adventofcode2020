// @ts-check

require("./solution")({
  input: require("./input").fetchFromAoC,
  solve: (input) => [() => part1(input), () => part2(input)],
});

/**
 * @param {string} input
 */
function part1(input) {
  const lines = input.split("\n");

  const allergensMap = new Map();
  const allIngredients = [];

  for (const line of lines) {
    const [ingredients, allergens] = line
      .slice(0, -1)
      .split(" (contains ")
      .map((x) => x.split(/\,?\s/));

    allergens.forEach((a) => {
      if (allergensMap.has(a)) {
        const ings = allergensMap.get(a);
        const nextIngs = ings.filter((i) => ingredients.includes(i));
        allergensMap.set(a, nextIngs);
      } else {
        allergensMap.set(a, ingredients);
      }
    });

    ingredients.forEach((i) => allIngredients.push(i));
  }

  const ingredientsMap = new Map();

  for (const [allergen, ingredients] of allergensMap) {
    ingredients.forEach((i) => {
      if (!ingredientsMap.has(i)) {
        ingredientsMap.set(i, new Set());
      }
      ingredientsMap.get(i).add(allergen);
    });
  }

  const result = [];
  allIngredients.forEach((i) => {
    const allergens = ingredientsMap.get(i);
    if (!allergens) {
      result.push(i);
    }
  });

  return result.length;
}

/**
 * @param {string} input
 */
function part2(input) {
  const lines = input.split("\n");

  const allergensMap = new Map();
  const ingredientSet = new Set();
  for (const line of lines) {
    const [ingredients, allergens] = line
      .slice(0, -1)
      .split(" (contains ")
      .map((x) => x.split(/\,?\s/));

    allergens.forEach((a) => {
      if (allergensMap.has(a)) {
        const ings = allergensMap.get(a);
        const nextIngs = ings.filter((i) => ingredients.includes(i));
        allergensMap.set(a, nextIngs);
      } else {
        allergensMap.set(a, ingredients);
      }
    });

    ingredients.forEach((i) => ingredientSet.add(i));
  }

  const maxLen = Math.max(...[...allergensMap].map(([k, v]) => v.length));

  const knownAllergensMap = new Map();

  for (let _ = 0; _ < maxLen; _++) {
    allergensMap.forEach((ings, allergen) => {
      const ing = ings.filter((i) => !knownAllergensMap.has(i));
      if (ing.length === 1) {
        knownAllergensMap.set(ing[0], allergen);
      }
      allergensMap.set(allergen, ing);
    });
  }

  return [...knownAllergensMap]
    .sort(([, aA], [, aB]) => (aA < aB ? -1 : 1))
    .map(([a]) => a)
    .join(",");
}
