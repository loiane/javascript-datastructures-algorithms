var i = 0;

function recursiveFn () {
    i++;
    recursiveFn();
}

try {
    recursiveFn();
} catch (ex) {
    alert('i = ' + i + ' error: ' + ex);
}

//chrome 37 = 20955 RangeError: Maximum call stack size exceeded
//ff 27 = 343429  InternalError: too much recursion