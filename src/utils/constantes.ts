import { DrawerOptions } from '../types/drawer';
import { ModalOptions } from '../types/modal';
import { ToolbarOptions } from '../types/toolbar';

export const defaultOptionsDrawer: DrawerOptions = {
  id: Date.now().toString(),
  defaultToolbar: true,
  width: 400,
  height: 400,
  localStorageKey: 'draw',
  autoSave: true,
  toolbarPosition: 'outerTop',
  bgColor: '#fff',
  color: '#000',
  lineThickness: 3,
  dotted: false,
  dash: [10, 5],
  cap: 'round',
  fill: true,
  availableColor: undefined,
  availableColorOnly: false,
  grid: false,
  guides: false,
  opacity: 1,
  xor: false,
};

export const defaultOptionsModal: ModalOptions = {
  id: Date.now().toString(),
  headerContent: undefined,
  bodyContent: undefined,
  footerContent: undefined,
  closeOnClickOutside: true,
  backdrop: true,
};

export const defaultOptionsToolbar: ToolbarOptions = {
  toolbarPosition: 'outerTop',
};
