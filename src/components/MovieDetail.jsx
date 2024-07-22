import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";
import { useKey } from "./useKey";

const MovieDetail = ({
  selectedId,
  onCloseMovieDetail,
  onDeleteWatched,
  setSelectedId,
  watched,
  setWatched,
}) => {
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // Your code here to fetch and display movie details based on selectedId
  // You can use a movie API like OMDB API or IMDb API for this purpose

  useKey("keydown", (e) => {
    if (e.code === "Escape") {
      onCloseMovieDetail();
      console.log("added");
    }
  });

  useEffect(
    function () {
      async function getMovieDetails() {
        setError("");
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=897bf7b3&i=${selectedId}`
          ).catch((err) => {
            setError("Error fetching movie details");
          });
          const data = await res.json();
          setMovie(data);
        } catch {
          (err) => setError("Error Fetching");
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
    },
    [selectedId]
  );
  const {
    Title: title,
    Poster: poster,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Director: director,
  } = movie;

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  const handleAdd = () => {
    setWatched((cur) => {
      return [
        ...cur,
        {
          Poster: poster,
          imdbID: selectedId,
          Title: title,
          imdbRating,
          userRating,
          runtime: Number(runtime.split(" ")[0]),
        },
      ];
    });
    onCloseMovieDetail();
  };

  const isWatched = watched?.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched?.find(
    (cur) => cur.imdbID == selectedId
  )?.userRating;
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovieDetail}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    color="gold"
                    setCustomRatingState={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
