[@fabwcie/drawer](../README.md) / [Exports](../modules.md) / types

# Module: types

## Table of contents

### Enumerations

- [DrawTools](../enums/types.DrawTools.md)
- [ToolbarPosition](../enums/types.ToolbarPosition.md)

### Interfaces

- [DrawerOptions](../interfaces/types.DrawerOptions.md)
- [ModalOptions](../interfaces/types.ModalOptions.md)
- [Position](../interfaces/types.Position.md)
- [ToolbarOptions](../interfaces/types.ToolbarOptions.md)

### Type Aliases

- [ThrottledFunction](types.md#throttledfunction)
- [action](types.md#action)

## Type Aliases

### ThrottledFunction

Ƭ **ThrottledFunction**<`T`\>: (...`args`: `Parameters`<`T`\>) => `ReturnType`<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`) => `any` |

#### Type declaration

▸ (`...args`): `ReturnType`<`T`\>

Utils

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Parameters`<`T`\> |

##### Returns

`ReturnType`<`T`\>

#### Defined in

[src/types/index.ts:79](https://github.com/fabwcie/drawer/blob/e245821/src/types/index.ts#L79)

___

### action

Ƭ **action**<`T`\>: (`$btn`: `T`, `value?`: `any`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`$btn`, `value?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `$btn` | `T` |
| `value?` | `any` |

##### Returns

`void`

#### Defined in

[src/types/index.ts:26](https://github.com/fabwcie/drawer/blob/e245821/src/types/index.ts#L26)
