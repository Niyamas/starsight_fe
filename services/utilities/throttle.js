export default function throttle(func, delay) {
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