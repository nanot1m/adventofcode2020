// @ts-check

require("./solution")({
  input: require("./input").fetchFromAoC,
  solve: (input) => [() => part1(input), () => part2(input)],
});

/**
 *
 * @param {string} input
 */
function part1(input) {
  const nums = input.split("").map(Number);

  let cur = solve(nums, 100);

  let result = "";
  for (let i = 0; i < nums.length - 1; i++) {
    cur = cur.next;
    result += cur.val;
  }

  return result;
}

/**
 * @param {string} input
 */
function part2(input) {
  const nums = input.split("").map(Number);

  let n = nums.length + 1;
  for (let i = n; i <= 1_000_000; i++) {
    nums.push(i);
  }

  const cur = solve(nums, 10_000_000);

  return cur.next.val * cur.next.next.val;
}

/**
 * @typedef {{val: number, next: ListNode | null}} ListNode
 */

/**
 * @param {number} val
 *
 * @returns {ListNode}
 */
function listNode(val) {
  return { val, next: null };
}

/**
 * @param {number[]} xs
 */
function toList(xs) {
  let first = listNode(xs[0]);
  let root = first;
  for (let i = 1; i < xs.length; i++) {
    let next = listNode(xs[i]);
    root.next = next;
    root = next;
  }
  root.next = first;
  return first;
}

/**
 * @param {number[]} nums
 * @param {number} steps
 *
 * @return {ListNode}
 */
function solve(nums, steps) {
  const listSize = nums.length;
  let cur = toList(nums);

  /** @type {ListNode[]}*/
  const nodeMap = [];
  let head = cur;
  for (let i = 0; i < listSize; i++) {
    nodeMap[head.val] = head;
    head = head.next;
  }

  for (let _ = 0; _ < steps; _++) {
    const sliceHead = cur.next;
    const sliceTail = sliceHead.next.next;

    // removing slice from list
    cur.next = sliceTail.next;

    let destinationVal = cur.val - 1 || listSize;
    while (
      sliceHead.val === destinationVal ||
      sliceHead.next.val === destinationVal ||
      sliceTail.val === destinationVal
    ) {
      destinationVal = destinationVal - 1 || listSize;
    }
    const destination = nodeMap[destinationVal];

    // inserting slice to destination
    sliceTail.next = destination.next;
    destination.next = sliceHead;

    cur = cur.next;
  }

  while (cur.val !== 1) {
    cur = cur.next;
  }

  return cur;
}
