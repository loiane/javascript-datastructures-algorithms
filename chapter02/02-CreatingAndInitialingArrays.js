var daysOfWeek = [];

var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var daysOfWeek = new Array(); //{1}

var daysOfWeek = new Array(7); //{2}

console.log(daysOfWeek.length);

var daysOfWeek = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'); //{3}

for (var i=0; i<daysOfWeek.length; i++){
    console.log(daysOfWeek[i]);
}

//console.table(daysOfWeek);

//fibonacci numbers
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
var fibonacci = []; //{1}
fibonacci[1] = 1; //{2}
fibonacci[2] = 1; //{3}

for(var i = 3; i < 20; i++){
    fibonacci[i] = fibonacci[i-1] + fibonacci[i-2]; ////{4}
}

for(var i = 1; i<fibonacci.length; i++){ //{5}
    console.log(fibonacci[i]);           //{6}
}

//instead of {5} and {6} we can simply use
console.log(fibonacci);
