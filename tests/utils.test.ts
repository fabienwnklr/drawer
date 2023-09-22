import { test, expect, describe } from 'vitest';
import { stringToHTMLElement } from '../src/utils/dom';
import { DrawerError } from '../src/utils/DrawError';
import { isTactil } from '../src/utils/infos';
import { hexToRgbA } from '../src/utils/utils';

describe('utilities', () => {
  test('Convert string to HTML element', () => {
    expect(stringToHTMLElement('<div></div>')).toBeInstanceOf(HTMLDivElement);
    expect(stringToHTMLElement('<canvas></canvas>')).toBeInstanceOf(HTMLCanvasElement);
    expect(stringToHTMLElement('<span></span>')).toBeInstanceOf(HTMLSpanElement);
  });

  test('throw drawer error', () => {
    expect(new DrawerError('test').message).eq('test');
    expect(new DrawerError('test').name).eq('DrawerError');
  });

  test('isTactil', () => {
    expect(isTactil()).toBeTypeOf('boolean');
  });

  test('accepts a hex value of 6 numbers and returns a rgba color string', () => {
    expect(hexToRgbA('#F3F3F3')).toBe('rgba(243,243,243,1)');
  });

  test('accepts a hex value of 6 numbers with opacity of 1 and returns same color string', () => {
    expect(hexToRgbA('#000', 1)).toBe(hexToRgbA('#000'));
  });

  test('accepts a hex value of 6 numbers with opacity and returns a rgba color string', () => {
    expect(hexToRgbA('#000', 0.5)).toBe('rgba(0,0,0,0.5)');
  });

  test('accepts a hex value of 3 numbers and returns a rgba color string', () => {
    expect(hexToRgbA('#aaa')).toBe('rgba(170,170,170,1)');
  });

  test('accepts a hex value of 3 numbers with opacity and returns a rgba color string', () => {
    expect(hexToRgbA('#aaa', 0.5)).toBe('rgba(170,170,170,0.5)');
  });

  test('accepts a hex value of 3 numbers with opacity of 1 and returns same color string', () => {
    expect(hexToRgbA('#aaa', 1)).toBe(hexToRgbA('#aaa', 1));
  });
});
