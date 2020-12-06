(ns aoc-2020.core)

(require '[clojure.string :as str])

(load-file "./clj/input.clj")

(defn process-input []
  (->> (fetch-from-aoc 6)
       (#(str/split % #"\n\n"))
       (map str/split-lines)))

(defn union-in-group [group]
  (->> group
       (map set)
       (apply clojure.set/union)
       (count)))

(defn part1 []
  (->> (process-input)
       (map union-in-group)
       ((partial apply +))))

(defn intersection-in-group [group]
  (->> group
       (map set)
       (apply clojure.set/intersection)
       (count)))

(defn part2 []
  (->> (process-input)
       (map intersection-in-group)
       ((partial apply +))))

(println "Part 1:" (part1))
(println "Part 2:" (part2))
