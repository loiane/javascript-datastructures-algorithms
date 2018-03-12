export const sieveOfEratosthenes = (n: number) => {

  const prime: boolean[] = [];

  for (let i = 0; i < n; i++) {
    prime[i] = true;
  }

  for (let p = 2; p * p <= n; p++) {
    if (prime[p]) {
      for (let i = p * 2; i <= n; i += p) {
        prime[i] = false;
      }
    }
  }

  return prime.filter(num => num === true);
};
