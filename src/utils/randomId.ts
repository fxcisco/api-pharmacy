export const randomId = (size: number = 24) => {
  return new Array(Math.ceil(size * 0.1))
    .fill(Math.random()
    .toString(16)
    .substr(2, 10))
    .join('')
    .substr(0, size);
};
