import './drawer.css';
import { stringToHTMLElement } from './utils/dom';
import { DrawerError } from './utils/DrawError';
import { BrushIcon } from './icons/brush';
import { EraserIcon } from './icons/eraser';
import { TextIcon } from './icons/text';
import { DownloadIcon } from './icons/download';
import { defaultOptions } from './utils/constantes';
import { DrawEvent } from './utils/DrawEvent';

// Type import
import { DrawTools, DrawerOptions, action } from './types/drawer';
import { History } from './utils/History';
import { UndoIcon } from './icons/undo';
import { RedoIcon } from './icons/redo';
import { ClearIcon } from './icons/clear';
import { ColorIcon } from './icons/color';
import { ShapeIcon } from './icons/shape';
import { TriangleIcon } from './icons/triangle';
import { SquareIcon } from './icons/square';
import { LineIcon } from './icons/line';
import { StarIcon } from './icons/star';
import { UploadIcon } from './icons/upload';
import { SettingIcon } from './icons/setting';
import { throttle } from './utils/perf';
import { getMousePosition } from './utils/infos';

export class Drawer extends History {
  declare ctx: CanvasRenderingContext2D;
  isDrawing: boolean = false;
  activeTool: keyof typeof DrawTools = 'brush';
  dotted: boolean = false;
  // options
  options: DrawerOptions;
  // HTML Elements
  declare $canvas: HTMLCanvasElement;
  $sourceElement: HTMLElement;
  $drawerContainer!: HTMLDivElement;
  $toolbar!: HTMLDivElement;
  $undoBtn!: HTMLButtonElement;
  $redoBtn!: HTMLButtonElement;
  $brushBtn!: HTMLButtonElement;
  $eraserBtn!: HTMLButtonElement;
  $clearBtn!: HTMLButtonElement;
  $textBtn!: HTMLButtonElement;
  $lineThickness!: HTMLDivElement;
  $downloadBtn!: HTMLButtonElement;
  $colorPicker!: HTMLInputElement;
  $shapeBtn!: HTMLButtonElement;
  $shapeMenu!: HTMLUListElement;
  $uploadFile!: HTMLInputElement;
  $settingBtn!: HTMLButtonElement;
  $colorPickerLabel!: HTMLLabelElement;

