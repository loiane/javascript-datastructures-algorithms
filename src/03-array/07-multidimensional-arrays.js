// Path: src/03-array/07-multidimensional-arrays.js

let averageTempDay1 = [72, 75, 79, 79, 81, 81];
let averageTempDay2 = [81, 79, 75, 75, 73, 72];

// multidimensional array representation
let averageTempMultipleDays = [];
averageTempMultipleDays[0] = [72, 75, 79, 79, 81, 81];
averageTempMultipleDays[1] = [81, 79, 75, 75, 73, 73];

// same as above:
averageTempMultipleDays = [
  [72, 75, 79, 79, 81, 81],
  [81, 79, 75, 75, 73, 73]
];

// day 1
averageTempMultipleDays[0] = [];
averageTempMultipleDays[0][0] = 72;
averageTempMultipleDays[0][1] = 75;
averageTempMultipleDays[0][2] = 79;
averageTempMultipleDays[0][3] = 79;
averageTempMultipleDays[0][4] = 81;
averageTempMultipleDays[0][5] = 81;
// day 2
averageTempMultipleDays[1] = [];
averageTempMultipleDays[1][0] = 81;
averageTempMultipleDays[1][1] = 79;
averageTempMultipleDays[1][2] = 75;
averageTempMultipleDays[1][3] = 75;
averageTempMultipleDays[1][4] = 73;
averageTempMultipleDays[1][5] = 73;

// @ts-ignore
function printMultidimensionalArray(myArray) {
  for (let i = 0; i < myArray.length; i++) {
    for (let j = 0; j < myArray[i].length; j++) {
      console.log(myArray[i][j]);
    }
  }
}

printMultidimensionalArray(averageTempMultipleDays);

console.table(averageTempMultipleDays);

//* * Multidimensional Matrix
// Dimension 1 (i): each day
// Dimension 2 (j): location
// Dimension 3 (z): temperature
// declare a 3-dimensional Array 3x3x3:
let averageTempMultipleDaysAndLocation = [];

// day 1
averageTempMultipleDaysAndLocation[0] = [];
averageTempMultipleDaysAndLocation[0][0] = [19, 20, 21]; // location 1
averageTempMultipleDaysAndLocation[0][1] = [20, 22, 23]; // location 2
averageTempMultipleDaysAndLocation[0][2] = [30, 31, 32]; // location 3

// day 2
averageTempMultipleDaysAndLocation[1] = [];
averageTempMultipleDaysAndLocation[1][0] = [21, 22, 23]; // location 1
averageTempMultipleDaysAndLocation[1][1] = [22, 23, 24]; // location 2
averageTempMultipleDaysAndLocation[1][2] = [29, 30, 30]; // location 3

// day 3
averageTempMultipleDaysAndLocation[2] = [];
averageTempMultipleDaysAndLocation[2][0] = [22, 23, 24]; // location 1
averageTempMultipleDaysAndLocation[2][1] = [23, 24, 23]; // location 2
averageTempMultipleDaysAndLocation[2][2] = [30, 31, 31]; // location 3


function printMultidimensionalArray3D(myArray) {
  for (let i = 0; i < myArray.length; i++) {
    for (let j = 0; j < myArray[i].length; j++) {
      for (let z = 0; z < myArray[i][j].length; z++) {
        console.log(myArray[i][j][z]);
      }
    }
  }
}

printMultidimensionalArray3D(averageTempMultipleDaysAndLocation);

console.table(averageTempMultipleDaysAndLocation);

// to see the output of this file use the command: node src/03-array/07-multidimensional-arrays.js