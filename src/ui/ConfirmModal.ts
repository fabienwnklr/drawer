import Drawer from '../Drawer';
import { confirmModalDefaultOpts } from '../constants';
import { deepMerge } from '../utils/utils';
import { Modal } from './Modal';

type ConfirmModalOptions = {
    message: string,
    cancelLabel: string,
    confirmLabel: string,
    onCancel: (modal: ConfirmModal) => void,
    onConfirm: (modal: ConfirmModal) => void,
}

export class ConfirmModal extends Modal {
  drawer: Drawer;
  $cancelBtn!: HTMLButtonElement;
  $confirmBtn!: HTMLButtonElement;
  message: string;
  cancelLabel: string;
  onCancel: (modal: ConfirmModal) => void;
  confirmLabel: string;
  onConfirm: (modal: ConfirmModal) => void;
  _options: ConfirmModalOptions;

  constructor(drawer: Drawer, options: Partial<ConfirmModalOptions> = {}) {
    // TODO: add unit test
    super(drawer, { showHeader: false });

    this._options = deepMerge<ConfirmModalOptions>(confirmModalDefaultOpts, options);
    this.drawer = drawer;
    this.message = this._options.message;
    this.cancelLabel = this._options.cancelLabel;
    this.onCancel = this._options.onCancel;
    this.confirmLabel = this._options.confirmLabel;
    this.onConfirm = this._options.onConfirm;

    this.fill();
    this._setupElements();
    this._initEvents();
  }

  fill() {
    this.setBodyContent(`<p class="p-2">${this.message}</p>`);
    this.setFooterContent(
      /*html*/ `<button id="confirm-modal-cancel-${this.drawer.options.id}" class="btn btn-neutral">${this.cancelLabel}</button><button id="confirm-modal-confirm-${this.drawer.options.id}" class="btn btn-danger">${this.confirmLabel}</button>`
    );
  }

  private _setupElements() {
    this.$cancelBtn = this.$modalFooter.querySelector(
      `#confirm-modal-cancel-${this.drawer.options.id}`
    ) as HTMLButtonElement;
    this.$confirmBtn = this.$modalFooter.querySelector(
      `#confirm-modal-confirm-${this.drawer.options.id}`
    ) as HTMLButtonElement;
  }

  private _initEvents() {
    this.$cancelBtn?.addEventListener('click', () => {
      this.onCancel(this);
    });
    this.$confirmBtn?.addEventListener('click', () => {
      this.onConfirm(this);
    });
  }
}
