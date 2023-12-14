// Coloris JS
import '@melloware/coloris/dist/coloris.css';
import Coloris from '@melloware/coloris';

import { Drawer } from '../Drawer';
import { ArrowIcon } from '../icons/arrow';
import { BrushIcon } from '../icons/brush';
import { CircleIcon } from '../icons/circle';
import { ClearIcon } from '../icons/clear';
import { DownloadIcon } from '../icons/download';
import { EraserIcon } from '../icons/eraser';
import { LineIcon } from '../icons/line';
import { RectIcon } from '../icons/rect';
import { RedoIcon } from '../icons/redo';
import { SettingIcon } from '../icons/setting';
import { ShapeIcon } from '../icons/shape';
import { SquareIcon } from '../icons/square';
import { TextIcon } from '../icons/text';
import { TriangleIcon } from '../icons/triangle';
import { UndoIcon } from '../icons/undo';
import { UploadIcon } from '../icons/upload';
import { EllipseIcon } from '../icons/ellipse';
import { DrawerError } from '../utils/DrawError';
import { DrawEvent } from '../utils/DrawEvent';
import { defaultOptionsToolbar } from '../constants';
import { getScrollbarWidth, stringToHTMLElement } from '../utils/dom';
import { debounce } from '../utils/perf';
import { deepMerge } from '../utils/utils';
import type { action, DrawTools, ToolbarOptions } from '../types/index';
import { ExpandIcon } from '../icons/expand';
import { FullscreenIcon } from '../icons/fullscreen';
import { CloseIcon } from '../icons/close';

export class Toolbar {
  drawer: Drawer;
  options: ToolbarOptions;

  $toolbar!: HTMLDivElement;
  $undoBtn!: HTMLButtonElement | null;
  $redoBtn!: HTMLButtonElement | null;
  $brushBtn!: HTMLButtonElement | null;
  $eraserBtn!: HTMLButtonElement | null;
  $textBtn!: HTMLButtonElement | null;
  $drawGroupBtn!: HTMLButtonElement | null;
  $drawGroupMenu!: HTMLUListElement | null;
  $clearBtn!: HTMLButtonElement | null;
  $lineThickness!: HTMLDivElement | null;
  $downloadBtn!: HTMLButtonElement | null;
  $colorPicker!: HTMLInputElement | null;
  $shapeBtn!: HTMLButtonElement | null;
  $shapeMenu!: HTMLUListElement | null;
  $uploadFile!: HTMLInputElement | null;
  $pickColorBtn!: HTMLButtonElement | null;
  $expandBtn!: HTMLButtonElement | null;
  $fullscreenBtn!: HTMLButtonElement | null;
  $settingBtn!: HTMLButtonElement | null;
  $closeBtn!: HTMLButtonElement | null;
  $colorPickerLabel!: HTMLLabelElement | null;

  customBtn: { [key: string]: HTMLButtonElement } = {};

  constructor(drawer: Drawer, options: ToolbarOptions) {
    this.drawer = drawer;
    this.options = deepMerge<ToolbarOptions>(defaultOptionsToolbar, options);
  }

