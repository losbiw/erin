import * as milliseconds from '../milliseconds';

describe('millisecond module', () => {
  const cases: Array<number | milliseconds.Time>[] = [
    [649000, {
      hours: 0,
      minutes: 10,
      seconds: 49,
    }],
    [9718000, {
      hours: 2,
      minutes: 41,
      seconds: 58,
    }],
  ];

  describe('milliseconds.from method', () => {
    it.each(cases)(
      'converts %i ms to time object',
      (ms, time) => {
        const result = milliseconds.from(ms as number);
        expect(result).toEqual(time);
      },
    );
  });

  describe('milliseconds.to method', () => {
    it.each(cases)(
      'converts time object to %i ms',
      (ms, time) => {
        const result = milliseconds.to(time as milliseconds.Time);
        expect(result).toBe(ms);
      },
    );
  });
});
