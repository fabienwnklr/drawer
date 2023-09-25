import '../css/modal.css';
import { ModalOptions } from '../types/modal';
import { DrawerError } from '../utils/DrawError';
import { defaultOptionsModal } from '../utils/constantes';
import { stringToHTMLElement } from '../utils/dom';

export class Modal {
  $modal!: HTMLDivElement;
  $modalHeader!: HTMLDivElement;
  $modalBody!: HTMLDivElement;
  $modalFooter!: HTMLDivElement;
  options: ModalOptions;

  constructor(options?: Partial<ModalOptions>) {
    try {
      this.options = { ...defaultOptionsModal, ...options };
      this._init();
    } catch (error: any) {
      throw new DrawerError(error.message);
    }
  }

  _init() {
    this.createModal();
    this.setHeaderContent(this.options.headerContent ?? '');
    this.setBodyContent(this.options.bodyContent ?? '');
    this.setFooterContent(this.options.footerContent ?? '');
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
