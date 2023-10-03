import { describe, expect, it, beforeAll } from 'vitest';
import { Drawer } from '../src/Drawer';
import { Blob } from 'node:buffer';

declare global {
  interface Window {
    Blob: any;
  }
}

beforeAll(() => {
  window.Blob = Blob; // use Node.js Blob instead of Jsdom's Blob
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

  it('setSize', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    drawer.setSize(500, 600);
    expect(drawer.$canvas.width).toEqual(500);
    expect(drawer.$canvas.height).toEqual(600);
    // check max-width update of toolbar
    expect(drawer.toolbar.$toolbar.style.maxWidth).toEqual('500px');
  });

  it('setLineWidth', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    drawer.setLineWidth(10);
    expect(drawer.ctx.lineWidth).toEqual(10);
  });

  it('changeTool', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    drawer.changeTool('eraser');
    expect(drawer.activeTool).toEqual('eraser');
    expect(drawer.toolbar.$eraserBtn?.classList.contains('active')).toEqual(true);
  });

  it('setColor', async () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    await drawer.setColor('#3e3e3e');
    expect(drawer.options.color).toEqual('#3e3e3e');
    expect(drawer.toolbar.$colorPicker?.value).toEqual('#3e3e3e');
    expect(drawer.ctx.fillStyle).toEqual('#3e3e3e');

    // With keyword, converted to hex
    await drawer.setColor('red');
    expect(drawer.options.color).toEqual('red');
    expect(drawer.toolbar.$colorPicker?.value).toEqual('red');
    expect(drawer.ctx.fillStyle).toEqual('#ff0000');

    // With rgb
    drawer.setColor('rgb(0, 0, 152)');
    expect(drawer.options.color).toEqual('rgb(0, 0, 152)');
    expect(drawer.toolbar.$colorPicker?.value).toEqual('rgb(0, 0, 152)');
    expect(drawer.ctx.fillStyle).toEqual('#000098');

    // With rgba
    drawer.setColor('rgba(0, 0, 152, 0.5)');
    expect(drawer.options.color).toEqual('rgba(0, 0, 152, 0.5)');
    expect(drawer.toolbar.$colorPicker?.value).toEqual('rgba(0, 0, 152, 0.5)');
    expect(drawer.ctx.fillStyle).toEqual('rgba(0, 0, 152, 0.5)');
  });
});
