export const sieveOfEratosthenes = (n: number) => {

  const sieve: boolean[] = [];
  const primes: number[] = [];

  sieve[1] = false;

  for (let i = 2; i <= n; i++) {
    sieve[i] = true;
  }

  for (let p = 2; p * p <= n; p++) {
    if (sieve[p]) {
      for (let i = p * 2; i <= n; i += p) {
        sieve[i] = false;
      }
    }
  }

  sieve.forEach((value, index) => {
    if (value) {
      primes.push(index);
    }
  }, primes);

  return primes;
};
