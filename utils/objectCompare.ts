export function objectCompare(_obj1: any, _obj2: any): boolean {
  const obj1 = { ..._obj1 };
  const obj2 = { ..._obj2 };
  // strip keys with undefined values, empty strings, null, or empty arrays
  for (const key in obj1) {
    if (obj1[key] === undefined || obj1[key] === null || obj1[key] === "" || (Array.isArray(obj1[key]) && obj1[key].length === 0)) {
      delete obj1[key];
    }
  }
  for (const key in obj2) {
    if (obj2[key] === undefined || obj2[key] === null || obj2[key] === "" || (Array.isArray(obj2[key]) && obj2[key].length === 0)) {
      delete obj2[key];
    }
  }
  // Check if both objects are of the same type
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  // Check if both objects have the same number of properties
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  // Iterate over each property in obj1
  for (let key in obj1) {
    // Check if the property exists in obj2
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }

    // Recursively compare nested objects
    if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      if (!objectCompare(obj1[key], obj2[key])) {
        return false;
      }
    } else {
      // Compare primitive values
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }

  return true;
}
