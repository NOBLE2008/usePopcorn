import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import MovieList from "./components/MovieList";
import WatchedMovieList from "./components/WatchedMovieList";
import Logo from "./components/Logo";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Box from "./components/Box";
import Movie from "./components/Movie";
import WatchedMovie from "./components/WatchedMovie";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetail from "./components/MovieDetail";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [watched, setWatched] = useState(function (){
    return JSON.parse(localStorage.getItem("watched")) || [];
  });
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  useEffect(
    function () {
      const controller = new AbortController();
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

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));



  const onSelectMovie = (id) => {
    return () => {
      selectedId == id ? setSelectedId(null) : setSelectedId(id);
    };
  };

  const onDeleteWatched = (id) => {
    return () => {
      console.log("onDeleteWatched");
      setWatched((cur) => {
        return cur.filter((watched) => watched.imdbID !== id);
      });
    };
  };

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          <MovieList setIsOpen1={setIsOpen1} isOpen1={isOpen1}>
            {isLoading && (
              <div className="loader">
                <Loader />
              </div>
            )}
            {!isLoading && !error && query && (
              <ul className="list list-movies">
                {movies.map((movie, i) => (
                  <Movie movie={movie} key={i} onSelectMovie={onSelectMovie} />
                ))}
              </ul>
            )}
            {error && (
              <div className="error">
                <ErrorMessage message={error} />
              </div>
            )}
            {!query && (
              <div className="error">
                <p>Start searching for Movies</p>
              </div>
            )}
          </MovieList>
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetail
              selectedId={selectedId}
              watched={watched}
              setWatched={setWatched}
              setSelectedId={setSelectedId}
              onCloseMovieDetail={() => {
                setSelectedId(null);
              }}
            />
          ) : (
            <WatchedMovieList
              isOpen2={isOpen2}
              setIsOpen2={setIsOpen2}
              watched={watched}
              avgImdbRating={avgImdbRating}
              avgRuntime={avgRuntime}
              avgUserRating={avgUserRating}
            >
              {watched.map((movie, i) => (
                <WatchedMovie
                  movie={movie}
                  key={i}
                  onDeleteWatched={onDeleteWatched}
                />
              ))}
            </WatchedMovieList>
          )}
        </Box>
      </Main>
    </>
  );
}
