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

describe('Basic', () => {
  document.body.innerHTML = `<div id="test"></div>`;

  it('Init single basic drawer', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    expect(drawer).toBeInstanceOf(Drawer);
    expect(drawer.$toolbar).toBeInstanceOf(HTMLDivElement);
    expect(drawer.$toolbar.querySelectorAll('button, input').length).not.toEqual(0);
    expect(drawer.$brushBtn?.classList.contains('active')).toEqual(true);
  });

  it('Init drawer without toolbar', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement, {
      defaultToolbar: false,
      autoSave: false,
    });

    expect(drawer.$toolbar).toBeUndefined();
  });

  it('Init drawer with default toolbar', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    expect(drawer.$toolbar).toBeInstanceOf(HTMLDivElement);
    expect(drawer.$toolbar.childElementCount).toEqual(12);
  });

  it('Init drawer with custom size', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement, {
      height: 200,
      width: 200,
      autoSave: false,
    });
    expect(drawer.$canvas).toBeInstanceOf(HTMLCanvasElement);
    expect(drawer.$canvas.width).toEqual(200);
    expect(drawer.$canvas.height).toEqual(200);
  });
});
