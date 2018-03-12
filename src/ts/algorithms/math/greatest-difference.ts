export const greatestDifference = (numbers: number[]) => {
  let index = 0;
  let largest = numbers[0];
  const length = numbers.length;
  let number;
  let smallest = numbers[0];

  for (index; index < length; index++) {
    number = numbers[index];

    if (number > largest) {
      largest = number;
    }
    if (number < smallest) {
      smallest = number;
    }
  }

  return largest - smallest;
};
