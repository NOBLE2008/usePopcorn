import React, { useEffect } from "react";
import Logo from "./Logo";

const Search = ({query, setQuery}) => {
  useEffect(() => {
    const input = document.querySelector('.search')
    input.focus()
  }, [])
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

export default Search;
