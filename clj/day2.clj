(ns aoc-2020.core)

(require '[clojure.string :as str])

(load-file "./clj/input.clj")

(defn parse-line [line]
  (let [[_ left, right, ch, password] (re-matches #"(\d+)-(\d+)\s(\w):\s(\w+)" line)]
    [(Integer/parseInt left),
     (Integer/parseInt right),
     (nth ch 0),
     password]))

(defn read-inputs []
  (->> (fetch-from-aoc 2)
       str/split-lines
       (map parse-line)))

(defn check-min-max [[min max ch password]]
  (let [letter-count (count (filter #(= ch %) password))]
    (<= min letter-count max)))

(defn check-xor [[left right ch password]]
  (let [l (= ch (get password (dec left)))
        r (= ch (get password (dec right)))] (not= l r)))

(println "Part 1:" (count (filter check-min-max (read-inputs))))
(println "Part 2:" (count (filter check-xor (read-inputs))))
