
// functions commented below - inifite loop

/*
function recursiveFunction(someParam) {
  recursiveFunction(someParam);
}

function recursiveFunction1(someParam) {
  recursiveFunction2(someParam);
}

function recursiveFunction2(someParam) {
  recursiveFunction1(someParam);
}
*/

function understandRecursion(doIunderstandRecursion) {
  const recursionAnswer = confirm('Do you understand recursion?'); // function logic
  if (recursionAnswer === true) { // base case or stop point
    return true;
  }
  understandRecursion(recursionAnswer); // recursive call
}

understandRecursion(false);
