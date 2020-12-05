(ns aoc-2020.core)

(require '[clojure.string :as str])

(load-file "./clj/input.clj")

(defn process-input []
  (->> (fetch-from-aoc 5)
       (str/split-lines)))

(defn bin-search [is-in-left col left right]
  (if (empty? col) left
      (let [mid (/ (- right left) 2)]
        (if (is-in-left (first col))
          (recur is-in-left (drop 1 col) left (- right (int (Math/ceil mid))))
          (recur is-in-left (drop 1 col) (- right (int (Math/floor mid))) right)))))

(defn get-seat-id [line]
  (let [row (bin-search #(= \F %) (subs line 0 7) 0 127)
        col (bin-search #(= \L %) (subs line 7) 0 7)]
    (+ (* row 8) col)))

(defn part1 []
  (->> (process-input)
       (map get-seat-id)
       (apply max)))

(defn find-seat [ids]
  (first
   (for [i (range 1023)
         :when (and (not (contains? ids i)))
         :when (contains? ids (dec i))
         :when (contains? ids (inc i))]
     i)))

(defn part2 []
  (->> (process-input)
       (map get-seat-id)
       (set)
       (find-seat)))

(println "Part 1:" (part1))
(println "Part 2:" (part2))


