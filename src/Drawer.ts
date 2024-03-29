import './css/drawer.css';
import { stringToHTMLElement } from './utils/dom';
import { DrawerError } from './utils/DrawError';
import { defaultOptionsDrawer } from './constants';
import { DrawEvent } from './utils/DrawEvent';

// Type import
import type { DrawTools, DrawerOptions, Position, savedStorage } from './types/index';

// History
import { History } from './utils/History';

// icons
import TriangleIcon from './icons/triangle.svg?raw';
import SquareIcon from './icons/square.svg?raw';
import LineIcon from './icons/line.svg?raw';
import StarIcon from './icons/star.svg?raw';
import CircleIcon from './icons/circle.svg?raw';
import RectIcon from './icons/rect.svg?raw';
import ArrowIcon from './icons/arrow.svg?raw';
import EllipseIcon from './icons/ellipse.svg?raw';

// Utils
import { throttle } from './utils/perf';
import { getMousePosition } from './utils/infos';
import { deepMerge, isJSON } from './utils/utils';

// UI
import { SettingsModal } from './ui/SettingsModal';

import { version } from '../package.json';
import { Toolbar } from './ui/Toolbar';
import { ConfirmModal } from './ui/ConfirmModal';

declare global {
  interface HTMLCanvasElement {
    drawer: Drawer;
  }
}

/**
 * @class Drawer
 * {@link https://drawer.netlify.app}
 *
 * Copyright (c) 2023 Winkler Fabien & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Winkler Fabien <fabienwinkler@outlook.fr>
 */
