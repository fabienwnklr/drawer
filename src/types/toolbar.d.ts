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
