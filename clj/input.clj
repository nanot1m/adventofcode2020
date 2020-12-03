(ns aoc-2020.core)

(require '[clj-http.client :as http])
(require '[dotenv :refer [env]])

(defn fetch-from-aoc [dayN]
  (:body
   (http/get
    (str "https://adventofcode.com/2020/day/" dayN "/input")
    {:headers {:cookie [(str "session=" (env "SESSION"))]}})))
