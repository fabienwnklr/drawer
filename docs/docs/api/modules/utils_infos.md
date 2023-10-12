[@fabwcie/drawer](../README.md) / [Exports](../modules.md) / utils/infos

# Module: utils/infos

## Table of contents

### Functions

- [getMousePosition](utils_infos.md#getmouseposition)
- [isTactil](utils_infos.md#istactil)

## Functions

### getMousePosition

▸ **getMousePosition**(`$canvas`, `evt`): `Object`

returns the xy point where the mouse event was occured inside an element.

#### Parameters

| Name | Type |
| :------ | :------ |
| `$canvas` | `HTMLElement` \| `SVGElement` |
| `evt` | `PointerEvent` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Defined in

[src/utils/infos.ts:13](https://github.com/fabwcie/drawer/blob/21e6e28/src/utils/infos.ts#L13)

___

### isTactil

▸ **isTactil**(): `boolean`

Check if is tactil

#### Returns

`boolean`

#### Defined in

[src/utils/infos.ts:4](https://github.com/fabwcie/drawer/blob/21e6e28/src/utils/infos.ts#L4)
