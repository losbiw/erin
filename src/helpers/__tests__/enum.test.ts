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

describe('.enumKeys util', () => {
  test('if given HelloWorld enum returns its keys', () => {
    const result = enumKeys(HelloWorld);
    expect(result).toEqual(['Hello', 'World']);
  });

  test('if given AnotherTestEnum enum returns its keys', () => {
    const result = enumKeys(TestEnum);
    expect(result).toEqual(['Another', 'Test', 'Enum']);
  });
});

describe('.getEnumKeyByValue', () => {
  const helloWorldCases = [
    [HelloWorld.Hello, 'Hello'],
    [HelloWorld.World, 'World'],
  ];

  const testEnumCases = [
    [TestEnum.Another, 'Another'],
    [TestEnum.Test, 'Test'],
    [TestEnum.Enum, 'Enum'],
  ];

  test.each(helloWorldCases)(
    'if given HelloWorld enum and %p value, returns its %p key',
    (value, key) => {
      const result = getEnumKeyByValue(HelloWorld, value);
      expect(result).toBe(key);
    },
  );

  test.each(testEnumCases)(
    'if given TestEnum enum and %p value, returns its %p key',
    (value, key) => {
      const result = getEnumKeyByValue(TestEnum, value);
      expect(result).toBe(key);
    },
  );
});
