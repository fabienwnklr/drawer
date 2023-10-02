# Class: History

[utils/History](../modules/utils_History.md).History

## Hierarchy

- **`History`**

  ↳ [`Drawer`](Drawer.Drawer.md)

## Table of contents

### Constructors

- [constructor](utils_History.History.md#constructor)

### Properties

- [$canvas](utils_History.History.md#$canvas)
- [ctx](utils_History.History.md#ctx)
- [redo\_list](utils_History.History.md#redo_list)
- [undo\_list](utils_History.History.md#undo_list)

### Methods

- [redo](utils_History.History.md#redo)
- [restoreState](utils_History.History.md#restorestate)
- [saveState](utils_History.History.md#savestate)
- [setCanvas](utils_History.History.md#setcanvas)
- [undo](utils_History.History.md#undo)

## Constructors

### constructor

• **new History**()

## Properties

### $canvas

• **$canvas**: `HTMLCanvasElement`

#### Defined in

[src/utils/History.ts:4](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/utils/History.ts#L4)

___

### ctx

• **ctx**: `CanvasRenderingContext2D`

#### Defined in

[src/utils/History.ts:5](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/utils/History.ts#L5)

___

### redo\_list

• **redo\_list**: `string`[] = `[]`

#### Defined in

[src/utils/History.ts:2](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/utils/History.ts#L2)

___

### undo\_list

• **undo\_list**: `string`[] = `[]`

#### Defined in

[src/utils/History.ts:3](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/utils/History.ts#L3)

## Methods

### redo

▸ **redo**(): `void`

#### Returns

`void`

#### Defined in

[src/utils/History.ts:20](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/utils/History.ts#L20)

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

#### Defined in

[src/utils/History.ts:24](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/utils/History.ts#L24)

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

#### Defined in

[src/utils/History.ts:7](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/utils/History.ts#L7)

___

### setCanvas

▸ **setCanvas**(`$canvas`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `$canvas` | `HTMLCanvasElement` |

#### Returns

`void`

#### Defined in

[src/utils/History.ts:50](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/utils/History.ts#L50)

___

### undo

▸ **undo**(): `void`

#### Returns

`void`

#### Defined in

[src/utils/History.ts:16](https://github.com/fabwcie/drawer/blob/6f6bdfc/src/utils/History.ts#L16)
