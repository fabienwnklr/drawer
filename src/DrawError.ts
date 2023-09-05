export class DrawerError extends Error {
    constructor(msg: string) {
      super(msg);

      this.name = `DrawerError`;
    }
  }
