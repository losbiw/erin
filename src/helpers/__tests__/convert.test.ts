import capitalizeFirstLetter from '../convert';

const cases = [
  ['hello', 'Hello'],
  ['Upper', 'Upper'],
  ['any other string', 'Any other string'],
];

describe('.capitalizeFirstLetter util', () => {
  test.each(cases)(
    'given %i string returns %i',
    (input, result) => {
      expect(capitalizeFirstLetter(input)).toEqual(result);
    },
  );
});
