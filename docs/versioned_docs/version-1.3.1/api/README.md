@fabwcie/drawer / [Exports](modules.md)

# Drawer

> [!TIP]
> **Watch docs and demo [here](https://drawer.fabienwinkler.fr)**

## Dependencies

- [Coloris](https://github.com/mdbassit/Coloris) for color input better managing

## Get started

### install

```bash
npm i @fabwcie/drawer
```

### usage

#### Using module

```js
import { Drawer } from "@fabwcie/drawer";

const $el = document.getElementById("myElement");
const drawer = new Drawer($el, { /** optional options */});
```

#### Using iife

first import file

```html
<script src="path/to/drawer.iife.js"></script>
```

then init drawer

```js
const $el = document.getElementById("myElement");
const drawer = new Drawer($el, { /** optional options */});
```

### Get Drawer instance of canvas

Drawer instance stored into $canvas object directly, for example:

```js
const $canvas = document.getElementById('canvas');
const drawer = $canvas.drawer;

drawer.setTool('eraser');
// ...
```

### Available options

default options

```js
{
  id: Date.now().toString(), // id for drawer
  defaultToolbar: true, // add default sidebar bouton
  width: 400, // width
  height: 400, // height
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
  availableColor: undefined, // for input color
  availableColorOnly: false, // show color only into colorpicker popover
  grid: false, // show css grid for draw helping
  guides: false, // show guide when drawing
  opacity: 1, // global opacity of draw
  xor: false, // active xor
};
```
