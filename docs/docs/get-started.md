---
title: Get started
---

# Drawer

## Dependencies

- [Coloris](https://github.com/mdbassit/Coloris) for color input better managing

## Get started

### install

```bash
npm i @fabwcie/drawer
```

### usage

:::warning

You don't need to create `<canvas>` html element, `Drawer` instance do it for you when you call `new Drawer(...)`.

so you'r html look like this :

```html
<div id="drawer-container"></div>
```
:::

#### Using module

```js
import { Drawer } from '@fabwcie/drawer';

const $el = document.getElementById('drawer-container');
const drawer = new Drawer($el, {
  /** optional options */
});
```

#### Using iife

first import file

```html
<script src="path/to/drawer.iife.js"></script>
```

then init drawer

```js
const $el = document.getElementById('drawer-container');
const drawer = new Drawer($el, {
  /** optional options */
});
```

### Get Drawer instance of canvas

Drawer instance stored into $canvas object directly, for example:

```js
const $canvas = document.getElementById('canvas');
const drawer = $canvas.drawer;

drawer.changeTool('eraser');
// ...
```

### Available options

default options

```js
{
  id: Date.now().toString(), // id for drawer
  defaultToolbar: true, // add toolbar with default boutons
  width: 400, // width of canvas container
  height: 400, // height of canvas container
  canvasWidth: window.innerWidth * 1.5, // canvas width
  canvasHeight: window.innerHeight * 1.5, // canvas height
  localStorageKey: 'draw', // local storage key for save
  autoSave: true, // save on change in localStorage
  toolbarPosition: 'outerTop', // can be 'outerTop', 'outerEnd', 'outerBottom', 'outerStart', 'innerTop', 'innerEnd', 'innerBottom', 'innerStart'
  bgColor: '#fff', // can be format hex, rgba, rgba, hlsa
  color: '#000', // can be format hex, rgba, rgba, hlsa
  lineThickness: 3, // Line thickness
  dotted: false, // active line dotted
  dash: [10, 5], // if dotted true
  cap: 'round', // "butt" | "round" | "square"
  fill: true, // fill draw
  availableColor: [], // for input color
  availableColorOnly: false, // show color only into colorpicker popover
  grid: false, // show css grid for draw helping
  guides: false, // show guide when drawing
  opacity: 1, // global opacity of draw
  xor: false, // active xor
  tool: 'brush', // default tool on init
  eraserThickness: 15, // eraser width
  minEraserThickness: 15, // min eraser width
};
```
