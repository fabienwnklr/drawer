export interface DrawerOptions {
  id: string;
  defaultToolbar: boolean;
  height: number;
  width: number;
  canvasWidth: number;
  canvasHeight: number;
  localStorageKey: string;
  tool: keyof typeof DrawTools;
  dotted: boolean;
  dash: number[];
  autoSave: boolean;
  toolbarPosition: keyof typeof ToolbarPosition;
  color: string;
  bgColor: string;
  lineThickness: number;
  /**
   * @note up to 15, is dynamically calculate options.lineTickness * 2
   */
  eraserThickness: number;
  minEraserThickness: number;
  cap: CanvasLineCap;
  fill: boolean;
  availableColor: string[];
  availableColorOnly: boolean;
  grid: boolean;
  guides: boolean;
  opacity: number;
  xor: boolean;
}

export type action<T> = ($btn: T, value?: any) => void;

export enum DrawTools {
  brush = 'brush',
  eraser = 'eraser',
  text = 'text',
  rect = 'rect',
  circle = 'circle',
  ellipse = 'ellipse',
  square = 'square',
  arrow = 'arrow',
  line = 'line',
  star = 'star',
  triangle = 'triangle',
  polygon = 'polygon',
}

export interface Position {
  x: number;
  y: number;
}

/** Toolbar */

export interface ToolbarOptions {
  toolbarPosition: keyof typeof ToolbarPosition;
}

export enum ToolbarPosition {
  outerTop = 'outerTop',
  outerEnd = 'outerEnd',
  outerBottom = 'outerBottom',
  outerStart = 'outerStart',
  innerTop = 'innerTop',
  innerEnd = 'innerEnd',
  innerBottom = 'innerBottom',
  innerStart = 'innerStart',
}

/** Modal */

export interface ModalOptions {
  id?: string;
  title?: string;
  showHeader?: boolean;
  bodyContent?: string;
  footerContent?: string;
  closeOnClickOutside?: boolean;
  backdrop?: boolean;
}

/** Utils */

export type ThrottledFunction<T extends (...args: any) => any> = (...args: Parameters<T>) => ReturnType<T>;

export type savedStorage = { data: string, bgcolor: string, grid: boolean }
