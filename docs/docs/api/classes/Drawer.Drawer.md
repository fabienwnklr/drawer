[@fabwcie/drawer](../README.md) / [Exports](../modules.md) / [Drawer](../modules/Drawer.md) / Drawer

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

- [$canvas](Drawer.Drawer.md#$canvas)
- [$drawerContainer](Drawer.Drawer.md#$drawercontainer)
- [$sourceElement](Drawer.Drawer.md#$sourceelement)
- [VERSION](Drawer.Drawer.md#version)
- [activeTool](Drawer.Drawer.md#activetool)
- [ctx](Drawer.Drawer.md#ctx)
- [dotted](Drawer.Drawer.md#dotted)
- [gridActive](Drawer.Drawer.md#gridactive)
- [isDrawing](Drawer.Drawer.md#isdrawing)
- [options](Drawer.Drawer.md#options)
- [redo\_list](Drawer.Drawer.md#redo_list)
- [settingModal](Drawer.Drawer.md#settingmodal)
- [toolbar](Drawer.Drawer.md#toolbar)
- [undo\_list](Drawer.Drawer.md#undo_list)

### Methods

- [addGrid](Drawer.Drawer.md#addgrid)
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

[src/Drawer.ts:92](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L92)

## Properties

### $canvas

• **$canvas**: `HTMLCanvasElement`

#### Overrides

[History](utils_History.History.md).[$canvas](utils_History.History.md#$canvas)

#### Defined in

[src/Drawer.ts:64](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L64)

___

### $drawerContainer

• **$drawerContainer**: `HTMLDivElement`

#### Defined in

[src/Drawer.ts:66](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L66)

___

### $sourceElement

• **$sourceElement**: `HTMLElement`

#### Defined in

[src/Drawer.ts:65](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L65)

___

### VERSION

• **VERSION**: `string` = `version`

#### Defined in

[src/Drawer.ts:83](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L83)

___

### activeTool

• **activeTool**: ``"square"`` \| ``"circle"`` \| ``"line"`` \| ``"polygon"`` \| ``"rect"`` \| ``"text"`` \| ``"brush"`` \| ``"eraser"`` \| ``"arrow"`` \| ``"star"`` \| ``"triangle"`` = `'brush'`

#### Defined in

[src/Drawer.ts:59](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L59)

___

### ctx

• **ctx**: `CanvasRenderingContext2D`

#### Overrides

[History](utils_History.History.md).[ctx](utils_History.History.md#ctx)

#### Defined in

[src/Drawer.ts:57](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L57)

___

### dotted

• **dotted**: `boolean` = `false`

#### Defined in

[src/Drawer.ts:60](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L60)

___

### gridActive

• **gridActive**: `boolean`

#### Defined in

[src/Drawer.ts:82](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L82)

___

### isDrawing

• **isDrawing**: `boolean` = `false`

#### Defined in

[src/Drawer.ts:58](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L58)

___

### options

• **options**: [`DrawerOptions`](../interfaces/types_drawer.DrawerOptions.md) = `defaultOptionsDrawer`

#### Defined in

[src/Drawer.ts:62](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L62)

___

### redo\_list

• **redo\_list**: `string`[] = `[]`

#### Inherited from

[History](utils_History.History.md).[redo_list](utils_History.History.md#redo_list)

#### Defined in

[src/utils/History.ts:4](https://github.com/fabwcie/drawer/blob/850d9ed/src/utils/History.ts#L4)

___

### settingModal

• **settingModal**: `SettingsModal`

#### Defined in

[src/Drawer.ts:81](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L81)

___

### toolbar

• **toolbar**: [`Toolbar`](ui_Toolbar.Toolbar.md)

#### Defined in

[src/Drawer.ts:84](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L84)

___

### undo\_list

• **undo\_list**: `string`[] = `[]`

#### Inherited from

[History](utils_History.History.md).[undo_list](utils_History.History.md#undo_list)

#### Defined in

[src/utils/History.ts:5](https://github.com/fabwcie/drawer/blob/850d9ed/src/utils/History.ts#L5)

## Methods

### addGrid

▸ **addGrid**(): `void`

Add a css grid for draw helping

#### Returns

`void`

#### Defined in

[src/Drawer.ts:719](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L719)

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

[src/Drawer.ts:254](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L254)

___

### clear

▸ **clear**(): `Promise`<`HTMLCanvasElement`\>

Clear all canvas

#### Returns

`Promise`<`HTMLCanvasElement`\>

#### Defined in

[src/Drawer.ts:296](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L296)

___

### getData

▸ **getData**(): `string`

Get date url from canvas

#### Returns

`string`

canvas png data

#### Defined in

[src/Drawer.ts:373](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L373)

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

[src/Drawer.ts:199](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L199)

___

### isShape

▸ **isShape**(): `boolean`

Check if active tool is shape

#### Returns

`boolean`

#### Defined in

[src/Drawer.ts:476](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L476)

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

[src/Drawer.ts:323](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L323)

___

### redo

▸ **redo**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Inherited from

[History](utils_History.History.md).[redo](utils_History.History.md#redo)

#### Defined in

[src/utils/History.ts:28](https://github.com/fabwcie/drawer/blob/850d9ed/src/utils/History.ts#L28)

___

### removeGrid

▸ **removeGrid**(): `void`

Remove a css grid for draw helping

#### Returns

`void`

#### Defined in

[src/Drawer.ts:727](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L727)

___

### restoreState

▸ **restoreState**(`pop`, `push`, `cb?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pop` | `string`[] |
| `push` | `string`[] |
| `cb?` | (`v`: `boolean`) => `void` |

#### Returns

`void`

#### Inherited from

[History](utils_History.History.md).[restoreState](utils_History.History.md#restorestate)

#### Defined in

[src/utils/History.ts:38](https://github.com/fabwcie/drawer/blob/850d9ed/src/utils/History.ts#L38)

___

### saveDraw

▸ **saveDraw**(): `void`

Save draw to localStorage
Drawer.options.localStorageKey

#### Returns

`void`

#### Defined in

[src/Drawer.ts:357](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L357)

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

[src/utils/History.ts:9](https://github.com/fabwcie/drawer/blob/850d9ed/src/utils/History.ts#L9)

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

[src/Drawer.ts:235](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L235)

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

[src/utils/History.ts:66](https://github.com/fabwcie/drawer/blob/850d9ed/src/utils/History.ts#L66)

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

[src/Drawer.ts:209](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L209)

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

[src/Drawer.ts:431](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L431)

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

[src/Drawer.ts:454](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L454)

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

[src/Drawer.ts:381](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L381)

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

[src/Drawer.ts:171](https://github.com/fabwcie/drawer/blob/850d9ed/src/Drawer.ts#L171)

___

### undo

▸ **undo**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Inherited from

[History](utils_History.History.md).[undo](utils_History.History.md#undo)

#### Defined in

[src/utils/History.ts:18](https://github.com/fabwcie/drawer/blob/850d9ed/src/utils/History.ts#L18)
