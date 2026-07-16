import { describe, test, expect } from 'bun:test';
import { cx } from './index.js';

describe('cx utility', () => {
  test('returns an empty string when called with no arguments', () => {
    expect(cx()).toBe('');
  });

  test('joins string and number values', () => {
    expect(cx('foo', 'bar')).toBe('foo bar');
    expect(cx('foo', 100, 'bar')).toBe('foo 100 bar');
  });

  test('skips falsy values', () => {
    expect(cx('foo', false, 'bar', null, undefined, '', 0)).toBe('foo bar');
  });

  test('ignores direct booleans, symbols, and functions', () => {
    const sym = Symbol('test');
    const fn = () => {};
    // @ts-ignore - explicitly passing invalid types to test robustness
    expect(cx(true, false, sym, fn, 'foo')).toBe('foo');
  });

  test('processes arrays recursively', () => {
    expect(cx(['foo', 'bar'])).toBe('foo bar');
    expect(cx(['foo', ['bar', 'baz']])).toBe('foo bar baz');
    expect(cx('first', ['foo', false, 'bar'], 'last')).toBe('first foo bar last');
  });

  test('handles arrays containing objects and mixed values', () => {
    expect(cx(['foo', { bar: true, baz: false }, ['sub-item', { nested: true }]])).toBe('foo bar sub-item nested');
  });

  test('processes object keys based on truthiness', () => {
    expect(cx({ foo: true, bar: false, baz: true })).toBe('foo baz');
    expect(cx('first', { foo: true, bar: false }, 'last')).toBe('first foo last');
  });

  test('handles prototype-less objects', () => {
    const protoLess = Object.create(null);
    protoLess.classA = true;
    protoLess.classB = false;
    protoLess.classC = 1;
    expect(cx(protoLess)).toBe('classA classC');
  });

  test('handles custom toString methods', () => {
    const customObj = {
      toString() {
        return 'custom-class';
      }
    };
    expect(cx(customObj)).toBe('custom-class');
    expect(cx('foo', customObj, 'bar')).toBe('foo custom-class bar');
  });

  test('handles objects with non-function toString properties safely', () => {
    const badObj = {
      toString: 'not-a-function',
      classA: true,
      classB: false
    };
    // If toString is not a function, it should fall back to iterating properties
    expect(cx(badObj)).toBe('toString classA');
  });

  test('handles complex nested arguments', () => {
    expect(
      cx(
        'foo',
        [
          'bar',
          { baz: true, qux: false },
          [
            'sub-nested',
            { 'another-one': true }
          ]
        ],
        { final: true }
      )
    ).toBe('foo bar baz sub-nested another-one final');
  });
});
