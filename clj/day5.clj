(ns aoc-2020.core)

(require '[clojure.string :as str])

(load-file "./clj/input.clj")

(defn process-input []
  (->> (fetch-from-aoc 5)
       (str/split-lines)))

(defn get-seat-id [line]
  (->> line
       (#(str/replace % #"[FL]" "0"))
       (#(str/replace % #"[BR]" "1"))
       (#(Integer/parseInt % 2))))

(defn part1 []
  (->> (process-input)
       (map get-seat-id)
       (apply max)))

(defn find-seat [ids]
  (first
   (for [i (range 1023)
         :when (not (contains? ids i))
         :when (contains? ids (dec i))
         :when (contains? ids (inc i))] i)))

(defn part2 []
  (->> (process-input)
       (map get-seat-id)
       (set)
       (find-seat)))

(println "Part 1:" (part1))
(println "Part 2:" (part2))
