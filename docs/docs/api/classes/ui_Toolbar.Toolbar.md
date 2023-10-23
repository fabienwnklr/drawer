[@fabwcie/drawer](../README.md) / [Exports](../modules.md) / [ui/Toolbar](../modules/ui_Toolbar.md) / Toolbar

# Class: Toolbar

[ui/Toolbar](../modules/ui_Toolbar.md).Toolbar

## Table of contents

### Constructors

- [constructor](ui_Toolbar.Toolbar.md#constructor)

### Properties

- [$brushBtn](ui_Toolbar.Toolbar.md#$brushbtn)
- [$clearBtn](ui_Toolbar.Toolbar.md#$clearbtn)
- [$colorPicker](ui_Toolbar.Toolbar.md#$colorpicker)
- [$colorPickerLabel](ui_Toolbar.Toolbar.md#$colorpickerlabel)
- [$downloadBtn](ui_Toolbar.Toolbar.md#$downloadbtn)
- [$drawGroupBtn](ui_Toolbar.Toolbar.md#$drawgroupbtn)
- [$drawGroupMenu](ui_Toolbar.Toolbar.md#$drawgroupmenu)
- [$eraserBtn](ui_Toolbar.Toolbar.md#$eraserbtn)
- [$lineThickness](ui_Toolbar.Toolbar.md#$linethickness)
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

- [addBrushBtn](ui_Toolbar.Toolbar.md#addbrushbtn)
- [addClearBtn](ui_Toolbar.Toolbar.md#addclearbtn)
- [addColorPickerBtn](ui_Toolbar.Toolbar.md#addcolorpickerbtn)
- [addCustomBtn](ui_Toolbar.Toolbar.md#addcustombtn)
- [addDefaults](ui_Toolbar.Toolbar.md#adddefaults)
- [addDownloadBtn](ui_Toolbar.Toolbar.md#adddownloadbtn)
- [addDrawGroupBtn](ui_Toolbar.Toolbar.md#adddrawgroupbtn)
- [addEraserBtn](ui_Toolbar.Toolbar.md#adderaserbtn)
- [addLineThicknessBtn](ui_Toolbar.Toolbar.md#addlinethicknessbtn)
- [addRedoBtn](ui_Toolbar.Toolbar.md#addredobtn)
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

[src/ui/Toolbar.ts:55](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L55)

## Properties

### $brushBtn

• **$brushBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:38](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L38)

___

### $clearBtn

• **$clearBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:43](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L43)

___

### $colorPicker

• **$colorPicker**: ``null`` \| `HTMLInputElement`

#### Defined in

[src/ui/Toolbar.ts:46](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L46)

___

### $colorPickerLabel

• **$colorPickerLabel**: `HTMLLabelElement`

#### Defined in

[src/ui/Toolbar.ts:51](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L51)

___

### $downloadBtn

• **$downloadBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:45](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L45)

___

### $drawGroupBtn

• **$drawGroupBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:41](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L41)

___

### $drawGroupMenu

• **$drawGroupMenu**: ``null`` \| `HTMLUListElement`

#### Defined in

[src/ui/Toolbar.ts:42](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L42)

___

### $eraserBtn

• **$eraserBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:39](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L39)

___

### $lineThickness

• **$lineThickness**: ``null`` \| `HTMLDivElement`

#### Defined in

[src/ui/Toolbar.ts:44](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L44)

___

### $redoBtn

• **$redoBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:37](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L37)

___

### $settingBtn

• **$settingBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:50](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L50)

___

### $shapeBtn

• **$shapeBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:47](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L47)

___

### $shapeMenu

• **$shapeMenu**: ``null`` \| `HTMLUListElement`

#### Defined in

[src/ui/Toolbar.ts:48](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L48)

___

### $textBtn

• **$textBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:40](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L40)

___

### $toolbar

• **$toolbar**: `HTMLDivElement`

#### Defined in

[src/ui/Toolbar.ts:35](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L35)

___

### $undoBtn

• **$undoBtn**: ``null`` \| `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:36](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L36)

___

### $uploadFile

• **$uploadFile**: ``null`` \| `HTMLInputElement`

#### Defined in

[src/ui/Toolbar.ts:49](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L49)

___

### customBtn

• **customBtn**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: `HTMLButtonElement`

#### Defined in

[src/ui/Toolbar.ts:53](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L53)

___

### drawer

• **drawer**: [`Drawer`](Drawer.Drawer.md)

#### Defined in

[src/ui/Toolbar.ts:32](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L32)

___

### options

• **options**: [`ToolbarOptions`](../interfaces/types.ToolbarOptions.md)

#### Defined in

[src/ui/Toolbar.ts:33](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L33)

## Methods

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

[src/ui/Toolbar.ts:198](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L198)

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

[src/ui/Toolbar.ts:385](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L385)

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

[src/ui/Toolbar.ts:547](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L547)

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

[src/ui/Toolbar.ts:728](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L728)

___

### addDefaults

▸ **addDefaults**(): `void`

Add default button to toolbar,
List of defaults buttons :
undo, redo, brush, eraser, text, clear, line thickness, colorpicker, upload, download, setting

#### Returns

`void`

#### Defined in

[src/ui/Toolbar.ts:99](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L99)

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

[src/ui/Toolbar.ts:651](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L651)

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

[src/ui/Toolbar.ts:306](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L306)

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

[src/ui/Toolbar.ts:234](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L234)

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

[src/ui/Toolbar.ts:499](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L499)

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

[src/ui/Toolbar.ts:159](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L159)

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

[src/ui/Toolbar.ts:691](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L691)

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

[src/ui/Toolbar.ts:423](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L423)

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

[src/ui/Toolbar.ts:270](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L270)

___

### addToolbar

▸ **addToolbar**(): `Promise`<`HTMLDivElement`\>

Adding an empty toolbar element

#### Returns

`Promise`<`HTMLDivElement`\>

HTML toolbar element

#### Defined in

[src/ui/Toolbar.ts:64](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L64)

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

[src/ui/Toolbar.ts:120](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L120)

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

[src/ui/Toolbar.ts:604](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L604)

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

[src/ui/Toolbar.ts:763](https://github.com/fabwcie/drawer/blob/master/src/ui/Toolbar.ts#L763)
