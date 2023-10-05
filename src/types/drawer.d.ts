import type { ToolbarPosition } from './toolbar';

export interface DrawerOptions {
  id: string;
  defaultToolbar: boolean;
  height: number;
  width: number;
  localStorageKey: string;
  dotted: boolean;
  dash: number[];
  autoSave: boolean;
  toolbarPosition: keyof typeof ToolbarPosition;
  color: string;
  bgColor: string;
  lineThickness: number;
  cap: CanvasLineCap;
  fill: boolean;
  availableColor?: string[];
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
