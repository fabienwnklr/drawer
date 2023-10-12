# Events

In the usage documentation, a few callbacks are listed that allow you to listen to specific events. Callbacks aren't always ideal, though, specifically when you wish to have multiple handlers.

:::warning
Be carefull, onlyy `drawer.init` event is dispatched to source element, anyone else are dispatched to `<canvas>` element
:::

__Exemple of init event :__

```js
const $element = document.getElementById('canvas-container');

$element.addEventListener('drawer.init', (event) => {
    console.log(event.details.drawer)
    //....
});

const drawer = new Drawer(/*...options*/);

// console.log appear after init
```

__Basic event :__

```js
const $element = document.getElementById('canvas-container');

const drawer = new Drawer(/*...options*/);
drawer.$canvas.addEventListener('drawer.change', (event) => {
    console.log(event.details.drawer)
    //....
});


// console.log appear after any change in drawer
```

| Event                       | Params                                | Description                                                            |
| --------------------------- | ------------------------------------- | ---------------------------------------------------------------------- |
| drawer.init                 | drawer                                | Invoked when drawer initied                                            |
| drawer.change               | drawer                                | Invoked when canvas content change                                     |
| drawer.update.size          | { setSize: { w: number, h: number } } | Invoked when `setSize` api method called                               |
| drawer.update.color         | { color: string }                     | Invoked when `setColor` api method called (or changed color via input) |
| drawer.update.bgColor       | { bgColor: string }                   | Invoked when `setBgColor` api method called                            |
| drawer.update.tool          | { toolName: string }                  | Invoked when `setTool` api method called (or changed via toolbar)      |
| drawer.update.shape         | { shape: keyof typeof DrawTools }     | Invoked when `setShape` api method called (or changed via toolbar)     |
| drawer.update.dotted        | { dooted: boolean, dash: number[] }   | Invoked when `setDottedLine` api method called                         |
| drawer.update.lineThickness | { lineThickness: number }             | Invoked when `setLineWidth` api method called (or changed via input)   |
