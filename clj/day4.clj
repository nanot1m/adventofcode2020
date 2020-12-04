(ns aoc-2020.core)

(require '[clojure.string :as str])
(require '[clojure.pprint :as pp])

(load-file "./clj/input.clj")

(defn process-input []
  (->> (fetch-from-aoc 4)
       (#(str/split % #"\n\n"))
       (map #(str/split % #"\s"))
       (map (partial map #(str/split % #":")))
       (map (partial into {}))))

(def required-fields ["byr" "iyr" "eyr" "hgt" "hcl" "ecl" "pid"])

(defn part1 []
  (->> (process-input)
       (filter
        (fn [passport]
          (every? #(contains? passport %) required-fields)))
       (count)))

(defn parse-int [s]
  (Integer/parseInt (re-find  #"^\d+" s)))

(defn valid-field-in-passport? [field passport]
  (let [value (get passport field)]
    (and (not (nil? value))
         (case field
           "byr" (<= 1920 (parse-int value) 2002)
           "iyr" (<= 2010 (parse-int value) 2020)
           "eyr" (<= 2020 (parse-int value) 2030)
           "hgt" (cond (str/ends-with? value "cm") (<= 150 (parse-int value) 193)
                       (str/ends-with? value "in") (<= 59 (parse-int value) 76)
                       :else false)
           "hcl" (not (nil? (re-matches  #"^\#[0-9a-f]{6}$" value)))
           "ecl" (contains? (set ["amb" "blu" "brn" "gry" "grn" "hzl" "oth"]) value)
           "pid" (not (nil? (re-matches  #"^\d{9}$" value)))))))

(defn part2 []
  (->> (process-input)
       (filter
        (fn [passport]
          (every? #(valid-field-in-passport? % passport) required-fields)))
       (count)))

(println "Part 1:" (part1))
(println "Part 2:" (part2))

