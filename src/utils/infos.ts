/**
 * Check if is tactil
 */
export function isTactil(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * returns the xy point where the mouse event was occured inside an element.
 * @param {HTMLElement} $canvas
 * @param {PointerEvent} evt
 */
export function getMousePosition($canvas: HTMLElement | SVGElement, evt: PointerEvent): { x: number; y: number } {
  const rect = $canvas.getBoundingClientRect();

  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}
