let i = 0;
function recursiveFn() {
  i++;
  recursiveFn();
}

try {
  recursiveFn();
} catch (ex) {
  console.log('i = ' + i + ' error: ' + ex);
}
