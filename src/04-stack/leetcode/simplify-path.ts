// Path: src/04-stack/leetcode/simplify-path.ts
// https://leetcode.com/problems/simplify-path/description/

/**
 * @param {string} path
 * @return {string}
 */
const simplifyPath = function(path) {
  const stack = [];
  const paths = path.split('/');

  for (let i = 0; i < paths.length; i++) {
    if (paths[i] === '' || paths[i] === '.') {
      continue;
    } else if (paths[i] === '..') {
      stack.pop();
    } else {
      stack.push(paths[i]);
    }
  }
  return '/' + stack.join('/');
}

// test
console.log(simplifyPath('/home/')); // '/home'
console.log(simplifyPath('/../')); // '/'
console.log(simplifyPath('/home//foo/')); // '/home/foo'
console.log(simplifyPath('/a/./b/../../c/')); // '/c'
console.log(simplifyPath('/a/../../b/../c//.//')); // '/c'
console.log(simplifyPath('/a//b////c/d//././/..')); // '/a/b/c'

// additional tests
console.log(simplifyPath('/home/user/Documents/../Pictures')); // '/home/user/Pictures'
console.log(simplifyPath('/../home/user/Documents')); // '/home/user/Documents'
console.log(simplifyPath('/home/user/../../usr/local/bin')); // '/usr/local/bin'
console.log(simplifyPath('/home/user/./Downloads/../Pictures/././')); // '/home/user/Pictures'
console.log(simplifyPath('/home/user/Documents/../../usr/local/bin')); // '/usr/local/bin'
console.log(simplifyPath('/home/user/Documents/../../../usr/local/bin')); // '/usr/local/bin'

// time complexity: O(n)
// space complexity: O(n)

// to see the output of this file use the command: node src/04-stack/leetcode/simplify-path.ts