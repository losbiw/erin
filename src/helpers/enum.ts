const enumKeys = <O extends object, K extends keyof O = keyof O>(obj: O): K[] => {
  const keys = Object.keys(obj);
  return keys.filter((k) => Number.isNaN(+k)) as K[];
};

export default enumKeys;
