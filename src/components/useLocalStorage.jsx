import { useEffect, useState } from "react";

export function useLocalStorage(key, initialState){

    const [value, setValue] = useState(function () {
        return localStorage.getItem("watched")
          ? JSON.parse(localStorage.getItem(key))
          : initialState;
      });

      useEffect(
        function () {
          localStorage.setItem("watched", JSON.stringify(value));
        },
        [value]
      );

      return [value, setValue]
}