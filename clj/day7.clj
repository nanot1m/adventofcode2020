(ns aoc-2020.core)

(require '[clojure.string :as str])

(load-file "./clj/input.clj")

(defn parse-contains [[c name-l name-r]]
  [(str/join " " [name-l name-r]) (Integer/parseInt c)])

(defn parse-line [partitions]
  [(str/join " " (take 2 (first partitions)))
   (into {} (map parse-contains (rest partitions)))])

(defn process-input []
  (->> (fetch-from-aoc 7)
       (str/split-lines)
       (map #(str/split % #"\s"))
       (map (partial partition 4))
       (map parse-line)
       (into {})))

(def input-map (process-input))

(def my-bag "shiny gold")

(defn has-my-bag? [deps]
  (cond
    (empty? deps) false
    (contains? deps my-bag) true
    :else (->> (keys deps)
               (map input-map)
               (some has-my-bag?))))

(defn part1 []
  (->> input-map
       (filter (partial not= my-bag))
       (filter (fn [[_ deps]] (has-my-bag? deps)))
       (count)))

(defn count-bags [bags-map]
  (->> bags-map
       (map (fn [[bag c]] (+ c (* c (count-bags (input-map bag))))))
       (apply +)))

(defn part2 []
  (->> (count-bags (input-map my-bag))))

(println "Part 1:" (part1))
(println "Part 2:" (part2))
