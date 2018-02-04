function isSafe(maze, x, y) {
  const n = maze.length;
  // check if x and y are in limits and cell is not blocked
  if (x >= 0 && y >= 0 && x < n && y < n && maze[x][y] !== 0) {
    return true;
  }
  return false;
}

function findPath(maze, x, y, solution) {
  const n = maze.length;
  // check if maze[x][y] is feasible to move
  if (x === n - 1 && y === n - 1) {
    // we have reached
    solution[x][y] = 1;
    return true;
  }
  // Check if maze[x][y] is valid
  if (isSafe(maze, x, y) === true) {
    // mark x,y as part of solution path
    solution[x][y] = 1;
    /* Move forward in x direction */
    if (findPath(maze, x + 1, y, solution)) {
      return true;
    }
    /* If moving in x direction doesn't give
           solution then  Move down in y direction */
    if (findPath(maze, x, y + 1, solution)) {
      return true;
    }
    /* If none of the above movements work then
           BACKTRACK: unmark x,y as part of solution
           path */
    solution[x][y] = 0;
    return false;
  }
  return false;
}

export function ratInAMaze(maze) {
  const solution = [];
  for (let i = 0; i < maze.length; i++) {
    solution[i] = [];
    for (let j = 0; j < maze[i].length; j++) {
      solution[i][j] = 0;
    }
  }
  if (findPath(maze, 0, 0, solution) === false) {
    return solution;
  }
  return 'NO PATH FOUND';
}
