export interface DrawerOptions {
  id: string;
  height: number;
  width: number;
  defaultToolbar: boolean;
  localStorageKey: string;
  dotted: boolean;
  dash: number[];
  autoSave: boolean;
  toolbarPosition: keyof typeof ToolbarPosition;
  color: string;
  bgColor: string;
  lineThickness: number;
}

export type action<T> = (drawer: Drawer, $btn: T) => void;

export enum DrawTools {
  brush = "brush",
  eraser = "eraser",
  text = "text",
}

export enum ToolbarPosition {
  outerTop = "outerTop",
  outerEnd = "outerEnd",
  outerBottom = "outerBottom",
  outerStart = "outerStart",
  innerTop = "innerTop",
  innerEnd = "innerEnd",
  innerBottom = "innerBottom",
  innerStart = "innerStart",
  /**
   * only available for outer position
   * calculate where can be added, in this order outerTop -> outerRight -> outerBottom -> outerLeft
   * if no one available, added to innerTop
   */
  auto = "auto",
}
