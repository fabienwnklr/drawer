export class DrawerError extends Error {
  constructor(err: any) {
    super(err.message);

    this.name = `DrawerError`;
    this.stack = err.stack;
  }
}
