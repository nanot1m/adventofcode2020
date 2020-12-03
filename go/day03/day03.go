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
	result := 1
	for _, slope := range [][2]int{{1, 1}, {3, 1}, {5, 1}, {7, 1}, {1, 2}} {
		result *= calcTrees(input, slope[0], slope[1])
	}
	return result
}

func processInput() []string {
	input := aocutil.FetchFromAoC(3, true)
	return strings.Split(input, "\n")
}

func calcTrees(mountain []string, dx int, dy int) int {
	result := 0

	for x, y := 0, 0; y < len(mountain); x, y = x+dx, y+dy {
		if []rune(mountain[y])[x%len(mountain[0])] == '#' {
			result++
		}
	}

	return result
}
