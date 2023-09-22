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
  delay: number = 300
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

/**
 * La fonction throttle permet d'éviter des appels consécutifs en introduisant un délai.
 * Elle servira surtout lorsque l'on écoutera des évènements pouvant se produire un très
 * grand nombre de fois dans un intervalle de temps très court (scroll, resize, mouseMove...).
 *
 * @param {Function} fn Fonction à appeler
 * @param {Number} wait Délai avant de relancer la fonction
 * @returns {Function}
 *
 * @example
 * // Define the function that updates the layout
 * function updateLayout() {
 *   // Update the layout...
 * }
 *
 * // Create a throttled version of the function
 * const throttledUpdateLayout = throttle(updateLayout, 250);
 *
 * // Listen for window scroll events and call the throttled function
 * window.addEventListener("scroll", throttledUpdateLayout);
 */
export function throttle(fn: Function, wait: number = 300): (this: any) => void {
  let inThrottle: boolean, lastFn: ReturnType<typeof setTimeout>, lastTime: number;

  return function (this: any) {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(
        () => {
          if (Date.now() - lastTime >= wait) {
            fn.apply(context, args);
            lastTime = Date.now();
          }
        },
        Math.max(wait - (Date.now() - lastTime), 0)
      );
    }
  };
}
