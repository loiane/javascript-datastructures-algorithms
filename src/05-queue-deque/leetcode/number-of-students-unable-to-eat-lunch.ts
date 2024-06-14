// Path: src/05-queue-deque/leetcode/number-of-students-unable-to-eat-lunch.ts
// https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/

// 1700. Number of Students Unable to Eat Lunch
// Easy

// hint 1: Simulate the process of giving sandwiches to students.
// hint 2: Calculate those who will eat instead of those who will not.

// Use two queues to simulate the process of giving sandwiches to students.

function countStudents(students: number[], sandwiches: number[]): number {
    
    let count = 0;
    while(students.length > 0 && count < students.length) {
        if(students[0] === sandwiches[0]) {
            students.shift();
            sandwiches.shift();
            count = 0;
        } else {
            students.push(students.shift());
            count++;
        }
    }
    
    return students.length;
};

// Time complexity: O(n)
// Space complexity: O(n)

// Input: students = [1,1,0,0], sandwiches = [0,1,0,1]
// Output: 0
console.log(countStudents([1,1,0,0], [0,1,0,1])); // 0
console.log(countStudents([1,1,1,0,0,1], [1,0,0,0,1,1])); // 3

// optimized solution
function countStudents2(students: number[], sandwiches: number[]): number {
    while (students.length > 0) {
      if (students[0] === sandwiches[0]) {
          students.shift();
          sandwiches.shift();
      } else {
          // check if there is a student who prefers the sandwich on the top of the stack to continue the loop
          if (students.includes(sandwiches[0])) {
              let num = students.shift();
              students.push(num);
          } else {
              break; // if there is no student who prefers the sandwich on the top of the stack, break the loop
          }
      }
  }
  return students.length;
};

// Time complexity: O(nˆ2)
// Space complexity: O(1)

function countStudentsOptimized(students, sandwiches) {
    const counts = [0, 0]; // Track counts of each preference (0 or 1)
    for (const student of students) {
      counts[student]++; 
    }
  
    for (const sandwich of sandwiches) {
      if (counts[sandwich] === 0) {
        break; // No one wants this sandwich type anymore
      }
      counts[sandwich]--; 
    }
  
    return counts[0] + counts[1]; // Remaining students who couldn't eat
  }
  