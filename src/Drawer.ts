// Coloris JS
import '@melloware/coloris/dist/coloris.css';
import Coloris from '@melloware/coloris';

import './css/drawer.css';
import { stringToHTMLElement } from './utils/dom';
import { DrawerError } from './utils/DrawError';
import { BrushIcon } from './icons/brush';
import { EraserIcon } from './icons/eraser';
import { TextIcon } from './icons/text';
import { DownloadIcon } from './icons/download';
import { defaultOptionsDrawer } from './utils/constantes';
import { DrawEvent } from './utils/DrawEvent';

// Type import
import { DrawTools, DrawerOptions, Position, action } from './types/drawer';
import { History } from './utils/History';
import { UndoIcon } from './icons/undo';
import { RedoIcon } from './icons/redo';
import { ClearIcon } from './icons/clear';
import { ShapeIcon } from './icons/shape';
import { TriangleIcon } from './icons/triangle';
import { SquareIcon } from './icons/square';
import { LineIcon } from './icons/line';
import { StarIcon } from './icons/star';
import { UploadIcon } from './icons/upload';
import { SettingIcon } from './icons/setting';
import { throttle } from './utils/perf';
import { getMousePosition } from './utils/infos';
import { CircleIcon } from './icons/circle';
import { RectIcon } from './icons/rect';
import { ArrowIcon } from './icons/arrow';
import { SettingsModal } from './ui/SettingsModal';
import { deepMerge } from './utils/utils';

