export const isPrime = (n: number) => {
  if (n <= 1) {
    return false;
  }

  const sqrt = Math.floor(Math.sqrt(n));
  for (let i = 2; i <= sqrt; i++) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
};

export const testPrime = (n: number) => {
  if (n <= 1) {
    return false;
  } else {
    if (n === 2 || n === 3) {
      return true;
    } else if (n % 2 === 0) {
      return false;
    } else {
      const sqrt = Math.floor(Math.sqrt(n));
      for (let i = 3; i <= sqrt; i += 2) {
        if (n % i === 0) {
          return false;
        }
      }
    }
  }
  return true;
};

// tslint:disable-next-line:max-line-length
export const isPrime2 = (n: number) => (n >= 2) ? (![...Array(n).keys()].slice(2).map(i => !(n % i)).includes(true) && ![0, 1].includes(n)) : false;
