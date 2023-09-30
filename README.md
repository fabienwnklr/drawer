# Drawer

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
### Available options
