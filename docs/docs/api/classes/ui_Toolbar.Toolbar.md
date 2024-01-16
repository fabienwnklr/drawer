[@fabwcie/drawer](../README.md) / [Exports](../modules.md) / [ui/Toolbar](../modules/ui_Toolbar.md) / Toolbar

# Class: Toolbar

[ui/Toolbar](../modules/ui_Toolbar.md).Toolbar

## Table of contents

### Constructors

- [constructor](ui_Toolbar.Toolbar.md#constructor)

### Properties

- [$brushBtn](ui_Toolbar.Toolbar.md#$brushbtn)
- [$clearBtn](ui_Toolbar.Toolbar.md#$clearbtn)
- [$closeBtn](ui_Toolbar.Toolbar.md#$closebtn)
- [$colorPicker](ui_Toolbar.Toolbar.md#$colorpicker)
- [$colorPickerLabel](ui_Toolbar.Toolbar.md#$colorpickerlabel)
- [$downloadBtn](ui_Toolbar.Toolbar.md#$downloadbtn)
- [$drawGroupBtn](ui_Toolbar.Toolbar.md#$drawgroupbtn)
- [$drawGroupMenu](ui_Toolbar.Toolbar.md#$drawgroupmenu)
- [$eraserBtn](ui_Toolbar.Toolbar.md#$eraserbtn)
- [$expandBtn](ui_Toolbar.Toolbar.md#$expandbtn)
- [$fullscreenBtn](ui_Toolbar.Toolbar.md#$fullscreenbtn)
- [$lineThickness](ui_Toolbar.Toolbar.md#$linethickness)
- [$pickColorBtn](ui_Toolbar.Toolbar.md#$pickcolorbtn)
- [$redoBtn](ui_Toolbar.Toolbar.md#$redobtn)
- [$settingBtn](ui_Toolbar.Toolbar.md#$settingbtn)
- [$shapeBtn](ui_Toolbar.Toolbar.md#$shapebtn)
- [$shapeMenu](ui_Toolbar.Toolbar.md#$shapemenu)
- [$textBtn](ui_Toolbar.Toolbar.md#$textbtn)
- [$toolbar](ui_Toolbar.Toolbar.md#$toolbar)
- [$undoBtn](ui_Toolbar.Toolbar.md#$undobtn)
- [$uploadFile](ui_Toolbar.Toolbar.md#$uploadfile)
- [customBtn](ui_Toolbar.Toolbar.md#custombtn)
- [drawer](ui_Toolbar.Toolbar.md#drawer)
- [options](ui_Toolbar.Toolbar.md#options)

### Methods

- [\_cropImageFromCanvas](ui_Toolbar.Toolbar.md#_cropimagefromcanvas)
- [addAllButtons](ui_Toolbar.Toolbar.md#addallbuttons)
- [addBrushBtn](ui_Toolbar.Toolbar.md#addbrushbtn)
- [addClearBtn](ui_Toolbar.Toolbar.md#addclearbtn)
- [addCloseButton](ui_Toolbar.Toolbar.md#addclosebutton)
- [addColorPickerBtn](ui_Toolbar.Toolbar.md#addcolorpickerbtn)
- [addCustomBtn](ui_Toolbar.Toolbar.md#addcustombtn)
- [addDefaults](ui_Toolbar.Toolbar.md#adddefaults)
- [addDownloadBtn](ui_Toolbar.Toolbar.md#adddownloadbtn)
- [addDrawGroupBtn](ui_Toolbar.Toolbar.md#adddrawgroupbtn)
- [addEraserBtn](ui_Toolbar.Toolbar.md#adderaserbtn)
- [addExpandButton](ui_Toolbar.Toolbar.md#addexpandbutton)
- [addFullscreenButton](ui_Toolbar.Toolbar.md#addfullscreenbutton)
- [addLineThicknessBtn](ui_Toolbar.Toolbar.md#addlinethicknessbtn)
- [addPickColorButton](ui_Toolbar.Toolbar.md#addpickcolorbutton)
- [addRedoBtn](ui_Toolbar.Toolbar.md#addredobtn)
- [addSeparator](ui_Toolbar.Toolbar.md#addseparator)
- [addSettingBtn](ui_Toolbar.Toolbar.md#addsettingbtn)
- [addShapeBtn](ui_Toolbar.Toolbar.md#addshapebtn)
- [addTextBtn](ui_Toolbar.Toolbar.md#addtextbtn)
- [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar)
- [addUndoBtn](ui_Toolbar.Toolbar.md#addundobtn)
- [addUploadFileBtn](ui_Toolbar.Toolbar.md#adduploadfilebtn)
- [setActiveBtn](ui_Toolbar.Toolbar.md#setactivebtn)

## Constructors

### constructor

• **new Toolbar**(`drawer`, `options`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `drawer` | [`Drawer`](Drawer.Drawer.md) |
| `options` | [`ToolbarOptions`](../interfaces/types.ToolbarOptions.md) |

#### Defined in

[src/ui/Toolbar.ts:63](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L63)

## Properties

### $brushBtn

• **$brushBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:42](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L42)

___

### $clearBtn

• **$clearBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:47](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L47)

___

### $closeBtn

• **$closeBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:58](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L58)

___

### $colorPicker

• **$colorPicker**: ``null`` \| `HTMLInputElement`

#### Defined in

[src/ui/Toolbar.ts:50](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L50)

___

### $colorPickerLabel

• **$colorPickerLabel**: ``null`` \| `HTMLLabelElement`

#### Defined in

[src/ui/Toolbar.ts:59](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L59)

___

### $downloadBtn

• **$downloadBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:49](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L49)

___

### $drawGroupBtn

• **$drawGroupBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:45](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L45)

___

### $drawGroupMenu

• **$drawGroupMenu**: ``null`` \| `HTMLUListElement`

#### Defined in

[src/ui/Toolbar.ts:46](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L46)

___

### $eraserBtn

• **$eraserBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:43](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L43)

___

### $expandBtn

• **$expandBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:55](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L55)

___

### $fullscreenBtn

• **$fullscreenBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:56](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L56)

___

### $lineThickness

• **$lineThickness**: ``null`` \| `HTMLDivElement`

#### Defined in

[src/ui/Toolbar.ts:48](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L48)

___

### $pickColorBtn

• **$pickColorBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:54](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L54)

___

### $redoBtn

• **$redoBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:41](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L41)

___

### $settingBtn

• **$settingBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:57](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L57)

___

### $shapeBtn

• **$shapeBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:51](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L51)

___

### $shapeMenu

• **$shapeMenu**: ``null`` \| `HTMLUListElement`

#### Defined in

[src/ui/Toolbar.ts:52](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L52)

___

### $textBtn

• **$textBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:44](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L44)

___

### $toolbar

• **$toolbar**: `HTMLDivElement`

#### Defined in

[src/ui/Toolbar.ts:39](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L39)

___

### $undoBtn

• **$undoBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:40](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L40)

___

### $uploadFile

• **$uploadFile**: ``null`` \| `HTMLInputElement`

#### Defined in

[src/ui/Toolbar.ts:53](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L53)

___

### customBtn

• **customBtn**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:61](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L61)

___

### drawer

• **drawer**: [`Drawer`](Drawer.Drawer.md)

#### Defined in

[src/ui/Toolbar.ts:36](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L36)

___

### options

• **options**: [`ToolbarOptions`](../interfaces/types.ToolbarOptions.md)

#### Defined in

[src/ui/Toolbar.ts:37](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L37)

## Methods

### \_cropImageFromCanvas

▸ **_cropImageFromCanvas**(`ctx`): `string`

Crop image

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `CanvasRenderingContext2D` |

#### Returns

`string`

#### Defined in

[src/ui/Toolbar.ts:724](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L724)

___

### addAllButtons

▸ **addAllButtons**(): `void`

#### Returns

`void`

#### Defined in

[src/ui/Toolbar.ts:119](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L119)

___

### addBrushBtn

▸ **addBrushBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add brush button to toolbar if exist
see [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/ui/Toolbar.ts:222](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L222)

___

### addClearBtn

▸ **addClearBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add clear button to toolbar if exist
see [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/ui/Toolbar.ts:409](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L409)

___

### addCloseButton

▸ **addCloseButton**(`action?`): `Promise`<`undefined` \| `HTMLButtonElement`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `action?` | [`action`](../modules/types.md#action)<`HTMLButtonElement`\> |

#### Returns

`Promise`<`undefined` \| `HTMLButtonElement`\>

#### Defined in

[src/ui/Toolbar.ts:882](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L882)

___

### addColorPickerBtn

▸ **addColorPickerBtn**(`action?`): `Promise`<`HTMLInputElement`\>

Add a colorpicker button
see [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar) before use it
using Coloris, for customisation please see here [https://github.com/mdbassit/Coloris](https://github.com/mdbassit/Coloris)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types.md#action)<`HTMLInputElement`\> | Action call after color selected |

#### Returns

`Promise`<`HTMLInputElement`\>

#### Defined in

[src/ui/Toolbar.ts:574](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L574)

___

### addCustomBtn

▸ **addCustomBtn**(`name`, `title`, `label`, `action`): `Promise`<`HTMLButtonElement`\>

Add a custom button to toolbar
see [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Button name (must be unique) |
| `title` | `string` | Title for button |
| `label` | `string` | Label or icon |
| `action` | [`action`](../modules/types.md#action)<`HTMLButtonElement`\> | Action to do onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/ui/Toolbar.ts:950](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L950)

___

### addDefaults

▸ **addDefaults**(): `void`

Add default button to toolbar,
List of defaults buttons :
undo, redo, brush, eraser, text, clear, line thickness, colorpicker, upload, download, setting

#### Returns

`void`

#### Defined in

[src/ui/Toolbar.ts:109](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L109)

___

### addDownloadBtn

▸ **addDownloadBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add a download button
see [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/ui/Toolbar.ts:679](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L679)

___

### addDrawGroupBtn

▸ **addDrawGroupBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add draw group button (contain brush, eraser and text zone)
see [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/ui/Toolbar.ts:330](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L330)

___

### addEraserBtn

▸ **addEraserBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add eraser button to toolbar if exist
see [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/ui/Toolbar.ts:258](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L258)

___

### addExpandButton

▸ **addExpandButton**(`action?`): `Promise`<`HTMLButtonElement`\>

Add expand button for toggle size to full width / height of window
see [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/ui/Toolbar.ts:824](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L824)

___

### addFullscreenButton

▸ **addFullscreenButton**(`action?`): `Promise`<`HTMLButtonElement`\>

Add fullscreen button for toggle fullscreen native
see [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/ui/Toolbar.ts:856](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L856)

___

### addLineThicknessBtn

▸ **addLineThicknessBtn**(`action?`): `Promise`<`HTMLInputElement`\>

Add line thickness input range to toolbar if exist
see [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types.md#action)<`HTMLInputElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLInputElement`\>

HTML input range element

#### Defined in

[src/ui/Toolbar.ts:526](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L526)

___

### addPickColorButton

▸ **addPickColorButton**(`action?`): `Promise`<`HTMLButtonElement`\>

Add pick color button select color on canvas
see [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/ui/Toolbar.ts:767](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L767)

___

### addRedoBtn

▸ **addRedoBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add brush button to toolbar if exist
see [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/ui/Toolbar.ts:183](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L183)

___

### addSeparator

▸ **addSeparator**(): `Promise`<`boolean`\>

Add separator (ml-auto)

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/ui/Toolbar.ts:985](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L985)

___

### addSettingBtn

▸ **addSettingBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add a params button
see [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/ui/Toolbar.ts:913](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L913)

___

### addShapeBtn

▸ **addShapeBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add text button to toolbar if exist
see [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/ui/Toolbar.ts:450](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L450)

___

### addTextBtn

▸ **addTextBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add text button to toolbar if exist
see [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/ui/Toolbar.ts:294](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L294)

___

### addToolbar

▸ **addToolbar**(): `Promise`<`HTMLDivElement`\>

Adding an empty toolbar element

#### Returns

`Promise`<`HTMLDivElement`\>

HTML toolbar element

**`Description`**

This method add html toolbar element, is **required** for add any toolbar button

#### Defined in

[src/ui/Toolbar.ts:74](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L74)

___

### addUndoBtn

▸ **addUndoBtn**(`action?`): `Promise`<`HTMLButtonElement`\>

Add undo button to toolbar if exist
see [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types.md#action)<`HTMLButtonElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLButtonElement`\>

#### Defined in

[src/ui/Toolbar.ts:144](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L144)

___

### addUploadFileBtn

▸ **addUploadFileBtn**(`action?`): `Promise`<`HTMLInputElement`\>

Add upload file button
see [addToolbar](ui_Toolbar.Toolbar.md#addtoolbar) before use it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action?` | [`action`](../modules/types.md#action)<`HTMLInputElement`\> | method to call onclick |

#### Returns

`Promise`<`HTMLInputElement`\>

HTML input range element

#### Defined in

[src/ui/Toolbar.ts:632](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L632)

___

### setActiveBtn

▸ **setActiveBtn**(`$btn`): `void`

Apply active state to btn

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `$btn` | `HTMLButtonElement` | Button to add active class |

#### Returns

`void`

#### Defined in

[src/ui/Toolbar.ts:998](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L998)
