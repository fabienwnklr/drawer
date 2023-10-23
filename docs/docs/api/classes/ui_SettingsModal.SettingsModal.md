[@fabwcie/drawer](../README.md) / [Exports](../modules.md) / [ui/SettingsModal](../modules/ui_SettingsModal.md) / SettingsModal

# Class: SettingsModal

[ui/SettingsModal](../modules/ui_SettingsModal.md).SettingsModal

## Hierarchy

- [`Modal`](ui_Modal.Modal.md)

  ↳ **`SettingsModal`**

## Table of contents

### Constructors

- [constructor](ui_SettingsModal.SettingsModal.md#constructor)

### Properties

- [$backdrop](ui_SettingsModal.SettingsModal.md#$backdrop)
- [$bgCologSettingInput](ui_SettingsModal.SettingsModal.md#$bgcologsettinginput)
- [$fillSettingInput](ui_SettingsModal.SettingsModal.md#$fillsettinginput)
- [$gridSettingInput](ui_SettingsModal.SettingsModal.md#$gridsettinginput)
- [$guidesSettingInput](ui_SettingsModal.SettingsModal.md#$guidessettinginput)
- [$modal](ui_SettingsModal.SettingsModal.md#$modal)
- [$modalBody](ui_SettingsModal.SettingsModal.md#$modalbody)
- [$modalFooter](ui_SettingsModal.SettingsModal.md#$modalfooter)
- [$modalHeader](ui_SettingsModal.SettingsModal.md#$modalheader)
- [$opacitySettingInput](ui_SettingsModal.SettingsModal.md#$opacitysettinginput)
- [$xorSettingInput](ui_SettingsModal.SettingsModal.md#$xorsettinginput)
- [bgColor](ui_SettingsModal.SettingsModal.md#bgcolor)
- [drawer](ui_SettingsModal.SettingsModal.md#drawer)
- [filled](ui_SettingsModal.SettingsModal.md#filled)
- [grid](ui_SettingsModal.SettingsModal.md#grid)
- [guides](ui_SettingsModal.SettingsModal.md#guides)
- [opacity](ui_SettingsModal.SettingsModal.md#opacity)
- [options](ui_SettingsModal.SettingsModal.md#options)
- [xor](ui_SettingsModal.SettingsModal.md#xor)

### Methods

- [appendBodyContent](ui_SettingsModal.SettingsModal.md#appendbodycontent)
- [destroy](ui_SettingsModal.SettingsModal.md#destroy)
- [fill](ui_SettingsModal.SettingsModal.md#fill)
- [hide](ui_SettingsModal.SettingsModal.md#hide)
- [isVisible](ui_SettingsModal.SettingsModal.md#isvisible)
- [setBodyContent](ui_SettingsModal.SettingsModal.md#setbodycontent)
- [setFooterContent](ui_SettingsModal.SettingsModal.md#setfootercontent)
- [setHeaderContent](ui_SettingsModal.SettingsModal.md#setheadercontent)
- [show](ui_SettingsModal.SettingsModal.md#show)

## Constructors

### constructor

• **new SettingsModal**(`drawer`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `drawer` | [`Drawer`](Drawer.Drawer.md) |

#### Overrides

[Modal](ui_Modal.Modal.md).[constructor](ui_Modal.Modal.md#constructor)

#### Defined in

[src/ui/SettingsModal.ts:22](https://github.com/fabwcie/drawer/blob/master/src/ui/SettingsModal.ts#L22)

## Properties

### $backdrop

• **$backdrop**: `HTMLDivElement`

#### Inherited from

[Modal](ui_Modal.Modal.md).[$backdrop](ui_Modal.Modal.md#$backdrop)

#### Defined in

[src/ui/Modal.ts:22](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L22)

___

### $bgCologSettingInput

• **$bgCologSettingInput**: `HTMLInputElement`

#### Defined in

[src/ui/SettingsModal.ts:20](https://github.com/fabwcie/drawer/blob/master/src/ui/SettingsModal.ts#L20)

___

### $fillSettingInput

• **$fillSettingInput**: `HTMLInputElement`

#### Defined in

[src/ui/SettingsModal.ts:15](https://github.com/fabwcie/drawer/blob/master/src/ui/SettingsModal.ts#L15)

___

### $gridSettingInput

• **$gridSettingInput**: `HTMLInputElement`

#### Defined in

[src/ui/SettingsModal.ts:16](https://github.com/fabwcie/drawer/blob/master/src/ui/SettingsModal.ts#L16)

___

### $guidesSettingInput

• **$guidesSettingInput**: `HTMLInputElement`

#### Defined in

[src/ui/SettingsModal.ts:17](https://github.com/fabwcie/drawer/blob/master/src/ui/SettingsModal.ts#L17)

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

### $opacitySettingInput

• **$opacitySettingInput**: `HTMLInputElement`

#### Defined in

[src/ui/SettingsModal.ts:18](https://github.com/fabwcie/drawer/blob/master/src/ui/SettingsModal.ts#L18)

___

### $xorSettingInput

• **$xorSettingInput**: `HTMLInputElement`

#### Defined in

[src/ui/SettingsModal.ts:19](https://github.com/fabwcie/drawer/blob/master/src/ui/SettingsModal.ts#L19)

___

### bgColor

• **bgColor**: `string`

#### Defined in

[src/ui/SettingsModal.ts:12](https://github.com/fabwcie/drawer/blob/master/src/ui/SettingsModal.ts#L12)

___

### drawer

• **drawer**: [`Drawer`](Drawer.Drawer.md)

#### Overrides

[Modal](ui_Modal.Modal.md).[drawer](ui_Modal.Modal.md#drawer)

#### Defined in

[src/ui/SettingsModal.ts:14](https://github.com/fabwcie/drawer/blob/master/src/ui/SettingsModal.ts#L14)

___

### filled

• **filled**: `boolean`

#### Defined in

[src/ui/SettingsModal.ts:7](https://github.com/fabwcie/drawer/blob/master/src/ui/SettingsModal.ts#L7)

___

### grid

• **grid**: `boolean`

#### Defined in

[src/ui/SettingsModal.ts:8](https://github.com/fabwcie/drawer/blob/master/src/ui/SettingsModal.ts#L8)

___

### guides

• **guides**: `boolean`

#### Defined in

[src/ui/SettingsModal.ts:9](https://github.com/fabwcie/drawer/blob/master/src/ui/SettingsModal.ts#L9)

___

### opacity

• **opacity**: `number`

#### Defined in

[src/ui/SettingsModal.ts:10](https://github.com/fabwcie/drawer/blob/master/src/ui/SettingsModal.ts#L10)

___

### options

• **options**: [`ModalOptions`](../interfaces/types.ModalOptions.md)

#### Inherited from

[Modal](ui_Modal.Modal.md).[options](ui_Modal.Modal.md#options)

#### Defined in

[src/ui/Modal.ts:20](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L20)

___

### xor

• **xor**: `boolean`

#### Defined in

[src/ui/SettingsModal.ts:11](https://github.com/fabwcie/drawer/blob/master/src/ui/SettingsModal.ts#L11)

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

[src/ui/Modal.ts:110](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L110)

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

[Modal](ui_Modal.Modal.md).[destroy](ui_Modal.Modal.md#destroy)

#### Defined in

[src/ui/Modal.ts:136](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L136)

___

### fill

▸ **fill**(): `void`

Fill the content modal

#### Returns

`void`

#### Defined in

[src/ui/SettingsModal.ts:39](https://github.com/fabwcie/drawer/blob/master/src/ui/SettingsModal.ts#L39)

___

### hide

▸ **hide**(): `void`

#### Returns

`void`

#### Inherited from

[Modal](ui_Modal.Modal.md).[hide](ui_Modal.Modal.md#hide)

#### Defined in

[src/ui/Modal.ts:125](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L125)

___

### isVisible

▸ **isVisible**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[Modal](ui_Modal.Modal.md).[isVisible](ui_Modal.Modal.md#isvisible)

#### Defined in

[src/ui/Modal.ts:132](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L132)

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

[src/ui/Modal.ts:106](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L106)

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

[src/ui/Modal.ts:114](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L114)

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

[src/ui/Modal.ts:100](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L100)

___

### show

▸ **show**(): `void`

#### Returns

`void`

#### Inherited from

[Modal](ui_Modal.Modal.md).[show](ui_Modal.Modal.md#show)

#### Defined in

[src/ui/Modal.ts:118](https://github.com/fabwcie/drawer/blob/master/src/ui/Modal.ts#L118)
