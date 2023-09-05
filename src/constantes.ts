import { DrawerOptions } from "./drawer.d";

export const defaultOptions: DrawerOptions = {
  id: Date.now().toString(),
  defaultToolbar: true,
  width: 400,
  height: 400,
  localStorageKey: "draw",
  autoSave: true,
  toolbarPosition: "outerTop",
  bgColor: "#fff",
  color: "#000",
  lineThickness: 5,
};