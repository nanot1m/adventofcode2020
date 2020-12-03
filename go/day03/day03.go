package day03

import (
	"strings"

	"../aocutil"
)

func part1() int {
	return calcTrees(processInput(), 3, 1)
}

func part2() int {
	input := processInput()
	result := calcTrees(input, 1, 1) *
		calcTrees(input, 3, 1) *
		calcTrees(input, 5, 1) *
		calcTrees(input, 7, 1) *
		calcTrees(input, 1, 2)
	return result
}

func processInput() []string {
	input := aocutil.FetchFromAoC(3, true)
	return strings.Split(input, "\n")
}

var tree = '#'

func calcTrees(mountain []string, dx int, dy int) int {
	x := 0
	y := 0
	result := 0

	for y < len(mountain) {
		if rune(mountain[y][x%len(mountain[0])]) == tree {
			result++
		}
		x += dx
		y += dy
	}

	return result
}
