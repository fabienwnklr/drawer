declare type action<T> = ($btn: T, value?: any) => void;

/**
 * @class Drawer
 * {@link https://}
 *
 * Copyright (c) 2023 Winkler Fabien & contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Winkler Fabien <fabienwinkler@outlook.fr>
 */
export declare class Drawer extends History_2 {
    #private;
    ctx: CanvasRenderingContext2D;
    isDrawing: boolean;
    activeTool: keyof typeof DrawTools;
    dotted: boolean;
    options: DrawerOptions;
    $canvas: HTMLCanvasElement;
    $sourceElement: HTMLElement;
    $drawerContainer: HTMLDivElement;
    settingModal: SettingsModal;
    gridActive: boolean;
    VERSION: string;
    toolbar: Toolbar;
    /**
     *
     * @param {HTMLElement} $el Container for drawer
     * @param {Partial<DrawerOptions>} options options for drawer
     */
    constructor($el: HTMLElement, options?: Partial<DrawerOptions>);
    /**
     * Draw html drawer
     */
    private _buildDrawer;
    /**
     * Set canvas sizing
     * @param {number} width Width
     * @param {number} height Height
     * @returns {Promise<boolean>}
     */
    setSize(width: number, height: number): Promise<boolean>;
    /**
     * Check if canvas empty
     * @returns {boolean}
     */
    isEmpty(data?: string): boolean;
    /**
     * Change drawing color
     * @param {String} color Color to apply to draw
     * @returns {Promise<boolean>}
     */
    setColor(color: string): Promise<boolean>;
    /**
     * Change canvas background color
     * @param bgColor canvas css background color
     * @returns {Promise<boolean>}
     */
    setBgColor(bgColor: string): Promise<boolean>;
    /**
     * set active tool
     * @param {keyof typeof DrawTools} toolName Tool name to set
     * @returns {Promise<boolean>}
     */
    setTool(toolName: keyof typeof DrawTools): Promise<boolean>;
    /**
     * Clear all canvas
     *
     * @returns {Promise<HTMLCanvasElement>}
     */
    clear(): Promise<HTMLCanvasElement>;
    /**
     * Inject data to canvas
     * @param data
     * @returns {Promise<Drawer>}
     */
    loadFromData(data: string): Promise<Drawer>;
    /**
     * Save draw to localStorage
     * {@link DrawerOptions.localStorageKey}
     */
    saveDraw(): void;
    /**
     * Get date url from canvas
     * @returns {string} canvas png data
     */
    getData(): string;
    /**
     * Change drawing shape
     * @param {keyof typeof DrawTools} shape
     */
    setShape(shape: keyof typeof DrawTools): Promise<boolean>;
    /**
     * Set line style dotted
     * @param {Boolean} active state
     * @param {number[]} [dash=[10, 5]] Line dash format [width, spacing]
     * @returns {Promise<boolean>}
     */
    setDottedLine(active: boolean, dash?: number[]): Promise<boolean>;
    /**
     * Set the line width
     * @param {number} width Line width
     */
    setLineWidth(width: number): void;
    /**
     * Check if active tool is shape
     * @returns {Boolean}
     */
    isShape(): boolean;
    /**
     * Start drawing (mousedown)
     * @param {PointerEvent} event
     * @returns
     */
    private _startDraw;
    /**
     * @private _drawing
     * @param {PointerEvent} event
     * @returns
     */
    private _drawing;
    /**
     * @private _drawend
     * trigger when draw ended
     * @param {PointerEvent} event
     */
    private _drawend;
    private _takeSnapshot;
    private _restoreSnapshot;
    private _draw;
    private _drawHand;
    private _drawLine;
    private _drawRect;
    private _drawCircle;
    private _drawArrow;
    private _drawEllipse;
    private _drawPolygon;
    /**
     * Add a grid for draw helping
     * /!\ This is drawing into canvas, so it remove all draw and it's visible on export /!\
     *
     */
    addGrid(): Promise<unknown>;
    /**
     * Remove grid for draw helping
     * /!\ This is drawing into canvas, so it remove all draw and it's visible on export /!\
     */
    removeGrid(): void;
    /**
     * Add a guide when drawing for draw helping
     */
    private _drawGuides;
    /**
     * Draw start point references
     */
    private _drawPointerDownArc;
    /**
     * Draw x/y point references
     * @param param0
     */
    private _drawRubberBandReference;
    /**
     * Update cursor style
     */
    private _updateCursor;
    /**
     * @private Initialize all event listener
     */
    private _initHandlerEvents;
    /**
     * Adding textarea to clicked zone
     * @param {Position} position
     */
    private _addTextArea;
}

