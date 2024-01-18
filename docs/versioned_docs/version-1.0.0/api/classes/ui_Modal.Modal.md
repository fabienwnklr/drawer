[@fabwcie/drawer](../README.md) / [Exports](../modules.md) / [ui/Modal](../modules/ui_Modal.md) / Modal

# Class: Modal

[ui/Modal](../modules/ui_Modal.md).Modal

## Hierarchy

- **`Modal`**

  ↳ [`ConfirmModal`](ui_ConfirmModal.ConfirmModal.md)

  ↳ [`SettingsModal`](ui_SettingsModal.SettingsModal.md)

## Table of contents

### Constructors

- [constructor](ui_Modal.Modal.md#constructor)

### Properties

- [$backdrop](ui_Modal.Modal.md#$backdrop)
- [$modal](ui_Modal.Modal.md#$modal)
- [$modalBody](ui_Modal.Modal.md#$modalbody)
- [$modalFooter](ui_Modal.Modal.md#$modalfooter)
- [$modalHeader](ui_Modal.Modal.md#$modalheader)
- [drawer](ui_Modal.Modal.md#drawer)
- [options](ui_Modal.Modal.md#options)

### Methods

- [appendBodyContent](ui_Modal.Modal.md#appendbodycontent)
- [destroy](ui_Modal.Modal.md#destroy)
- [hide](ui_Modal.Modal.md#hide)
- [isVisible](ui_Modal.Modal.md#isvisible)
- [setBodyContent](ui_Modal.Modal.md#setbodycontent)
- [setFooterContent](ui_Modal.Modal.md#setfootercontent)
- [setHeaderContent](ui_Modal.Modal.md#setheadercontent)
- [show](ui_Modal.Modal.md#show)

## Constructors

### constructor

• **new Modal**(`drawer`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `drawer` | [`Drawer`](Drawer.Drawer.md) |
| `options?` | `Partial`<[`ModalOptions`](../interfaces/types.ModalOptions.md)\> |

#### Defined in

[src/ui/Modal.ts:24](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L24)

## Properties

### $backdrop

• **$backdrop**: `HTMLDivElement`

#### Defined in

[src/ui/Modal.ts:22](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L22)

___

### $modal

• **$modal**: `HTMLDivElement`

#### Defined in

[src/ui/Modal.ts:16](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L16)

___

### $modalBody

• **$modalBody**: `HTMLDivElement`

#### Defined in

[src/ui/Modal.ts:18](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L18)

___

### $modalFooter

• **$modalFooter**: `HTMLDivElement`

#### Defined in

[src/ui/Modal.ts:19](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L19)

___

### $modalHeader

• **$modalHeader**: `HTMLDivElement`

#### Defined in

[src/ui/Modal.ts:17](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L17)

___

### drawer

• **drawer**: [`Drawer`](Drawer.Drawer.md)

#### Defined in

[src/ui/Modal.ts:21](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L21)

___

### options

• **options**: [`ModalOptions`](../interfaces/types.ModalOptions.md)

#### Defined in

[src/ui/Modal.ts:20](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L20)

## Methods

### appendBodyContent

▸ **appendBodyContent**(`content`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `string` |

#### Returns

`void`

#### Defined in

[src/ui/Modal.ts:115](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L115)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Defined in

[src/ui/Modal.ts:141](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L141)

___

### hide

▸ **hide**(): `void`

#### Returns

`void`

#### Defined in

[src/ui/Modal.ts:130](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L130)

___

### isVisible

▸ **isVisible**(): `boolean`

#### Returns

`boolean`

#### Defined in

[src/ui/Modal.ts:137](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L137)

___

### setBodyContent

▸ **setBodyContent**(`content`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `string` |

#### Returns

`void`

#### Defined in

[src/ui/Modal.ts:111](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L111)

___

### setFooterContent

▸ **setFooterContent**(`content`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `string` |

#### Returns

`void`

#### Defined in

[src/ui/Modal.ts:119](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L119)

___

### setHeaderContent

▸ **setHeaderContent**(`content`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `content` | `string` |

#### Returns

`void`

#### Defined in

[src/ui/Modal.ts:105](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L105)

___

### show

▸ **show**(): `void`

#### Returns

`void`

#### Defined in

[src/ui/Modal.ts:123](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L123)
