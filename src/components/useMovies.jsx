import { useEffect, useState } from "react";

export function useMovies(query, callback) {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      callback?.();
      async function fetchData() {
        try {
          if (!query) {
            setError("");
            setMovies([]);
            return;
          }
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=897bf7b3&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Error Fetching Movies 🔍");
          const data = await res.json();
          if (data.Response == "False") {
            setMovies([]);
            throw new Error("No Result Found");
          }
          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchData();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { isLoading, movies, error };
}
