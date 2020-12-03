(ns aoc-2020.core)

(require '[clj-http.client :as http])
(require '[dotenv :refer [env]])

(defn fetch-from-aoc [dayN]
  (:body (http/get "https://adventofcode.com/2020/day/1/input"
                   {:headers {:cookie [(str "session=" (env "SESSION"))]}})))
