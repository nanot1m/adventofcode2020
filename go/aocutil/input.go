package aocutil

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
)

// FetchFromAoC - fetches data from adventofcode.com/2020/day/%d/input
func FetchFromAoC(dayN int, trim bool) string {
	url := fmt.Sprintf("https://adventofcode.com/2020/day/%d/input", dayN)

	client := &http.Client{}
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("cookie", fmt.Sprintf("session=%s", os.Getenv("SESSION")))
	res, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}

	input, err := ioutil.ReadAll(res.Body)
	res.Body.Close()
	if err != nil {
		log.Fatal(err)
	}

	if trim {
		return strings.TrimSpace(string(input))
	}

	return string(input)
}

// StringsToInts - converts lists of strings to list of ints
func StringsToInts(strs []string) []int {
	numbers := []int{}
	for _, line := range strs {
		num, err := strconv.Atoi(line)
		if err != nil {
			panic(err)
		}
		numbers = append(numbers, num)
	}
	return numbers
}
