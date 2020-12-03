(ns aoc-2020.core)

(require '[clojure.string :as str])

(load-file "./clj/input.clj")

(defn read-numbers []
  (->> (fetch-from-aoc 1)
       str/split-lines
       (map #(Integer/parseInt %))))

(defn find-two [xs target memo]
  (if (empty? xs)
    nil
    (let [fst (first xs)
          diff (- target fst)]
      (if (contains? memo diff)
        (* fst diff)
        (recur (drop 1 xs) target (conj memo fst))))))

(defn find-three [xs target]
  (let [fst (first xs)
        diff (- target fst)
        tail (drop 1 xs)
        r (find-two tail diff #{})]
    (if (nil? r) (recur tail target) (* fst r))))

(println "Part 1: " (find-two (read-numbers) 2020 #{}))
(println "Part 2: " (find-three (read-numbers) 2020))

