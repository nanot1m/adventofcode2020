package day01

import (
	"strings"

	"../aocutil"
)

func part1() (int, bool) {
	var input = aocutil.FetchFromAoC(1, true)
	var numbers = aocutil.StringsToInts(strings.Split(input, "\n"))

	for idx, i := range numbers {
		for _, j := range numbers[idx:] {
			if i+j == 2020 {
				return i * j, true
			}
		}
	}

	return 0, false
}

func part2() (int, bool) {
	var input = aocutil.FetchFromAoC(1, true)
	var numbers = aocutil.StringsToInts(strings.Split(input, "\n"))

	for iidx, i := range numbers {
		for jidx, j := range numbers[iidx:] {
			for _, k := range numbers[jidx:] {
				if i+j+k == 2020 {
					return i * j * k, true
				}
			}
		}
	}

	return 0, false
}
