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
- [savedStorage](types.md#savedstorage)

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

[src/types/index.ts:85](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L85)

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

[src/types/index.ts:32](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L32)

___

### savedStorage

Ƭ **savedStorage**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bgcolor` | `string` |
| `data` | `string` |
| `grid` | `boolean` |

#### Defined in

[src/types/index.ts:87](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L87)
