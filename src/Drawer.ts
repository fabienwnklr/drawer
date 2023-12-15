import './css/drawer.css';
import { DrawerError } from './utils/DrawError';
import { defaultOptionsDrawer } from './constants';
import { DrawEvent } from './utils/DrawEvent';
import Konva from 'konva';

// Type import
import type { DrawTools, DrawerOptions, Position } from './types/index';

// History
import { History } from './utils/History';

// icons
import { TriangleIcon } from './icons/triangle';
import { SquareIcon } from './icons/square';
import { LineIcon } from './icons/line';
import { StarIcon } from './icons/star';
import { CircleIcon } from './icons/circle';
import { RectIcon } from './icons/rect';
import { ArrowIcon } from './icons/arrow';

// Utils
import { throttle } from './utils/perf';
// import { getMousePosition } from "./utils/infos";
import { deepMerge } from './utils/utils';

// UI
import { SettingsModal } from './ui/SettingsModal';

import { version } from '../package.json';
import { Toolbar } from './ui/Toolbar';
import { EllipseIcon } from './icons/ellipse';
import { KonvaEventObject } from 'konva/lib/Node';
import { Vector2d } from 'konva/lib/types';
import { stringToHTMLElement } from './utils/dom';

declare global {
  interface HTMLCanvasElement {
    drawer: Drawer;
  }
}

