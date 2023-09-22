import { test, expect, describe } from 'vitest';
import { stringToHTMLElement } from "../src/utils/dom";
import { DrawerError } from '../src/utils/DrawError';
import { isTactil } from '../src/utils/infos';

describe("utilities", () => {
  test("Convert string to HTML element", () => {
    expect(stringToHTMLElement("<div></div>")).toBeInstanceOf(HTMLDivElement);
    expect(stringToHTMLElement("<canvas></canvas>")).toBeInstanceOf(HTMLCanvasElement);
    expect(stringToHTMLElement("<span></span>")).toBeInstanceOf(HTMLSpanElement);
  });

  test("throw drawer error", () => {
    expect(new DrawerError("test").message).eq("test");
    expect(new DrawerError("test").name).eq("DrawerError");
  });

  test("isTactil", () => {
    expect(isTactil()).toBeTypeOf('boolean');
  })
});
