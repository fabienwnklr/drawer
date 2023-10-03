[@fabwcie/drawer](../README.md) / [Exports](../modules.md) / utils/utils

# Module: utils/utils

## Table of contents

### Functions

- [arrayBufferToBase64](utils_utils.md#arraybuffertobase64)
- [blobToBase64](utils_utils.md#blobtobase64)
- [deepMerge](utils_utils.md#deepmerge)
- [hexToRgbA](utils_utils.md#hextorgba)
- [isObject](utils_utils.md#isobject)
- [isTruthy](utils_utils.md#istruthy)

## Functions

### arrayBufferToBase64

▸ **arrayBufferToBase64**(`buffer`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `buffer` | `ArrayBuffer` |

#### Returns

`string`

#### Defined in

[src/utils/utils.ts:61](https://github.com/fabwcie/drawer/blob/850d9ed/src/utils/utils.ts#L61)

___

### blobToBase64

▸ **blobToBase64**(`blob`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blob` | `Blob` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/utils/utils.ts:71](https://github.com/fabwcie/drawer/blob/850d9ed/src/utils/utils.ts#L71)

___

### deepMerge

▸ **deepMerge**<`T`\>(`target`, `source`): `T`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `T` |
| `source` | `T` \| `Partial`<`T`\> |

#### Returns

`T`

#### Defined in

[src/utils/utils.ts:42](https://github.com/fabwcie/drawer/blob/850d9ed/src/utils/utils.ts#L42)

___

### hexToRgbA

▸ **hexToRgbA**(`hexCode`, `opacity?`): `string`

Convert hex to rgba

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `hexCode` | `string` | `undefined` |
| `opacity` | `number` | `1` |

#### Returns

`string`

#### Defined in

[src/utils/utils.ts:7](https://github.com/fabwcie/drawer/blob/850d9ed/src/utils/utils.ts#L7)

___

### isObject

▸ **isObject**(`item`): `boolean`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `any` | The item that needs to be checked |

#### Returns

`boolean`

Whether or not

**`Description`**

Method to check if an item is an object. Date and Function are considered
an object, so if you need to exclude those, please update the method accordingly.

**`Item`**

is an object

#### Defined in

[src/utils/utils.ts:26](https://github.com/fabwcie/drawer/blob/850d9ed/src/utils/utils.ts#L26)

___

### isTruthy

▸ **isTruthy**(`t`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `t` | `any` |

#### Returns

`boolean`

#### Defined in

[src/utils/utils.ts:38](https://github.com/fabwcie/drawer/blob/850d9ed/src/utils/utils.ts#L38)
