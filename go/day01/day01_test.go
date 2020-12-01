package day01

import (
	"fmt"
	"testing"
)

func TestPart1(t *testing.T) {
	res, success := part1()
	if success == false {
		panic("Part 1 failed")
	}
	println(fmt.Sprintf("Part 1: %d", res))
}

func TestPart2(t *testing.T) {
	res, success := part2()
	if success == false {
		panic("Part 1 failed")
	}
	println(fmt.Sprintf("Part 2: %d", res))
}
