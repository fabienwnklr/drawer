[@fabwcie/drawer](../README.md) / [Exports](../modules.md) / [utils/DrawError](../modules/utils_DrawError.md) / DrawerError

# Class: DrawerError

[utils/DrawError](../modules/utils_DrawError.md).DrawerError

## Hierarchy

- `Error`

  ↳ **`DrawerError`**

## Table of contents

### Constructors

- [constructor](utils_DrawError.DrawerError.md#constructor)

### Properties

- [cause](utils_DrawError.DrawerError.md#cause)
- [message](utils_DrawError.DrawerError.md#message)
- [name](utils_DrawError.DrawerError.md#name)
- [stack](utils_DrawError.DrawerError.md#stack)
- [prepareStackTrace](utils_DrawError.DrawerError.md#preparestacktrace)
- [stackTraceLimit](utils_DrawError.DrawerError.md#stacktracelimit)

### Methods

- [captureStackTrace](utils_DrawError.DrawerError.md#capturestacktrace)

## Constructors

### constructor

• **new DrawerError**(`msg`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `msg` | `string` |

#### Overrides

Error.constructor

#### Defined in

[src/utils/DrawError.ts:2](https://github.com/fabwcie/drawer/blob/850d9ed/src/utils/DrawError.ts#L2)

## Properties

### cause

• `Optional` **cause**: `unknown`

#### Inherited from

Error.cause

#### Defined in

node_modules/typescript/lib/lib.es2022.error.d.ts:24

___

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1068

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1067

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1069

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/globals.d.ts:4
