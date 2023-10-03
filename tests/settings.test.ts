import { describe, expect, it, beforeAll } from 'vitest';
import { Drawer } from '../src/Drawer';
import { Blob } from 'node:buffer';
import { defaultOptionsDrawer } from '../src/utils/constantes';

declare global {
  interface Window {
    Blob: any;
  }
}

beforeAll(() => {
  window.Blob = Blob; // use Node.js Blob instead of Jsdom's Blob
});

describe('Settings', () => {
  document.body.innerHTML = `<div id="test"></div>`;

  it('Open settings modal', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    drawer.toolbar.$settingBtn?.dispatchEvent(new Event('click'));

    expect(drawer.settingModal.isVisible()).toBe(true);
  });

  it('change globalAlpha (opacity)', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    drawer.toolbar.$settingBtn?.dispatchEvent(new Event('click'));

    expect(drawer.settingModal.$opacitySettingInput).toBeInstanceOf(HTMLInputElement);
    // Default value
    expect(drawer.settingModal.$opacitySettingInput.value).eq(defaultOptionsDrawer.opacity.toString());
    drawer.settingModal.$opacitySettingInput.value = '0.5';
    drawer.settingModal.$opacitySettingInput.dispatchEvent(new Event('change'))
    expect(drawer.options.opacity).eq(0.5);
    expect(drawer.ctx.globalAlpha).eq(0.5);
  });

  it('change fill option', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    drawer.toolbar.$settingBtn?.dispatchEvent(new Event('click'));

    expect(drawer.settingModal.$fillSettingInput).toBeInstanceOf(HTMLInputElement);
    expect(drawer.settingModal.$fillSettingInput.checked).eq(defaultOptionsDrawer.fill);
    drawer.settingModal.$fillSettingInput.checked = !defaultOptionsDrawer.fill;
    drawer.settingModal.$fillSettingInput.dispatchEvent(new Event('change'))
    expect(drawer.options.fill).eq(!defaultOptionsDrawer.fill);
  });

  it('change grid option', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    drawer.toolbar.$settingBtn?.dispatchEvent(new Event('click'));

    expect(drawer.settingModal.$gridSettingInput).toBeInstanceOf(HTMLInputElement);
    expect(drawer.settingModal.$gridSettingInput.checked).eq(defaultOptionsDrawer.grid);
    drawer.settingModal.$gridSettingInput.checked = !defaultOptionsDrawer.grid;
    drawer.settingModal.$gridSettingInput.dispatchEvent(new Event('change'))
    expect(drawer.options.grid).eq(drawer.settingModal.$gridSettingInput.checked);
  });

  it('change guides option', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    drawer.toolbar.$settingBtn?.dispatchEvent(new Event('click'));

    expect(drawer.settingModal.$guidesSettingInput).toBeInstanceOf(HTMLInputElement);
    expect(drawer.settingModal.$guidesSettingInput.checked).eq(defaultOptionsDrawer.guides);
    drawer.settingModal.$guidesSettingInput.checked = !defaultOptionsDrawer.guides;
    drawer.settingModal.$guidesSettingInput.dispatchEvent(new Event('change'))
    expect(drawer.options.guides).eq(!defaultOptionsDrawer.guides);
  });

  it('change xor option', () => {
    const drawer = new Drawer(document.body.querySelector('#test') as HTMLDivElement);

    drawer.toolbar.$settingBtn?.dispatchEvent(new Event('click'));

    expect(drawer.settingModal.$xorSettingInput).toBeInstanceOf(HTMLInputElement);
    expect(drawer.settingModal.$xorSettingInput.checked).eq(defaultOptionsDrawer.xor);
    drawer.settingModal.$xorSettingInput.checked = !defaultOptionsDrawer.xor;
    drawer.settingModal.$xorSettingInput.dispatchEvent(new Event('change'))
    expect(drawer.options.xor).eq(!defaultOptionsDrawer.xor);
  });
});
