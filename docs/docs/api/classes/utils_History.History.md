[@fabwcie/drawer](../README.md) / [Exports](../modules.md) / [utils/History](../modules/utils_History.md) / History

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

[src/utils/History.ts:6](https://github.com/fabwcie/drawer/blob/e245821/src/utils/History.ts#L6)

___

### ctx

• **ctx**: `CanvasRenderingContext2D`

#### Defined in

[src/utils/History.ts:7](https://github.com/fabwcie/drawer/blob/e245821/src/utils/History.ts#L7)

___

### redo\_list

• **redo\_list**: `string`[] = `[]`

#### Defined in

[src/utils/History.ts:4](https://github.com/fabwcie/drawer/blob/e245821/src/utils/History.ts#L4)

___

### undo\_list

• **undo\_list**: `string`[] = `[]`

#### Defined in

[src/utils/History.ts:5](https://github.com/fabwcie/drawer/blob/e245821/src/utils/History.ts#L5)

## Methods

### redo

▸ **redo**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/utils/History.ts:28](https://github.com/fabwcie/drawer/blob/e245821/src/utils/History.ts#L28)

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

#### Defined in

[src/utils/History.ts:38](https://github.com/fabwcie/drawer/blob/e245821/src/utils/History.ts#L38)

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

[src/utils/History.ts:9](https://github.com/fabwcie/drawer/blob/e245821/src/utils/History.ts#L9)

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

[src/utils/History.ts:66](https://github.com/fabwcie/drawer/blob/e245821/src/utils/History.ts#L66)

___

### undo

▸ **undo**(): `Promise`<`unknown`\>

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/utils/History.ts:18](https://github.com/fabwcie/drawer/blob/e245821/src/utils/History.ts#L18)
