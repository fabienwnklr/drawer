import { describe, expect, test, it, vi } from "vitest";
import { Drawer } from "../src/Drawer";

describe("Drawer", () => {
  document.body.innerHTML = `<div id="test"></div>`;

  it("Init single basic drawer", () => {
    const drawer = new Drawer(
      document.body.querySelector("#test") as HTMLDivElement
    );
    expect(drawer).toBeInstanceOf(Drawer);
    expect(drawer.$toolbar).toBeInstanceOf(HTMLDivElement);
    expect(
      drawer.$toolbar.querySelectorAll("button, input").length
    ).not.toEqual(0);
  });

  it("Init drawer without toolbar", () => {
    const drawer = new Drawer(
      document.body.querySelector("#test") as HTMLDivElement,
      { defaultToolbar: false }
    );
    expect(drawer.$toolbar).toBeUndefined();
  });

  it("Init drawer width custom toolbar", () => {
    const drawer = new Drawer(
      document.body.querySelector("#test") as HTMLDivElement,
      { defaultToolbar: false }
    );
    drawer.addToolbar();
    drawer.addUndoBtn();
    drawer.addRedoBtn();
    drawer.addBrushBtn();
    drawer.addEraserBtn();

    expect(drawer.$toolbar).toBeInstanceOf(HTMLDivElement);
    expect(drawer.$toolbar.querySelectorAll("button").length).toEqual(4);
  });

  it("Init drawer with custom size", () => {
    const drawer = new Drawer(
      document.body.querySelector("#test") as HTMLDivElement,
      { height: 200, width: 200 }
    );
    expect(drawer.$canvas).toBeInstanceOf(HTMLCanvasElement);
    expect(drawer.$canvas.width).toEqual(200);
    expect(drawer.$canvas.height).toEqual(200);
  });

  it("Resize canvas", () => {
    const drawer = new Drawer(
      document.body.querySelector("#test") as HTMLDivElement
    );

    drawer.setSize(500, 600);
    expect(drawer.$canvas.width).toEqual(500);
    expect(drawer.$canvas.height).toEqual(600);
    // check max-width update of toolbar
    expect(drawer.$toolbar.style.maxWidth).toEqual("500px");
  });
});
