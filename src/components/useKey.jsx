import { useEffect } from "react";

export function useKey(key, cb){
    useEffect(function () {
        document.addEventListener(key, cb);
        return function () {
          document.removeEventListener(key, cb);
        };
      }, [key,cb]);
}