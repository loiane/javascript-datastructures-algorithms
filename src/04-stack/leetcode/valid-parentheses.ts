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

// to see the output of this file use the command: node src/04-stack/leetcode/valid-parentheses.ts