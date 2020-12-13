(ns aoc-2020.core)

(require '[clojure.string :as str])

(load-file "./clj/input.clj")

(def input (fetch-from-aoc 11))

(defn parse-input [input]
  (->> input
       (str/split-lines)
       (mapv (partial mapv identity))))

(def neighbours
  [[-1 -1] [0 -1]  [1 -1]
   [-1  0]         [1  0]
   [-1  1] [0  1]  [1  1]])

(defn get-adj-occupied-seats [cur-map x y]
  (->> neighbours
       (map (fn [[dx dy]] [(+ y dy) (+ x dx)]))
       (map (partial get-in cur-map))
       (filter (partial = \#))
       (count)))

(defn get-next-state-1 [ch x y input]
  (cond
    (and (= ch \L) (= (get-adj-occupied-seats input x y) 0)) \#
    (and (= ch \#) (> (get-adj-occupied-seats input x y) 3)) \L
    :else ch))

(defn generation [get-next-state cur-map]
  (->>
   (map-indexed
    (fn [y row]
      (into [] (map-indexed (fn [x ch] (get-next-state ch x y cur-map)) row)))
    cur-map)
   (into [])))

(loop [cur-map (parse-input test-input) idx 0]
  (clojure.pprint/pprint cur-map)
  (if (> idx 3) cur-map (recur (generation cur-map) (inc idx))))

(defn stabilize [generation input]
  (loop [cur-map input]
    (let [next-map (generation cur-map)]
      (if (= cur-map next-map)
        next-map
        (recur next-map)))))

(defn part1 []
  (->> input
       (parse-input)
       ((partial stabilize (partial generation get-next-state-1)))
       (flatten)
       (filter (partial = \#))
       (count)))

(defn look-up [input x y dx dy]
  (loop [x' (+ x dx)
         y' (+ y dy)]
    (let [ch (get-in input [y' x'])]
      (if (not= ch \.)
        ch
        (recur (+ x' dx) (+ y' dy))))))

(defn get-visible-occupied-seats [input x y]
  (count (for [[dx dy] neighbours
               :let [ch (look-up input x y dx dy)]
               :when (= ch \#)] ch)))

(defn get-next-state-2 [ch x y input]
  (cond
    (and (= ch \L) (= (get-visible-occupied-seats input x y) 0)) \#
    (and (= ch \#) (> (get-visible-occupied-seats input x y) 4)) \L
    :else ch))

(defn part2 []
  (->> input
       (parse-input)
       ((partial stabilize (partial generation get-next-state-2)))
       (flatten)
       (filter (partial = \#))
       (count)))

(println "Part 1:" (part1))
(println "Part 2:" (part2))
