const enumKeys = <O extends object, K extends keyof O = keyof O>(obj: O): K[] => {
  const keys = Object.keys(obj);
  return keys.filter((k) => Number.isNaN(+k)) as K[];
};

// eslint-disable-next-line max-len
const getEnumKeyByValue = <T extends {[index:string]:string}>(myEnum:T, enumValue:string):keyof T|null => {
  const keys = Object.keys(myEnum).filter((x) => myEnum[x] === enumValue);
  return keys.length > 0 ? keys[0] : null;
};

export { enumKeys, getEnumKeyByValue };
