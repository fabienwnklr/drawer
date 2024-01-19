import '../css/modal.css';
import { DrawerError } from '../utils/DrawError';
import { defaultOptionsModal } from '../constants';
import { stringToHTMLElement } from '../utils/dom';
import type { Drawer } from '../Drawer';
import type { ModalOptions } from '../types/index';
import CloseIcon from '../icons/close.svg?raw';

declare global {
  interface HTMLDivElement {
    modal: Modal;
  }
}

export class Modal {
  $modal!: HTMLDivElement;
  $modalHeader!: HTMLDivElement;
  $modalBody!: HTMLDivElement;
  $modalFooter!: HTMLDivElement;
  options: ModalOptions;
  drawer: Drawer;
  $backdrop!: HTMLDivElement;

  constructor(drawer: Drawer, options?: Partial<ModalOptions>) {
    try {
      this.drawer = drawer;
      this.options = { ...defaultOptionsModal, ...options };
      this._init();
      this._setupDefaultEvents();
    } catch (error: any) {
      throw new DrawerError(error.message);
    }
  }

  private _init() {
    this._createModal();

    if (this.options.showHeader) {
      this.setHeaderContent(
          `<h2 class="drawer-modal-title">${this.options.title ?? "Modal"}</h2><button title="Close" class="btn-close" data-modal="close">${CloseIcon}</button>`
      );
    } else {
      this.$modalHeader.remove();
    }

    this.setBodyContent(this.options.bodyContent ?? '');
    this.setFooterContent(this.options.footerContent ?? '');
  }

  private _setupDefaultEvents() {
    const $closeBtn = this.$modalHeader.querySelector('[data-modal=close]');

    if ($closeBtn) {
      $closeBtn.addEventListener('click', () => {
        this.hide();
      });
    }

    // Close modal when clickin outside
    if (this.options.closeOnClickOutside) {
      document.addEventListener(
        'click',
        (event) => {
          if (event.target) {
            const outsideClick =
              !this.drawer.toolbar?.$settingBtn?.contains(event.target as Node) &&
              !this.$modal.contains(event.target as Node);

            if (outsideClick) {
              this.hide();
            }
          }
        },
        false
      );
    }
  }

  private _createModal() {
    this.$modal = stringToHTMLElement<HTMLDivElement>(/*html*/ `
    <div class="drawer-modal"></div>`);
    this.$modalHeader = stringToHTMLElement<HTMLDivElement>(/*html*/ `
      <div class="drawer-modal-header"></div>`);
    this.$modalBody = stringToHTMLElement<HTMLDivElement>(/*html*/ `
      <div class="drawer-modal-body"></div>`);
    this.$modalFooter = stringToHTMLElement<HTMLDivElement>(/*html*/ `
      <div class="drawer-modal-footer"></div>`);

    this.$modal.modal = this;

    this.$modal.append(...[this.$modalHeader, this.$modalBody, this.$modalFooter]);

    if (this.options.backdrop) {
      this.$backdrop = stringToHTMLElement<HTMLDivElement>(/*html*/ `
      <div class="backdrop"></div>
      `);
      this.$backdrop.append(this.$modal);

      this.drawer.$drawerContainer.append(this.$backdrop);
    } else {
      this.drawer.$drawerContainer.append(this.$modal);
    }
  }

  setHeaderContent(content: string) {
    if (content) {
      this.$modalHeader.innerHTML = content;
    }
  }

  setBodyContent(content: string) {
    this.$modalBody.innerHTML = content;
  }

  appendBodyContent(content: string) {
    this.$modalBody.append(content);
  }

  setFooterContent(content: string) {
    this.$modalFooter.innerHTML = content;
  }

  show() {
    if (this.$backdrop) {
      this.$backdrop.classList.add('show');
    }
    this.$modal.classList.add('show');
  }

  hide() {
    if (this.$backdrop) {
      this.$backdrop.classList.remove('show');
    }
    this.$modal.classList.remove('show');
  }

  isVisible(): boolean {
    return this.$modal.classList.contains('show');
  }

  destroy() {
    this.hide();
    this.$modal.remove();
  }
}
