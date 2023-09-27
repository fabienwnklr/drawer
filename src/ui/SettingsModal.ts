// import { DrawerOptions } from '../types/drawer';
import { Drawer } from '../Drawer';
import { Modal } from './Modal';

export class SettingsModal extends Modal {
  filled: boolean;
  drawer: Drawer;
  $fillSettingInput!: HTMLInputElement;

  constructor(drawer: Drawer) {
    super(drawer);
    this.drawer = drawer;
    this.filled = drawer.options.fill;
    this.fill();
    this._setupSelectors();
    this._initEvents();
  }

  fill() {
    this.setBodyContent(/*html*/ `
      <ul class="drawer-modal-body-list">
        <li class="drawer-modal-body-list-item">
          A propos
        </li>
        <li class="drawer-modal-body-list-item">
          <label for="setting-fill-${this.drawer.options.id}">Fill</label>
          <input id="setting-fill-${this.drawer.options.id}" type="checkbox" name="fill" ${
            this.filled ? 'checked' : ''
          }>
        </li>
      </ul>
    `);
  }

  _setupSelectors() {
    this.$fillSettingInput = this.$modalBody.querySelector(
      `#setting-fill-${this.drawer.options.id}`
    ) as HTMLInputElement;
  }

  _initEvents() {
    this.$fillSettingInput.addEventListener('change', () => {
      this.drawer.options.fill = this.$fillSettingInput.checked;
    });
  }
}
