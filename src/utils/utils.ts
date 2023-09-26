/**
 * Convert hex to rgba
 * @param hexCode
 * @param opacity
 * @returns
 */
export function hexToRgbA(hexCode: string, opacity = 1): string {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  /* Backward compatibility for whole number based opacity values. */
  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100;
  }

  return `rgba(${r},${g},${b},${opacity})`;
}

type IIsObject = (item: any) => boolean;

/**
 * @description Method to check if an item is an object. Date and Function are considered
 * an object, so if you need to exclude those, please update the method accordingly.
 * @param item - The item that needs to be checked
 * @return {Boolean} Whether or not @item is an object
 */
export const isObject: IIsObject = (item: any): boolean => {
  return item === Object(item) && !Array.isArray(item);
};

export function isTruthy(t: any): boolean {
  return typeof t !== "undefined" && t !== "" && t !== null;
}

export function deepMerge<T extends object>(target: T, source: T): T {
  if (!source) return target;
  const output = { ...target};
  if (isObject(target) && isObject(source)) {
      Object.keys(source).forEach(key => {
          if (isObject(source[key as keyof T])) {
              if (!(key in target)) {
                  Object.assign(output, { [key]: source[key as keyof T] });
              } else {
                  output[key as keyof object] = deepMerge(target[key as keyof object], source[key as keyof object]);
              }
          } else if (isTruthy(source[key as keyof T])) {
              Object.assign(output, { [key]: source[key as keyof T] });
          }
      });
  }
  return output;
}
