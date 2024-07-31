// src/09-recursion/03-callstack.js

// stack overflow
let count = 0;
function recursiveFn() {
  count++;
  recursiveFn();
}

try {
  recursiveFn();
} catch (ex) {
  console.log('count = ' + count + ' error: ' + ex);
}


// to see the output of this file use the command: node src/09-recursion/03-callstack.js