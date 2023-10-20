import Coloris from '@melloware/coloris';
import type { Drawer } from '../Drawer';
import { Modal } from './Modal';
import { GithubIcon } from '../icons/github';

export class SettingsModal extends Modal {
  filled: boolean;
  grid: boolean;
  guides: boolean;
  opacity: number;
  xor: boolean;
  bgColor: string;

  drawer: Drawer;
  $fillSettingInput!: HTMLInputElement;
  $gridSettingInput!: HTMLInputElement;
  $guidesSettingInput!: HTMLInputElement;
  $opacitySettingInput!: HTMLInputElement;
  $xorSettingInput!: HTMLInputElement;
  $bgCologSettingInput!: HTMLInputElement;

  constructor(drawer: Drawer) {
    super(drawer, { title: 'Settings' });
    this.drawer = drawer;
    this.filled = drawer.options.fill;
    this.grid = drawer.options.grid;
    this.guides = drawer.options.guides;
    this.opacity = drawer.options.opacity;
    this.xor = drawer.options.xor;
    this.bgColor = drawer.options.bgColor;
    this.fill();
    this._setupSelectors();
    this._initEvents();
  }

  /**
   * Fill the content modal
   */
  fill() {
    this.setBodyContent(/*html*/ `
      <ul class="drawer-modal-body-list">
        <li class="drawer-modal-body-list-item">
          <label for="setting-bgcolor-${this.drawer.options.id}">Background color (🚨 this removing all draw)</label>
          <input tabindex="-1" class="btn" id="setting-bgcolor-${this.drawer.options.id}"  name="bgcolor-${
            this.drawer.options.id
          }" type="texr" data-coloris value="${this.bgColor}"/>
        </li>
        <li class="drawer-modal-body-list-item">
          <label for="setting-opacity-${this.drawer.options.id}">Global opacity (0.1 / 1)</label>
          <input id="setting-opacity-${this.drawer.options.id}"  name="opacity-${
            this.drawer.options.id
          }" type="number" min="0.1" max="1" step="0.1" value="${this.opacity}"/>
        </li>
        <li class="drawer-modal-body-list-item">
          <label for="setting-fill-${this.drawer.options.id}">Fill</label>
          <input id="setting-fill-${this.drawer.options.id}" type="checkbox" name="fill-${this.drawer.options.id}" ${
            this.filled ? 'checked' : ''
          }>
        </li>
        <li class="drawer-modal-body-list-item">
          <label for="setting-grid-${this.drawer.options.id}">Grid (css only)</label>
          <input id="setting-grid-${this.drawer.options.id}" type="checkbox" name="grid-${this.drawer.options.id}" ${
            this.grid ? 'checked' : ''
          }>
        </li>
        <li class="drawer-modal-body-list-item">
          <label for="setting-guides-${this.drawer.options.id}">Guides (shape's only)</label>
          <input id="setting-guides-${this.drawer.options.id}" type="checkbox" name="guides-${
            this.drawer.options.id
          }" ${this.guides ? 'checked' : ''}>
        </li>
        <li class="drawer-modal-body-list-item">
          <label for="setting-xor-${
            this.drawer.options.id
          }">XOR (<a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation" target="_blank" />example</a>)</label>
          <input id="setting-xor-${this.drawer.options.id}" type="checkbox" name="xor-${this.drawer.options.id}" ${
            this.xor ? 'checked' : ''
          }>
        </li>
      </ul>
    `);

    this.setFooterContent(
      /*html*/ `<div class="drawer-modal-footer"><small>Version ${this.drawer.VERSION}</small><a class="link" target="_blank" title="Visit code source" href="https://github.com/fabwcie/drawer">${GithubIcon}</a></div>`
    );

    // Init input color
    Coloris.init();
    Coloris({
      el: `#setting-bgcolor-${this.drawer.options.id}`,
      theme: 'polaroid',
      swatches: this.drawer.options.availableColor,
      swatchesOnly: this.drawer.options.availableColorOnly,
      formatToggle: !this.drawer.options.availableColorOnly,
    });
  }

  private _setupSelectors() {
    this.$bgCologSettingInput = this.$modalBody.querySelector(
      `#setting-bgcolor-${this.drawer.options.id}`
    ) as HTMLInputElement;

    this.$fillSettingInput = this.$modalBody.querySelector(
      `#setting-fill-${this.drawer.options.id}`
    ) as HTMLInputElement;

    this.$gridSettingInput = this.$modalBody.querySelector(
      `#setting-grid-${this.drawer.options.id}`
    ) as HTMLInputElement;

    this.$guidesSettingInput = this.$modalBody.querySelector(
      `#setting-guides-${this.drawer.options.id}`
    ) as HTMLInputElement;

    this.$opacitySettingInput = this.$modalBody.querySelector(
      `#setting-opacity-${this.drawer.options.id}`
    ) as HTMLInputElement;

    this.$xorSettingInput = this.$modalBody.querySelector(`#setting-xor-${this.drawer.options.id}`) as HTMLInputElement;
  }

  private _initEvents() {
    this.$bgCologSettingInput.addEventListener('change', () => {
      this.drawer.setBgColor(this.$bgCologSettingInput.value);
    });

    this.$fillSettingInput.addEventListener('change', () => {
      this.drawer.options.fill = this.$fillSettingInput.checked;
    });

    this.$gridSettingInput.addEventListener('change', () => {
      if (this.$gridSettingInput.checked) {
        this.drawer.addGrid();
      } else {
        this.drawer.removeGrid();
      }
    });

    this.$guidesSettingInput.addEventListener('change', () => {
      this.drawer.options.guides = this.$guidesSettingInput.checked;
    });

    this.$opacitySettingInput.addEventListener('change', () => {
      const opacity = Number(this.$opacitySettingInput.value);

      if (opacity < 0 || opacity > 1) {
        this.$opacitySettingInput.value = this.drawer.options.opacity.toString();

        return;
      }
      this.drawer.options.opacity = opacity;
      this.drawer.ctx.globalAlpha = opacity;
    });

    this.$xorSettingInput.addEventListener('change', () => {
      this.xor = this.$xorSettingInput.checked;
      this.drawer.options.xor = this.xor;
      if (this.$xorSettingInput.checked) {
        this.drawer.ctx.globalCompositeOperation = 'xor';
      } else {
        this.drawer.ctx.globalCompositeOperation = 'source-over';
      }
    });
  }
}
