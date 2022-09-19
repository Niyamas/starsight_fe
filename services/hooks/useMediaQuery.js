import { useState, useEffect } from "react";

export default function useMediaQuery(query) {
  /**
   * Custom hook for handling responsive design. Takes in
   * a media query that when it matches, it will return true.
   * False if not.
   * 
   * Source & example usage: https://fireship.io/snippets/use-media-query-hook/
   */

  const [matches, setMatches] = useState(false)

  function throttle(func, delay) {
    /**
     * Throttles function firing
     * via a set delay (in ms).
     */

    let inProgress = false;
    return (...args) => {
      if (inProgress) {
        return
      }
      inProgress = true;
      setTimeout(() => {
        func(...args)        // Consider moving this line before the set timeout if you want the very first one to be immediate
        inProgress = false
      }, delay)
    }
  }

  useEffect(() => {

    const media = window.matchMedia(query)

    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = throttle(() => {
      setMatches(media.matches)
    }, 77)

    window.addEventListener("resize", listener)

    return () => window.removeEventListener("resize", listener)
  }, [matches, query])

  return matches
}