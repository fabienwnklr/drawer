export const DrawEvent = (name: string, detail: any = "") =>
  new CustomEvent("drawer." + name, { detail });
