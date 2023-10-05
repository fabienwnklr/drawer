---
title: Use API Methods
description: api reference
displayed_sidebar: apiSidebar
---

# Use API Methods

Drawer controls can be controlled programmatically via the methods described in this section. When initializing the control, the `drawer` property is added on the original `<canvas>` element.
This property points to the underlying Drawer instance.

```javascript
// initialize the drawer
new Drawer($el);
```

```javascript
// fetch the instance
const drawer = document.getElementById('canvas').drawer;

// and call api method
drawer.setTool('eraser');
```

