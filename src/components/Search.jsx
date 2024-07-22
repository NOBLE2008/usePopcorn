import React, { useEffect, useRef } from "react";
import Logo from "./Logo";

const Search = ({query, setQuery}) => {
  const inputEl = useRef(null)

  useEffect(function () {
    inputEl.current.focus()
  }, [])

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
