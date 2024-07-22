import React from "react";
import Button from "./Button";

const WatchedMovieList = ({
  isOpen2,
  setIsOpen2,
  watched,
  avgImdbRating,
  avgUserRating,
  avgRuntime,
  children,
}) => {
  return (
    <>
      <Button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </Button>
      {isOpen2 && (
        <>
          <div className="summary">
            <h2>Movies you watched</h2>
            <div>
              <p>
                <span>#️⃣</span>
                <span>
                  {watched.length} {watched.length > 1 ? "movies" : "movie"}
                </span>
              </p>
              <p>
                <span>⭐️</span>
                <span>{avgImdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{avgUserRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
              </p>
            </div>
          </div>

          <ul className="list">{children}</ul>
        </>
      )}
    </>
  );
};

export default WatchedMovieList;
