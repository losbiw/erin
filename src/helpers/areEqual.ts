/* eslint-disable no-restricted-syntax */
const arrays = (arr1: any[], arr2: any[]): boolean => { // change types
  if (arr1.length !== arr2.length) {
    return false;
  }

  const longer = arr1.length > arr2.length ? arr1 : arr2;
  const shorter = arr1.length < arr2.length ? arr1 : arr2;

  for (const value of longer) {
    const valueExists = shorter.some((el) => el === value);
    if (!valueExists) return false;
  }

  return true;
};

const objects = (obj1: any, obj2: any): boolean => { // change types
  const firstKeys = Object.keys(obj1);
  const secondKeys = Object.keys(obj2);

  if (firstKeys.length !== secondKeys.length) {
    return false;
  }

  for (const key in obj1) {
    if (Object.prototype.hasOwnProperty.call(obj1, key)) {
      const current = obj1[key];

      if (Array.isArray(current) && !arrays(current, obj2[key])) {
        return false;
      }
      if (typeof current === 'object' && !objects(current, obj2[key])) {
        return false;
      }
      if (current !== obj2[key] && typeof current !== 'object' && !Array.isArray(current)) {
        return false;
      }
    }
  }

  return true;
};

export default { objects, arrays };
