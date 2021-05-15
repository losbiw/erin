import areEqual from '../areEqual';

describe('areEqual.arrays util', () => {
  test('if given equal arrays returns true', () => {
    const original = [1, 2, 'hello', undefined];
    const copy = [...original];

    const result = areEqual.arrays(original, copy);

    expect(result).toBeTruthy();
  });

  test('if given same array reference returns true', () => {
    const ref = [1, 2, 'hello', undefined];
    const result = areEqual.arrays(ref, ref);

    expect(result).toBeTruthy();
  });

  test('if given different arrays returns false', () => {
    const first = [1, 2, 'hello', undefined];
    const second = [3, 4, 'something'];

    const result = areEqual.arrays(first, second);

    expect(result).toBeFalsy();
  });
});

describe('areEqual.object util', () => {
  const obj = {
    nesting: {
      isNested: true,
    },
    array: ['hello', 'world'],
    valueOfFive: 5,
    randomString: 'Tests are quite fun to write',
  };

  test('if given same object reference returns true', () => {
    const result = areEqual.objects(obj, obj);

    expect(result).toBeTruthy();
  });

  test('if given equal objects returns true', () => {
    const copy = JSON.parse(JSON.stringify(obj));
    const result = areEqual.objects(obj, copy);

    expect(result).toBeTruthy();
  });

  test('if given different nested objects returns false', () => {
    const different = {
      nesting: {
        isNested: false, // the difference is in this line
      },
      array: ['hello', 'world'],
      valueOfFive: 5,
      randomString: 'Tests are quite fun to write',
    };

    const result = areEqual.objects(obj, different);

    expect(result).toBeFalsy();
  });

  test('if given different objects returns false', () => {
    const different = {
      valueOfFive: 5,
      array: ['hello', 'Mamma mia'],
      randomString: 'Tests are quite fun to write',
    };

    const result = areEqual.objects(obj, different);

    expect(result).toBeFalsy();
  });
});
