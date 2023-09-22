import { Drawer } from '../Drawer';
import { BrushIcon } from '../icons/brush';
import { ClearIcon } from '../icons/clear';
import { ColorIcon } from '../icons/color';
import { DownloadIcon } from '../icons/download';
import { EraserIcon } from '../icons/eraser';
import { LineIcon } from '../icons/line';
import { RedoIcon } from '../icons/redo';
import { SettingIcon } from '../icons/setting';
import { ShapeIcon } from '../icons/shape';
import { SquareIcon } from '../icons/square';
import { StarIcon } from '../icons/star';
import { TextIcon } from '../icons/text';
import { TriangleIcon } from '../icons/triangle';
import { UndoIcon } from '../icons/undo';
import { UploadIcon } from '../icons/upload';
import { DrawerError } from '../utils/DrawError';
import { DrawEvent } from '../utils/DrawEvent';
import { stringToHTMLElement } from '../utils/dom';

import type { action } from '../types/drawer';

export class Toolbar extends Drawer {
  /**
   * Adding an empty toolbar element
   * @returns {Promise<HTMLDivElement>} HTML toolbar element
   */
  addToolbar(): Promise<HTMLDivElement> {
    return new Promise((resolve, reject) => {
      try {
        const toolbar = `<div class="toolbar ${this.options.toolbarPosition}"></div>`;

        this.$toolbar = stringToHTMLElement<HTMLDivElement>(toolbar);
        this.$toolbar.style.maxWidth = this.$canvas.width + 'px';
        this.$toolbar.style.maxHeight = this.$canvas.height + 'px';

        if (this.options.toolbarPosition === 'outerTop' || this.options.toolbarPosition === 'outerStart') {
          this.$canvas.before(this.$toolbar);
        } else {
          this.$drawerContainer.appendChild(this.$toolbar);
        }

        if (this.options.toolbarPosition === 'outerStart' || this.options.toolbarPosition === 'outerEnd') {
          this.$drawerContainer.style.display = 'flex';
        }

        resolve(this.$toolbar);
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

   /**
   * Add default button to toolbar,
   * List of defaults buttons : undo, redo, brush, eraser, clear, text, line thickness, color picker, upload, download, setting
   */
   addDefaults() {
    this.addUndoBtn();
    this.addRedoBtn();
    this.addBrushBtn();
    this.addEraserBtn();
    this.addClearBtn();
    this.addTextBtn();
    // this.addShapeBtn();
    this.addLineThicknessBtn();
    this.addColorPickerBtn();
    this.addUploadFileBtn();
    this.addDownloadBtn();
    // this.addSettingBtn();
  }

  /**
   * Add undo button to toolbar if exist
   * see {@link addToolbar} before use it
   */
  addUndoBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$undoBtn) {
          const undoBtn = `<button title="${'Redo'}" class="btn" disabled>${UndoIcon}</button>`;
          this.$undoBtn = stringToHTMLElement<HTMLButtonElement>(undoBtn);

          this.$toolbar.appendChild(this.$undoBtn);

          this.$undoBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action(this, this.$undoBtn);
            } else {
              this.undo();
              if (!this.undo_list.length) this.$undoBtn.disabled = true;
              if (this.redo_list.length) this.$redoBtn.disabled = false;
            }
          });

          resolve(this.$undoBtn);
        } else {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }
  /**
   * Add brush button to toolbar if exist
   * see {@link addToolbar} before use it
   */
  addRedoBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$redoBtn) {
          const redoBtn = `<button title="${'Redo'}" class="btn" disabled>${RedoIcon}</button>`;
          this.$redoBtn = stringToHTMLElement<HTMLButtonElement>(redoBtn);

          this.$toolbar.appendChild(this.$redoBtn);

          this.$redoBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action(this, this.$undoBtn);
            } else {
              this.redo();
              if (!this.redo_list.length) this.$redoBtn.disabled = true;
              if (this.undo_list.length) this.$undoBtn.disabled = false;
            }
          });

          resolve(this.$redoBtn);
        } else {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add brush button to toolbar if exist
   * see {@link addToolbar} before use it
   * @returns {Promise<HTMLButtonElement>}
   */
  addBrushBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$brushBtn) {
          const brushBtn = `<button title="${'Brush'}" class="btn active">${BrushIcon}</button>`;
          this.$brushBtn = stringToHTMLElement<HTMLButtonElement>(brushBtn);

          this.$toolbar.appendChild(this.$brushBtn);

          this.$brushBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action(this, this.$brushBtn);
            } else {
              this.changeTool('brush');
              this.setActiveBtn(this.$brushBtn);
            }
          });

          resolve(this.$brushBtn);
        } else {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add eraser button to toolbar if exist
   * see {@link addToolbar} before use it
   * @returns {Promise<HTMLButtonElement>} return eraser html button
   */
  addEraserBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$eraserBtn) {
          const eraserBtn = `<button title="${'Eraser'}" class="btn">${EraserIcon}</button>`;
          this.$eraserBtn = stringToHTMLElement<HTMLButtonElement>(eraserBtn);

          this.$toolbar.appendChild(this.$eraserBtn);

          this.$eraserBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action(this, this.$eraserBtn);
            } else {
              this.changeTool('eraser');
              this.setActiveBtn(this.$eraserBtn);
            }
          });

          resolve(this.$eraserBtn);
        } else {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add clear button to toolbar if exist
   * see {@link addToolbar} before use it
   * @returns {Promise<HTMLButtonElement>}
   */
  addClearBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$clearBtn) {
          const clearBtn = `<button title="${'Clear draw'}" class="btn">${ClearIcon}</button>`;
          this.$clearBtn = stringToHTMLElement<HTMLButtonElement>(clearBtn);

          this.$toolbar.appendChild(this.$clearBtn);

          this.$clearBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action(this, this.$clearBtn);
            } else if (confirm(`${'Voulez vous suppimer la totalité du dessin ?'}`)) {
              this.clear();
            }
          });

          resolve(this.$clearBtn);
        } else {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add text button to toolbar if exist
   * see {@link addToolbar} before use it
   * @returns {Promise<HTMLButtonElement>} HTML button text element
   */
  addShapeBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$shapeBtn) {
          const shapeBtn = `
          <div class="container-btn-shape">
            <button title="${'Draw shape'}" class="btn btn-shape">${ShapeIcon}</button>
          </div>`;

          const shapeMenu = `
          <ul class="shape-menu">
            <li class="shape-menu-item">
              <button data-shape="triangle" class="btn triangle">${TriangleIcon}</button>
            </li>
            <li class="shape-menu-item">
              <button data-shape="square" class="btn square">${SquareIcon}</button>
            </li>
            <li class="shape-menu-item">
              <button data-shape="line" class="btn line">${LineIcon}</button>
            </li>
            <li class="shape-menu-item">
              <button data-shape="star" class="btn star">${StarIcon}</button>
            </li>
          </ul>`;

          const $shapeBtnDiv = stringToHTMLElement<HTMLDivElement>(shapeBtn);
          const $shapeMenu = stringToHTMLElement<HTMLUListElement>(shapeMenu);

          this.$shapeBtn = $shapeBtnDiv.querySelector('button') as HTMLButtonElement;
          this.$shapeMenu = $shapeMenu;

          this.$toolbar.appendChild($shapeBtnDiv);
          this.$drawerContainer.appendChild(this.$shapeMenu);

          this.$shapeBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action(this, this.$shapeBtn);
            } else {
              const { bottom, left } = this.$shapeBtn.getBoundingClientRect();
              this.$shapeMenu.style.top = bottom + 'px';
              this.$shapeMenu.style.left = left + 'px';
              this.$shapeMenu.classList.toggle('show');
            }
          });

          this.$shapeMenu.querySelectorAll('button').forEach(($btn) => {
            $btn.addEventListener('click', () => {
              const shape = $btn.dataset.shape as string;
              this.setShape(shape);
            });
          });

          // Manage click outside menu or button
          document.addEventListener(
            'click',
            (event) => {
              if (event.target) {
                const outsideClick =
                  !this.$shapeBtn.contains(event.target as Node) && !this.$shapeMenu.contains(event.target as Node);

                if (outsideClick) {
                  this.$shapeMenu.classList.remove('show');
                }
              }
            },
            false
          );

          resolve(this.$textBtn);
        } else {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }
  /**
   * Add text button to toolbar if exist
   * see {@link addToolbar} before use it
   * @returns {Promise<HTMLButtonElement>} HTML button text element
   */
  addTextBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$textBtn) {
          const textBtn = `<button title="${'Text zone'}" class="btn">${TextIcon}</button>`;
          this.$textBtn = stringToHTMLElement<HTMLButtonElement>(textBtn);

          this.$toolbar.appendChild(this.$textBtn);

          this.$textBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action(this, this.$textBtn);
            } else {
              this.changeTool('text');
              this.setActiveBtn(this.$textBtn);
            }
          });

          resolve(this.$textBtn);
        } else {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add line thickness input range to toolbar if exist
   * see {@link addToolbar} before use it
   * @returns {Promise<HTMLInputElement>} HTML input range element
   */
  addLineThicknessBtn(action?: action<HTMLInputElement>): Promise<HTMLInputElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$lineThickness) {
          const lineThickness = `
          <div class="drawer-range">
            <input title="${'Thickness'}" id="${this.$canvas.id}-line-tickness" type="range" class="" min="1" value="${
              this.options.lineThickness
            }" max="30" />
            <span class="counter">${this.options.lineThickness}</span>
          </div>`;
          const $lineThickness = stringToHTMLElement<HTMLDivElement>(lineThickness);
          this.$lineThickness = $lineThickness;

          this.$toolbar.appendChild(this.$lineThickness);

          this.$lineThickness.addEventListener('input', () => {
            if (typeof action === 'function') {
              action(this, this.$lineThickness.querySelector('input') as HTMLInputElement);
              return;
            }

            const lineThickness = parseInt(this.$lineThickness.querySelector('input')?.value as string);
            this.setLineWidth(lineThickness);
          });

          resolve(this.$lineThickness.querySelector('input') as HTMLInputElement);
        } else {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add a colorpicker button
   * see {@link addToolbar} before use it
   * @param action Action call after color selected
   * @returns {Promise<HTMLInputElement>}
   */
  addColorPickerBtn(action?: action<HTMLInputElement>): Promise<HTMLInputElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$colorPicker) {
          const colorPicker = `
          <div class="container-colorpicker">
            <input id="${this.options.id}-colopicker" class="" type="color" value="${this.options.color}" />
            <label title="${'Color'}" class="btn" for="${this.options.id}-colopicker">
              ${ColorIcon}
            </label>
          </div>
          `;
          const $colorPicker = stringToHTMLElement<HTMLDivElement>(colorPicker);

          this.$toolbar.appendChild($colorPicker);

          this.$colorPicker = $colorPicker.querySelector('input') as HTMLInputElement;
          this.$colorPickerLabel = $colorPicker.querySelector('label') as HTMLLabelElement;

          this.$colorPicker.addEventListener('change', () => {
            if (typeof action === 'function') {
              action(this, this.$colorPicker);
            } else {
              this.setColor(this.$colorPicker.value);
            }
          });

          resolve(this.$colorPicker);
        } else {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  addUploadFileBtn(action?: action<HTMLInputElement>): Promise<HTMLInputElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$uploadFile) {
          const uploadFile = `
          <div class="container-uploadFile">
            <input id="${this.options.id}-uploadfile" title="${'Color'}" class="" type="file" />
            <label title="${'Upload file'}" accept="image/png, image/jpeg, .svg" class="btn" for="${
              this.options.id
            }-uploadfile">
              ${UploadIcon}
            </label>
          </div>
          `;
          const $uploadFile = stringToHTMLElement<HTMLDivElement>(uploadFile);

          this.$toolbar.appendChild($uploadFile);

          this.$uploadFile = $uploadFile.querySelector('input') as HTMLInputElement;

          this.$uploadFile.addEventListener('change', () => {
            if (typeof action === 'function') {
              action(this, this.$uploadFile);
            } else {
              this._uploadFile();
            }
          });

          resolve(this.$uploadFile);
        } else {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add a download button
   * see {@link addToolbar} before use it
   * @param action Method to call on click
   * @returns {Promise<HTMLButtonElement>}
   */
  addDownloadBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      if (this.$toolbar && !this.$downloadBtn) {
        const download = `<button title="${'Download'}" class="btn">${DownloadIcon}</button>`;
        this.$downloadBtn = stringToHTMLElement<HTMLButtonElement>(download);

        this.$toolbar.appendChild(this.$downloadBtn);

        this.$downloadBtn.addEventListener('click', () => {
          if (typeof action === 'function') {
            action(this, this.$downloadBtn);
          } else {
            // Download
            const original = this.getData();
            this._setBgColor('#fff').then(() => {
              const data = this.$canvas.toDataURL('image/png');
              const $link = document.createElement('a');

              $link.download = this.$canvas.id || 'draw' + '.png';
              $link.href = data;
              document.body.appendChild($link);
              $link.click();
              document.body.removeChild($link);
              this.loadFromData(original);
            });
          }
        });

        resolve(this.$downloadBtn);
      } else {
        reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
      }
    });
  }

  /**
   * Add a params button
   * see {@link addToolbar} before use it
   * @param action Method to call on click
   * @returns {Promise<HTMLButtonElement>}
   */
  addSettingBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      if (this.$toolbar && !this.$settingBtn) {
        const setting = `<button title="${'Setting'}" class="btn">${SettingIcon}</button>`;
        this.$settingBtn = stringToHTMLElement<HTMLButtonElement>(setting);

        this.$toolbar.appendChild(this.$settingBtn);

        this.$settingBtn.addEventListener('click', () => {
          if (typeof action === 'function') {
            action(this, this.$settingBtn);
          } else {
            // Open setting modal
          }
        });

        resolve(this.$settingBtn);
      } else {
        reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
      }
    });
  }

  /**
   * Upload file from input file
   */
  private _uploadFile() {
    if (this.$uploadFile.files) {
      const file = this.$uploadFile.files[0];

      if (file) {
        this.loadFromData(URL.createObjectURL(file)).then(() => {
          this.$canvas.dispatchEvent(DrawEvent('change', this.getData()));
        });
      }
    }
  }
}
