// Path: src/04-stack/leetcode/valid-parentheses.ts
// https://leetcode.com/problems/valid-parentheses/description/

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function(s) {
  const stack = [];
  const open = ['(', '[', '{'];
  const close = [')', ']', '}'];

  for (let i = 0; i < s.length; i++) {
    if (open.includes(s[i])) {
      stack.push(s[i]);
    } else if (close.includes(s[i])) {
      const last = stack.pop();
      if (open.indexOf(last) !== close.indexOf(s[i])) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

// test
console.log(isValid('()')); // true
console.log(isValid('()[]{}')); // true
console.log(isValid('(]')); // false
console.log(isValid('(')); // false
console.log(isValid(')')); // false

// time complexity: O(n)
// space complexity: O(n)

// rewrite the code using a map
const isValid2 = function(s) {
  const stack = [];
  const map = {
    '(': ')',
    '[': ']',
    '{': '}'
  };

  for (let i = 0; i < s.length; i++) {
    if (map[s[i]]) {
      stack.push(s[i]);
    } else if (s[i] !== map[stack.pop()]) {
      return false;
    }
  }
  return stack.length === 0;
}

// test
console.log(isValid2('()')); // true
console.log(isValid2('()[]{}')); // true
console.log(isValid2('(]')); // false
console.log(isValid2('(')); // false

// time complexity: O(n)
// space complexity: O(n)

// optimize the code
const isValid3 = function(s) {

  // optimization 1: if the length of the string is odd, return false
  if (s.length % 2 === 1) return false;

  // optimization 2: if the first character is a closing bracket, return false
  if (s[0] === ')' || s[0] === ']' || s[0] === '}') return false;

  // optimization 3: if the last character is an opening bracket, return false
  if (s[s.length - 1] === '(' || s[s.length - 1] === '[' || s[s.length - 1] === '{') return false;

  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '[' || s[i] === '{') stack.push(s[i])
    else {
        const top = stack.pop()
        if (top === '(' && s[i] !== ')') return false
        if (top === '[' && s[i] !== ']') return false
        if (top === '{' && s[i] !== '}') return false
        if (top === undefined) return false
    }
  }

  return stack.length === 0
}

// to see the output of this file use the command: node src/04-stack/leetcode/valid-parentheses.ts