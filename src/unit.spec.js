/* global describe, it, expect, jest */
import Unit from './unit';
import * as index from './index';

const { Duration, duration: { hours, milliseconds } } = index;

describe('Unit', () => {
  describe('constructor', () => {
    it(`allows specifying a simple multiplier`, () => {
      expect(() => new Unit(2)).not.toThrowError();
      expect(1::(new Unit(2))).toMatchSnapshot();
      expect(15::(new Unit(2))).toMatchSnapshot();
    });

    it(`allows overriding \`convertToBase\` and \`convertFromBase\``, () => {
      const overrides = {
        convertToBase: jest.fn(),
        convertFromBase: jest.fn()
      };

      expect(() => new Unit(overrides.convertToBase, overrides.convertFromBase)).not.toThrowError();
      expect((new Unit(overrides.convertToBase, overrides.convertFromBase)).convertToBase).toBe(overrides.convertToBase);
      expect((new Unit(overrides.convertToBase, overrides.convertFromBase)).convertFromBase).toBe(overrides.convertFromBase);
    });

    it(`throws if supplied an invalid argument`, () => {
      expect(() => new Unit([])).toThrowErrorMatchingSnapshot();
      expect(() => new Unit(() => 'hi')).toThrowErrorMatchingSnapshot();
      expect(() => new Unit({})).toThrowErrorMatchingSnapshot();
    });
  });

  describe('in', () => {
    it('accepts a custom unit of the same type', () => {
      const myCustomDuration = new Duration(123);
      expect(() => 2::hours.in(myCustomDuration)).not.toThrow();
      expect(2::hours.in(myCustomDuration)).toMatchSnapshot();
      expect(() => 2::myCustomDuration.in(hours)).not.toThrow();
      expect(2::myCustomDuration.in(hours)).toMatchSnapshot();
    });

    it('accepts another unit of the same type', () => {
      expect(() => 2::hours.in(milliseconds)).not.toThrow();
      expect(2::hours.in(milliseconds)).toMatchSnapshot();
    });

    it('throws if used on a type other than a number', () => {
      expect(() => ({})::hours.in(milliseconds)).toThrowErrorMatchingSnapshot();
      expect(() => 'abc'::hours.in(milliseconds)).toThrowErrorMatchingSnapshot();
      expect(() => (() => 'hi')::hours.in(milliseconds)).toThrowErrorMatchingSnapshot();
    });

    it('throws if given a non-matching unit type', () => {
      const myWeirdUnit = new Unit(123);
      expect(() => 2::hours.in(myWeirdUnit)).toThrowErrorMatchingSnapshot();
    });
  });
});
