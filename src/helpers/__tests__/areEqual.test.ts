import areEqual from '../areEqual';

describe('areEqual.arrays util', () => {
  test('given equal arrays should return true', () => {
    const original = [1, 2, 'hello', undefined];
    const copy = [...original];

    const result = areEqual.arrays(original, copy);

    expect(result).toBeTruthy();
  });

  test('given same arrays reference should return true', () => {
    const ref = [1, 2, 'hello', undefined];
    const result = areEqual.arrays(ref, ref);

    expect(result).toBeTruthy();
  });

  test('given different arrays should return false', () => {
    const first = [1, 2, 'hello', undefined];
    const second = [3, 4, 'something'];

    const result = areEqual.arrays(first, second);

    expect(result).toBeFalsy();
  });
});