  /**
   *
   * @param {HTMLElement} $el Container for drawer
   * @param {Partial<DrawerOptions>} options options for drawer
   */
  constructor($el: HTMLElement, options: Partial<DrawerOptions> = {}) {
    super();
    try {
      this.$sourceElement = $el;
      this.options = { ...defaultOptions, ...options };
      this._init();

      const saved = localStorage.getItem(this.options.localStorageKey);

      if (saved) {
        this.loadFromData(saved);
      }

      if (this.options.defaultToolbar) {
        this.addToolbar();
        this.addDefaults();
      }

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
    this.$drawerContainer = stringToHTMLElement<HTMLDivElement>(`<div class="drawer-container"></div>`);
    const canvas = `
    <canvas tabindex="0" id="${this.options.id}" height="${this.options.height}" width="${this.options.width}" moz-opaque></canvas>
  `;
    this.$canvas = stringToHTMLElement<HTMLCanvasElement>(canvas);
    this.ctx = this.$canvas.getContext('2d') as CanvasRenderingContext2D;
    this.$drawerContainer.appendChild(this.$canvas);
  }

  /**
   * @private
   * initialize canvas and event listener
   * @returns {Promise<Drawer>}
   */
  private _init(): Promise<Drawer> {
    return new Promise((resolve, reject) => {
      try {
        this._buildDrawer();
        this.$sourceElement.appendChild(this.$drawerContainer);
        this.setBgColor();
        this._initHandlerEvents();
        this.setCanvas(this.$canvas);
        this._updateCursor();
        resolve(this);

        // dispatch drawer.init event
        this.$sourceElement.dispatchEvent(DrawEvent('init'));
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * @private
   * Set canvas sizing
   * @param {number} w Width
   * @param {number} h Height
   * @returns {Promise<boolean>}
   */
  setSize(w?: number, h?: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const data = this.getData();
        this.$canvas.width = w ?? this.$canvas.width;
        this.$canvas.height = h ?? this.$canvas.height;

        // Apply data if not empty for prevent error
        if (!this.isEmpty()) this.loadFromData(data);

        if (this.$toolbar) {
          this.$toolbar.style.maxWidth = this.$canvas.width + 'px';
          this.$toolbar.style.maxHeight = this.$canvas.height + 'px';
        }

        this.$canvas.dispatchEvent(DrawEvent('update.size', { setSize: { w, h } }));

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
  isEmpty(): boolean {
    return document.createElement('canvas').toDataURL() === this.getData();
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

        // Update icon color for indicate to user
        if (this.$colorPickerLabel) {
          const $icon = this.$colorPickerLabel.querySelector('svg');
          if ($icon) {
            $icon.style.color = color;
          }
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

        if (this.$toolbar) {
          switch (toolName) {
            case 'brush':
              if (this.$brushBtn) this.setActiveBtn(this.$brushBtn);
              break;
            case 'text':
              if (this.$textBtn) this.setActiveBtn(this.$textBtn);
              break;
            case 'eraser':
              if (this.$eraserBtn) this.setActiveBtn(this.$eraserBtn);
              break;
          }

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
        // restore bg color too
        this.$canvas.dispatchEvent(DrawEvent('change', this));

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
        this.ctx.drawImage(img, 0, 0);
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

    console.debug('draw saved to localstorage');
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
          const undoBtn = `<button title="${'Redo'}" class="btn">${UndoIcon}</button>`;
          this.$undoBtn = stringToHTMLElement<HTMLButtonElement>(undoBtn);

          this.$toolbar.appendChild(this.$undoBtn);

          this.$undoBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action(this, this.$undoBtn);
            } else {
              this.undo();
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
          const redoBtn = `<button title="${'Redo'}" class="btn">${RedoIcon}</button>`;
          this.$redoBtn = stringToHTMLElement<HTMLButtonElement>(redoBtn);

          this.$toolbar.appendChild(this.$redoBtn);

          this.$redoBtn.addEventListener('click', () => {
            if (typeof action === 'function') {
              action(this, this.$undoBtn);
            } else {
              this.redo();
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

  /**
   * Change drawing shape
   * @param shape
   */
  setShape(shape: string) {
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
            case 'star':
              icon = StarIcon;
              break;
            case 'triangle':
              icon = TriangleIcon;
              break;

            default:
              break;
          }
          this.$shapeBtn.innerHTML = icon;
          this.setActiveBtn(this.$shapeBtn);
          this.$shapeMenu.classList.remove('show');
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
  setActiveBtn($btn: HTMLButtonElement) {
    if (this.$toolbar) {
      this.$toolbar.querySelectorAll('.btn').forEach(($b) => $b.classList.remove('active'));

      if (this.$shapeMenu) {
        this.$shapeMenu.querySelectorAll('.btn').forEach(($b) => $b.classList.remove('active'));
      }
      $btn.classList.add('active');
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

  /**
   * Start drawing (mousedown)
   * @param {PointerEvent} _event
   * @returns
   */
  private _startDraw() {
    if (this.activeTool === 'text') return;
    this.saveState();
    this.isDrawing = true;
    this.ctx.beginPath(); // creating new path to draw
    this.ctx.lineWidth = this.options.lineThickness; // passing brushSize as line width
    this.ctx.strokeStyle = this.options.color; // passing selectedColor as stroke style
    this.ctx.fillStyle = this.options.color; // passing selectedColor as fill style
    this.ctx.lineCap = this.options.cap;
  }

  /**
   * @private _drawing
   * @param {PointerEvent} event
   * @returns
   */
  private _drawing(event: PointerEvent) {
    if (event.buttons !== 1 || this.activeTool === 'text') return; // if isDrawing is false return from here

    if (this.activeTool === 'brush') {
      this.ctx.globalCompositeOperation = 'source-over';
    } else if (this.activeTool === 'eraser') {
      this.ctx.globalCompositeOperation = 'destination-out';
    } else {
      throw new Error(`Drawerror : unknown active draw tool "${this.activeTool}"`);
    }

    const { x, y } = getMousePosition(this.$canvas, event);

    this.ctx.lineTo(x, y); // creating line according to the mouse pointer
    this.ctx.stroke();
  }

  /**
   * @private _drawend
   * trigger when draw ended
   * @param {PointerEvent} event
   */
  private _drawend(event: PointerEvent) {
    if (event.pointerType !== 'mouse' || event.button === 0) {
      if (this.activeTool === 'text') {
        this._addTextArea(event);
      } else {
        this.$canvas.dispatchEvent(DrawEvent('change', this.getData()));
      }
      this.isDrawing = false;
    }
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

    if (this.options.cap === 'round') {
      ctx.arc(rad / 2, rad / 2, rad / 2, 0, Math.PI * 2);
    } else {
      ctx.rect(0, 0, rad, rad);
    }

    if (this.activeTool === 'brush') {
      ctx.fillStyle = this.options.color;
      ctx.fill();
    } else if (this.activeTool === 'eraser') {
      ctx.strokeStyle = this.options.color;
      ctx.stroke();
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
    this._drawend = throttle(this._drawend);

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
  }

  /**
   * Adding textarea to clicked zone
   * @param event
   */
  private _addTextArea(event: PointerEvent) {
    this.ctx.globalCompositeOperation = 'source-over';
    const $textArea = document.createElement('textarea');

    $textArea.style.position = 'fixed';
    $textArea.style.left = event.clientX + 'px';
    $textArea.style.top = event.clientY + 'px';
    $textArea.style.color = this.options.color;
    $textArea.style.height = 'auto';
    $textArea.style.width = 'auto';

    $textArea.addEventListener('focusout', () => {
      const value = $textArea.value;

      if (value) {
        this.ctx.textBaseline = 'top';
        this.ctx.textAlign = 'left';
        this.ctx.font = '14px sans-serif';
        const lineHeight = this.ctx.measureText('Mi').width;
        const lines = $textArea.value.split('\n');

        const x = parseInt($textArea.style.left, 10) - this.$canvas.getBoundingClientRect().left;
        let y = parseInt($textArea.style.top, 10) - this.$canvas.getBoundingClientRect().top;
        this.ctx.fillStyle = this.options.color;
        for (const line of lines) {
          this.ctx.fillText(line, x, y);
          y += lineHeight;
        }

        this.$canvas.dispatchEvent(DrawEvent('change', this.getData()));
      }
      $textArea.remove();
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
