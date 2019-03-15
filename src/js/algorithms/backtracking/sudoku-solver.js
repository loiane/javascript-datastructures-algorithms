const UNASSIGNED = 0;

function usedInRow(matrix, row, num) {
  for (let col = 0; col < matrix.length; col++) {
    if (matrix[row][col] === num) {
      return true;
    }
  }
  return false;
}

function usedInCol(matrix, col, num) {
  for (let row = 0; row < matrix.length; row++) {
    if (matrix[row][col] === num) {
      return true;
    }
  }
  return false;
}

function usedInBox(matrix, boxStartRow, boxStartCol, num) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (matrix[row + boxStartRow][col + boxStartCol] === num) {
        return true;
      }
    }
  }
  return false;
}

function isSafe(matrix, row, col, num) {
  return (
    !usedInRow(matrix, row, num)
    && !usedInCol(matrix, col, num)
    && !usedInBox(matrix, row - (row % 3), col - (col % 3), num)
  );
}
function solveSudoku(matrix) {
  let row = 0;
  let col = 0;
  let checkBlankSpaces = false;

  for (row = 0; row < matrix.length; row++) {
    for (col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === UNASSIGNED) {
        checkBlankSpaces = true;
        break;
      }
    }
    if (checkBlankSpaces === true) {
      break;
    }
  }
  if (checkBlankSpaces === false) {
    return true;
  }

  for (let num = 1; num <= 9; num++) {
    if (isSafe(matrix, row, col, num)) {
      matrix[row][col] = num;
      if (solveSudoku(matrix)) {
        return true;
      }
      matrix[row][col] = UNASSIGNED;
    }
  }
  return false;
}

export function sudokuSolver(matrix) {
  if (solveSudoku(matrix) === true) {
    return matrix;
  }
  return 'NO SOLUTION EXISTS!';
}
