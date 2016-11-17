/* global describe, it, expect */
import * as durations from './duration';

const DURATION_NAMES = Object.keys(durations)
  .filter((durationType) => durationType !== 'default')
  .sort();

// TODO: describe('Duration', () => {});

describe('durations', () => {
  it('are exported as expected', () => {
    expect(DURATION_NAMES).toMatchSnapshot();
  });

  DURATION_NAMES.forEach((durationType) => {
    describe(`\`${durationType}\``, () => {
      it('has the correct multiplier', () => {
        expect(durations[durationType].multiplier).toBeGreaterThan(0);
        expect(durations[durationType].multiplier).toMatchSnapshot();
      });

      it('exposes an `in` function', () => {
        expect(durations[durationType].in).toBeInstanceOf(Function);
      });

      it('exposes a custom `bind` function', () => {
        expect(durations[durationType].bind).toBeInstanceOf(Function);
        expect(durations[durationType].bind).not.toBe(Function.prototype.bind);
      });

      it('converts to an implicit quantity when simply bound', () => {
        expect(1::durations[durationType]).toBeGreaterThan(0);
        expect(1::durations[durationType]).toMatchSnapshot();
      });

      DURATION_NAMES.forEach((durationTypeTo) => {
        it(`converts correctly into \`${durationTypeTo}\``, () => {
          expect(1::durations[durationType].in(durations[durationTypeTo])).toMatchSnapshot();
        });
      });
    });
  });
});
