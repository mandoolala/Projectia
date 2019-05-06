export function createArrayWithNum(len, n) {
  return [...Array(len)].map(() => n);
}