/** Drawer */
declare interface DrawerOptions {
    id: string;
    defaultToolbar: boolean;
    height: number;
    width: number;
    localStorageKey: string;
    tool: keyof typeof DrawTools;
    dotted: boolean;
    dash: number[];
    autoSave: boolean;
    toolbarPosition: keyof typeof ToolbarPosition;
    color: string;
    bgColor: string;
    lineThickness: number;
    cap: CanvasLineCap;
    fill: boolean;
    availableColor: string[];
    availableColorOnly: boolean;
    grid: boolean;
    guides: boolean;
    opacity: number;
    xor: boolean;
}

declare enum DrawTools {
    brush = "brush",
    eraser = "eraser",
    text = "text",
    rect = "rect",
    circle = "circle",
    ellipse = "ellipse",
    square = "square",
    arrow = "arrow",
    line = "line",
    star = "star",
    triangle = "triangle",
    polygon = "polygon"
}

declare class History_2 {
    redo_list: string[];
    undo_list: string[];
    $canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    saveState(list?: string[], keep_redo?: boolean): void;
    undo(): Promise<unknown>;
    redo(): Promise<unknown>;
    restoreState(pop: string[], push: string[], cb?: (v: boolean) => void): void;
    setCanvas($canvas: HTMLCanvasElement): void;
}

declare class Modal {
    $modal: HTMLDivElement;
    $modalHeader: HTMLDivElement;
    $modalBody: HTMLDivElement;
    $modalFooter: HTMLDivElement;
    options: ModalOptions;
    drawer: Drawer;
    $backdrop: HTMLDivElement;
    constructor(drawer: Drawer, options?: Partial<ModalOptions>);
    private _init;
    private _setupDefaultEvents;
    private _createModal;
    setHeaderContent(content: string): void;
    setBodyContent(content: string): void;
    appendBodyContent(content: string): void;
    setFooterContent(content: string): void;
    show(): void;
    hide(): void;
    isVisible(): boolean;
    destroy(): void;
}

/** Modal */
declare interface ModalOptions {
    id?: string;
    title?: string;
    headerContent?: string;
    bodyContent?: string;
    footerContent?: string;
    closeOnClickOutside?: boolean;
    backdrop?: boolean;
}

declare class SettingsModal extends Modal {
    filled: boolean;
    grid: boolean;
    guides: boolean;
    opacity: number;
    xor: boolean;
    bgColor: string;
    drawer: Drawer;
    $fillSettingInput: HTMLInputElement;
    $gridSettingInput: HTMLInputElement;
    $guidesSettingInput: HTMLInputElement;
    $opacitySettingInput: HTMLInputElement;
    $xorSettingInput: HTMLInputElement;
    $bgCologSettingInput: HTMLInputElement;
    constructor(drawer: Drawer);
    /**
     * Fill the content modal
     */
    fill(): void;
    private _setupSelectors;
    private _initEvents;
}

