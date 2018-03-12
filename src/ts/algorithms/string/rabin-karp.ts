const base = 997;

const hash = (word: string) => {
  let h = 0;

  for (let i = 0; i < word.length; i++) {
    h += word.charCodeAt(i) * Math.pow(base, word.length - i - 1);
  }

  return h;
};

const rabinKarp = (text: string, pattern: string) => {
  if (pattern == null || pattern.length === 0) {
    return 0;
  }

  const hashPattern = hash(pattern);
  let currentSubstring = text.substring(0, pattern.length);
  let hashCurrentSubstring;

  for (let i = pattern.length; i <= text.length; i++) {
    if (hashCurrentSubstring === undefined) {
      hashCurrentSubstring = hash(currentSubstring);
    } else {
      hashCurrentSubstring -= currentSubstring.charCodeAt(0) * Math.pow(base, pattern.length - 1);
      hashCurrentSubstring *= base;
      hashCurrentSubstring += text.charCodeAt(i);

      currentSubstring = currentSubstring.substring(1) + text[i];
    }

    if (hashPattern === hashCurrentSubstring && pattern === currentSubstring) {
      return i === pattern.length ? 0 : i - pattern.length + 1;
    }
  }

  return -1;
};
