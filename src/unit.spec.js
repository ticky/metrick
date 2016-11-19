/* global describe, it, expect */
import Unit from './unit';
import * as index from './index';

const { Duration, duration: { hours, milliseconds } } = index;

describe('Unit', () => {
  it('uses a default multiplier of 1', () => {
    expect(new Unit().multiplier).toBe(1);
  });

  describe('in', () => {
    it('accepts a custom unit of the same type', () => {
      const myCustomDuration = new Duration(123);
      expect(() => 2::hours.in(myCustomDuration)).not.toThrow();
      expect(2::hours.in(myCustomDuration)).toMatchSnapshot();
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
