export const DrawEvent = (name: string, detail: unknown = '') => new CustomEvent('drawer.' + name, { detail });
