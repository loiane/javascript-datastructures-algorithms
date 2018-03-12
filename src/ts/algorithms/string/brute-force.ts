const stringSearch = (text: string, pattern: string) => {
  const n = text.length;
  const m = pattern.length;

  if (m > n) {
    return -1;
  }

  for (let i = 0; i < n; i++) {
    let j = 0;
    for (j = 0; j < m && (i + j) < n; j++) {
      if (text.charAt(i + j) !== pattern.charAt(j)) {
        break;
      }
    }
    if (j === m) {
      return i;
    }
  }

  return -1;
};
