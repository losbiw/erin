import { enumKeys, getEnumKeyByValue } from '../enum';

enum HelloWorld{
    Hello = 'hello',
    World = 'world'
}

enum TestEnum{
    Another = 'another',
    Test = 'test',
    Enum = 'enum'
}

const helloWorldCases = [
  [HelloWorld.Hello, 'Hello'],
  [HelloWorld.World, 'World'],
];

const testEnumCases = [
  [TestEnum.Another, 'Another'],
  [TestEnum.Test, 'Test'],
  [TestEnum.Enum, 'Enum'],
];

describe('.enumKeys util', () => {
  test('given HelloWorld enum returns its keys', () => {
    const result = enumKeys(HelloWorld);
    expect(result).toEqual(['Hello', 'World']);
  });

  test('given AnotherTestEnum enum returns its keys', () => {
    const result = enumKeys(TestEnum);
    expect(result).toEqual(['Another', 'Test', 'Enum']);
  });
});

describe('.getEnumKeyByValue', () => {
  test.each(helloWorldCases)(
    'given HelloWorld enum and %p value, returns its %p key',
    (value, key) => {
      const result = getEnumKeyByValue(HelloWorld, value);
      expect(result).toBe(key);
    },
  );

  test.each(testEnumCases)(
    'given TestEnum enum and %p value, returns its %p key',
    (value, key) => {
      const result = getEnumKeyByValue(TestEnum, value);
      expect(result).toBe(key);
    },
  );
});
