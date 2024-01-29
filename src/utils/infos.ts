/**
 * Check if is tactil
 */
export function isTactil(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * returns the xy point where the mouse event was occured inside an element.
 * @param {HTMLElement} $canvas
 * @param {MouseEvent | TouchEvent} evt
 */
export function getMousePosition($canvas: HTMLElement | SVGElement, evt: MouseEvent | TouchEvent, relative = true): { x: number; y: number } {
  let posTarget;
  if (evt instanceof TouchEvent) {
    posTarget = evt.touches[0];
    if (evt.type === "touchend") {
      posTarget = evt.changedTouches[0];
    }
  } else {
    posTarget = evt;
  }
  const rect = $canvas.getBoundingClientRect();
  const x = posTarget.clientX;
  const y = posTarget.clientY;

  if (relative) {
    return {
      x: x - rect.left,
      y: y - rect.top,
    };
  }

  return {
    x, y
  }
}
