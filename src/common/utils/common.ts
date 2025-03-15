export const generateNewId = <T extends Record<K, number>, K extends keyof T>(
  items: T[],
  idKey: K,
) => {
  if (items.length === 0) return 1;
  let maxId = items[0][idKey];
  items.forEach((item) => {
    if (item[idKey] >= maxId) maxId = item[idKey];
  });
  return maxId + 1;
};
