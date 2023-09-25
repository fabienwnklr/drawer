import './drawer.css';
import { DrawerOptions } from './types/drawer';
import { DrawerError } from './utils/DrawError';
import { defaultOptionsDrawer } from './utils/constantes';
import { stringToHTMLElement } from './utils/dom';
import { getMousePosition } from './utils/infos';

export class SVGDrawer {
  // options
  options: DrawerOptions;
  $sourceElement: HTMLElement;
  $svg!: SVGElement;
  $drawerContainer!: HTMLDivElement;
  /**
   *
   * @param options
   */
  constructor($el: HTMLElement, options: Partial<DrawerOptions>) {
    try {
      this.$sourceElement = $el;
      this.options = { ...defaultOptionsDrawer, ...options };
      this._init();

      const saved = localStorage.getItem(this.options.localStorageKey);

      if (saved) {
        //   this.loadFromData(saved);
      }

      if (this.options.defaultToolbar) {
        //   this.addToolbar();
        //   this.addDefaults();
      }

      if (this.options.dotted) {
        //   this.setDottedLine(true, this.options.dash);
      }
    } catch (error: any) {
      throw new DrawerError(error.message);
    }
  }

  _init() {
    this._buildDrawer();
    this._initEvents();
  }

  _buildDrawer() {
    this.$drawerContainer = stringToHTMLElement<HTMLDivElement>(`<div class="drawer-container"></div>`);
    this.$svg = stringToHTMLElement<SVGElement>(`<svg></svg`);

    this.$drawerContainer.appendChild(this.$svg);
    this.$sourceElement.appendChild(this.$drawerContainer);
  }

  setSize(w: number, h: number) {
    const CENTERED = true;
    this.$svg.setAttribute('width', w.toString());
    this.$svg.setAttribute('height', h.toString());
    this.$svg.setAttribute(
      'viewBox',
      `${CENTERED ? this.options.width * -0.5 : 0} ${CENTERED ? this.options.height * -0.5 : 0} ${this.options.width} ${
        this.options.height
      }`
    );
  }

  _initEvents() {
    // configs
    const CENTERED = false;
    const COLOR = '#000';
    const THICKNESS = 2;
    let currentPath: SVGPathElement | null;
    this.$svg.addEventListener('pointerdown', () => {
      currentPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      currentPath.setAttribute('stroke', COLOR);
      currentPath.setAttribute('stroke-width', THICKNESS.toString());
      currentPath.setAttribute('fill', 'none');
      this.$svg.appendChild(currentPath);
    });
    this.$svg.addEventListener('pointerup', () => (currentPath = null));
    this.$svg.addEventListener('pointermove', (event) => {
      if (!currentPath) return;
      let { x, y } = getMousePosition(this.$svg, event);
      const d = currentPath.getAttribute('d');
      x = CENTERED ? x - this.options.width * 0.5 : x;
      y = CENTERED ? y - this.options.height * 0.5 : y;
      currentPath.setAttribute('d', d ? d + ` L${x},${y}` : `M${x},${y}`);
    });
  }
}
