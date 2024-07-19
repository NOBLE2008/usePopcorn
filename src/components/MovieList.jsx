import React, { useEffect } from "react";
import Button from "./Button";

const MovieList = ({ setIsOpen1, isOpen1, children }) => {
  return (
    <>
      <Button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </Button>
      {isOpen1 ? children : null}
    </>
  );
};

export default MovieList;
