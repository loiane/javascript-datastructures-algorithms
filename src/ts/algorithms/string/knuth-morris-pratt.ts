const buildTable = (pattern: string) => {
  const length = pattern.length;
  const table = [];
  let position = 2;
  let cnd = 0;

  table[0] = -1;
  table[1] = 0;

  while (position < length) {
    if (pattern[position - 1] === pattern[cnd]) {
      table[position++] = ++cnd;
    } else if (cnd > 0) {
      cnd = table[cnd];
    } else {
      table[position++] = 0;
    }
  }

  return table;
};

const knuthMorrisPratt = (text: string, pattern: string) => {
  const textLength = text.length;
  const patternLength = pattern.length;
  let m = 0;
  let i = 0;
  const table = buildTable(pattern);

  while (m + i < textLength) {
    if (pattern[i] === text[m + i]) {
      if (i === patternLength - 1) {
        return m;
      }
      i++;
    } else if (table[i] >= 0) {
      i = table[i];
      m = m + i - table[i];
    } else {
      i = 0;
      m++;
    }
  }

  return textLength;
};
