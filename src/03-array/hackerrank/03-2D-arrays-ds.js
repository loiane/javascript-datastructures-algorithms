// Path: src/03-array/hackerrank/03-2D-arrays-ds.js
// Problem: https://www.hackerrank.com/challenges/2d-array/problem

/**
 * Calculates the maximum sum of an "hourglass" shape (3x3 grid)
 * within a 6x6 2D array.
 *
 * An hourglass has the form:
 * a b c
 *   d
 * e f g
 *
 * @param {number[][]} arr The 6x6 2D array of integers.
 * @returns {number} The largest hourglass sum found.
 */

function maximumHourglassSum(arr) {
    // Initialize the maximum sum to the smallest possible value (negative infinity)
    // to correctly handle arrays with negative numbers.
    let maximumSum = -Infinity;

    const ROWS = 6;
    const COLS = 6;

    // The hourglass is 3x3, so we only need to iterate through the array
    // up to the point where an hourglass can still fit entirely within the bounds.
    // This means i and j must stop at index 3 (since i+2 and j+2 will be 5, the last index).
    for (let i = 0; i <= ROWS - 3; i++) { // Iterates through starting rows (0 to 3)
        for (let j = 0; j <= COLS - 3; j++) { // Iterates through starting columns (0 to 3)

            // Calculate the sum of the current 3x3 hourglass starting at (i, j)
            let currentSum = (
                // Top row: (i, j), (i, j+1), (i, j+2)
                arr[i][j] + arr[i][j + 1] + arr[i][j + 2] +

                // Middle element: (i+1, j+1)
                arr[i + 1][j + 1] +

                // Bottom row: (i+2, j), (i+2, j+1), (i+2, j+2)
                arr[i + 2][j] + arr[i + 2][j + 1] + arr[i + 2][j + 2]
            );

            // Update the overall maximum sum if the current sum is larger
            if (currentSum > maximumSum) {
                maximumSum = currentSum;
            }
        }
    }

    return maximumSum;
}

// Sample Input provided by the user
const sampleInput = [
    [1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0],
    [0, 0, 2, 4, 4, 0],
    [0, 0, 0, 2, 0, 0],
    [0, 0, 1, 2, 4, 0]
];

const maxTotal = maximumHourglassSum(sampleInput);

console.log("Input Array:");
console.log(sampleInput.map(row => row.join(' ')).join('\n'));
console.log("\nSample Output (Expected: 19):");
console.log(maxTotal);

/* The maximum hourglass sum (19) comes from the following 3x3 subset
starting at array[3][2]:
2 4 4   (2+4+4 = 10)
  2     (2)
1 2 4   (1+2+4 = 7)
Total: 10 + 2 + 7 = 19
*/
