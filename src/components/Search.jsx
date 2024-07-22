import React, { useEffect, useRef } from "react";
import Logo from "./Logo";
import { useKey } from "./useKey";

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useEffect(function () {
    inputEl.current.focus();
  }, []);

  useKey("keydown", function cb(e) {
    if (document.activeElement === inputEl.current && e.code === "Enter") {
      inputEl.current.blur();
      console.log("it");
      return;
    } else {
      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }
  });

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
