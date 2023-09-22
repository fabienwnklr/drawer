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

describe('Drawer event', () => {
  document.body.innerHTML = `<div id="test"></div>`;
  const $el = document.body.querySelector('#test') as HTMLDivElement;

  it('init event', async () => {
    let init = false;

    $el.addEventListener('drawer.init', () => {
      init = true;
    });

    const drawer = new Drawer($el);
    expect(init).toBe(true);
  });

  it('update size event', async () => {
    let done = false;
    const drawer = new Drawer($el);
    drawer.$canvas.addEventListener('drawer.update.size', () => {
      done = true;
    });
    await drawer.setSize(150, 150).then(() => {
      expect(done).toBe(true);
    });
  });

  it('update color event', async () => {
    let done = false;
    const drawer = new Drawer($el);
    drawer.$canvas.addEventListener('drawer.update.color', () => {
      done = true;
    });
    await drawer.setColor("red").then(() => {
      expect(done).toBe(true);
    });
  });

  it('update bg color event', async () => {
    let done = false;
    const drawer = new Drawer($el);
    drawer.$canvas.addEventListener('drawer.update.bgColor', () => {
      done = true;
    });
    await drawer.setBgColor("red").then(() => {
      expect(done).toBe(true);
    });
  });

  it('change event', async () => {
    let done = false;
    const drawer = new Drawer($el);
    drawer.$canvas.addEventListener('drawer.change', () => {
      done = true;
    });
    await drawer.clear().then(() => {
      expect(done).toBe(true);
    });
  });
});
