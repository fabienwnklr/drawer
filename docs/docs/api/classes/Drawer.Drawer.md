# Class: Drawer

[Drawer](../modules/Drawer.md).Drawer

**`Author`**

Winkler Fabien <fabienwinkler@outlook.fr>

## Hierarchy

- [`History`](utils_History.History.md)

  ↳ **`Drawer`**

## Table of contents

### Constructors

- [constructor](Drawer.Drawer.md#constructor)

### Properties

- [$brushBtn](Drawer.Drawer.md#$brushbtn)
- [$canvas](Drawer.Drawer.md#$canvas)
- [$clearBtn](Drawer.Drawer.md#$clearbtn)
- [$colorPicker](Drawer.Drawer.md#$colorpicker)
- [$colorPickerLabel](Drawer.Drawer.md#$colorpickerlabel)
- [$downloadBtn](Drawer.Drawer.md#$downloadbtn)
- [$drawGroupBtn](Drawer.Drawer.md#$drawgroupbtn)
- [$drawGroupMenu](Drawer.Drawer.md#$drawgroupmenu)
- [$drawerContainer](Drawer.Drawer.md#$drawercontainer)
- [$eraserBtn](Drawer.Drawer.md#$eraserbtn)
- [$lineThickness](Drawer.Drawer.md#$linethickness)
- [$redoBtn](Drawer.Drawer.md#$redobtn)
- [$settingBtn](Drawer.Drawer.md#$settingbtn)
- [$shapeBtn](Drawer.Drawer.md#$shapebtn)
- [$shapeMenu](Drawer.Drawer.md#$shapemenu)
- [$sourceElement](Drawer.Drawer.md#$sourceelement)
- [$textBtn](Drawer.Drawer.md#$textbtn)
- [$toolbar](Drawer.Drawer.md#$toolbar)
- [$undoBtn](Drawer.Drawer.md#$undobtn)
- [$uploadFile](Drawer.Drawer.md#$uploadfile)
- [VERSION](Drawer.Drawer.md#version)
- [activeTool](Drawer.Drawer.md#activetool)
- [ctx](Drawer.Drawer.md#ctx)
- [customBtn](Drawer.Drawer.md#custombtn)
- [dotted](Drawer.Drawer.md#dotted)
- [gridActive](Drawer.Drawer.md#gridactive)
- [isDrawing](Drawer.Drawer.md#isdrawing)
- [options](Drawer.Drawer.md#options)
- [redo\_list](Drawer.Drawer.md#redo_list)
- [settingModal](Drawer.Drawer.md#settingmodal)
- [undo\_list](Drawer.Drawer.md#undo_list)

### Methods

- [addBrushBtn](Drawer.Drawer.md#addbrushbtn)
- [addClearBtn](Drawer.Drawer.md#addclearbtn)
- [addColorPickerBtn](Drawer.Drawer.md#addcolorpickerbtn)
- [addCustomBtn](Drawer.Drawer.md#addcustombtn)
- [addDefaults](Drawer.Drawer.md#adddefaults)
- [addDownloadBtn](Drawer.Drawer.md#adddownloadbtn)
- [addDrawGroupBtn](Drawer.Drawer.md#adddrawgroupbtn)
- [addEraserBtn](Drawer.Drawer.md#adderaserbtn)
- [addGrid](Drawer.Drawer.md#addgrid)
- [addLineThicknessBtn](Drawer.Drawer.md#addlinethicknessbtn)
- [addRedoBtn](Drawer.Drawer.md#addredobtn)
- [addSettingBtn](Drawer.Drawer.md#addsettingbtn)
- [addShapeBtn](Drawer.Drawer.md#addshapebtn)
- [addTextBtn](Drawer.Drawer.md#addtextbtn)
- [addToolbar](Drawer.Drawer.md#addtoolbar)
- [addUndoBtn](Drawer.Drawer.md#addundobtn)
- [addUploadFileBtn](Drawer.Drawer.md#adduploadfilebtn)
- [changeTool](Drawer.Drawer.md#changetool)
- [clear](Drawer.Drawer.md#clear)
- [getData](Drawer.Drawer.md#getdata)
- [isEmpty](Drawer.Drawer.md#isempty)
- [isShape](Drawer.Drawer.md#isshape)
- [loadFromData](Drawer.Drawer.md#loadfromdata)
- [redo](Drawer.Drawer.md#redo)
- [removeGrid](Drawer.Drawer.md#removegrid)
- [restoreState](Drawer.Drawer.md#restorestate)
- [saveDraw](Drawer.Drawer.md#savedraw)
- [saveState](Drawer.Drawer.md#savestate)
- [setActiveBtn](Drawer.Drawer.md#setactivebtn)
- [setBgColor](Drawer.Drawer.md#setbgcolor)
- [setCanvas](Drawer.Drawer.md#setcanvas)
- [setColor](Drawer.Drawer.md#setcolor)
- [setDottedLine](Drawer.Drawer.md#setdottedline)
- [setLineWidth](Drawer.Drawer.md#setlinewidth)
- [setShape](Drawer.Drawer.md#setshape)
- [setSize](Drawer.Drawer.md#setsize)
- [undo](Drawer.Drawer.md#undo)

## Constructors

### constructor

• **new Drawer**(`$el`, `options?`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `$el` | `HTMLElement` | Container for drawer |
| `options` | `Partial`<[`DrawerOptions`](../interfaces/types_drawer.DrawerOptions.md)\> | options for drawer |

#### Overrides

[History](utils_History.History.md).[constructor](utils_History.History.md#constructor)

#### Defined in

[src/Drawer.ts:115](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L115)

## Properties

### $brushBtn

• **$brushBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/Drawer.ts:78](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L78)

___

### $canvas

• **$canvas**: `HTMLCanvasElement`

#### Overrides

[History](utils_History.History.md).[$canvas](utils_History.History.md#$canvas)

#### Defined in

[src/Drawer.ts:72](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L72)

___

### $clearBtn

• **$clearBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/Drawer.ts:83](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L83)

___

### $colorPicker

• **$colorPicker**: ``null`` \| `HTMLInputElement`

#### Defined in

[src/Drawer.ts:86](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L86)

___

### $colorPickerLabel

• **$colorPickerLabel**: `HTMLLabelElement`

#### Defined in

[src/Drawer.ts:91](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L91)

___

### $downloadBtn

• **$downloadBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/Drawer.ts:85](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L85)

___

### $drawGroupBtn

• **$drawGroupBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/Drawer.ts:81](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L81)

___

### $drawGroupMenu

• **$drawGroupMenu**: ``null`` \| `HTMLUListElement`

#### Defined in

[src/Drawer.ts:82](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L82)

___

### $drawerContainer

• **$drawerContainer**: `HTMLDivElement`

#### Defined in

[src/Drawer.ts:74](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L74)

___

### $eraserBtn

• **$eraserBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/Drawer.ts:79](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L79)

___

### $lineThickness

• **$lineThickness**: `HTMLDivElement`

#### Defined in

[src/Drawer.ts:84](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L84)

___

### $redoBtn

• **$redoBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/Drawer.ts:77](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L77)

___

### $settingBtn

• **$settingBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/Drawer.ts:90](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L90)

___

### $shapeBtn

• **$shapeBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/Drawer.ts:87](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L87)

___

### $shapeMenu

• **$shapeMenu**: ``null`` \| `HTMLUListElement`

#### Defined in

[src/Drawer.ts:88](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L88)

___

### $sourceElement

• **$sourceElement**: `HTMLElement`

#### Defined in

[src/Drawer.ts:73](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L73)

___

### $textBtn

• **$textBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/Drawer.ts:80](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L80)

___

### $toolbar

• **$toolbar**: `HTMLDivElement`

#### Defined in

[src/Drawer.ts:75](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L75)

___

### $undoBtn

• **$undoBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/Drawer.ts:76](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L76)

___

### $uploadFile

• **$uploadFile**: ``null`` \| `HTMLInputElement`

#### Defined in

[src/Drawer.ts:89](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L89)

___

### VERSION

• **VERSION**: `string` = `version`

#### Defined in

[src/Drawer.ts:108](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L108)

___

### activeTool

• **activeTool**: ``"square"`` \| ``"circle"`` \| ``"line"`` \| ``"polygon"`` \| ``"rect"`` \| ``"text"`` \| ``"brush"`` \| ``"eraser"`` \| ``"arrow"`` \| ``"star"`` \| ``"triangle"`` = `'brush'`

#### Defined in

[src/Drawer.ts:66](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L66)

___

### ctx

• **ctx**: `CanvasRenderingContext2D`

#### Overrides

[History](utils_History.History.md).[ctx](utils_History.History.md#ctx)

#### Defined in

[src/Drawer.ts:64](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L64)

___

### customBtn

• **customBtn**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: `HTMLButtonElement`

#### Defined in

[src/Drawer.ts:70](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L70)

___

### dotted

• **dotted**: `boolean` = `false`

#### Defined in

[src/Drawer.ts:67](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L67)

___

### gridActive

• **gridActive**: `boolean`

#### Defined in

[src/Drawer.ts:107](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L107)

___

### isDrawing

• **isDrawing**: `boolean` = `false`

#### Defined in

[src/Drawer.ts:65](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L65)

___

### options

• **options**: [`DrawerOptions`](../interfaces/types_drawer.DrawerOptions.md) = `defaultOptionsDrawer`

#### Defined in

[src/Drawer.ts:69](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L69)

___

### redo\_list

• **redo\_list**: `string`[] = `[]`

#### Inherited from

[History](utils_History.History.md).[redo_list](utils_History.History.md#redo_list)

#### Defined in

[src/utils/History.ts:2](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/utils/History.ts#L2)

___

### settingModal

• **settingModal**: `SettingsModal`

#### Defined in

[src/Drawer.ts:106](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L106)

___

### undo\_list

• **undo\_list**: `string`[] = `[]`

#### Inherited from

[History](utils_History.History.md).[undo_list](utils_History.History.md#undo_list)

#### Defined in

[src/utils/History.ts:3](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/utils/History.ts#L3)

## Methods

### addBrushBtn

▸ **addBrushBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add brush button to toolbar if exist
see [addToolbar](Drawer.Drawer.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types_drawer.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/Drawer.ts:559](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L559)

___

### addClearBtn

▸ **addClearBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add clear button to toolbar if exist
see [addToolbar](Drawer.Drawer.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types_drawer.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/Drawer.ts:762](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L762)

___

### addColorPickerBtn

▸ **addColorPickerBtn**(`action?`): `Promise`<`HTMLInputElement`\>

Add a colorpicker button
see [addToolbar](Drawer.Drawer.md#addtoolbar) before use it
using Coloris, for customisation please see here [https://github.com/mdbassit/Coloris](https://github.com/mdbassit/Coloris)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types_drawer.md#action)<`HTMLInputElement`\> | Action call after color selected |

#### Returns

`Promise`<`HTMLInputElement`\>

#### Defined in

[src/Drawer.ts:944](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L944)

___

### addCustomBtn

▸ **addCustomBtn**(`name`, `title`, `label`, `action`): `Promise`<`HTMLButtonElement`\>

Add a custom button to toolbar
see [addToolbar](Drawer.Drawer.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Button name (must be unique) |
| `title` | `string` | Title for button |
| `label` | `string` | Label or icon |
| `action` | [`action`](../modules/types_drawer.md#action)<`HTMLButtonElement`\> | Action to do onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/Drawer.ts:1125](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L1125)

___

### addDefaults

▸ **addDefaults**(): `void`

Add default button to toolbar,
List of defaults buttons :
undo, redo, brush, eraser, text, clear, line thickness, colorpicker, upload, download, setting

#### Returns

`void`

#### Defined in

[src/Drawer.ts:464](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L464)

___

### addDownloadBtn

▸ **addDownloadBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add a download button
see [addToolbar](Drawer.Drawer.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types_drawer.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/Drawer.ts:1044](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L1044)

___

### addDrawGroupBtn

▸ **addDrawGroupBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add draw group button (contain brush, eraser and text zone)
see [addToolbar](Drawer.Drawer.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types_drawer.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/Drawer.ts:667](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L667)

___

### addEraserBtn

▸ **addEraserBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add eraser button to toolbar if exist
see [addToolbar](Drawer.Drawer.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types_drawer.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/Drawer.ts:595](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L595)

___

### addGrid

▸ **addGrid**(): `void`

Add a css grid for draw helping

#### Returns

`void`

#### Defined in

[src/Drawer.ts:1567](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L1567)

___

### addLineThicknessBtn

▸ **addLineThicknessBtn**(`action?`): `Promise`<`HTMLInputElement`\>

Add line thickness input range to toolbar if exist
see [addToolbar](Drawer.Drawer.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types_drawer.md#action)<`HTMLInputElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLInputElement`\>

HTML input range element

#### Defined in

[src/Drawer.ts:896](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L896)

___

### addRedoBtn

▸ **addRedoBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add brush button to toolbar if exist
see [addToolbar](Drawer.Drawer.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types_drawer.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/Drawer.ts:522](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L522)

___

### addSettingBtn

▸ **addSettingBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add a params button
see [addToolbar](Drawer.Drawer.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types_drawer.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/Drawer.ts:1088](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L1088)

___

### addShapeBtn

▸ **addShapeBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add text button to toolbar if exist
see [addToolbar](Drawer.Drawer.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types_drawer.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/Drawer.ts:798](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L798)

___

### addTextBtn

▸ **addTextBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add text button to toolbar if exist
see [addToolbar](Drawer.Drawer.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types_drawer.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/Drawer.ts:631](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L631)

___

### addToolbar

▸ **addToolbar**(): `Promise`<`HTMLDivElement`\>

Adding an empty toolbar element

#### Returns

`Promise`<`HTMLDivElement`\>

HTML toolbar element

#### Defined in

[src/Drawer.ts:429](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L429)

___

### addUndoBtn

▸ **addUndoBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add undo button to toolbar if exist
see [addToolbar](Drawer.Drawer.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types_drawer.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/Drawer.ts:485](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L485)

___

### addUploadFileBtn

▸ **addUploadFileBtn**(`action?`): `Promise`<`HTMLInputElement`\>

Add upload file button
see [addToolbar](Drawer.Drawer.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types_drawer.md#action)<`HTMLInputElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLInputElement`\>

HTML input range element

#### Defined in

[src/Drawer.ts:997](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L997)

___

### changeTool

▸ **changeTool**(`toolName`): `Promise`<`boolean`\>

Change tool

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `toolName` | ``"square"`` \| ``"circle"`` \| ``"line"`` \| ``"polygon"`` \| ``"rect"`` \| ``"text"`` \| ``"brush"`` \| ``"eraser"`` \| ``"arrow"`` \| ``"star"`` \| ``"triangle"`` | Tool name to set |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/Drawer.ts:302](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L302)

___

### clear

▸ **clear**(): `Promise`<`HTMLCanvasElement`\>

Clear all canvas

#### Returns

`Promise`<`HTMLCanvasElement`\>

#### Defined in

[src/Drawer.ts:344](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L344)

___

### getData

▸ **getData**(): `string`

Get date url from canvas

#### Returns

`string`

canvas png data

#### Defined in

[src/Drawer.ts:421](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L421)

___

### isEmpty

▸ **isEmpty**(`data?`): `boolean`

Check if canvas empty

#### Parameters

| Name | Type |
| :------ | :------ |
| `data?` | `string` |

#### Returns

`boolean`

#### Defined in

[src/Drawer.ts:219](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L219)

___

### isShape

▸ **isShape**(): `boolean`

Check if active tool is shape

#### Returns

`boolean`

#### Defined in

[src/Drawer.ts:1309](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L1309)

___

### loadFromData

▸ **loadFromData**(`data`): `Promise`<[`Drawer`](Drawer.Drawer.md)\>

Inject data to canvas

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`Promise`<[`Drawer`](Drawer.Drawer.md)\>

#### Defined in

[src/Drawer.ts:371](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L371)

___

### redo

▸ **redo**(): `void`

#### Returns

`void`

#### Inherited from

[History](utils_History.History.md).[redo](utils_History.History.md#redo)

#### Defined in

[src/utils/History.ts:20](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/utils/History.ts#L20)

___

### removeGrid

▸ **removeGrid**(): `void`

Remove a css grid for draw helping

#### Returns

`void`

#### Defined in

[src/Drawer.ts:1575](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L1575)

___

### restoreState

▸ **restoreState**(`pop`, `push`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pop` | `string`[] |
| `push` | `string`[] |

#### Returns

`void`

#### Inherited from

[History](utils_History.History.md).[restoreState](utils_History.History.md#restorestate)

#### Defined in

[src/utils/History.ts:24](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/utils/History.ts#L24)

___

### saveDraw

▸ **saveDraw**(): `void`

Save draw to localStorage
Drawer.options.localStorageKey

#### Returns

`void`

#### Defined in

[src/Drawer.ts:405](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L405)

___

### saveState

▸ **saveState**(`list?`, `keep_redo?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `list?` | `string`[] |
| `keep_redo?` | `boolean` |

#### Returns

`void`

#### Inherited from

[History](utils_History.History.md).[saveState](utils_History.History.md#savestate)

#### Defined in

[src/utils/History.ts:7](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/utils/History.ts#L7)

___

### setActiveBtn

▸ **setActiveBtn**(`$btn`): `void`

Apply active state to btn

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `$btn` | ``null`` \| `HTMLButtonElement` | Button to add active class |

#### Returns

`void`

#### Defined in

[src/Drawer.ts:1248](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L1248)

___

### setBgColor

▸ **setBgColor**(`bgColor?`): `Promise`<`boolean`\>

Change css canvas background color (ignored on export)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bgColor?` | `string` | canvas css background color |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/Drawer.ts:255](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L255)

___

### setCanvas

▸ **setCanvas**(`$canvas`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `$canvas` | `HTMLCanvasElement` |

#### Returns

`void`

#### Inherited from

[History](utils_History.History.md).[setCanvas](utils_History.History.md#setcanvas)

#### Defined in

[src/utils/History.ts:50](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/utils/History.ts#L50)

___

### setColor

▸ **setColor**(`color`): `Promise`<`boolean`\>

Change drawing color

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `color` | `string` | Color to apply to draw |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/Drawer.ts:229](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L229)

___

### setDottedLine

▸ **setDottedLine**(`active`, `dash?`): `Promise`<`boolean`\>

Set line style dotted

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `active` | `boolean` | state |
| `dash?` | `number`[] | Line dash format [width, spacing] |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/Drawer.ts:1225](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L1225)

___

### setLineWidth

▸ **setLineWidth**(`width`): `void`

Set the line width

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | Line width |

#### Returns

`void`

#### Defined in

[src/Drawer.ts:1287](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L1287)

___

### setShape

▸ **setShape**(`shape`): `Promise`<`unknown`\>

Change drawing shape

#### Parameters

| Name | Type |
| :------ | :------ |
| `shape` | ``"square"`` \| ``"circle"`` \| ``"line"`` \| ``"polygon"`` \| ``"rect"`` \| ``"text"`` \| ``"brush"`` \| ``"eraser"`` \| ``"arrow"`` \| ``"star"`` \| ``"triangle"`` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/Drawer.ts:1175](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L1175)

___

### setSize

▸ **setSize**(`width`, `height`): `Promise`<`boolean`\>

Set canvas sizing

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | Width |
| `height` | `number` | Height |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/Drawer.ts:191](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/Drawer.ts#L191)

___

### undo

▸ **undo**(): `void`

#### Returns

`void`

#### Inherited from

[History](utils_History.History.md).[undo](utils_History.History.md#undo)

#### Defined in

[src/utils/History.ts:16](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/utils/History.ts#L16)
