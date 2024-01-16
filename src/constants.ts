import type { DrawerOptions, ModalOptions, ToolbarOptions } from './types/index';
import { ConfirmModal } from './ui/ConfirmModal';

/**
 * @private
 */
export const defaultOptionsDrawer: DrawerOptions = {
  id: Date.now().toString(), // id for drawer
  defaultToolbar: true, // add toolbar with default boutons
  width: 400, // width of canvas container
  height: 400, // height of canvas container
  canvasWidth: window.innerWidth * 1.5, // canvas width
  canvasHeight: window.innerHeight * 1.5, // canvas height
  localStorageKey: 'draw', // local storage key for save
  autoSave: true, // save on change in localStorage
  toolbarPosition: 'outerTop', // can be 'outerTop', 'outerEnd', 'outerBottom', 'outerStart', 'innerTop', 'innerEnd', 'innerBottom', 'innerStart'
  bgColor: '#fff', // can be format hex, rgba, rgba, hlsa
  color: '#000', // can be format hex, rgba, rgba, hlsa
  lineThickness: 3, // Line thickness
  dotted: false, // active line dotted
  dash: [10, 5], // if dotted true
  cap: 'round', // "butt" | "round" | "square"
  fill: true, // fill draw
  availableColor: [], // for input color
  availableColorOnly: false, // show color only into colorpicker popover
  grid: false, // show css grid for draw helping
  guides: false, // show guide when drawing
  opacity: 1, // global opacity of draw
  xor: false, // active xor
  tool: 'brush', // default tool on init
  eraserThickness: 15, // eraser width
  minEraserThickness: 15, // min eraser width
};

/**
 * @private
 */
export const defaultOptionsModal: ModalOptions = {
  id: Date.now().toString(),
  headerContent: undefined,
  bodyContent: undefined,
  footerContent: undefined,
  closeOnClickOutside: false,
  backdrop: true,
};

/**
 * @private
 */
export const defaultOptionsToolbar: ToolbarOptions = {
  toolbarPosition: 'outerTop',
};

export const confirmModalDefaultOpts = {
  message: 'Would you confirm action ?',
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
  onCancel: (modal: ConfirmModal) => {
    modal.hide();
  },
  onConfirm: (modal: ConfirmModal) => {
    modal.drawer.clear();
    modal.hide();
  },
};
