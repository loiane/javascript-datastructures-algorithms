const length = 5;
const int16 = new Int16Array(length);

const array16 = [];
array16.length = length;

for (let i = 0; i < length; i++) {
  int16[i] = i + 1;
}

console.log(int16);

// Int8Array();
// Uint8Array();
// Uint8ClampedArray();
// Int16Array();
// Uint16Array();
// Int32Array();
// Uint32Array();
// Float32Array();
// Float64Array();

// http://www.html5rocks.com/en/tutorials/webgl/typed_arrays/
// http://www.i-programmer.info/programming/javascript/6135-javascript-data-structures-typed-arrays.html