declare class Toolbar {
    drawer: Drawer;
    options: ToolbarOptions;
    $toolbar: HTMLDivElement;
    $undoBtn: HTMLButtonElement | null;
    $redoBtn: HTMLButtonElement | null;
    $brushBtn: HTMLButtonElement | null;
    $eraserBtn: HTMLButtonElement | null;
    $textBtn: HTMLButtonElement | null;
    $drawGroupBtn: HTMLButtonElement | null;
    $drawGroupMenu: HTMLUListElement | null;
    $clearBtn: HTMLButtonElement | null;
    $lineThickness: HTMLDivElement | null;
    $downloadBtn: HTMLButtonElement | null;
    $colorPicker: HTMLInputElement | null;
    $shapeBtn: HTMLButtonElement | null;
    $shapeMenu: HTMLUListElement | null;
    $uploadFile: HTMLInputElement | null;
    $settingBtn: HTMLButtonElement | null;
    $colorPickerLabel: HTMLLabelElement;
    customBtn: {
        [key: string]: HTMLButtonElement;
    };
    constructor(drawer: Drawer, options: ToolbarOptions);
    /**
     * Adding an empty toolbar element
     * @returns {Promise<HTMLDivElement>} HTML toolbar element
     */
    addToolbar(): Promise<HTMLDivElement>;
    /**
     * Add default button to toolbar,
     * List of defaults buttons :
     * undo, redo, brush, eraser, text, clear, line thickness, colorpicker, upload, download, setting
     */
    addDefaults(): void;
    /**
     * Add undo button to toolbar if exist
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addUndoBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement>;
    /**
     * Add brush button to toolbar if exist
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addRedoBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement>;
    /**
     * Add brush button to toolbar if exist
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addBrushBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement>;
    /**
     * Add eraser button to toolbar if exist
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addEraserBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement>;
    /**
     * Add text button to toolbar if exist
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addTextBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement>;
    /**
     * Add draw group button (contain brush, eraser and text zone)
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addDrawGroupBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement>;
    /**
     * Add clear button to toolbar if exist
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addClearBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement>;
    /**
     * Add text button to toolbar if exist
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addShapeBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement>;
    /**
     * Add line thickness input range to toolbar if exist
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLInputElement>} HTML input range element
     */
    addLineThicknessBtn(action?: action<HTMLInputElement>): Promise<HTMLInputElement>;
    /**
     * Add a colorpicker button
     * see {@link addToolbar} before use it
     * using Coloris, for customisation please see here {@link https://github.com/mdbassit/Coloris}
     * @param {action<HTMLInputElement>?} action Action call after color selected
     * @returns {Promise<HTMLInputElement>}
     */
    addColorPickerBtn(action?: action<HTMLInputElement>): Promise<HTMLInputElement>;
    /**
     * Add upload file button
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLInputElement>} HTML input range element
     */
    addUploadFileBtn(action?: action<HTMLInputElement>): Promise<HTMLInputElement>;
    /**
     * Add a download button
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addDownloadBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement>;
    /**
     * Add a params button
     * see {@link addToolbar} before use it
     * @param {action<HTMLButtonElement>?} action method to call onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addSettingBtn(action?: action<HTMLButtonElement>): Promise<HTMLButtonElement>;
    /**
     * Add a custom button to toolbar
     * see {@link addToolbar} before use it
     * @param {String} name Button name (must be unique)
     * @param {String} title Title for button
     * @param {String} label Label or icon
     * @param {action<HTMLButtonElement>} action Action to do onclick
     * @returns {Promise<HTMLButtonElement>}
     */
    addCustomBtn(name: string, title: string, label: string, action: action<HTMLButtonElement>): Promise<HTMLButtonElement>;
    /**
     * Apply active state to btn
     * @param {HTMLButtonElement} $btn Button to add active class
     */
    setActiveBtn($btn: HTMLButtonElement): void;
    /**
     * @private
     * Upload file from input file
     */
    private _uploadFile;
    /**
     * @private
     * Manage undo / redo button state
     */
    _manageUndoRedoBtn(): void;
    /**
     * Toggle show/hide menu
     * @param $btn
     * @param $menu
     * @returns
     */
    private _toggleMenu;
    /**
     * event for close menu on click outside
     * @param $btn
     * @param $menu
     */
    private _initClickOutsideMenuEvent;
}

/** Toolbar */
declare interface ToolbarOptions {
    toolbarPosition: keyof typeof ToolbarPosition;
}

declare enum ToolbarPosition {
    outerTop = "outerTop",
    outerEnd = "outerEnd",
    outerBottom = "outerBottom",
    outerStart = "outerStart",
    innerTop = "innerTop",
    innerEnd = "innerEnd",
    innerBottom = "innerBottom",
    innerStart = "innerStart"
}

export { }
