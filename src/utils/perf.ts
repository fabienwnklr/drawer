/**
 * permet de déclencher l'appel à une fonction après un certain délai (un peu comme la fonction setTimeout())
 * mais permet en plus de réinitialiser le timer si on demande une nouvelle exécution dans un intervalle de temps plus court que le délai
 *
 * @param {Function} callback Fonction à appeler
 * @param {Number} delay Timeout avant éxécution de la méthode
 * @returns {Function}
 *
 * @example
 * // Define the function that updates the layout
 * function updateLayout() {
 * // Update the layout...
 * }
 * // Create a debounced version of the function
 * const debouncedUpdateLayout = debounce(updateLayout, 250);
 *
 * // Listen for window resize events and call the debounced function
 * window.addEventListener("resize", debouncedUpdateLayout);
 */
export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return function (...args: Parameters<T>[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      callback(...args);
    }, delay);
  };
}
