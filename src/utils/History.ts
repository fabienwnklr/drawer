import { DrawerError } from './DrawError';

export class History {
  redo_list: string[] = [];
  undo_list: string[] = [];
  $canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;

  saveState(list?: string[], keep_redo?: boolean) {
    keep_redo = keep_redo ?? false;
    if (!keep_redo) {
      this.redo_list = [];
    }

    (list ?? this.undo_list).push(this.$canvas.toDataURL());
  }

  undo() {
    return new Promise((resolve, reject) => {
      try {
        this.restoreState(this.undo_list, this.redo_list, resolve);
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  redo() {
    return new Promise((resolve, reject) => {
      try {
        this.restoreState(this.redo_list, this.undo_list, resolve);
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  restoreState(pop: string[], push: string[], cb?: (v: boolean) => void) {
    if (pop.length) {
      this.saveState(push, true);
      const restore_state = pop.pop();

      if (restore_state) {
        const img = document.createElement('img');
        img.src = restore_state;
        img.onload = () => {
          this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
          this.ctx.drawImage(
            img,
            0,
            0,
            this.$canvas.width,
            this.$canvas.height,
            0,
            0,
            this.$canvas.width,
            this.$canvas.height
          );

          if (typeof cb === 'function') cb(true);
        };
      }
    }
  }

  setCanvas($canvas: HTMLCanvasElement) {
    this.$canvas = $canvas;
    this.ctx = $canvas.getContext('2d') as CanvasRenderingContext2D;
  }
}
