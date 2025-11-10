// Path: src/03-array/hackerrank/03-2D-arrays-ds.ts
// Problem: https://www.hackerrank.com/challenges/2d-array/problem

/**
 * Calculates the maximum sum of an "hourglass" shape (3x3 grid)
 * within a 6x6 2D array.
 *
 * An hourglass has the form:
 * a b c
 * d
 * e f g
 *
 * @param arr The 6x6 2D array of integers. Type is number[][].
 * @returns The largest hourglass sum found. Type is number.
 */

function maximumHourglassSum(arr: number[][]): number {
    // Initialize the maximum sum to the smallest possible value (negative infinity)
    // The type is inferred as number.
    let maximumSum: number = -Infinity;

    // We can use constants for clarity, but they are optional in TS
    const ROWS: number = 6;
    const COLS: number = 6;

    // The core logic remains the same. The loop control variables (i, j) are inferred as number.
    // The hourglass is 3x3, so we only need to iterate through the array
    // up to the point where an hourglass can still fit entirely within the bounds.
    for (let i = 0; i <= ROWS - 3; i++) {
        for (let j = 0; j <= COLS - 3; j++) {

            // Calculate the sum of the current 3x3 hourglass starting at (i, j)
            // currentSum is inferred as number
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

// --- Testing with Sample Input ---

// Define the type explicitly for the sample input for better type checking
const sampleInput: number[][] = [
    [1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0],
    [0, 0, 2, 4, 4, 0],
    [0, 0, 0, 2, 0, 0],
    [0, 0, 1, 2, 4, 0]
];

const maxTotal: number = maximumHourglassSum(sampleInput);

console.log("Input Array:");
console.log(sampleInput.map(row => row.join(' ')).join('\n'));
console.log("\nSample Output (Expected: 19):");
console.log(maxTotal);
