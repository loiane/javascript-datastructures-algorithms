// 207. Course Schedule
// https://leetcode.com/problems/course-schedule/

// Time complexity: O(V + E)
// Space complexity: O(V + E)

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const adjList = new Map();
    const visited = new Set();

    // Create adjacency list
    for (let i = 0; i < numCourses; i++) {
        adjList.set(i, []);
    }
    for (const [course, pre] of prerequisites) {
        adjList.get(pre).push(course);
    }

    // DFS function to check for cycles
    const dfs = (course, cycle) => {
        if (cycle.has(course)) {
            return true;
        }
        if (visited.has(course)) {
            return false;
        }
        cycle.add(course);
        visited.add(course);
        for (const neighbor of adjList.get(course)) {
            if (dfs(neighbor, cycle)) {
                return true;
            }
        }
        cycle.delete(course);
        return false;
    }

    // Check for cycles starting from each course
    for (let i = 0; i < numCourses; i++) {
        if (dfs(i, new Set())) {
            return false; // Cycle found
        }
    }

    return true; // No cycles found
}

// Test cases
const numCourses = 2;
const prerequisites = [
  [1, 0],
  [0, 1],
];
console.log(canFinish(numCourses, prerequisites)); // false

// to see the output of this file use the command: npx ts-node src/13-graph/leetcode/course-schedule.ts