// Path: src/03-array/08-TypedArrays.ts

// TypedArray example
const arrayLength = 5;
const int16 = new Int16Array(arrayLength);

for (let i = 0; i < arrayLength; i++) {
  int16[i] = i + 1;
}

console.log(int16);

// check https://js.tensorflow.org for more practical examples

// to see the output of this file use the command: node src/03-array/08-TypedArrays.ts