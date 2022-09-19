export default function classNames(...classes) {
  /**
   * Call within any className prop. Prints multiple
   * classes, complete with conditional support.
   * 
   * See: https://www.youtube.com/watch?v=BSoRXk1FIw8
   */
  return classes.filter(Boolean).join(' ')
}