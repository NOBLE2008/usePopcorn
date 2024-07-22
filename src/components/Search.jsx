import React, { useEffect, useRef } from "react";
import Logo from "./Logo";

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useEffect(function () {
    inputEl.current.focus();
  }, []);

  useEffect(function () {
    const cb = (e) => {
      if (document.activeElement === inputEl.current && e.code === "Enter") {
        inputEl.current.blur();
        return;
      } else {
        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }
    };
    document.addEventListener("keydown", cb);
    return function () {
      document.removeEventListener("keydown", cb);
    };
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

export default Search;
