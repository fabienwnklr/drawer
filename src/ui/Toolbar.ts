import { Drawer } from "../Drawer";
import { ToolbarOptions } from "../types/toolbar";
import { defaultOptionsToolbar } from "../utils/constantes";
import { deepMerge } from "../utils/utils";

export class Toolbar {
    drawer: Drawer;
    options: ToolbarOptions;

    constructor(drawer: Drawer, options: ToolbarOptions) {
        this.drawer = drawer;
        this.options = deepMerge<ToolbarOptions>(defaultOptionsToolbar, options);
    }
}
