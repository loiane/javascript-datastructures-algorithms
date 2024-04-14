// Path: src/01-intro/03-loops.js

console.log('**** for example ****');
/* for - example */
for (let i = 0; i < 10; i++) {
  console.log(i);
}

console.log('**** while example ****');
/* while - example */
let i = 0;
while (i < 10) {
  console.log(i);
  i++;
}

console.log('**** do-while example ****');
/* do-while - example */
i = 0;
do {
  console.log(i);
  i++;
} while (i < 10);

console.log('**** for-in example ****');
/* for-in - example */
const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  console.log(key, obj[key]);
}
// output: a 1 b 2 c 3

console.log('**** for-of example ****');
/* for-of - example */
const arr = [1, 2, 3];
for (const value of arr) {
  console.log(value);
}
// output: 1 2 3

// to see the output of this file use the command: node src/01-intro/03-loops.js