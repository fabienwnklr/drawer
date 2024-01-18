[@fabwcie/drawer](../README.md) / [Exports](../modules.md) / [ui/ConfirmModal](../modules/ui_ConfirmModal.md) / ConfirmModal

# Class: ConfirmModal

[ui/ConfirmModal](../modules/ui_ConfirmModal.md).ConfirmModal

## Hierarchy

- [`Modal`](ui_Modal.Modal.md)

  ↳ **`ConfirmModal`**

## Table of contents

### Constructors

- [constructor](ui_ConfirmModal.ConfirmModal.md#constructor)

### Properties

- [$backdrop](ui_ConfirmModal.ConfirmModal.md#$backdrop)
- [$cancelBtn](ui_ConfirmModal.ConfirmModal.md#$cancelbtn)
- [$confirmBtn](ui_ConfirmModal.ConfirmModal.md#$confirmbtn)
- [$modal](ui_ConfirmModal.ConfirmModal.md#$modal)
- [$modalBody](ui_ConfirmModal.ConfirmModal.md#$modalbody)
- [$modalFooter](ui_ConfirmModal.ConfirmModal.md#$modalfooter)
- [$modalHeader](ui_ConfirmModal.ConfirmModal.md#$modalheader)
- [\_options](ui_ConfirmModal.ConfirmModal.md#_options)
- [cancelLabel](ui_ConfirmModal.ConfirmModal.md#cancellabel)
- [confirmLabel](ui_ConfirmModal.ConfirmModal.md#confirmlabel)
- [drawer](ui_ConfirmModal.ConfirmModal.md#drawer)
- [message](ui_ConfirmModal.ConfirmModal.md#message)
- [onCancel](ui_ConfirmModal.ConfirmModal.md#oncancel)
- [onConfirm](ui_ConfirmModal.ConfirmModal.md#onconfirm)
- [options](ui_ConfirmModal.ConfirmModal.md#options)

### Methods

- [appendBodyContent](ui_ConfirmModal.ConfirmModal.md#appendbodycontent)
- [destroy](ui_ConfirmModal.ConfirmModal.md#destroy)
- [fill](ui_ConfirmModal.ConfirmModal.md#fill)
- [hide](ui_ConfirmModal.ConfirmModal.md#hide)
- [isVisible](ui_ConfirmModal.ConfirmModal.md#isvisible)
- [setBodyContent](ui_ConfirmModal.ConfirmModal.md#setbodycontent)
- [setFooterContent](ui_ConfirmModal.ConfirmModal.md#setfootercontent)
- [setHeaderContent](ui_ConfirmModal.ConfirmModal.md#setheadercontent)
- [show](ui_ConfirmModal.ConfirmModal.md#show)

## Constructors

### constructor

• **new ConfirmModal**(`drawer`, `options?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `drawer` | [`Drawer`](Drawer.Drawer.md) |
| `options` | `Partial`<`ConfirmModalOptions`\> |

#### Overrides

[Modal](ui_Modal.Modal.md).[constructor](ui_Modal.Modal.md#constructor)

#### Defined in

[src/ui/ConfirmModal.ts:25](https://github.com/fabwcie/drawer/blob/master/src/ui/ConfirmModal.ts#L25)

## Properties

### $backdrop

• **$backdrop**: `HTMLDivElement`

#### Inherited from

[Modal](ui_Modal.Modal.md).[$backdrop](ui_Modal.Modal.md#$backdrop)

#### Defined in

[src/ui/Modal.ts:22](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L22)

___

### $cancelBtn

• **$cancelBtn**: `HTMLButtonElement`

#### Defined in

[src/ui/ConfirmModal.ts:16](https://github.com/fabwcie/drawer/blob/master/src/ui/ConfirmModal.ts#L16)

___

### $confirmBtn

• **$confirmBtn**: `HTMLButtonElement`

#### Defined in

[src/ui/ConfirmModal.ts:17](https://github.com/fabwcie/drawer/blob/master/src/ui/ConfirmModal.ts#L17)

___

### $modal

• **$modal**: `HTMLDivElement`

#### Inherited from

[Modal](ui_Modal.Modal.md).[$modal](ui_Modal.Modal.md#$modal)

#### Defined in

[src/ui/Modal.ts:16](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L16)

___

### $modalBody

• **$modalBody**: `HTMLDivElement`

#### Inherited from

[Modal](ui_Modal.Modal.md).[$modalBody](ui_Modal.Modal.md#$modalbody)

#### Defined in

[src/ui/Modal.ts:18](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L18)

___

### $modalFooter

• **$modalFooter**: `HTMLDivElement`

#### Inherited from

[Modal](ui_Modal.Modal.md).[$modalFooter](ui_Modal.Modal.md#$modalfooter)

#### Defined in

[src/ui/Modal.ts:19](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L19)

___

### $modalHeader

• **$modalHeader**: `HTMLDivElement`

#### Inherited from

[Modal](ui_Modal.Modal.md).[$modalHeader](ui_Modal.Modal.md#$modalheader)

#### Defined in

[src/ui/Modal.ts:17](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L17)

___

### \_options

• **\_options**: `ConfirmModalOptions`

#### Defined in

[src/ui/ConfirmModal.ts:23](https://github.com/fabwcie/drawer/blob/master/src/ui/ConfirmModal.ts#L23)

___

### cancelLabel

• **cancelLabel**: `string`

#### Defined in

[src/ui/ConfirmModal.ts:19](https://github.com/fabwcie/drawer/blob/master/src/ui/ConfirmModal.ts#L19)

___

### confirmLabel

• **confirmLabel**: `string`

#### Defined in

[src/ui/ConfirmModal.ts:21](https://github.com/fabwcie/drawer/blob/master/src/ui/ConfirmModal.ts#L21)

___

### drawer

• **drawer**: [`Drawer`](Drawer.Drawer.md)

#### Overrides

[Modal](ui_Modal.Modal.md).[drawer](ui_Modal.Modal.md#drawer)

#### Defined in

[src/ui/ConfirmModal.ts:15](https://github.com/fabwcie/drawer/blob/master/src/ui/ConfirmModal.ts#L15)

___

### message

• **message**: `string`

#### Defined in

[src/ui/ConfirmModal.ts:18](https://github.com/fabwcie/drawer/blob/master/src/ui/ConfirmModal.ts#L18)

___

### onCancel

• **onCancel**: (`modal`: [`ConfirmModal`](ui_ConfirmModal.ConfirmModal.md)) => `void`

#### Type declaration

▸ (`modal`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `modal` | [`ConfirmModal`](ui_ConfirmModal.ConfirmModal.md) |

##### Returns

`void`

#### Defined in

[src/ui/ConfirmModal.ts:20](https://github.com/fabwcie/drawer/blob/master/src/ui/ConfirmModal.ts#L20)

___

### onConfirm

• **onConfirm**: (`modal`: [`ConfirmModal`](ui_ConfirmModal.ConfirmModal.md)) => `void`

#### Type declaration

▸ (`modal`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `modal` | [`ConfirmModal`](ui_ConfirmModal.ConfirmModal.md) |

##### Returns

`void`

#### Defined in

[src/ui/ConfirmModal.ts:22](https://github.com/fabwcie/drawer/blob/master/src/ui/ConfirmModal.ts#L22)

___

### options

• **options**: [`ModalOptions`](../interfaces/types.ModalOptions.md)

#### Inherited from

[Modal](ui_Modal.Modal.md).[options](ui_Modal.Modal.md#options)

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

#### Inherited from

[Modal](ui_Modal.Modal.md).[appendBodyContent](ui_Modal.Modal.md#appendbodycontent)

#### Defined in

[src/ui/Modal.ts:115](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L115)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

[Modal](ui_Modal.Modal.md).[destroy](ui_Modal.Modal.md#destroy)

#### Defined in

[src/ui/Modal.ts:141](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L141)

___

### fill

▸ **fill**(): `void`

#### Returns

`void`

#### Defined in

[src/ui/ConfirmModal.ts:42](https://github.com/fabwcie/drawer/blob/master/src/ui/ConfirmModal.ts#L42)

___

### hide

▸ **hide**(): `void`

#### Returns

`void`

#### Inherited from

[Modal](ui_Modal.Modal.md).[hide](ui_Modal.Modal.md#hide)

#### Defined in

[src/ui/Modal.ts:130](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L130)

___

### isVisible

▸ **isVisible**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[Modal](ui_Modal.Modal.md).[isVisible](ui_Modal.Modal.md#isvisible)

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

#### Inherited from

[Modal](ui_Modal.Modal.md).[setBodyContent](ui_Modal.Modal.md#setbodycontent)

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

#### Inherited from

[Modal](ui_Modal.Modal.md).[setFooterContent](ui_Modal.Modal.md#setfootercontent)

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

#### Inherited from

[Modal](ui_Modal.Modal.md).[setHeaderContent](ui_Modal.Modal.md#setheadercontent)

#### Defined in

[src/ui/Modal.ts:105](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L105)

___

### show

▸ **show**(): `void`

#### Returns

`void`

#### Inherited from

[Modal](ui_Modal.Modal.md).[show](ui_Modal.Modal.md#show)

#### Defined in

[src/ui/Modal.ts:123](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L123)
