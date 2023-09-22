export class Modal {
  constructor(showOnCreate = true) {
    console.log(showOnCreate);
    this.createModal();
  }

  createModal(showOnCreate = true): string {
    console.log(showOnCreate);
    const $modal = `<div class="drawer-modal"></div>`;
    return $modal;
  }
}