export class Drawer extends History {
  declare ctx: CanvasRenderingContext2D;
  isDrawing: boolean = false;
  activeTool: keyof typeof DrawTools = 'brush';
  dotted: boolean = false;
  // options
  options: DrawerOptions = defaultOptionsDrawer;
  customBtn: { [key: string]: HTMLButtonElement } = {};
  // HTML Elements
  declare $canvas: HTMLCanvasElement;
  $sourceElement: HTMLElement;
  $drawerContainer!: HTMLDivElement;
  $toolbar!: HTMLDivElement;
  $undoBtn!: HTMLButtonElement | null;
  $redoBtn!: HTMLButtonElement | null;
  $brushBtn!: HTMLButtonElement | null;
  $eraserBtn!: HTMLButtonElement | null;
  $clearBtn!: HTMLButtonElement | null;
  $textBtn!: HTMLButtonElement | null;
  $lineThickness!: HTMLDivElement;
  $downloadBtn!: HTMLButtonElement | null;
  $colorPicker!: HTMLInputElement | null;
  $shapeBtn!: HTMLButtonElement | null;
  $shapeMenu!: HTMLUListElement;
  $uploadFile!: HTMLInputElement;
  $settingBtn!: HTMLButtonElement | null;
  $colorPickerLabel!: HTMLLabelElement;
  #dragStartLocation!: Position;
  #snapshot!: ImageData;
  #availableShape: Array<keyof typeof DrawTools> = [
    'brush',
    'eraser',
    'rect',
    'circle',
    'square',
    'arrow',
    'line',
    'star',
    'triangle',
    'polygon',
  ];
  settingModal!: SettingsModal;
  gridActive!: boolean;

  /**
   *
   * @param {HTMLElement} $el Container for drawer
   * @param {Partial<DrawerOptions>} options options for drawer
   */
  constructor($el: HTMLElement, options: Partial<DrawerOptions> = {}) {
    super();
    try {
      this.$sourceElement = $el;
      this.options = deepMerge<DrawerOptions>(defaultOptionsDrawer, options);
      this._init();

      const saved = localStorage.getItem(this.options.localStorageKey);

      if (saved && !this.isEmpty(saved)) {
        this.loadFromData(saved);
      }

      if (this.options.defaultToolbar) {
        this.addToolbar();
        this.addDefaults();
      }

      this.settingModal = new SettingsModal(this);

      if (this.options.dotted) {
        this.setDottedLine(true, this.options.dash);
      }
    } catch (error: any) {
      throw new DrawerError(error.message);
    }
  }

  /**
   * Draw html drawer
   */
  private _buildDrawer() {
    try {
      this.$drawerContainer = stringToHTMLElement<HTMLDivElement>(/*html*/ `<div class="drawer-container"></div>`);
      const canvas = /*html*/ `
      <canvas tabindex="0" id="${this.options.id}" height="${this.options.height}" width="${this.options.width}" class="canvas-drawer"></canvas>
      `;
      this.$canvas = stringToHTMLElement<HTMLCanvasElement>(canvas);
      this.ctx = this.$canvas.getContext('2d', { alpha: true, willReadFrequently: true }) as CanvasRenderingContext2D;
      this.ctx.globalAlpha = this.options.opacity;
      this.$drawerContainer.appendChild(this.$canvas);
    } catch (error: any) {
      throw new DrawerError(error.message);
    }
  }

  /**
   * @private
   * initialize canvas and event listener
   */
  private _init() {
    try {
      this._buildDrawer();
      this.$sourceElement.appendChild(this.$drawerContainer);
      this.setBgColor();
      this._initHandlerEvents();
      this.setCanvas(this.$canvas);
      this._updateCursor();

      if (this.options.grid) {
        this.addGrid();
      }

      // dispatch drawer.init event
      this.$sourceElement.dispatchEvent(DrawEvent('init'));
    } catch (error: any) {
      throw new DrawerError(error.message);
    }
  }

  /**
   * Set canvas sizing
   * @param {number} width Width
   * @param {number} height Height
   * @returns {Promise<boolean>}
   */
  setSize(width: number, height: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const data = this.getData();
        this.$canvas.width = width;
        this.$canvas.height = height;

        // Apply data if not empty for prevent error
        if (!this.isEmpty()) this.loadFromData(data);

        if (this.$toolbar) {
          this.$toolbar.style.maxWidth = this.$canvas.width + 'px';
          this.$toolbar.style.maxHeight = this.$canvas.height + 'px';
        }

        this.$canvas.dispatchEvent(DrawEvent('update.size', { setSize: { w: width, h: height } }));

        resolve(true);
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Check if canvas empty
   * @returns {boolean}
   */
  isEmpty(data?: string): boolean {
    data = data ?? this.getData();
    return document.createElement('canvas').toDataURL() === data;
  }

  /**
   * Change drawing color
   * @param {String} color Color to apply to draw
   */
  setColor(color: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.options.color = color;
        this.ctx.strokeStyle = this.options.color; // passing selectedColor as stroke style
        this.ctx.fillStyle = this.options.color; // passing selectedColor as fill style

        if (this.$colorPicker) {
          this.$colorPicker.value = color;
          // for update coloris component
          this.$colorPicker.dispatchEvent(new Event('input', { bubbles: true }));
        }
        this.$canvas.dispatchEvent(DrawEvent('update.color', { color }));

        resolve(true);
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Change css canvas background color (ignored on export)
   * @param bgColor canvas css background color
   */
  setBgColor(bgColor?: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.$canvas.style.backgroundColor = bgColor ?? this.options.bgColor;

        this.$canvas.dispatchEvent(DrawEvent('update.bgColor', { bgColor }));

        resolve(true);
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * @private
   * Change background color of canvas for print only
   * be carefull, all drawing are removed
   * @param bgColor Background color
   * @returns {Promise<Drawer>}
   */
  private _setBgColor(bgColor: string): Promise<Drawer> {
    return new Promise((resolve, reject) => {
      try {
        if (!bgColor) {
          reject(new DrawerError(`Missing param bgColor in method '_setBgColor'`));
        }
        // store data
        const data = this.getData();
        this.options.bgColor = bgColor;
        this.ctx.fillStyle = bgColor;
        this.ctx.fillRect(0, 0, this.$canvas.width, this.$canvas.height);
        // rewrite data after updating bgcolor
        this.loadFromData(data).then(() => {
          resolve(this);
        });
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Change tool
   * @param {keyof typeof DrawTools} toolName Tool name to set
   */
  changeTool(toolName: keyof typeof DrawTools) {
    return new Promise((resolve, reject) => {
      try {
        this.activeTool = toolName;

        let $btn: HTMLButtonElement | null = null;
        if (this.$toolbar) {
          switch (toolName) {
            case 'brush':
              $btn = this.$brushBtn;
              break;
            case 'text':
              $btn = this.$textBtn;
              break;
            case 'eraser':
              $btn = this.$eraserBtn;
              break;
            case 'square':
            case 'star':
            case 'arrow':
            case 'circle':
            case 'line':
            case 'rect':
            case 'triangle':
              $btn = this.$shapeBtn;
          }

          this.setActiveBtn($btn);
          this.$canvas.dispatchEvent(DrawEvent('update.tool', { toolName }));
          resolve(true);
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Clear all canvas
   *
   * @returns {HTMLCanvasElement}
   */
  clear(): Promise<HTMLCanvasElement> {
    return new Promise((resolve, reject) => {
      try {
        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.redo_list = [];
        this.undo_list = [];
        this.gridActive = false;
        this._manageUndoRedoBtn();
        this.$canvas.dispatchEvent(DrawEvent('change', this));

        // After event, else save event triggered
        const saved = localStorage.getItem(this.options.localStorageKey);
        if (saved) {
          localStorage.removeItem(this.options.localStorageKey);
        }
        resolve(this.$canvas);
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Inject date to canvas
   * @param data
   * @returns {Promise<Drawer>}
   */
  loadFromData(data: string): Promise<Drawer> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const hRatio = this.$canvas.width / img.width;
        const vRatio = this.$canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);
        const centerShift_x = (this.$canvas.width - img.width * ratio) / 2;
        const centerShift_y = (this.$canvas.height - img.height * ratio) / 2;
        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShift_x,
          centerShift_y,
          img.width * ratio,
          img.height * ratio
        );
        resolve(this);
      };
      img.onerror = () => {
        reject(new DrawerError(`Error during loading img with src : "${data}"`));
      };
      img.src = data;
    });
  }

  /**
   * Save draw to localStorage
   */
  saveDraw() {
    if (this.options.localStorageKey) {
      localStorage.setItem(this.options.localStorageKey, this.getData());
    } else {
      throw new DrawerError(`Error saving draw, options 'localStorageKey' is wrong.`);
    }
  }

  /**
   * Get date url from canvas
   * @returns {string} canvas png data
   */
  getData(): string {
    return this.$canvas.toDataURL('image/png');
  }

  /**
   * Adding an empty toolbar element
   * @returns {Promise<HTMLDivElement>} HTML toolbar element
   */
  addToolbar(): Promise<HTMLDivElement> {
    return new Promise((resolve, reject) => {
      try {
        const toolbar = /*html*/ `<div class="toolbar ${this.options.toolbarPosition ?? 'outerTop'}"></div>`;

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
    this.addShapeBtn();
    this.addLineThicknessBtn();
    this.addColorPickerBtn();
    this.addUploadFileBtn();
    this.addDownloadBtn();
    this.addSettingBtn();
  }

  /**
   * Add undo button to toolbar if exist
   * see {@link addToolbar} before use it
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
              this.undo();
              this._manageUndoRedoBtn();
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
          const redoBtn = /*html*/ `<button title="${'Redo'}" class="btn" disabled>${RedoIcon}</button>`;
          const $redoBtn = stringToHTMLElement<HTMLButtonElement>(redoBtn);
          this.$redoBtn = $redoBtn;

          this.$toolbar.appendChild(this.$redoBtn);

          this.$redoBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action.call(this, $redoBtn);
            } else {
              this.redo();
              this._manageUndoRedoBtn();
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
          const brushBtn = /*html*/ `<button title="${'Brush'}" class="btn active">${BrushIcon}</button>`;
          const $brushBtn = stringToHTMLElement<HTMLButtonElement>(brushBtn);
          this.$brushBtn = $brushBtn;

          this.$toolbar.appendChild(this.$brushBtn);

          this.$brushBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action.call(this, $brushBtn);
            } else {
              this.changeTool('brush');
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
          const eraserBtn = /*html*/ `<button title="${'Eraser'}" class="btn">${EraserIcon}</button>`;
          const $eraserBtn = stringToHTMLElement<HTMLButtonElement>(eraserBtn);
          this.$eraserBtn = $eraserBtn;

          this.$toolbar.appendChild(this.$eraserBtn);

          this.$eraserBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action.call(this, $eraserBtn);
            } else {
              this.changeTool('eraser');
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
          const clearBtn = /*html*/ `<button title="${'Clear draw'}" class="btn">${ClearIcon}</button>`;
          const $clearBtn = stringToHTMLElement<HTMLButtonElement>(clearBtn);
          this.$clearBtn = $clearBtn;

          this.$toolbar.appendChild(this.$clearBtn);

          this.$clearBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action.call(this, $clearBtn);
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
          const shapeBtn = /*html*/ `<button title="${'Draw shape'}" class="btn btn-shape">${ShapeIcon}</button>`;

          const shapeMenu = /*html*/ `
          <ul class="shape-menu">
            <li class="shape-menu-item">
              <button data-shape="triangle" class="btn triangle">${TriangleIcon}</button>
            </li>
            <li class="shape-menu-item">
              <button data-shape="rect" class="btn rect">${RectIcon}</button>
            </li>
            <li class="shape-menu-item">
              <button data-shape="square" class="btn square">${SquareIcon}</button>
            </li>
            <li class="shape-menu-item">
              <button data-shape="line" class="btn line">${LineIcon}</button>
            </li>
            <li class="shape-menu-item">
              <button data-shape="arrow" class="btn arrow">${ArrowIcon}</button>
            </li>
            <li class="shape-menu-item">
              <button data-shape="circle" class="btn circle">${CircleIcon}</button>
            </li>
          </ul>`;

          const $shapeMenu = stringToHTMLElement<HTMLUListElement>(shapeMenu);
          const $shapeBtn = stringToHTMLElement<HTMLButtonElement>(shapeBtn);

          this.$shapeBtn = $shapeBtn;
          this.$shapeMenu = $shapeMenu;

          this.$toolbar.appendChild(this.$shapeBtn);
          document.querySelector('body')?.appendChild(this.$shapeMenu);

          this.$shapeBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action.call(this, $shapeBtn);
            } else {
              const { bottom, left } = $shapeBtn.getBoundingClientRect();
              this.$shapeMenu.style.top = bottom + 3 + 'px';
              this.$shapeMenu.style.left = left + 'px';
              this.$shapeMenu.classList.toggle('show');
            }
          });

          this.$shapeMenu.querySelectorAll('button').forEach(($btn) => {
            $btn.addEventListener('click', () => {
              const shape = $btn.dataset.shape as keyof typeof DrawTools;
              this.setShape(shape);
            });
          });

          // Manage click outside menu or button
          document.addEventListener(
            'click',
            (event) => {
              if (event.target) {
                const outsideClick =
                  !$shapeBtn.contains(event.target as Node) && !this.$shapeMenu.contains(event.target as Node);

                if (outsideClick) {
                  this.$shapeMenu.classList.remove('show');
                }
              }
            },
            false
          );

          resolve($shapeBtn);
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
          const textBtn = /*html*/ `<button title="${'Text zone'}" class="btn">${TextIcon}</button>`;
          const $textBtn = stringToHTMLElement<HTMLButtonElement>(textBtn);
          this.$textBtn = $textBtn;

          this.$toolbar.appendChild(this.$textBtn);

          this.$textBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action.call(this, $textBtn);
            } else {
              this.changeTool('text');
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
          const lineThickness = /*html*/ `
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
              action.call(this, this.$lineThickness.querySelector('input') as HTMLInputElement);
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
   * using colorisjs, for customisation please see here {@link https://github.com/mdbassit/Coloris}
   * @param action Action call after color selected
   * @returns {Promise<HTMLInputElement>}
   */
  addColorPickerBtn(action?: action<HTMLInputElement>): Promise<HTMLInputElement> {
    return new Promise((resolve, reject) => {
      try {
        if (this.$toolbar && !this.$colorPicker) {
          const colorPickerContainer = /*html*/ `
          <div class="container-colorpicker">
            <input class="btn" title="${'Color'}" id="colopicker-${this.options.id}" class="" type="text" value="${
              this.options.color
            }" data-coloris/>
          </div>
          `;
          const $colorPickerContainer = stringToHTMLElement<HTMLDivElement>(colorPickerContainer);

          this.$toolbar.appendChild($colorPickerContainer);

          const $colorPicker = $colorPickerContainer.querySelector('input') as HTMLInputElement;
          this.$colorPicker = $colorPicker;

          Coloris.init();
          Coloris({
            el: `#colopicker-${this.options.id}`,
            theme: 'polaroid',
            swatches: this.options.availableColor,
            swatchesOnly: this.options.availableColorOnly,
            formatToggle: true,
            onChange: (color) => {
              if (typeof action === 'function') {
                action.call(this, $colorPicker, color);
              } else {
                this.setColor($colorPicker.value);
              }
            },
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
          const uploadFile = /*html*/ `
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
              action.call(this, this.$uploadFile);
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
        const download = /*html*/ `<button title="${'Download'}" class="btn">${DownloadIcon}</button>`;
        const $downloadBtn = stringToHTMLElement<HTMLButtonElement>(download);
        this.$downloadBtn = $downloadBtn;

        this.$toolbar.appendChild(this.$downloadBtn);

        this.$downloadBtn.addEventListener('click', () => {
          if (typeof action === 'function') {
            action.call(this, $downloadBtn);
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
        const settingBtn = /*html*/ `<button title="${'Setting'}" class="btn">${SettingIcon}</button>`;
        const $settingBtn = stringToHTMLElement<HTMLButtonElement>(settingBtn);
        this.$settingBtn = $settingBtn;

        this.$toolbar.appendChild(this.$settingBtn);

        this.$settingBtn.addEventListener('click', () => {
          if (typeof action === 'function') {
            action.call(this, $settingBtn);
          } else {
            // Open setting modal
            if (this.settingModal.isVisible()) {
              this.settingModal.hide();
            } else {
              this.settingModal.show();
            }
          }
        });

        resolve(this.$settingBtn);
      } else {
        reject(new DrawerError(`No toolbar provided, please call 'addToolbar' method first`));
      }
    });
  }

  addCustomBtn(
    name: string,
    title: string,
    label: string,
    action?: action<HTMLButtonElement>
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

  /**
   * Change drawing shape
   * @param shape
   */
  setShape(shape: keyof typeof DrawTools) {
    return new Promise((resolve, reject) => {
      try {
        if (this.$shapeBtn) {
          let icon = '';

          switch (shape) {
            case 'line':
              icon = LineIcon;
              break;
            case 'square':
              icon = SquareIcon;
              break;
            case 'rect':
              icon = RectIcon;
              break;
            case 'star':
              icon = StarIcon;
              break;
            case 'triangle':
              icon = TriangleIcon;
              break;
            case 'circle':
              icon = CircleIcon;
              break;
            case 'arrow':
              icon = ArrowIcon;
              break;

            default:
              break;
          }
          this.$shapeBtn.innerHTML = icon;
          this.$shapeMenu.classList.remove('show');
          this.changeTool(shape);
          this.$canvas.dispatchEvent(DrawEvent('update.shape', { shape }));
          resolve(true);
        }
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Set line style dotted
   * @param active
   * @param {number[]} [dash=[10, 5]] Line dash format [width, spacing]
   */
  setDottedLine(active: boolean, dash: number[] = [10, 5]) {
    return new Promise((resolve, reject) => {
      try {
        this.options.dash = dash;

        if (!active) {
          this.ctx.setLineDash([]);
        } else {
          this.ctx.setLineDash(dash);
        }
        this.dotted = active;
        this.$canvas.dispatchEvent(DrawEvent('update.dotted', { dotted: active, dash }));
        resolve(true);
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Apply active state to btn
   * @param {HTMLButtonElement} $btn Button to add active class
   */
  setActiveBtn($btn: HTMLButtonElement | null) {
    if (this.$toolbar) {
      this.$toolbar.querySelectorAll('.btn').forEach(($b) => $b.classList.remove('active'));

      if (this.$shapeMenu) {
        this.$shapeMenu.querySelectorAll('.btn').forEach(($b) => $b.classList.remove('active'));
      }
      $btn?.classList.add('active');
    } else {
      throw new DrawerError(`No toolbar provided`);
    }
  }

  /**
   * Set the line width
   * @param width Line width
   */
  setLineWidth(width: number) {
    this.options.lineThickness = width;
    this.ctx.lineWidth = width;

    if (this.$lineThickness) {
      const $counter = this.$lineThickness.querySelector('.counter');
      if ($counter) {
        $counter.innerHTML = String(this.options.lineThickness);
      }
    }

    this.$canvas.dispatchEvent(DrawEvent('update.lineThickness', { lineThickness: width }));
  }

  isShape(): boolean {
    return this.#availableShape.includes(this.activeTool);
  }

  private _manageUndoRedoBtn() {
    if (!this.undo_list.length && this.$undoBtn) {
      this.$undoBtn.disabled = true;
    } else if (this.$undoBtn) {
      this.$undoBtn.disabled = false;
    }

    if (!this.redo_list.length && this.$redoBtn) {
      this.$redoBtn.disabled = true;
    } else if (this.$redoBtn) {
      this.$redoBtn.disabled = false;
    }
  }

  /**
   * Start drawing (mousedown)
   * @param {PointerEvent} event
   * @returns
   */
  private _startDraw(event: PointerEvent) {
    if (this.activeTool === 'text') return;
    if (this.isShape()) {
      this.#dragStartLocation = getMousePosition(this.$canvas, event);
    }
    this.ctx.beginPath();
    this.isDrawing = true;
    this._takeSnapshot();
    this.saveState();

    if (this.activeTool !== 'brush' && this.activeTool !== 'eraser' && this.options.guides) {
      const position = getMousePosition(this.$canvas, event);
      this.drawGuides(position);
      this.drawPointerDownArc(position);
    }
  }
  /**
   * @private _drawing
   * @param {PointerEvent} event
   * @returns
   */
  private _drawing(event: PointerEvent) {
    if (event.buttons !== 1 || this.activeTool === 'text') return; // if isDrawing is false return from here

    if (this.activeTool !== 'eraser') {
      this.ctx.globalCompositeOperation = this.settingModal.xor ? 'xor' : 'source-over';
    } else if (this.activeTool === 'eraser') {
      this.ctx.globalCompositeOperation = 'destination-out';
    } else {
      throw new Error(`Drawerror : unknown active draw tool "${this.activeTool}"`);
    }

    if (this.isShape()) {
      this._restoreSnapshot();
    }
    const position = getMousePosition(this.$canvas, event);

    if (this.activeTool !== 'brush' && this.activeTool !== 'eraser' && this.options.guides) {
      this.drawGuides(position);
      this.drawPointerDownArc(this.#dragStartLocation);
      this.drawRubberBandReference(position);
    }

    this._draw(position);
  }

  /**
   * @private _drawend
   * trigger when draw ended
   * @param {PointerEvent} event
   */
  private _drawend(event: PointerEvent) {
    if (event.pointerType !== 'mouse' || event.button === 0) {
      if (this.isShape()) {
        this._restoreSnapshot();
      }
      const position =
        this.activeTool === 'text' ? { x: event.clientX, y: event.clientY } : getMousePosition(this.$canvas, event);

      this._manageUndoRedoBtn();
      this._draw(position);
      this.isDrawing = false;
    }
  }

  private _takeSnapshot() {
    this.#snapshot = this.ctx.getImageData(0, 0, this.$canvas.width, this.$canvas.height);
  }

  private _restoreSnapshot() {
    this.ctx.putImageData(this.#snapshot, 0, 0);
  }

  private _draw(position: Position) {
    this.ctx.lineWidth = this.options.lineThickness; // passing brushSize as line width
    this.ctx.strokeStyle = this.options.color; // passing selectedColor as stroke style
    this.ctx.fillStyle = this.options.color; // passing selectedColor as fill style
    this.ctx.lineCap = this.options.cap;

    if (this.activeTool === 'brush' || this.activeTool === 'eraser') {
      this._drawHand(position);
    } else if (this.activeTool === 'text') {
      this._addTextArea(position);
    } else if (this.activeTool === 'line') {
      this._drawLine(position);
    } else if (this.activeTool === 'rect') {
      this._drawRect(position);
    } else if (this.activeTool === 'square') {
      this._drawPolygon(position, 4, Math.PI / 4);
    } else if (this.activeTool === 'arrow') {
      this._drawArrow(position);
    } else if (this.activeTool === 'triangle') {
      const angle =
        (Math.atan2(this.#dragStartLocation.y - position.y, this.#dragStartLocation.x - position.x) * 20) / Math.PI;
      this._drawPolygon(position, 3, (angle * Math.PI) / 4);
    } else if (this.activeTool === 'polygon') {
      const angle =
        360 -
        (Math.atan2(this.#dragStartLocation.y - position.y, this.#dragStartLocation.x - position.x) * 180) / Math.PI;
      this._drawPolygon(position, 5, angle * (Math.PI / 180));
    } else if (this.activeTool === 'circle') {
      this._drawCircle(position);
    }

    if (this.options.fill && this.activeTool !== 'eraser' && this.activeTool !== 'brush') {
      this.ctx.fill();
    } else {
      this.ctx.stroke();
    }

    this.$canvas.dispatchEvent(DrawEvent('change', this.getData()));
  }

  private _drawHand({ x, y }: Position) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  private _drawLine({ x, y }: Position) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.#dragStartLocation.x, this.#dragStartLocation.y);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  private _drawRect({ x, y }: Position) {
    const w = x - this.#dragStartLocation.x;
    const h = y - this.#dragStartLocation.y;
    this.ctx.beginPath();
    this.ctx.rect(this.#dragStartLocation.x, this.#dragStartLocation.y, w, h);
  }

  private _drawCircle({ x, y }: Position) {
    const radius = Math.sqrt(Math.pow(this.#dragStartLocation.x - x, 2) + Math.pow(this.#dragStartLocation.y - y, 2));
    this.ctx.beginPath();
    this.ctx.arc(this.#dragStartLocation.x, this.#dragStartLocation.y, radius, 0, 2 * Math.PI);
  }

  private _drawArrow({ x, y }: Position) {
    const angle = Math.atan2(y - this.#dragStartLocation.y, x - this.#dragStartLocation.x);
    const hyp = Math.sqrt(
      (x - this.#dragStartLocation.x) * (x - this.#dragStartLocation.x) +
        (y - this.#dragStartLocation.y) * (y - this.#dragStartLocation.y)
    );

    this.ctx.save();
    this.ctx.translate(this.#dragStartLocation.x, this.#dragStartLocation.y);
    this.ctx.rotate(angle);

    // line
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(hyp - this.options.lineThickness, 0);
    this.ctx.stroke();

    // triangle
    let triangleWidth = this.options.lineThickness;
    // Min size, less of 5 is not visible
    if (triangleWidth < 5) {
      triangleWidth = 5;
    }
    this.ctx.beginPath();
    this.ctx.lineTo(hyp - triangleWidth, triangleWidth);
    this.ctx.lineTo(hyp, 0);
    this.ctx.lineTo(hyp - triangleWidth, -triangleWidth);
    this.ctx.fill();

    this.ctx.restore();
  }

  // private _drawEllipse({x, y }: Position) {
  //   const w = position.x - this.#dragStartLocation.x;
  //   const h = position.y - this.#dragStartLocation.y;
  //   const radius = Math.sqrt(
  //     Math.pow(this.#dragStartLocation.x - position.x, 2) + Math.pow(this.#dragStartLocation.y - position.y, 2)
  //   );
  //   this.ctx.beginPath();

  //   this.ctx.ellipse(
  //     this.#dragStartLocation.x,
  //     this.#dragStartLocation.y,
  //     Math.abs(w),
  //     Math.abs(h),
  //     radius,
  //     radius,
  //     2 * Math.PI,
  //     false
  //   );
  // }

  // private _drawStar(centerX: number, centerY: number, points: number, outer: number, inner: number) {
  //   // define the star
  //   this.ctx.beginPath();
  //   this.ctx.moveTo(centerX, centerY + outer);
  //   for (let i = 0; i < 2 * points + 1; i++) {
  //     const r = i % 2 == 0 ? outer : inner;
  //     const a = (Math.PI * i) / points;
  //     this.ctx.lineTo(centerX + r * Math.sin(a), centerY + r * Math.cos(a));
  //   }
  //   this.ctx.closePath();
  //   // draw
  //   this.ctx.fill();
  //   this.ctx.stroke();
  // }

  private _drawPolygon({ x, y }: Position, sides: number, angle: number) {
    const coordinates = [],
      radius = Math.sqrt(Math.pow(this.#dragStartLocation.x - x, 2) + Math.pow(this.#dragStartLocation.y - y, 2));

    for (let index = 0; index < sides; index++) {
      coordinates.push({
        x: this.#dragStartLocation.x + radius * Math.cos(angle),
        y: this.#dragStartLocation.y - radius * Math.sin(angle),
      });
      angle += (2 * Math.PI) / sides;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(coordinates[0].x, coordinates[0].y);

    for (let index = 0; index < sides; index++) {
      this.ctx.lineTo(coordinates[index].x, coordinates[index].y);
    }

    this.ctx.closePath();
  }

  addGrid() {
    this.$canvas.classList.add('grid');
    this.options.grid = true;
  }

  removeGrid() {
    this.$canvas.classList.remove('grid');
    this.options.grid = false;
  }

  drawGuides({ x, y }: Position) {
    this.ctx.save();
    this.ctx.strokeStyle = 'rgb(255, 26, 121, 0.8)';
    this.ctx.lineWidth = 1;

    this.ctx.beginPath();
    this.ctx.moveTo(0, y);
    this.ctx.lineTo(this.ctx.canvas.width, y);
    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(x, 0);
    this.ctx.lineTo(x, this.ctx.canvas.height);
    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.restore();
  }

  drawPointerDownArc({ x, y }: Position) {
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(255,0,0,0.5)';
    this.ctx.beginPath();
    this.ctx.arc(x, y, 10, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawRubberBandReference({ x, y }: Position) {
    const rubberBandRect: any = {};
    if (this.#dragStartLocation.x < x) {
      rubberBandRect.left = this.#dragStartLocation.x;
    } else {
      rubberBandRect.left = x;
    }

    if (this.#dragStartLocation.y < y) {
      rubberBandRect.top = this.#dragStartLocation.y;
    } else {
      rubberBandRect.top = y;
    }

    rubberBandRect.width = Math.abs(this.#dragStartLocation.x - x);
    rubberBandRect.height = Math.abs(this.#dragStartLocation.y - y);
    this.ctx.save();
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 1;

    this.ctx.beginPath();
    this.ctx.arc(rubberBandRect.left, rubberBandRect.top, 4, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(rubberBandRect.left + rubberBandRect.width, rubberBandRect.top, 4, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(rubberBandRect.left, rubberBandRect.top + rubberBandRect.height, 4, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(
      rubberBandRect.left + rubberBandRect.width,
      rubberBandRect.top + rubberBandRect.height,
      4,
      0,
      Math.PI * 2
    );
    this.ctx.closePath();
    this.ctx.stroke();

    this.ctx.restore();
  }

  /**
   * Update cursor style
   */
  private _updateCursor() {
    const rad = this.options.lineThickness;
    const cursorCanvas = document.createElement('canvas');
    const ctx = cursorCanvas.getContext('2d') as CanvasRenderingContext2D;
    cursorCanvas.width = cursorCanvas.height = rad;

    ctx.lineCap = this.options.cap;
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, this.$canvas.width, this.$canvas.height);

    if (this.options.cap === 'round') {
      ctx.arc(rad / 2, rad / 2, (rad / 2) * 0.9, 0, Math.PI * 2, false);
    } else {
      ctx.rect(0, 0, rad, rad);
    }

    if (this.activeTool === 'brush') {
      ctx.fillStyle = this.options.color;
      ctx.fill();
    } else if (this.activeTool === 'eraser') {
      ctx.strokeStyle = this.options.color;
      ctx.stroke();
    } else if (this.isShape()) {
      this.$canvas.style.cursor = 'crosshair';
      return;
    } else {
      // Text
      this.$canvas.style.cursor = `text`;
      return;
    }

    cursorCanvas.toBlob((blob) => {
      if (blob) {
        URL.revokeObjectURL(this.$canvas.style.cursor);
        const cursorURL = URL.createObjectURL(blob);
        this.$canvas.style.cursor = `url(${cursorURL}) ${rad / 2} ${rad / 2}, auto`;
      }
    });
  }

  /**
   * @private Initialize all event listener
   */
  private _initHandlerEvents() {
    this._startDraw = throttle(this._startDraw, 10);
    this._drawing = throttle(this._drawing, 10);
    this._drawend = throttle(this._drawend, 10);

    this.$canvas.addEventListener('pointerdown', this._startDraw.bind(this), false);
    this.$canvas.addEventListener('pointermove', this._drawing.bind(this), false);
    this.$canvas.addEventListener('pointerup', this._drawend.bind(this), false);

    this.$canvas.addEventListener('drawer.update.color', this._updateCursor.bind(this));
    this.$canvas.addEventListener('drawer.update.lineThickness', this._updateCursor.bind(this));
    this.$canvas.addEventListener('drawer.update.tool', this._updateCursor.bind(this));

    this.$canvas.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        if (event.code === 'KeyW') {
          this.undo();
        } else if (event.code === 'KeyY') {
          this.redo();
        }
      }
    });

    if (this.options.autoSave) {
      this.$canvas.addEventListener('drawer.change', this.saveDraw.bind(this));
    }

    // this.$canvas.addEventListener('drawer.change', () => this.saveState());
  }

  /**
   * Adding textarea to clicked zone
   * @param {Position} position
   */
  private _addTextArea({ x, y }: Position) {
    this.ctx.globalCompositeOperation = 'source-over';
    const $textArea = document.createElement('textarea');
    const fontSize = this.options.lineThickness < 12 ? 12 : this.options.lineThickness;

    $textArea.style.position = 'fixed';
    $textArea.style.left = x + 'px';
    $textArea.style.top = y + 'px';
    $textArea.style.color = this.options.color;
    $textArea.style.height = 'auto';
    $textArea.style.width = 'auto';
    $textArea.style.fontSize = fontSize + 'px';
    $textArea.style.fontFamily = 'sans-serif';

    $textArea.addEventListener('focusout', () => {
      this.saveState();
      const value = $textArea.value;

      if (value) {
        this.ctx.textBaseline = 'top';
        this.ctx.textAlign = 'left';
        this.ctx.font = fontSize + 'px sans-serif';
        const lineHeight = this.ctx.measureText('Mi').width;
        const lines = $textArea.value.split('\n');

        const x = parseInt($textArea.style.left, 10) - this.$canvas.getBoundingClientRect().left;
        let y = parseInt($textArea.style.top, 10) - this.$canvas.getBoundingClientRect().top;
        this.ctx.fillStyle = this.options.color;
        for (const line of lines) {
          this.ctx.fillText(line, x, y);
          y += lineHeight;
        }
      }
      $textArea.remove();
      this.$canvas.dispatchEvent(DrawEvent('change', this.getData()));
    });

    $textArea.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
      this.style.width = 'auto';
      this.style.width = this.scrollWidth + 'px';
    });

    this.$drawerContainer.appendChild($textArea);

    $textArea.focus();
  }
}
