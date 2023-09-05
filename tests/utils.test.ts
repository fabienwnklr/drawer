import { test, expect, describe } from 'vitest';
import { stringToHTMLElement } from "../src/utils/dom";

describe("stringToHTMLElement", () => {
  test("Convert string to HTML element", () => {
    expect(stringToHTMLElement("<div></div>")).toBeInstanceOf(HTMLDivElement);
    expect(stringToHTMLElement("<canvas></canvas>")).toBeInstanceOf(HTMLCanvasElement);
    expect(stringToHTMLElement("<span></span>")).toBeInstanceOf(HTMLSpanElement);
  });
});
