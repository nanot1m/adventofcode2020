(ns aoc-2020.core)

(require '[clojure.string :as str])

(load-file "./clj/input.clj")

(defn read-map []
  (->> (fetch-from-aoc 3)
       str/split-lines))

(defn calc-trees [mountain-map [dx dy]]
  (let [height (count mountain-map)
        width (count (nth mountain-map 0))
        helper (fn [x y acc]
                 (let [obj (get-in mountain-map [y (mod x width)])]
                   (if (>= y height)
                     acc
                     (recur (+ x dx) (+ y dy) (if (= obj \#) (+ acc 1) acc)))))]
    (helper 0 0 0)))

(println "Part 1:" (calc-trees (read-map) [3 1]))
(println "Part 2:" (->> [[1 1] [3 1] [5 1] [7 1] [1 2]]
                        (map #(calc-trees (read-map) %))
                        (reduce *)))
