import { describe, expect, it, beforeAll } from 'vitest';
import { Drawer } from '../src/Drawer';
import { Blob } from 'node:buffer';
import { CircleIcon } from '../src/icons/circle';

declare global {
  interface Window {
    Blob: any;
  }
}

beforeAll(() => {
  window.Blob = Blob; // use Node.js Blob instead of Jsdom's Blob
  Object.defineProperty((global as any).Image.prototype, 'decode', {
    get() {
      return () => Promise.resolve();
    },
  });
});

describe('API', () => {
  document.body.innerHTML = `<div id="test"></div>`;

  it('custom toolbar', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement, {
      defaultToolbar: false,
      autoSave: false,
    });
    drawer.toolbar.addToolbar();
    drawer.toolbar.addUndoBtn();
    drawer.toolbar.addRedoBtn();
    drawer.toolbar.addBrushBtn();
    drawer.toolbar.addEraserBtn();

    expect(drawer.toolbar.$toolbar).toBeInstanceOf(HTMLDivElement);
    expect(drawer.toolbar.$toolbar.querySelectorAll('button').length).toEqual(4);
  });

  it('setCanvasSize', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    drawer.setCanvasSize(500, 600);
    expect(drawer.$canvas.width).toEqual(500);
    expect(drawer.$canvas.height).toEqual(600);
    // check max-width update of toolbar
    expect(drawer.toolbar.$toolbar.style.maxWidth).toEqual('500px');
  });

  it('setSize', async () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    await drawer.setSize(500, 600);
    expect(drawer.$drawerContainer.style.width).toEqual('500px');
    expect(drawer.$drawerContainer.style.height).toEqual('600px');
    // check max-width update of toolbar
    expect(drawer.toolbar.$toolbar.style.maxWidth).toEqual('500px');
  });

  it('setDottedLine', async () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    await drawer.setDottedLine(true);
    expect(drawer.options.dash).toEqual([10, 5]);
    expect(drawer.dotted).toBe(true);
  });

  it('setLineWidth', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    drawer.setLineWidth(10);
    expect(drawer.ctx.lineWidth).toEqual(10);
  });

  it('setTool', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    drawer.setTool('eraser');
    expect(drawer.activeTool).toEqual('eraser');
    expect(drawer.toolbar.$eraserBtn?.classList.contains('active')).toEqual(true);
  });

  it('setShape', async () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    await drawer.setShape('circle');

    if (drawer.toolbar.$shapeBtn) {
      expect(drawer.toolbar.$shapeBtn.innerHTML).eq(CircleIcon);
    }

    expect(drawer.activeTool).eq('circle');
  });

  it('setColor', async () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    await drawer.setColor('#3e3e3e');
    expect(drawer.options.color).toEqual('#3e3e3e');
    if (drawer.toolbar.$colorPicker) {
      expect(drawer.toolbar.$colorPicker.value).toEqual('#3e3e3e');
    }
    expect(drawer.ctx.fillStyle).toEqual('#3e3e3e');

    // With keyword, converted to hex
    await drawer.setColor('red');
    expect(drawer.options.color).toEqual('red');
    if (drawer.toolbar.$colorPicker) {
      expect(drawer.toolbar.$colorPicker.value).toEqual('red');
    }
    expect(drawer.ctx.fillStyle).toEqual('#ff0000');

    // With rgb
    drawer.setColor('rgb(0, 0, 152)');
    expect(drawer.options.color).toEqual('rgb(0, 0, 152)');
    if (drawer.toolbar.$colorPicker) {
      expect(drawer.toolbar.$colorPicker.value).toEqual('rgb(0, 0, 152)');
    }
    expect(drawer.ctx.fillStyle).toEqual('#000098');

    // With rgba
    drawer.setColor('rgba(0, 0, 152, 0.5)');
    expect(drawer.options.color).toEqual('rgba(0, 0, 152, 0.5)');
    if (drawer.toolbar.$colorPicker) {
      expect(drawer.toolbar.$colorPicker.value).toEqual('rgba(0, 0, 152, 0.5)');
    }
    expect(drawer.ctx.fillStyle).toEqual('rgba(0, 0, 152, 0.5)');
  });

  it('setBgColor', async () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    await drawer.setBgColor('#3e3e3e', false);
    expect(drawer.options.bgColor).toEqual('#3e3e3e');
    // trasnformed from browser
    expect(drawer.$canvas.style.backgroundColor).toEqual('rgb(62, 62, 62)');

    // With keyword, converted to hex
    await drawer.setBgColor('red', false);
    expect(drawer.options.bgColor).toEqual('red');
    expect(drawer.$canvas.style.backgroundColor).toEqual('red');

    // With rgb
    drawer.setBgColor('rgb(0, 0, 152)', false);
    expect(drawer.options.bgColor).toEqual('rgb(0, 0, 152)');
    expect(drawer.$canvas.style.backgroundColor).toEqual('rgb(0, 0, 152)');

    // With rgba
    drawer.setBgColor('rgba(0, 0, 152, 0.5)', false);
    expect(drawer.options.bgColor).toEqual('rgba(0, 0, 152, 0.5)');
    expect(drawer.$canvas.style.backgroundColor).toEqual('rgba(0, 0, 152, 0.5)');
  });

  // it('setCanvasBgColor', async () => {
  //   const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

  //   await drawer.setColor('#3e3e3e');
  //   expect(drawer.options.color).toEqual('#3e3e3e');
  //   if (drawer.toolbar.$colorPicker) {
  //     expect(drawer.toolbar.$colorPicker.value).toEqual('#3e3e3e');
  //   }
  //   expect(drawer.ctx.fillStyle).toEqual('#3e3e3e');

  //   // With keyword, converted to hex
  //   await drawer.setColor('red');
  //   expect(drawer.options.color).toEqual('red');
  //   if (drawer.toolbar.$colorPicker) {
  //     expect(drawer.toolbar.$colorPicker.value).toEqual('red');
  //   }
  //   expect(drawer.ctx.fillStyle).toEqual('#ff0000');

  //   // With rgb
  //   drawer.setColor('rgb(0, 0, 152)');
  //   expect(drawer.options.color).toEqual('rgb(0, 0, 152)');
  //   if (drawer.toolbar.$colorPicker) {
  //     expect(drawer.toolbar.$colorPicker.value).toEqual('rgb(0, 0, 152)');
  //   }
  //   expect(drawer.ctx.fillStyle).toEqual('#000098');

  //   // With rgba
  //   drawer.setColor('rgba(0, 0, 152, 0.5)');
  //   expect(drawer.options.color).toEqual('rgba(0, 0, 152, 0.5)');
  //   if (drawer.toolbar.$colorPicker) {
  //     expect(drawer.toolbar.$colorPicker.value).toEqual('rgba(0, 0, 152, 0.5)');
  //   }
  //   expect(drawer.ctx.fillStyle).toEqual('rgba(0, 0, 152, 0.5)');
  // });

  it('saveDraw', async () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    drawer.saveDraw();

    const saved = localStorage.getItem(drawer.options.localStorageKey) as string;

    expect(saved).not.toBe(null);

    const obj = JSON.parse(saved);

    expect(obj.data).not.eq('');
    expect(obj.bgcolor).not.eq('');
    expect(obj.grid).toBeTypeOf('boolean');
    drawer.clear();
  });

  it('toggle grid', async () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    await drawer.addGrid();

    expect(drawer.options.grid).toBe(true);
    expect(drawer.$canvas.classList.contains('grid')).toBe(true);

    drawer.removeGrid();

    expect(drawer.options.grid).toBe(false);
    expect(drawer.$canvas.classList.contains('grid')).toBe(false);
    drawer.clear();
  });

  it('isShape', async () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    expect(drawer.isShape()).toBe(false);
    await drawer.setShape('circle');
    expect(drawer.isShape()).toBe(true);
  })

  it('clear', async () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    expect(drawer).toBeInstanceOf(Drawer);
    expect(drawer.$canvas).toBeInstanceOf(HTMLCanvasElement);
    await drawer.clear();
    expect(drawer.isEmpty()).toBe(true);
    expect(drawer.undo_list.length).toEqual(0);
    expect(drawer.redo_list.length).toEqual(0);

    if (drawer.toolbar.$undoBtn) {
      expect(drawer.toolbar.$undoBtn.disabled).toBe(true);
    }
    if (drawer.toolbar.$redoBtn) {
      expect(drawer.toolbar.$redoBtn.disabled).toBe(true);
    }

    expect(localStorage.getItem(drawer.options.localStorageKey)).toBe(null);
  });

  it('destroy', async () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    expect(drawer).toBeInstanceOf(Drawer);
    expect(drawer.$canvas).toBeInstanceOf(HTMLCanvasElement);
    drawer.destroy();
    expect(document.body.contains(drawer.$canvas)).toBe(false);
  });
});
