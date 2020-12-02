package day02

import (
	"strconv"
	"strings"

	"../aocutil"
)

// PasswordPattern .
type PasswordPattern struct {
	letter string
	left   int
	right  int
}

// PasswordConfig .
type PasswordConfig struct {
	password string
	pattern  PasswordPattern
}

func processInput() []PasswordConfig {
	input := aocutil.FetchFromAoC(2, true)
	lines := strings.Split(input, "\n")

	passwordConfigs := []PasswordConfig{}

	for _, line := range lines {
		configPair := strings.Split(line, ": ")
		password := configPair[1]
		patternPair := strings.Split(configPair[0], " ")
		letter := patternPair[1]
		pair := strings.Split(patternPair[0], "-")
		left, err := strconv.Atoi(pair[0])
		if err != nil {
			panic(err)
		}
		right, err := strconv.Atoi(pair[1])
		if err != nil {
			panic(err)
		}
		cfg := PasswordConfig{password, PasswordPattern{letter, left, right}}
		passwordConfigs = append(passwordConfigs, cfg)
	}

	return passwordConfigs
}

// Part1 .
func Part1() int {
	return len(Filter(processInput(), func(cfg PasswordConfig) bool {
		letterCount := strings.Count(cfg.password, cfg.pattern.letter)

		return letterCount >= cfg.pattern.left &&
			letterCount <= cfg.pattern.right
	}))
}

// Part2 .
func Part2() int {
	return len(Filter(processInput(), func(cfg PasswordConfig) bool {
		lChar := string(cfg.password[cfg.pattern.left-1]) == cfg.pattern.letter
		rChar := string(cfg.password[cfg.pattern.right-1]) == cfg.pattern.letter
		return lChar != rChar
	}))
}

// Filter .
func Filter(vs []PasswordConfig, f func(PasswordConfig) bool) []PasswordConfig {
	vsf := make([]PasswordConfig, 0)
	for _, v := range vs {
		if f(v) {
			vsf = append(vsf, v)
		}
	}
	return vsf
}
