/* eslint-disable no-restricted-syntax */
const arrays = (arr1: any[], arr2: any[]): boolean => {
  if (arr1 === arr2) return true;
  if (arr1.length !== arr2.length) return false;

  for (const value of arr1) {
    const valueExists = arr2.some((el) => el === value);
    if (!valueExists) return false;
  }

  return true;
};

const objects = (obj1: any, obj2: any, onlyBooleanResult?: boolean): boolean | string => {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;

  const firstKeys = Object.keys(obj1);
  const secondKeys = Object.keys(obj2);

  if (firstKeys.length !== secondKeys.length) {
    return false;
  }

  for (const key in obj1) {
    if (Object.prototype.hasOwnProperty.call(obj1, key)) {
      const current = obj1[key];
      const negativeResult = onlyBooleanResult ? false : key;

      if (Array.isArray(current) && !arrays(current, obj2[key])) {
        return negativeResult;
      }
      if (typeof current === 'object' && !objects(current, obj2[key])) {
        return negativeResult;
      }
      if (current !== obj2[key] && typeof current !== 'object' && !Array.isArray(current)) {
        return negativeResult;
      }
    }
  }

  return true;
};

export default { objects, arrays };
