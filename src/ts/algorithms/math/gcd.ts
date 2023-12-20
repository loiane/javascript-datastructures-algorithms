export const gcd = (num1: number, num2: number): number => {
  if (num1 < 0 || num2 < 0) {
    return gcd(Math.abs(num1), Math.abs(num2));
  }
  if (num1 === 0) {
    return num2;
  }
  if (num2 === 0) {
    return num1;
  }
  if (num1 > num2) {
    return gcd(num1 % num2, num2);
  }
  return gcd(num1, num2 % num1);
};

export const gcdArray = (num: number[]) => {
  let result = num[0];

  for (let i = 1; i < num.length; i++) {
    result = gcd(num[i], result);
  }

  return result;
};
