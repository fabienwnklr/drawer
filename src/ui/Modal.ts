import '../css/modal.css';
import { ModalOptions } from '../types/modal';
import { DrawerError } from '../utils/DrawError';
import { defaultOptionsModal } from '../utils/constantes';
import { stringToHTMLElement } from '../utils/dom';
import type { Drawer } from '../Drawer';
import { CloseIcon } from '../icons/close';

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

  _init() {
    this.createModal();
    this.setHeaderContent(
      this.options.headerContent ?? `<button title="close" class="btn" data-modal="close">${CloseIcon}</button>`
    );
    this.setBodyContent(this.options.bodyContent ?? '');
    this.setFooterContent(this.options.footerContent ?? '');
  }

  _setupDefaultEvents() {
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
              !this.drawer?.$settingBtn?.contains(event.target as Node) && !this.$modal.contains(event.target as Node);

            if (outsideClick) {
              this.hide();
            }
          }
        },
        false
      );
    }
  }

  createModal() {
    this.$modal = stringToHTMLElement<HTMLDivElement>(`
    <div class="drawer-modal"></div>`);
    this.$modalHeader = stringToHTMLElement<HTMLDivElement>(`
      <div class="drawer-modal-header"></div>`);
    this.$modalBody = stringToHTMLElement<HTMLDivElement>(`
      <div class="drawer-modal-body"></div>`);
    this.$modalFooter = stringToHTMLElement<HTMLDivElement>(`
      <div class="drawer-modal-footer"></div>`);

    this.$modal.modal = this;
    this.$modal.append(...[this.$modalHeader, this.$modalBody, this.$modalFooter]);
    document.body.append(this.$modal);
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
    this.$modal.classList.add('show');
  }

  hide() {
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
