import { describe, expect, it, beforeAll } from 'vitest';
import { Drawer } from '../src/Drawer';
import { Blob } from 'node:buffer';
import { confirmModalDefaultOpts } from '../src/constants';
import { ConfirmModal } from '../src/ui/ConfirmModal';
import { sleep } from '../src/utils/utils';

declare global {
  interface Window {
    Blob: any;
  }
}

beforeAll(() => {
  window.Blob = Blob; // use Node.js Blob instead of Jsdom's Blob
});

describe('Ui', () => {
  document.body.innerHTML = `<div id="test"></div>`;

  it('Open default confirm modal', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement, { autoSave: false });

    const confirm = new ConfirmModal(drawer);
    confirm.show();
    expect(confirm.isVisible()).toBe(true);
    expect(confirm.$modalBody.textContent).toBe(confirmModalDefaultOpts.message);
    expect(confirm.$cancelBtn.textContent).toBe(confirmModalDefaultOpts.cancelLabel);
    expect(confirm.$confirmBtn.textContent).toBe(confirmModalDefaultOpts.confirmLabel);
  });

  it('Open custom confirm modal', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement, { autoSave: false });

    const confirm = new ConfirmModal(drawer, {
      message: 'Test',
      cancelLabel: 'Cancel test',
      confirmLabel: 'Confirm test',
    });

    expect(confirm.isVisible()).toBe(false);
    confirm.show();
    expect(confirm.isVisible()).toBe(true);
    expect(confirm.$modalBody.textContent).toBe('Test');
    expect(confirm.$cancelBtn.textContent).toBe('Cancel test');
    expect(confirm.$confirmBtn.textContent).toBe('Confirm test');
  });

  it('Not open clear confirm modal without change', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement, { autoSave: false });

    drawer.toolbar.$clearBtn?.dispatchEvent(new Event('click'));

    expect(drawer.clearModal).toBe(undefined);
  });

  it('Open clear confirm modal', async () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement, { autoSave: false });

    // draw on canvas for can display confirm clear modal
    // drawer.ctx.
    const path = new Path2D('M 100,100 h 50 v 50 h 50');
    drawer.ctx.stroke(path);
    sleep(500).then(() => {
      drawer.toolbar.$clearBtn?.dispatchEvent(new Event('click'));
      expect(drawer.clearModal).toBeInstanceOf(ConfirmModal);
      expect(drawer.clearModal.isVisible()).toBe(true);
      expect(drawer.clearModal.$cancelBtn?.innerText).toBe(confirmModalDefaultOpts.cancelLabel);
      expect(drawer.clearModal.$cancelBtn?.innerText).toBe(confirmModalDefaultOpts.cancelLabel);
      expect(drawer.clearModal.$confirmBtn?.innerText).toBe(confirmModalDefaultOpts.confirmLabel);
    });
  });
});
