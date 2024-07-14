import React from 'react'
import Button from './Button'

const MovieList = ({setIsOpen1, isOpen1, movies, children}) => {
  return (
    <>
          <Button
            className="btn-toggle"
            onClick={() => setIsOpen1((open) => !open)}
          >
            {isOpen1 ? "–" : "+"}
          </Button>
          {isOpen1 && (
            <ul className="list">
              {children}
            </ul>
          )}
          </>
  )
}

export default MovieList
