export const moveElementInArray = (arr: any, index: number, step: 1 | -1) => {
  if (index < 0 || index >= arr.length) {
    return arr;
  }

  const newIndex = index + step;

  if (newIndex < 0 || newIndex >= arr.length) {
    return arr;
  }

  const element = arr[index];

  arr.splice(index, 1);

  arr.splice(newIndex, 0, element);

  return arr;
};