class Drawer extends History {
  declare ctx: CanvasRenderingContext2D;
  isDrawing: boolean = false;
  activeTool: keyof typeof DrawTools = 'brush';
  dotted: boolean = false;
  // options
  options: DrawerOptions = defaultOptionsDrawer;
  // HTML Elements
  declare $canvas: HTMLCanvasElement;
  $sourceElement: HTMLElement;
  $drawerContainer!: HTMLDivElement;
  #dragStartLocation: Position = { x: 0, y: 0 };
  #snapshot!: ImageData;
  #availableShape: Array<keyof typeof DrawTools> = [
    'rect',
    'circle',
    'ellipse',
    'square',
    'arrow',
    'line',
    'star',
    'triangle',
    'polygon',
  ];
  settingModal!: SettingsModal;
  clearModal!: ConfirmModal;
  gridActive!: boolean;
  VERSION = version;
  toolbar: Toolbar;
  #cloneCanvas!: HTMLCanvasElement;

  /**
   *
   * @param {HTMLElement} $el Container for drawer
   * @param {Partial<DrawerOptions>} options options for drawer
   */
  constructor($el: HTMLElement, options: Partial<DrawerOptions> = {}) {
    super();
    try {
      if ($el instanceof HTMLElement) {
        this.$sourceElement = $el;

        // if no width, and container larger than default width
        if (!options.width && $el.offsetWidth > defaultOptionsDrawer.width) {
          options.width = $el.offsetWidth;
        }
        this.options = deepMerge<DrawerOptions>(defaultOptionsDrawer, options);
        this._buildDrawer();
        this.$sourceElement.appendChild(this.$drawerContainer);
        this.setBgColor(this.options.bgColor);
        this._initHandlerEvents();
        this.setCanvas(this.$canvas);
        this._updateCursor();

        const saved = localStorage.getItem(this.options.localStorageKey);
        let trigger = true;

        if (saved) {
          if (isJSON(saved)) {
            const parsed = JSON.parse(saved) as savedStorage;

            if (!this.isEmpty(parsed.data)) {
              this.loadFromData(parsed.data, false);
            }
            this.setBgColor(parsed.bgcolor, false);
            this.options.grid = parsed.grid;
          } else if (!this.isEmpty(saved)) {
            // temporary, after 1.1.6 storage value changed, remove on v2
            this.loadFromData(saved, false);
          }
          trigger = false;
        }

        if (this.options.grid) {
          this.addGrid(trigger);
        }

        this.$canvas.drawer = this;
        this.toolbar = new Toolbar(this, { toolbarPosition: this.options.toolbarPosition });

        if (this.options.defaultToolbar) {
          this.toolbar.addToolbar();
          this.toolbar.addDefaults();
        }

        this.settingModal = new SettingsModal(this);

        if (this.options.dotted) {
          this.setDottedLine(true, this.options.dash);
        }

        this.setTool(this.options.tool);

        // dispatch drawer.init event
        this.$sourceElement.dispatchEvent(DrawEvent('init', this));
      } else {
        throw new DrawerError(`element must be an instance of HTMLElement`);
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
      <canvas tabindex="1" id="${this.options.id}" height="${this.options.canvasHeight}" width="${this.options.canvasWidth}" class="canvas-drawer"></canvas>
      `;
      this.$canvas = stringToHTMLElement<HTMLCanvasElement>(canvas);
      this.#cloneCanvas = this.$canvas.cloneNode() as HTMLCanvasElement;
      this.ctx = this.$canvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
      this.ctx.globalAlpha = this.options.opacity;
      this.ctx.imageSmoothingEnabled = false;
      this.$drawerContainer.style.width = this.options.width + 'px';
      this.$drawerContainer.style.height = this.options.height + 'px';
      this.$drawerContainer.appendChild(this.$canvas);
    } catch (error: any) {
      throw new DrawerError(error.message);
    }
  }

  destroy() {
    this.clear();
    this.$drawerContainer.remove();
  }

  /**
   * Set size of container
   * @param {number} width Width
   * @param {number} height Height
   * @returns {Promise<boolean>}
   */
  async setSize(width: number, height: number): Promise<boolean> {
    this.$drawerContainer.style.width = width + 'px';
    this.$drawerContainer.style.height = height + 'px';

    if (this.toolbar.$toolbar) {
      this.toolbar.$toolbar.style.maxWidth = width + 'px';
      this.toolbar.$toolbar.style.maxHeight = height + 'px';
    }

    this.$canvas.dispatchEvent(DrawEvent('update.size', { setSize: { w: width, h: height } }));
    return true;
  }

  /**
   * Set canvas sizing - / ! \ Careful; this method change ur current drawing !!! / ! \
   * @param {number} width Width
   * @param {number} height Height
   * @returns {Promise<boolean>}
   */
  setCanvasSize(width: number, height: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const isEmpty = this.isEmpty();
        const data = this.getData();
        this.$canvas.width = width;
        this.$canvas.height = height;

        // Apply data if not empty for prevent error
        if (!isEmpty) this.loadFromData(data);

        if (this.toolbar.$toolbar) {
          this.toolbar.$toolbar.style.maxWidth = width + 'px';
          this.toolbar.$toolbar.style.maxHeight = height + 'px';
        }

        this.$canvas.dispatchEvent(DrawEvent('update.canvasSize', { setSize: { w: width, h: height } }));

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
    return this.#cloneCanvas.toDataURL() === data;
  }

  /**
   * Change drawing color
   * @param {String} color Color to apply to draw
   * @returns {Promise<boolean>}
   */
  setColor(color: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.options.color = color;
        this.ctx.strokeStyle = this.options.color; // passing selectedColor as stroke style
        this.ctx.fillStyle = this.options.color; // passing selectedColor as fill style

        if (this.toolbar.$colorPicker) {
          this.toolbar.$colorPicker.value = color;
          // for update coloris component
          this.toolbar.$colorPicker.dispatchEvent(new Event('input', { bubbles: true }));
        }
        this.$canvas.dispatchEvent(DrawEvent('update.color', { color }));

        resolve(true);
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Change CSS canvas background color
   * @param bgColor canvas css background color
   * @param {Boolean} triggerChange Trigger change event
   * @returns {Promise<boolean>}
   */
  setBgColor(bgColor: string, triggerChange: boolean = true): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.options.bgColor = bgColor;
        this.$canvas.style.backgroundColor = bgColor;

        this.$canvas.dispatchEvent(DrawEvent('update.bgColor', { bgColor }));
        if (triggerChange) this.$canvas.dispatchEvent(DrawEvent('change', this));
        resolve(true);
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Change canvas background color
   *
   * @note use setBgColor (only css) better for prevent draw front of current draw
   * @param bgColor canvas css background color
   * @returns {Promise<boolean>}
   */
  setCanvasBgColor(bgColor: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.options.bgColor = bgColor;
        this.ctx.fillStyle = bgColor;
        this.ctx.fillRect(0, 0, this.$canvas.width, this.$canvas.height);

        this.$canvas.dispatchEvent(DrawEvent('update.canvas.bgColor', { bgColor }));
        this.$canvas.dispatchEvent(DrawEvent('change', this));
        resolve(true);
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * set active tool
   * @param {keyof typeof DrawTools} toolName Tool name to set
   * @returns {Promise<boolean>}
   */
  setTool(toolName: keyof typeof DrawTools): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.activeTool = toolName;

        if (this.toolbar.$toolbar) {
          let $btn: HTMLButtonElement | null = null;
          switch (toolName) {
            case 'brush':
              if (this.toolbar.$brushBtn) $btn = this.toolbar.$brushBtn;
              if (this.toolbar.$drawGroupMenu) $btn = this.toolbar.$drawGroupMenu.querySelector('[data-tool=brush]');
              break;
            case 'text':
              if (this.toolbar.$textBtn) $btn = this.toolbar.$textBtn;
              if (this.toolbar.$drawGroupMenu) $btn = this.toolbar.$drawGroupMenu.querySelector('[data-tool=text]');
              break;
            case 'eraser':
              if (this.toolbar.$eraserBtn) $btn = this.toolbar.$eraserBtn;
              if (this.toolbar.$drawGroupMenu) $btn = this.toolbar.$drawGroupMenu.querySelector('[data-tool=eraser]');
              break;
            case 'square':
            case 'star':
            case 'arrow':
            case 'circle':
            case 'ellipse':
            case 'line':
            case 'rect':
            case 'triangle':
              if (this.toolbar.$shapeBtn) $btn = this.toolbar.$shapeBtn;
              break;
          }

          if ($btn) this.toolbar.setActiveBtn($btn);
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
   * @returns {Promise<HTMLCanvasElement>}
   */
  clear(): Promise<HTMLCanvasElement> {
    return new Promise((resolve, reject) => {
      try {
        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.redo_list = [];
        this.undo_list = [];
        this.toolbar._manageUndoRedoBtn();
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
   * Inject data to canvas
   * @param data
   * @param {Boolean} triggerChange Trigger change event
   * @returns {Promise<Drawer>}
   */
  loadFromData(data: string, triggerChange: boolean = true): Promise<Drawer> {
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

        if (triggerChange) this.$canvas.dispatchEvent(DrawEvent('change', this));
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
   * {@link DrawerOptions.localStorageKey}
   */
  saveDraw() {
    try {
      if (this.options.localStorageKey) {
        localStorage.setItem(
          this.options.localStorageKey,
          JSON.stringify({ data: this.getData(), bgcolor: this.options.bgColor, grid: this.options.grid })
        );
      } else {
        throw new DrawerError(`Error saving draw, options 'localStorageKey' is wrong.`);
      }
    } catch (error: any) {
      throw new DrawerError(error.message);
    }
  }

  /**
   * Get date url from canvas
   * @returns {string} canvas png data
   */
  getData(): string {
    return this.$canvas.toDataURL('image/png');
  }

  async getImage(): Promise<HTMLImageElement> {
    const img = new Image();

    img.src = this.getData();

    await img.decode();

    return img;
  }

  /**
   * Change drawing shape
   * @param {keyof typeof DrawTools} shape
   */
  setShape(shape: keyof typeof DrawTools): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        if (this.toolbar.$shapeBtn) {
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
            case 'ellipse':
              icon = EllipseIcon;
              break;
            case 'arrow':
              icon = ArrowIcon;
              break;

            default:
              break;
          }
          this.toolbar.$shapeBtn.innerHTML = icon;
          this.toolbar.$shapeMenu?.classList.remove('show');
        }
        this.setTool(shape);
        this.$canvas.dispatchEvent(DrawEvent('update.shape', { shape }));
        resolve(true);
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Set line style dotted
   * @param {Boolean} active state
   * @param {number[]} [dash=[10, 5]] Line dash format [width, spacing]
   * @returns {Promise<boolean>}
   */
  setDottedLine(active: boolean, dash: number[] = [10, 5]): Promise<boolean> {
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
   * Set the line width
   * @param {number} width Line width
   */
  setLineWidth(width: number) {
    try {
      // TODO : manage eraser/brush independently
      this.options.lineThickness = width;
      this.options.eraserThickness =
        width > this.options.minEraserThickness ? width * 2 : this.options.minEraserThickness;
      this.ctx.lineWidth = width;

      if (this.toolbar.$lineThickness) {
        const $counter = this.toolbar.$lineThickness.querySelector('.counter');
        if ($counter) {
          $counter.innerHTML = String(this.options.lineThickness);
        }
      }

      this.$canvas.dispatchEvent(DrawEvent('update.lineThickness', { lineThickness: width }));
    } catch (error: any) {
      throw new DrawerError(error.message);
    }
  }

  /**
   * Check if active tool is shape
   * @returns {Boolean}
   */
  isShape(): boolean {
    return this.#availableShape.includes(this.activeTool);
  }

  /**
   * Start drawing (mousedown)
   * @param {MouseEvent | TouchEvent} event
   * @returns
   */
  private _startDraw(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent && event.button === 2) return;
    if (this.activeTool === 'text') return;
    this.#dragStartLocation = getMousePosition(this.$canvas, event);
    this.ctx.beginPath();
    this.isDrawing = true;
    this._takeSnapshot();
    this.saveState();

    if (this.activeTool !== 'brush' && this.activeTool !== 'eraser' && this.options.guides) {
      const position = getMousePosition(this.$canvas, event);
      this._drawGuides(position);
      this._drawPointerDownArc(position);
    }
  }
  /**
   * @private _drawing
   * @param {MouseEvent | TouchEvent} event
   * @returns
   */
  private _drawing(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent && event.buttons !== 1 || this.activeTool === 'text') return; // if isDrawing is false return from here

    if (this.activeTool !== 'eraser') {
      this.ctx.globalCompositeOperation = this.settingModal.xor ? 'xor' : 'source-over';
    } else if (this.activeTool === 'eraser') {
      this.ctx.globalCompositeOperation = 'destination-out';
    } else {
      throw new DrawerError(`unknown active draw tool "${this.activeTool}"`);
    }

    if (this.isShape()) {
      this._restoreSnapshot();
    }
    const position = getMousePosition(this.$canvas, event);

    if (this.activeTool !== 'brush' && this.activeTool !== 'eraser' && this.options.guides) {
      this._drawGuides(position);
      this._drawPointerDownArc(this.#dragStartLocation as Position);
      this._drawRubberBandReference(position);
    }

    this._draw(position);
  }

  /**
   * @private _drawend
   * trigger when draw ended
   * @param {MouseEvent | TouchEvent} event
   */
  private _drawend(event: MouseEvent | TouchEvent) {
    if ((event instanceof MouseEvent && event.button !== 2) || event instanceof TouchEvent) {
      if (this.isShape()) {
        this._restoreSnapshot();
      }

      const position =
        this.activeTool === 'text' ? getMousePosition(this.$canvas, event, false) : getMousePosition(this.$canvas, event);

      this.toolbar._manageUndoRedoBtn();
      this._draw(position);
      this.isDrawing = false;
      this.$canvas.dispatchEvent(DrawEvent('change', this));
    }
  }

  private _takeSnapshot() {
    this.#snapshot = this.ctx.getImageData(0, 0, this.$canvas.width, this.$canvas.height);
  }

  private _restoreSnapshot() {
    this.ctx.putImageData(this.#snapshot, 0, 0);
  }

  private _draw(position: Position) {
    this.ctx.lineWidth = this.activeTool === 'eraser' ? this.options.eraserThickness : this.options.lineThickness; // passing brushSize as line width
    this.ctx.strokeStyle = this.options.color; // passing selectedColor as stroke style
    this.ctx.fillStyle = this.options.color; // passing selectedColor as fill style
    this.ctx.lineCap = this.options.cap;
    const angle =
      (Math.atan2(this.#dragStartLocation.y - position.y, this.#dragStartLocation.x - position.x) * 20) / Math.PI;

    switch (this.activeTool) {
      case 'brush':
      case 'eraser':
        this._drawHand(position);
        break;
      case 'text':
        this._addTextArea(position);
        break;
      case 'line':
        this._drawLine(position);
        break;
      case 'rect':
        this._drawRect(position);
        break;
      case 'square':
        this._drawPolygon(position, 4, Math.PI / 4);
        break;
      case 'triangle':
        this._drawPolygon(position, 3, (angle * Math.PI) / 4);
        break;
      case 'arrow':
        this._drawArrow(position);
        break;
      case 'polygon':
        this._drawPolygon(position, 5, angle * (Math.PI / 180));
        break;
      case 'circle':
        this._drawCircle(position);
        break;
      case 'ellipse':
        this._drawEllipse(position);
        break;
      case 'star':
        console.log('Not implemented');
        break;
    }

    if (this.options.fill && this.isShape()) {
      this.ctx.fill();
    } else {
      this.ctx.stroke();
    }
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

  private _drawEllipse({ x, y }: Position) {
    const w = x - this.#dragStartLocation.x;
    const h = y - this.#dragStartLocation.y;
    const angle = Math.atan2(y - 100, x - 100);
    this.ctx.beginPath();

    this.ctx.ellipse(
      this.#dragStartLocation.x,
      this.#dragStartLocation.y,
      Math.abs(w),
      Math.abs(h),
      angle,
      0,
      2 * Math.PI
    );
  }

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

  /**
   * Add a grid for draw helping
   * @param {Boolean} triggerChange Trigger change event (for prevent auto saving for example)
   */
  addGrid(triggerChange: boolean = true) {
    return new Promise((resolve, reject) => {
      try {
        this.options.grid = true;
        this.$canvas.classList.add('grid');
        if (triggerChange) this.$canvas.dispatchEvent(DrawEvent('change', this));
        resolve(true);
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Remove grid for draw helping
   */
  removeGrid() {
    this.options.grid = false;
    this.$canvas.classList.remove('grid');
    this.$canvas.dispatchEvent(DrawEvent('change', this));
  }

  /**
   * Add a guide when drawing for draw helping
   */
  private _drawGuides({ x, y }: Position) {
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(255, 26, 121, 0.8)';
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

  /**
   * Draw start point references
   */
  private _drawPointerDownArc({ x, y }: Position) {
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(255,0,0,0.5)';
    this.ctx.beginPath();
    this.ctx.arc(x, y, 10, 0, Math.PI * 2);
    this.ctx.fill();
  }

  /**
   * Draw x/y point references
   * @param param0
   */
  private _drawRubberBandReference({ x, y }: Position) {
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
    const eraserThickness =
      this.options.eraserThickness > this.options.minEraserThickness
        ? this.options.eraserThickness
        : this.options.minEraserThickness;
    const rad = this.activeTool === 'eraser' ? eraserThickness : this.options.lineThickness;
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

    this.$canvas.addEventListener('mousedown', this._startDraw.bind(this), false);
    this.$canvas.addEventListener('touchstart', this._startDraw.bind(this), false);
    this.$canvas.addEventListener('mousemove', this._drawing.bind(this), false);
    this.$canvas.addEventListener('touchmove', this._drawing.bind(this), false);
    this.$canvas.addEventListener('mouseup', this._drawend.bind(this), false);
    this.$canvas.addEventListener('touchend', this._drawend.bind(this), false);

    this.$canvas.addEventListener('drawer.update.color', this._updateCursor.bind(this));
    this.$canvas.addEventListener('drawer.update.lineThickness', this._updateCursor.bind(this));
    this.$canvas.addEventListener('drawer.update.tool', this._updateCursor.bind(this));

    this.$canvas.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        if (event.code === 'KeyW') {
          this.undo().then(() => {
            this.$canvas.dispatchEvent(DrawEvent('change', this));
          });
        } else if (event.code === 'KeyY') {
          this.redo().then(() => {
            this.$canvas.dispatchEvent(DrawEvent('change', this));
          });
        }
        this.toolbar._manageUndoRedoBtn();
      }
    });

    if (this.options.autoSave) {
      this.$canvas.addEventListener('drawer.change', this.saveDraw.bind(this));
    }
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
      this.$canvas.dispatchEvent(DrawEvent('change', this));
    });

    this.$drawerContainer.appendChild($textArea);

    $textArea.focus();
  }
}

export { Drawer as default, Drawer };