  /**
   * Adding an empty toolbar element
   * @returns {Promise<HTMLDivElement>} HTML toolbar element
   *
   * @description This method add html toolbar element, is **required** for add any toolbar button
   */
  addToolbar(): Promise<HTMLDivElement> {
    return new Promise((resolve, reject) => {
      try {
        if (!this.$toolbar) {
          const toolbar = /*html*/ `<div class="toolbar ${this.options.toolbarPosition ?? 'outerTop'}"></div>`;

          this.$toolbar = stringToHTMLElement<HTMLDivElement>(toolbar);
          this.$toolbar.style.maxWidth = this.drawer.$canvas.width + 'px';
          this.$toolbar.style.maxHeight = this.drawer.$canvas.height + 'px';

          if (this.options.toolbarPosition === 'outerTop' || this.options.toolbarPosition === 'outerStart') {
            this.drawer.$canvas.before(this.$toolbar);
          } else {
            this.drawer.$drawerContainer.appendChild(this.$toolbar);
          }

          if (this.options.toolbarPosition === 'outerStart' || this.options.toolbarPosition === 'outerEnd') {
            this.drawer.$drawerContainer.style.display = 'flex';
          }

          resolve(this.$toolbar);
        } else {
          reject(new DrawerError(`Toolbar already added.`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add default button to toolbar,
   * List of defaults buttons :
   * undo, redo, brush, eraser, text, clear, line thickness, colorpicker, upload, download, setting
   */
  addDefaults() {
    this.addUndoBtn();
    this.addRedoBtn();
    this.addBrushBtn();
    this.addEraserBtn();
    this.addClearBtn();
    this.addSeparator();
    this.addSettingBtn();
  }

  addAllButtons() {
    this.addUndoBtn();
    this.addRedoBtn();
    this.addBrushBtn();
    this.addEraserBtn();
    this.addTextBtn();
    this.addClearBtn();
    this.addShapeBtn();
    this.addLineThicknessBtn();
    this.addColorPickerBtn();
    this.addUploadFileBtn();
    this.addDownloadBtn();
    this.addSettingBtn();
    this.addSeparator();
    this.addExpandButton();
    this.addFullscreenButton();
    this.addCloseButton();
  }

  /**
   * Add undo button to toolbar if exist
   * see {@link addToolbar} before use it
   * @param {action<HTMLButtonElement>?} action method to call onclick
   * @returns {Promise<HTMLButtonElement>}
   */
  addUndoBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$undoBtn) {
          const undoBtn = /*html*/ `<button title="${'Redo'}" class="btn" disabled>${UndoIcon}</button>`;
          const $undoBtn = stringToHTMLElement<HTMLButtonElement>(undoBtn);
          this.$undoBtn = $undoBtn;

          this.$toolbar.appendChild(this.$undoBtn);

          this.$undoBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action.call(this, $undoBtn);
            } else {
              this.drawer.undo().then(() => {
                this.drawer.$canvas.dispatchEvent(DrawEvent('change', this.drawer.getData()));
              });
              this._manageUndoRedoBtn();
            }
          });

          resolve(this.$undoBtn);
        } else if (!this.$toolbar) {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        } else {
          reject(new DrawerError(`Undo button already added, you cannot add it again.`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add brush button to toolbar if exist
   * see {@link addToolbar} before use it
   * @param {action<HTMLButtonElement>?} action method to call onclick
   * @returns {Promise<HTMLButtonElement>}
   */
  addRedoBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$redoBtn) {
          const redoBtn = /*html*/ `<button title="${'Redo'}" class="btn" disabled>${RedoIcon}</button>`;
          const $redoBtn = stringToHTMLElement<HTMLButtonElement>(redoBtn);
          this.$redoBtn = $redoBtn;

          this.$toolbar.appendChild(this.$redoBtn);

          this.$redoBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action.call(this, $redoBtn);
            } else {
              this.drawer.redo().then(() => {
                this.drawer.$canvas.dispatchEvent(DrawEvent('change', this.drawer.getData()));
              });
              this._manageUndoRedoBtn();
            }
          });

          resolve(this.$redoBtn);
        } else if (!this.$toolbar) {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        } else {
          reject(new DrawerError(`Redo button already added, you cannot add it again.`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add brush button to toolbar if exist
   * see {@link addToolbar} before use it
   * @param {action<HTMLButtonElement>?} action method to call onclick
   * @returns {Promise<HTMLButtonElement>}
   */
  addBrushBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$brushBtn) {
          const brushBtn = /*html*/ `<button title="${'Brush'}" class="btn active">${BrushIcon}</button>`;
          const $brushBtn = stringToHTMLElement<HTMLButtonElement>(brushBtn);
          this.$brushBtn = $brushBtn;

          this.$toolbar.appendChild(this.$brushBtn);

          this.$brushBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action.call(this, $brushBtn);
            } else {
              this.drawer.setTool('brush');
            }
          });

          resolve(this.$brushBtn);
        } else if (!this.$toolbar) {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        } else {
          reject(new DrawerError(`Brush button already added, you cannot add it again.`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add eraser button to toolbar if exist
   * see {@link addToolbar} before use it
   * @param {action<HTMLButtonElement>?} action method to call onclick
   * @returns {Promise<HTMLButtonElement>}
   */
  addEraserBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$eraserBtn) {
          const eraserBtn = /*html*/ `<button title="${'Eraser'}" class="btn">${EraserIcon}</button>`;
          const $eraserBtn = stringToHTMLElement<HTMLButtonElement>(eraserBtn);
          this.$eraserBtn = $eraserBtn;

          this.$toolbar.appendChild(this.$eraserBtn);

          this.$eraserBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action.call(this, $eraserBtn);
            } else {
              this.drawer.setTool('eraser');
            }
          });

          resolve(this.$eraserBtn);
        } else if (!this.$toolbar) {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        } else {
          reject(new DrawerError(`Eraser button already added, you cannot add it again.`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add text button to toolbar if exist
   * see {@link addToolbar} before use it
   * @param {action<HTMLButtonElement>?} action method to call onclick
   * @returns {Promise<HTMLButtonElement>}
   */
  addTextBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$textBtn) {
          const textBtn = /*html*/ `<button title="${'Text zone'}" class="btn">${TextIcon}</button>`;
          const $textBtn = stringToHTMLElement<HTMLButtonElement>(textBtn);
          this.$textBtn = $textBtn;

          this.$toolbar.appendChild(this.$textBtn);

          this.$textBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action.call(this, $textBtn);
            } else {
              this.drawer.setTool('text');
            }
          });