/**
 * @class Drawer
 * {@link https://}
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
export class Drawer extends History {
  declare ctx: CanvasRenderingContext2D;
  isDrawing: boolean = false;
  activeTool: keyof typeof DrawTools = defaultOptionsDrawer.tool;
  dotted: boolean = false;
  // options
  options: DrawerOptions = defaultOptionsDrawer;
  // HTML Elements
  declare $canvas: HTMLCanvasElement;
  $sourceElement: HTMLDivElement;
  #dragStartLocation!: Position;
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
  gridActive!: boolean;
  VERSION = version;
  toolbar: Toolbar;
  stage: Konva.Stage;
  layer: Konva.Layer;
  #lastPointerPosition!: Vector2d | null;
  lastLine: Konva.Line | null = null;
  pos: any;
  tr: Konva.Transformer;
  selectionRange: Konva.Rect;
  background!: Konva.Rect | null;
  gridLines!: any[];
  $container: any;
  hoverRect!: Konva.Rect | null;

  /**
   *
   * @param {HTMLDivElement} $el Div container for drawer
   * @param {Partial<DrawerOptions>} options options for drawer
   */
  constructor($el: HTMLDivElement, options: Partial<DrawerOptions> = {}) {
    super();
    try {
      if ($el instanceof HTMLDivElement) {
        this.$sourceElement = $el;

        // if no width, and container larger than default width
        if (!options.width && $el.offsetWidth > defaultOptionsDrawer.width) {
          options.width = $el.offsetWidth;
        }
        this.options = deepMerge<DrawerOptions>(defaultOptionsDrawer, options);
        this.$container = stringToHTMLElement(`<div class="drawer-container"></div>`);
        this.$sourceElement.append(this.$container);

        this.selectionRange = new Konva.Rect({
          fill: 'rgb(100, 108, 255, 0.4)',
          visible: false,
          name: 'selection',
        });
        this.tr = new Konva.Transformer();

        const saved = localStorage.getItem(this.options.localStorageKey);

        if (saved) {
          this.stage = Konva.Node.create(saved, this.$container);

          if (this.stage.children[0]) {
            this.layer = this.stage.children[0];
          } else {
            this.layer = new Konva.Layer();
          this.stage.add(this.layer);
          }
        } else {
          this.stage = new Konva.Stage({
            container: this.$container,
            width: this.options.width,
            height: this.options.height,
          });
          this.layer = new Konva.Layer();
          this.stage.add(this.layer);

          this.setBgColor(this.options.bgColor);
        }
        // Add layer after bg color, considere z-index auto incremtented in order to add()
        this.layer.add(this.tr);
        this.layer.add(this.selectionRange);

        this.$canvas = this.stage.toCanvas();
        this.$sourceElement.tabIndex = 1;
        this._initHandlerEvents();
        // this.setCanvas(this.$canvas);

        if (this.options.grid) {
          this.addGrid();
        }

        this.$canvas.drawer = this;
        this.toolbar = new Toolbar(this, {
          toolbarPosition: this.options.toolbarPosition,
        });

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
      throw new DrawerError(error);
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

        if (this.toolbar.$toolbar) {
          this.toolbar.$toolbar.style.maxWidth = this.$canvas.width + 'px';
          this.toolbar.$toolbar.style.maxHeight = this.$canvas.height + 'px';
        }

        this.$sourceElement.dispatchEvent(DrawEvent('update.size', { setSize: { w: width, h: height } }));

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
    return data ? true : false;
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
        this.$sourceElement.dispatchEvent(DrawEvent('update.color', { color }));

        resolve(true);
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Change canvas background color
   * @param bgColor background color (hex, rgb, rgba, hsl, hsla)
   * @returns {Promise<boolean>}
   */
  setBgColor(bgColor: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        if (bgColor) {
          if (this.background) {
            this.background.fill(bgColor);
          } else {
            this.background = new Konva.Rect({
              x: 0,
              y: 0,
              width: this.stage.width(),
              height: this.stage.height(),
              fill: this.options.bgColor,
              // remove background from hit graph for better perf
              // because we don't need any events on the background
              listening: false,
              draggable: false,
              name: 'background',
            });
            this.layer.add(this.background);
          }
        }

        this.$sourceElement.dispatchEvent(DrawEvent('update.bgColor', { bgColor }));
        this.$sourceElement.dispatchEvent(DrawEvent('change'));
        resolve(true);
      } catch (error: any) {
        reject(new DrawerError(error));
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
              break;
            case 'text':
              if (this.toolbar.$textBtn) $btn = this.toolbar.$textBtn;
              break;
            case 'eraser':
              if (this.toolbar.$eraserBtn) $btn = this.toolbar.$eraserBtn;
              if (this.toolbar.$drawGroupMenu) $btn = this.toolbar.$drawGroupMenu.querySelector('[data-tool=eraser]');
              break;
            case 'select':
              if (this.toolbar.$selectBtn) $btn = this.toolbar.$selectBtn;
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
          this.$sourceElement.dispatchEvent(DrawEvent('update.tool', { toolName }));
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
        // Conserve current bgcolor ?
        // this.ctx.fillStyle = this.options.bgColor;
        // this.ctx.fillRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.layer.find('.rect, .line').forEach((sh) => {
          sh.destroy();
        });
        this.options.bgColor = defaultOptionsDrawer.bgColor;
        this.redo_list = [];
        this.undo_list = [];
        this.gridActive = false;
        this.toolbar._manageUndoRedoBtn();
        this.$sourceElement.dispatchEvent(DrawEvent('change', this));

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
   * {@link DrawerOptions.localStorageKey}
   */
  saveDraw() {
    try {
      if (this.options.localStorageKey) {
        localStorage.setItem(this.options.localStorageKey, this.stage.toJSON());
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
          this.setTool(shape);
          this.$sourceElement.dispatchEvent(DrawEvent('update.shape', { shape }));
          resolve(true);
        }
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
        this.$sourceElement.dispatchEvent(DrawEvent('update.dotted', { dotted: active, dash }));
        resolve(true);
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Set the line width
   * @fires Drawer#drawer.update.lineThickness
   * @param {number} width Line width
   */
  setLineWidth(width: number) {
    try {
      this.options.lineThickness = width;

      if (this.toolbar.$lineThickness) {
        const $counter = this.toolbar.$lineThickness.querySelector('.counter');
        if ($counter) {
          $counter.innerHTML = String(this.options.lineThickness);
        }
      }

      this.$sourceElement.dispatchEvent(DrawEvent('update.lineThickness', { lineThickness: width }));
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
   * @param {PointerEvent} event
   * @returns
   */
  private _startDraw(event: KonvaEventObject<PointerEvent>) {
    if (event.target !== this.stage || event.evt.buttons !== 1) {
      return;
    }
    const $target = event.evt.target as HTMLElement;
    if ($target?.classList.contains('toolbar') || this.toolbar.$toolbar.contains($target)) return;
    event.evt.preventDefault();
    const shapes = this.stage.find('.rect, .line');
    if (this.activeTool === 'select') {
      // active draggable for all draw
      shapes.filter((shape) => !shape.draggable()).forEach((shape) => shape.draggable(true));

      this.#lastPointerPosition = this.stage.getPointerPosition();

      this.selectionRange.visible(true);
      this.selectionRange.width(0);
      this.selectionRange.height(0);
      return;
    }
    shapes.filter((shape) => shape.draggable()).forEach((shape) => shape.draggable(false));
    this.isDrawing = true;

    if (this.activeTool === 'brush') {
      const pos = this.stage.getPointerPosition() ?? { x: 0, y: 0 };
      this.lastLine = new Konva.Line({
        stroke: this.options.color,
        strokeWidth: this.options.lineThickness,
        globalCompositeOperation: this.activeTool === 'brush' ? 'source-over' : 'destination-out',
        // round cap for smoother lines
        lineCap: this.options.cap,
        lineJoin: 'round',
        // add point twice, so we have some drawings even on a simple click
        points: [pos.x, pos.y, pos.x, pos.y],
        name: 'line',
      });
      this.layer.add(this.lastLine);
    }
  }
  /**
   * @private _drawing
   * @param {PointerEvent} event
   * @returns
   */
  private _drawing(event: KonvaEventObject<PointerEvent>) {
    // prevent scrolling on touch devices
    event.evt.preventDefault();
    if (!this.isDrawing) {
      // do nothing if we didn't start selection
      if (!this.selectionRange.visible()) {
        return;
      }
      event.evt.preventDefault();
      const x1 = this.#lastPointerPosition?.x ?? 0;
      const x2 = this.stage.getPointerPosition()?.x ?? 0;
      const y1 = this.#lastPointerPosition?.y ?? 0;
      const y2 = this.stage.getPointerPosition()?.y ?? 0;

      this.selectionRange.visible();
      this.selectionRange.setAttrs({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
      });
      return;
    }

    if (event.evt.buttons !== 1 || this.activeTool === 'text') return; // if isDrawing is false return from here

    // if (this.isShape()) {
    //   this._restoreSnapshot();
    // }
    // const position = getMousePosition(this.$canvas, event);

    // if (this.activeTool !== 'brush' && this.activeTool !== 'eraser' && this.options.guides) {
    //   this._drawGuides(position);
    //   this._drawPointerDownArc(this.#dragStartLocation);
    //   this._drawRubberBandReference(position);
    // }

    this._draw();
  }

  /**
   * @private _drawend
   * trigger when draw ended
   * @param {PointerEvent} event
   */
  private _drawend(event: KonvaEventObject<PointerEvent>) {
    event.evt.preventDefault();

    if (this.activeTool === 'select' && this.selectionRange.visible()) {
      this.selectionRange.visible(false);
      const shapes = this.stage.find('.rect, .line');
      const box = this.selectionRange.getClientRect();
      const selected = shapes.filter((shape) => Konva.Util.haveIntersection(box, shape.getClientRect()));
      // selected.forEach(sel => {
      //   sel.on('mouseenter', () => {
      //     this.$sourceElement.style.cursor = `move`;
      //   })
      //   sel.on('mouseleave', () => {
      //     this.$sourceElement.style.cursor = `default`;
      //   })
      // })
      this.tr.nodes(selected);
    }
    if (event.evt.pointerType !== 'mouse' || event.evt.button === 0) {
      this.isDrawing = false;
      if (this.activeTool !== 'select') {
        this.trigger('change');
      }
    }
    this.isDrawing = false;
  }

  private _tap(event: KonvaEventObject<MouseEvent>) {
    if (this.activeTool !== "select") return;
    // if click on empty area - remove all selections
    if (event.target === this.stage) {
      this.tr.nodes([]);
      return;
    }

    if (this.selectionRange.visible()) {
      return;
    }

    // do nothing if clicked NOT on our rectangles
    if (!event.target.hasName('rect')) {
      // return;
    }

    const metaPressed = event.evt.shiftKey || event.evt.ctrlKey || event.evt.metaKey;
    const isSelected = this.tr.nodes().indexOf(event.target) >= 0;

    if (!metaPressed && !isSelected) {
      this.tr.nodes([event.target]);
    } else if (metaPressed && isSelected) {
      // if we pressed keys and node was selected
      // we need to remove it from selection:
      const nodes = this.tr.nodes().slice(); // use slice to have new copy of array
      // remove node from array
      nodes.splice(nodes.indexOf(event.target), 1);
      this.tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
      // add the node into selection
      const nodes = this.tr.nodes().concat([event.target]);
      this.tr.nodes(nodes);
    }
  }

  private _takeSnapshot() {
    this.#snapshot = this.ctx.getImageData(0, 0, this.$canvas.width, this.$canvas.height);
  }

  private _restoreSnapshot() {
    this.ctx.putImageData(this.#snapshot, 0, 0);
  }

  private _draw() {
    // this.ctx.lineWidth = this.options.lineThickness; // passing brushSize as line width
    // this.ctx.strokeStyle = this.options.color; // passing selectedColor as stroke style
    // this.ctx.fillStyle = this.options.color; // passing selectedColor as fill style
    // this.ctx.lineCap = this.options.cap;
    // const angle =
    //   (Math.atan2(this.#dragStartLocation.y - position.y, this.#dragStartLocation.x - position.x) * 20) / Math.PI;

    switch (this.activeTool) {
      case 'brush':
      case 'eraser':
        this._drawHand();
        break;
      case 'text':
        // this._addTextArea(position);
        break;
      case 'line':
        // this._drawLine(position);
        break;
      case 'rect':
        // this._drawRect(position);
        break;
      case 'square':
        // this._drawPolygon(position, 4, Math.PI / 4);
        break;
      case 'triangle':
        // this._drawPolygon(position, 3, (angle * Math.PI) / 4);
        break;
      case 'arrow':
        // this._drawArrow(position);
        break;
      case 'polygon':
        // this._drawPolygon(position, 5, angle * (Math.PI / 180));
        break;
      case 'circle':
        // this._drawCircle(position);
        break;
      case 'ellipse':
        // this._drawEllipse(position);
        break;
      case 'star':
        console.log('Not implemented');
        break;
    }
  }

  private _drawHand() {
    if (!this.lastLine) return;
    const pos = this.stage.getPointerPosition() ?? { x: 0, y: 0 };
    const newPoints = this.lastLine.points().concat([pos.x, pos.y]);
    this.lastLine.points(newPoints);

    this.lastLine.on('mouseenter', (event) => {
      if (this.activeTool === "select") {
        const { x, y, width, height } = event.target.getClientRect()
        if (!this.hoverRect) {
          this.hoverRect = new Konva.Rect({
            x,
            y,
            width,
            height,
            stroke: "red",
          })
        }
        this.layer.add(this.hoverRect)
      }
    });
    this.lastLine.on('mouseleave', () => {
      if (this.activeTool === "select" && this.hoverRect) {
        this.hoverRect.remove();
      }
    });
  }

  trigger(event: string, data: any = this.getData()) {
    this.$sourceElement.dispatchEvent(DrawEvent(event, data));
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
   * /!\ This is drawing into canvas, so it remove all draw and it's visible on export /!\
   *
   */
  addGrid() {
    return new Promise((resolve, reject) => {
      try {
        this.clear();
        this.options.grid = true;
        const stepSize = 40;
        const xSize = this.stage.width(),
          ySize = this.stage.height(),
          xSteps = Math.round(xSize / stepSize),
          ySteps = Math.round(ySize / stepSize);

        this.gridLines = [];

        // draw vertical lines
        for (let i = 0; i <= xSteps; i++) {
          const line = new Konva.Line({
            x: i * stepSize,
            points: [0, 0, 0, ySize],
            stroke: 'rgba(0, 0, 0, 0.2)',
            strokeWidth: 1,
          });
          this.gridLines.push(line);
          this.layer.add(line);
        }
        //draw Horizontal lines
        for (let i = 0; i <= ySteps; i++) {
          const line = new Konva.Line({
            y: i * stepSize,
            points: [0, 0, xSize, 0],
            stroke: 'rgba(0, 0, 0, 0.2)',
            strokeWidth: 1,
          });
          this.gridLines.push(line);
          this.layer.add(line);
        }

        this.layer.batchDraw();
        resolve(true);
      } catch (error: any) {
        reject(new DrawerError(error.message));
      }
    });
  }

  /**
   * Remove grid for draw helping
   * /!\ This is drawing into canvas, so it remove all draw and it's visible on export /!\
   */
  removeGrid() {
    this.options.grid = false;
    this.clear();
  }

  /**
   * Add a guide when drawing for draw helping
   */
  private _drawGuides({ x, y }: Position) {
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
    } else if (this.activeTool === 'select') {
      this.$sourceElement.style.cursor = 'default';
      return;
    } else if (this.isShape()) {
      this.$sourceElement.style.cursor = 'crosshair';
      return;
    } else {
      // Text
      this.$sourceElement.style.cursor = `text`;
      return;
    }

    cursorCanvas.toBlob((blob) => {
      if (blob) {
        URL.revokeObjectURL(this.$sourceElement.style.cursor);
        const cursorURL = URL.createObjectURL(blob);
        this.$sourceElement.style.cursor = `url(${cursorURL}) ${rad / 2} ${rad / 2}, auto`;
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

    this.stage.on('pointerdown', this._startDraw.bind(this));
    this.stage.on('pointermove', this._drawing.bind(this));
    this.stage.on('pointerup', this._drawend.bind(this));
    this.stage.on('click tap', this._tap.bind(this));

    this.layer.on('add remove', () => {});

    this.$sourceElement.addEventListener('drawer.update.color', this._updateCursor.bind(this));
    this.$sourceElement.addEventListener('drawer.update.lineThickness', this._updateCursor.bind(this));
    this.$sourceElement.addEventListener('drawer.update.tool', this._updateCursor.bind(this));

    this.$sourceElement.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        if (event.code === 'KeyW') {
          this.undo().then(() => {
            this.$sourceElement.dispatchEvent(DrawEvent('change', this.getData()));
          });
        } else if (event.code === 'KeyY') {
          this.redo().then(() => {
            this.$sourceElement.dispatchEvent(DrawEvent('change', this.getData()));
          });
        }
        this.toolbar._manageUndoRedoBtn();
      } else if (event.code === 'Backspace' || event.code === 'Delete') {
        if (this.tr.nodes().length) {
          this.tr._nodes.forEach((node) => node.destroy());
          this.tr.nodes([]);
        }
      }
    });

    if (this.options.autoSave) {
      this.$sourceElement.addEventListener('drawer.change', this.saveDraw.bind(this));
    }
    this.$sourceElement.addEventListener('drawer.change', () => this.saveState());
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
      this.$sourceElement.dispatchEvent(DrawEvent('change', this.getData()));
    });

    // this.$drawerContainer.appendChild($textArea);

    $textArea.focus();
  }
}
