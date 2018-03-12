import { gcd } from './gcd';

export const lcm = (num1: number, num2: number) => {
  if (num1 === 0 || num2 === 0) {
    return 0;
  }
  num1 = Math.abs(num1);
  num2 = Math.abs(num2);
  return (num1 * num2) / gcd(num1, num2);
};

export const lcmArray = (num: number[]) => {
  let result = num[0];

  for (let i = 1; i < num.length; i++) {
    result = num[i] * result / gcd(num[i], result);
  }

  return result;
};