          resolve(this.$textBtn);
        } else if (!this.$toolbar) {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        } else {
          reject(new DrawerError(`Text button already added, you cannot add it again.`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add draw group button (contain brush, eraser and text zone)
   * see {@link addToolbar} before use it
   * @param {action<HTMLButtonElement>?} action method to call onclick
   * @returns {Promise<HTMLButtonElement>}
   */
  addDrawGroupBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$drawGroupBtn && !this.$brushBtn && !this.$eraserBtn && !this.$textBtn) {
          let icon = BrushIcon;
          let title = 'Brush';

          if (this.drawer.activeTool === 'eraser') {
            icon = EraserIcon;
            title = 'Eraser';
          } else if (this.drawer.activeTool === 'text') {
            icon = TextIcon;
            title = 'Text zone';
          }

          const active = ['brush', 'eraser', 'text'].includes(this.drawer.activeTool) ? ' active' : '';
          const drawGroupBtn = /*html*/ `<button title="${title}" class="btn${active}">${icon}</button>`;

          const drawGroupMenu = /*html*/ `
            <ul class="drawer-menu">
              <li class="drawer-menu-item">
                <button data-tool="brush" title=${'Brush'} class="btn">${BrushIcon}</button>
              </li>
              <li class="drawer-menu-item">
                <button data-tool="eraser" title=${'Eraser'} class="btn">${EraserIcon}</button>
              </li>
              <li class="drawer-menu-item">
                <button data-tool="text" title=${'Text zone'} class="btn">${TextIcon}</button>
              </li>
            </ul>`;

          const $drawGroupBtn = stringToHTMLElement<HTMLButtonElement>(drawGroupBtn);
          const $drawGroupMenu = stringToHTMLElement<HTMLUListElement>(drawGroupMenu);

          this.$drawGroupBtn = $drawGroupBtn;
          this.$drawGroupMenu = $drawGroupMenu;

          this.$toolbar.appendChild($drawGroupBtn);
          this.drawer.$drawerContainer.appendChild($drawGroupMenu);

          $drawGroupBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action.call(this, $drawGroupBtn);
            } else {
              this._toggleMenu($drawGroupBtn, $drawGroupMenu);
            }
          });

          $drawGroupMenu.querySelectorAll('button').forEach(($btn) => {
            $btn.addEventListener('click', () => {
              const tool = $btn.dataset.tool as keyof typeof DrawTools;
              this.drawer.setTool(tool);
              $drawGroupMenu.classList.remove('show');
            });
          });

          // Manage click outside menu or button
          this._initClickOutsideMenuEvent($drawGroupBtn, $drawGroupMenu);

          resolve($drawGroupBtn);
        } else if (!this.$toolbar) {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        } else {
          reject(
            new DrawerError(`A draw button already added, you cannot add it again, please remove add method before.`)
          );
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add clear button to toolbar if exist
   * see {@link addToolbar} before use it
   * @param {action<HTMLButtonElement>?} action method to call onclick
   * @returns {Promise<HTMLButtonElement>}
   */
  addClearBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$clearBtn) {
          const clearBtn = /*html*/ `<button title="${'Clear draw'}" class="btn">${ClearIcon}</button>`;
          const $clearBtn = stringToHTMLElement<HTMLButtonElement>(clearBtn);
          this.$clearBtn = $clearBtn;

          this.$toolbar.appendChild(this.$clearBtn);

          this.$clearBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action.call(this, $clearBtn);
            } else if (!this.drawer.isEmpty()) {
              if (confirm(`${'Delete the entire drawing'} ?`)) {
                this.drawer.clear();
              }
            }
          });

          resolve(this.$clearBtn);
        } else if (!this.$toolbar) {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        } else {
          reject(new DrawerError(`Clear button already added, you cannot add it again.`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add text button to toolbar if exist
   * see {@link addToolbar} before use it
   * @param {action<HTMLButtonElement>?} action method to call onclick
   * @returns {Promise<HTMLButtonElement>}
   */
  addShapeBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$shapeBtn) {
          const shapeBtn = /*html*/ `<button title="${'Draw shape'}" class="btn btn-shape">${ShapeIcon}</button>`;

          const shapeMenu = /*html*/ `
            <ul class="drawer-menu">
              <li class="drawer-menu-item">
                <button data-shape="triangle" class="btn triangle" title="${'Triangle'}">${TriangleIcon}</button>
              </li>
              <li class="drawer-menu-item">
                <button data-shape="rect" class="btn rect" title="${'Rectangle'}">${RectIcon}</button>
              </li>
              <li class="drawer-menu-item">
                <button data-shape="square" class="btn square" title="${'Square'}">${SquareIcon}</button>
              </li>
              <li class="drawer-menu-item">
                <button data-shape="line" class="btn line" title="${'Line'}">${LineIcon}</button>
              </li>
              <li class="drawer-menu-item">
                <button data-shape="arrow" class="btn arrow" title="${'Arrow'}">${ArrowIcon}</button>
              </li>
              <li class="drawer-menu-item">
                <button data-shape="circle" class="btn circle" title="${'Circle'}">${CircleIcon}</button>
              </li>
              <li class="drawer-menu-item">
                <button data-shape="ellipse" class="btn circle" title="${'Ellipse'}">${EllipseIcon}</button>
              </li>
            </ul>`;

          const $shapeMenu = stringToHTMLElement<HTMLUListElement>(shapeMenu);
          const $shapeBtn = stringToHTMLElement<HTMLButtonElement>(shapeBtn);

          this.$shapeBtn = $shapeBtn;
          this.$shapeMenu = $shapeMenu;

          this.$toolbar.appendChild(this.$shapeBtn);
          this.drawer.$drawerContainer.appendChild(this.$shapeMenu);

          this.$shapeBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action.call(this, $shapeBtn);
            } else {
              this._toggleMenu($shapeBtn, $shapeMenu);
            }
          });

          this.$shapeMenu.querySelectorAll('button').forEach(($btn) => {
            $btn.addEventListener('click', () => {
              const shape = $btn.dataset.shape as keyof typeof DrawTools;
              this.drawer.setShape(shape);
            });
          });

          // Manage click outside menu or button
          this._initClickOutsideMenuEvent($shapeBtn, $shapeMenu);

          resolve($shapeBtn);
        } else if (!this.$toolbar) {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        } else {
          reject(new DrawerError(`Shape button already added, you cannot add it again.`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add line thickness input range to toolbar if exist
   * see {@link addToolbar} before use it
   * @param {action<HTMLButtonElement>?} action method to call onclick
   * @returns {Promise<HTMLInputElement>} HTML input range element
   */
  addLineThicknessBtn(action?: action<HTMLInputElement>): Promise<HTMLInputElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$lineThickness) {
          const lineThickness = /*html*/ `
            <div class="drawer-range">
              <input title="${'Thickness'}" id="${
                this.drawer.$canvas.id
              }-line-tickness" type="range" class="" min="1" value="${this.drawer.options.lineThickness}" max="30" />
              <span class="counter">${this.drawer.options.lineThickness}</span>
            </div>`;
          const $lineThickness = stringToHTMLElement<HTMLDivElement>(lineThickness);
          this.$lineThickness = $lineThickness;

          this.$toolbar.appendChild(this.$lineThickness);

          this.$lineThickness.addEventListener(
            'input',
            debounce(() => {
              if (typeof action === 'function') {
                action.call(this, $lineThickness.querySelector('input') as HTMLInputElement);
                return;
              }

              const lineThickness = parseInt($lineThickness.querySelector('input')?.value as string);
              this.drawer.setLineWidth(lineThickness);
            })
          );

          resolve(this.$lineThickness.querySelector('input') as HTMLInputElement);
        } else if (!this.$toolbar) {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        } else {
          reject(new DrawerError(`Line tickness button already added, you cannot add it again.`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add a colorpicker button
   * see {@link addToolbar} before use it
   * using Coloris, for customisation please see here {@link https://github.com/mdbassit/Coloris}
   * @param {action<HTMLInputElement>?} action Action call after color selected
   * @returns {Promise<HTMLInputElement>}
   */
  addColorPickerBtn(action?: action<HTMLInputElement>): Promise<HTMLInputElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$colorPicker) {
          const colorPickerContainer = /*html*/ `
            <div class="container-colorpicker">
              <input class="btn" id="colopicker-${
                this.drawer.options.id
              }" class="" type="text" title="${'Color'}" value="${this.drawer.options.color}" data-coloris/>
            </div>
            `;
          const $colorPickerContainer = stringToHTMLElement<HTMLDivElement>(colorPickerContainer);

          this.$toolbar.appendChild($colorPickerContainer);

          const $colorPicker = $colorPickerContainer.querySelector('input') as HTMLInputElement;
          this.$colorPicker = $colorPicker;

          if (this.drawer.options.availableColorOnly && !this.drawer.options.availableColor.length) {
            console.warn(`Option 'availableColorOnly' used with an empty 'availableColor' array.`);
          }

          Coloris.init();
          Coloris({
            el: `#colopicker-${this.drawer.options.id}`,
            theme: 'polaroid',
            swatches: this.drawer.options.availableColor,
            swatchesOnly: this.drawer.options.availableColorOnly,
            formatToggle: !this.drawer.options.availableColorOnly,
            closeButton: true,
          });

          $colorPicker.addEventListener('change', () => {
            if (typeof action === 'function') {
              action.bind(this, $colorPicker, $colorPicker.value);
            } else {
              this.drawer.setColor($colorPicker.value);
            }
          });

          resolve(this.$colorPicker);
        } else if (!this.$toolbar) {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        } else {
          reject(new DrawerError(`Colorpicker button already added, you cannot add it again.`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add upload file button
   * see {@link addToolbar} before use it
   * @param {action<HTMLButtonElement>?} action method to call onclick
   * @returns {Promise<HTMLInputElement>} HTML input range element
   */
  addUploadFileBtn(action?: action<HTMLInputElement>): Promise<HTMLInputElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$uploadFile) {
          const uploadFile = /*html*/ `
            <div class="container-uploadFile">
              <input tabindex="-1" id="${this.drawer.options.id}-uploadfile" title="${'Color'}" class="" type="file" />
              <label tabindex="0" title="${'Upload file'}" accept="image/png, image/jpeg, .svg" class="btn" for="${
                this.drawer.options.id
              }-uploadfile">
                ${UploadIcon}
              </label>
            </div>
            `;
          const $uploadFileContainer = stringToHTMLElement<HTMLDivElement>(uploadFile);

          this.$toolbar.appendChild($uploadFileContainer);

          const $uploadFile = $uploadFileContainer.querySelector('input') as HTMLInputElement;
          this.$uploadFile = $uploadFile;

          this.$uploadFile.addEventListener('change', () => {
            if (typeof action === 'function') {
              action.call(this, $uploadFile);
            } else {
              this._uploadFile();
            }
          });

          resolve(this.$uploadFile);
        } else if (!this.$toolbar) {
          reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
        } else {
          reject(new DrawerError(`Upload file button already added, you cannot add it again.`));
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Add a download button
   * see {@link addToolbar} before use it
   * @param {action<HTMLButtonElement>?} action method to call onclick
   * @returns {Promise<HTMLButtonElement>}
   */
  addDownloadBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      if (this.$toolbar && !this.$downloadBtn) {
        const download = /*html*/ `<button title="${'Download'}" class="btn">${DownloadIcon}</button>`;
        const $downloadBtn = stringToHTMLElement<HTMLButtonElement>(download);
        this.$downloadBtn = $downloadBtn;

        this.$toolbar.appendChild(this.$downloadBtn);

        this.$downloadBtn.addEventListener('click', () => {
          if (typeof action === 'function') {
            action.call(this, $downloadBtn);
          } else {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            // const img = await
            canvas.width = this.drawer.options.width;
            canvas.height = this.drawer.options.height;
            ctx.fillStyle = this.drawer.options.bgColor;
            ctx.fillRect(0, 0, this.drawer.options.width, this.drawer.options.height);
            ctx.drawImage(this.drawer.$canvas, 0, 0);
            // Download
            const data = canvas.toDataURL('image/png');
            const $link = document.createElement('a');

            $link.download = this.drawer.$canvas.id || 'draw' + '.png';
            $link.href = data;
            document.body.appendChild($link);
            $link.click();
            document.body.removeChild($link);
          }
        });

        resolve(this.$downloadBtn);
      } else if (!this.$toolbar) {
        reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
      } else {
        reject(new DrawerError(`Download button already added, you cannot add it again.`));
      }
    });
  }

  /**
   * Add pick color button select color on canvas
   * see {@link addToolbar} before use it
   * @param {action<HTMLButtonElement>?} action method to call onclick
   * @returns {Promise<HTMLButtonElement>}
   */
  addPickColorButton(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      if (this.$toolbar && !this.$pickColorBtn) {
        const pickColor = /*html*/ `<button title="${'Pick color'}" class="btn">${ExpandIcon}</button>`;
        const $pickColorBtn = stringToHTMLElement<HTMLButtonElement>(pickColor);
        this.$pickColorBtn = $pickColorBtn;

        this.$toolbar.appendChild(this.$pickColorBtn);

        this.$pickColorBtn.addEventListener('click', () => {
          if (typeof action === 'function') {
            action.call(this, $pickColorBtn);
          } else {
            const hoveredColor = document.getElementById('hovered-color');
            const selectedColor = document.getElementById('selected-color');

            const pick = (event: PointerEvent, destination: HTMLElement | null) => {
              const bounding = this.drawer.$canvas.getBoundingClientRect();
              const x = event.clientX - bounding.left;
              const y = event.clientY - bounding.top;
              const pixel = this.drawer.ctx.getImageData(x, y, 1, 1);
              const data = pixel.data;

              const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;

              if (destination) {
                destination.style.background = rgba;
                destination.textContent = rgba;
              }

              if (event.type === 'pointerdown') {
                this.drawer.setColor(rgba);
              }

              return rgba;
            };

            this.drawer.$canvas.addEventListener('pointermove', (event) => pick(event, hoveredColor));
            this.drawer.$canvas.addEventListener('pointerdown', (event) => pick(event, selectedColor));
          }
        });

        resolve(this.$pickColorBtn);
      } else if (!this.$toolbar) {
        reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
      } else {
        reject(new DrawerError(`Download button already added, you cannot add it again.`));
      }
    });
  }

  /**
   * Add expand button for toggle size to full width / height of window
   * see {@link addToolbar} before use it
   * @param {action<HTMLButtonElement>?} action method to call onclick
   * @returns {Promise<HTMLButtonElement>}
   */
  addExpandButton(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      if (this.$toolbar && !this.$expandBtn) {
        const expand = /*html*/ `<button title="${'Expand'}" class="btn">${ExpandIcon}</button>`;
        const $expandBtn = stringToHTMLElement<HTMLButtonElement>(expand);
        this.$expandBtn = $expandBtn;

        this.$toolbar.appendChild(this.$expandBtn);

        this.$expandBtn.addEventListener('click', () => {
          if (typeof action === 'function') {
            action.call(this, $expandBtn);
          } else {
            this.drawer.$drawerContainer.classList.toggle('expanded');
          }
        });

        resolve(this.$expandBtn);
      } else if (!this.$toolbar) {
        reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
      } else {
        reject(new DrawerError(`Download button already added, you cannot add it again.`));
      }
    });
  }

  /**
   * Add fullscreen button for toggle fullscreen native
   * see {@link addToolbar} before use it
   * @param {action<HTMLButtonElement>?} action method to call onclick
   * @returns {Promise<HTMLButtonElement>}
   */
  addFullscreenButton(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      if (this.$toolbar && !this.$fullscreenBtn) {
        const fullscreen = /*html*/ `<button title="${'Fullscreen'}" class="btn">${FullscreenIcon}</button>`;
        const $fullscreenBtn = stringToHTMLElement<HTMLButtonElement>(fullscreen);
        this.$fullscreenBtn = $fullscreenBtn;

        this.$toolbar.appendChild(this.$fullscreenBtn);

        this.$fullscreenBtn.addEventListener('click', () => {
          if (typeof action === 'function') {
            action.call(this, $fullscreenBtn);
          } else {
            this._toggleFullScreen(this.drawer.$drawerContainer);
          }
        });

        resolve(this.$fullscreenBtn);
      } else if (!this.$toolbar) {
        reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
      } else {
        reject(new DrawerError(`Download button already added, you cannot add it again.`));
      }
    });
  }

  async addCloseButton(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement | undefined> {
    if (this.$toolbar && !this.$closeBtn) {
      const close = /*html*/ `<button title="${'Close'}" class="btn">${CloseIcon}</button>`;
      const $closeBtn = stringToHTMLElement<HTMLButtonElement>(close);
      this.$closeBtn = $closeBtn;

      this.$toolbar.appendChild(this.$closeBtn);

      this.$closeBtn.addEventListener('click', () => {
        if (typeof action === 'function') {
          action.call(this, $closeBtn);
        } else if (confirm('Do you want to close and lose data ?')) {
          this.drawer.destroy();
        }
      });
      return this.$closeBtn;
    }
  }

  /**
   * Add a params button
   * see {@link addToolbar} before use it
   * @param {action<HTMLButtonElement>?} action method to call onclick
   * @returns {Promise<HTMLButtonElement>}
   */
  addSettingBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      if (this.$toolbar && !this.$settingBtn) {
        const settingBtn = /*html*/ `<button title="${'Settings'}" class="btn">${SettingIcon}</button>`;
        const $settingBtn = stringToHTMLElement<HTMLButtonElement>(settingBtn);
        this.$settingBtn = $settingBtn;

        this.$toolbar.appendChild(this.$settingBtn);

        this.$settingBtn.addEventListener('click', () => {
          if (typeof action === 'function') {
            action.call(this, $settingBtn);
          } else if (this.drawer.settingModal.isVisible()) {
            this.drawer.settingModal.hide();
          } else {
            this.drawer.settingModal.show();
          }
        });

        resolve(this.$settingBtn);
      } else if (!this.$toolbar) {
        reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
      } else {
        reject(new DrawerError(`Setting button already added, you cannot add it again.`));
      }
    });
  }

  /**
   * Add a custom button to toolbar
   * see {@link addToolbar} before use it
   * @param {String} name Button name (must be unique)
   * @param {String} title Title for button
   * @param {String} label Label or icon
   * @param {action<HTMLButtonElement>} action Action to do onclick
   * @returns {Promise<HTMLButtonElement>}
   */
  addCustomBtn(
    name: string,
    title: string,
    label: string,
    action: action<HTMLButtonElement>
  ): Promise<HTMLButtonElement> {
    return new Promise((resolve, reject) => {
      if (this.$toolbar && !this.customBtn[name]) {
        const customBtn = /*html*/ `<button title="${title}" class="btn">${label}</button>`;
        const $customBtn = stringToHTMLElement<HTMLButtonElement>(customBtn);
        this.customBtn[name] = $customBtn;

        this.$toolbar.appendChild(this.customBtn[name]);

        this.customBtn[name].addEventListener('click', () => {
          if (typeof action === 'function') {
            action.call(this, this.customBtn[name]);
          } else {
            throw new DrawerError(`No action provided for custom button name '${name}`);
          }
        });

        resolve(this.customBtn[name]);
      } else if (!this.$toolbar) {
        reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first.`));
      } else {
        reject(new DrawerError(`Custom button with name "${name}" already exist.`));
      }
    });
  }

  /**
   * Add separator (ml-auto)
   * @returns {boolean}
   */
  async addSeparator(): Promise<boolean> {
    const separator = /*html*/ `<div class="drawer-separator"></div>`;
    const $separator = stringToHTMLElement<HTMLButtonElement>(separator);

    this.$toolbar.appendChild($separator);

    return true;
  }

  /**
   * Apply active state to btn
   * @param {HTMLButtonElement} $btn Button to add active class
   */
  setActiveBtn($btn: HTMLButtonElement) {
    try {
      if (this.$toolbar) {
        this.$toolbar.querySelectorAll('.btn').forEach(($b) => $b.classList.remove('active'));

        if (this.$drawGroupMenu && this.$drawGroupBtn) {
          this.$drawGroupMenu.querySelectorAll('.btn').forEach(($b) => $b.classList.remove('active'));
          $btn = this.$drawGroupBtn;
          let icon = BrushIcon;
          let title = 'Brush';

          if (this.drawer.activeTool === 'eraser') {
            icon = EraserIcon;
            title = 'Eraser';
          } else if (this.drawer.activeTool === 'text') {
            icon = TextIcon;
            title = 'Text zone';
          }

          $btn.innerHTML = icon;
          $btn.title = title;
        }

        if (this.$shapeMenu) {
          this.$shapeMenu.querySelectorAll('.btn').forEach(($b) => $b.classList.remove('active'));
        }
        $btn?.classList.add('active');
      } else {
        throw new DrawerError(`No toolbar provided`);
      }
    } catch (error: any) {
      throw new DrawerError(error.message);
    }
  }

  private _toggleFullScreen($el: HTMLElement) {
    if (!document.fullscreenElement) {
      $el.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  /**
   * @private
   * Upload file from input file
   */
  private _uploadFile() {
    if (this.$uploadFile?.files) {
      const file = this.$uploadFile.files[0];

      if (file) {
        this.drawer.loadFromData(URL.createObjectURL(file));
      }
    }
  }

  /**
   * @private
   * Manage undo / redo button state
   */
  _manageUndoRedoBtn() {
    if (!this.drawer.undo_list.length && this.$undoBtn) {
      this.$undoBtn.disabled = true;
    } else if (this.$undoBtn) {
      this.$undoBtn.disabled = false;
    }

    if (!this.drawer.redo_list.length && this.$redoBtn) {
      this.$redoBtn.disabled = true;
    } else if (this.$redoBtn) {
      this.$redoBtn.disabled = false;
    }
  }

  /**
   * Toggle show/hide menu
   * @param $btn
   * @param $menu
   * @returns
   */
  private _toggleMenu($btn: HTMLButtonElement, $menu: HTMLUListElement) {
    if ($menu.classList.contains('show')) {
      $menu.classList.remove('show');
      return;
    }

    // eslint-disable-next-line prefer-const
    let x = $btn.offsetLeft;
    let y = $btn.offsetTop + $btn.offsetHeight;
    const width = $menu.offsetWidth;
    const height = $menu.offsetHeight;

    if (x + width > window.innerWidth) {
      x = x - (x + width - window.innerWidth) - getScrollbarWidth();
    }

    if (y + height > window.innerHeight) {
      y = y - height - 5;
    }

    $menu.style.top = y + 5 + 'px';

    if (this.options.toolbarPosition === 'innerEnd') {
      $menu.style.left = '';
      $menu.style.right = x + 'px';
    } else {
      $menu.style.left = x + 'px';
    }
    $menu.classList.add('show');
  }

  /**
   * event for close menu on click outside
   * @param $btn
   * @param $menu
   */
  private _initClickOutsideMenuEvent($btn: HTMLButtonElement, $menu: HTMLUListElement) {
    document.addEventListener(
      'click',
      (event) => {
        if (event.target) {
          const outsideClick = !$btn.contains(event.target as Node) && !$menu.contains(event.target as Node);

          if (outsideClick) {
            $menu.classList.remove('show');
          }
        }
      },
      false
    );
  }
}
