[@fabwcie/drawer](../README.md) / [Exports](../modules.md) / [types](../modules/types.md) / DrawerOptions

# Interface: DrawerOptions

[types](../modules/types.md).DrawerOptions

## Table of contents

### Properties

- [autoSave](types.DrawerOptions.md#autosave)
- [availableColor](types.DrawerOptions.md#availablecolor)
- [availableColorOnly](types.DrawerOptions.md#availablecoloronly)
- [bgColor](types.DrawerOptions.md#bgcolor)
- [canvasHeight](types.DrawerOptions.md#canvasheight)
- [canvasWidth](types.DrawerOptions.md#canvaswidth)
- [cap](types.DrawerOptions.md#cap)
- [color](types.DrawerOptions.md#color)
- [dash](types.DrawerOptions.md#dash)
- [defaultToolbar](types.DrawerOptions.md#defaulttoolbar)
- [dotted](types.DrawerOptions.md#dotted)
- [eraserThickness](types.DrawerOptions.md#eraserthickness)
- [fill](types.DrawerOptions.md#fill)
- [grid](types.DrawerOptions.md#grid)
- [guides](types.DrawerOptions.md#guides)
- [height](types.DrawerOptions.md#height)
- [id](types.DrawerOptions.md#id)
- [lineThickness](types.DrawerOptions.md#linethickness)
- [localStorageKey](types.DrawerOptions.md#localstoragekey)
- [minEraserThickness](types.DrawerOptions.md#mineraserthickness)
- [opacity](types.DrawerOptions.md#opacity)
- [tool](types.DrawerOptions.md#tool)
- [toolbarPosition](types.DrawerOptions.md#toolbarposition)
- [width](types.DrawerOptions.md#width)
- [xor](types.DrawerOptions.md#xor)

## Properties

### autoSave

• **autoSave**: `boolean`

#### Defined in

[src/types/index.ts:12](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L12)

___

### availableColor

• **availableColor**: `string`[]

#### Defined in

[src/types/index.ts:24](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L24)

___

### availableColorOnly

• **availableColorOnly**: `boolean`

#### Defined in

[src/types/index.ts:25](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L25)

___

### bgColor

• **bgColor**: `string`

#### Defined in

[src/types/index.ts:15](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L15)

___

### canvasHeight

• **canvasHeight**: `number`

#### Defined in

[src/types/index.ts:7](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L7)

___

### canvasWidth

• **canvasWidth**: `number`

#### Defined in

[src/types/index.ts:6](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L6)

___

### cap

• **cap**: `CanvasLineCap`

#### Defined in

[src/types/index.ts:22](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L22)

___

### color

• **color**: `string`

#### Defined in

[src/types/index.ts:14](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L14)

___

### dash

• **dash**: `number`[]

#### Defined in

[src/types/index.ts:11](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L11)

___

### defaultToolbar

• **defaultToolbar**: `boolean`

#### Defined in

[src/types/index.ts:3](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L3)

___

### dotted

• **dotted**: `boolean`

#### Defined in

[src/types/index.ts:10](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L10)

___

### eraserThickness

• **eraserThickness**: `number`

**`Note`**

up to 15, is dynamically calculate options.lineTickness * 2

#### Defined in

[src/types/index.ts:20](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L20)

___

### fill

• **fill**: `boolean`

#### Defined in

[src/types/index.ts:23](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L23)

___

### grid

• **grid**: `boolean`

#### Defined in

[src/types/index.ts:26](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L26)

___

### guides

• **guides**: `boolean`

#### Defined in

[src/types/index.ts:27](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L27)

___

### height

• **height**: `number`

#### Defined in

[src/types/index.ts:4](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L4)

___

### id

• **id**: `string`

#### Defined in

[src/types/index.ts:2](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L2)

___

### lineThickness

• **lineThickness**: `number`

#### Defined in

[src/types/index.ts:16](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L16)

___

### localStorageKey

• **localStorageKey**: `string`

#### Defined in

[src/types/index.ts:8](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L8)

___

### minEraserThickness

• **minEraserThickness**: `number`

#### Defined in

[src/types/index.ts:21](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L21)

___

### opacity

• **opacity**: `number`

#### Defined in

[src/types/index.ts:28](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L28)

___

### tool

• **tool**: ``"brush"`` \| ``"eraser"`` \| ``"text"`` \| ``"rect"`` \| ``"circle"`` \| ``"ellipse"`` \| ``"square"`` \| ``"arrow"`` \| ``"line"`` \| ``"star"`` \| ``"triangle"`` \| ``"polygon"``

#### Defined in

[src/types/index.ts:9](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L9)

___

### toolbarPosition

• **toolbarPosition**: ``"outerTop"`` \| ``"outerEnd"`` \| ``"outerBottom"`` \| ``"outerStart"`` \| ``"innerTop"`` \| ``"innerEnd"`` \| ``"innerBottom"`` \| ``"innerStart"``

#### Defined in

[src/types/index.ts:13](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L13)

___

### width

• **width**: `number`

#### Defined in

[src/types/index.ts:5](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L5)

___

### xor

• **xor**: `boolean`

#### Defined in

[src/types/index.ts:29](https://github.com/fabwcie/drawer/blob/master/src/types/index.ts#L29)
