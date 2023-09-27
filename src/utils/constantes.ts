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
  lineThickness: 5,
  dotted: false,
  dash: [10, 5],
  cap: 'round',
  fill: true,
};

export const defaultOptionsModal: ModalOptions = {
  id: Date.now().toString(),
  headerContent: undefined,
  bodyContent: undefined,
  footerContent: undefined,
  closeOnClickOutside: false,
  backdrop: true,
};

export const defaultOptionsToolbar: ToolbarOptions = {

}
