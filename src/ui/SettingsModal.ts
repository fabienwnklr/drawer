// import { DrawerOptions } from '../types/drawer';
import { Modal } from './Modal';

export class SettingsModal extends Modal {
  filled: boolean
  constructor(filled: boolean) {
    super();
    this.filled = filled
    this.fill()
  }

  fill() {
    this.setBodyContent(`
      <ul class="drawer-modal-body-list">
        <li class="drawer-modal-body-list-item">
          A propos
        </li>
        <li class="drawer-modal-body-list-item">
          <label>Fill</label>
          <input type="checkbox" name="fill" ${this.filled ? "checked" : ""}>
        </li>
      </ul>
    `)
  }
}
