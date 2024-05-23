// Path: src/04-stack/leetcode/min-stack.ts
// https://leetcode.com/problems/min-stack/description/

class MinStack {
  stack: number[];
  minStack: number[];

  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(x: number) {
    this.stack.push(x);
    if (this.minStack.length === 0 || x <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(x);
    }
  }

  pop() {
    const x = this.stack.pop();
    if (x === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

// test
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.getMin()); // -3
minStack.pop();
console.log(minStack.top()); // 0
console.log(minStack.getMin()); // -2

// time complexity: O(1)
// space complexity: O(n)

// optimized solution
class MinStack2 {
  stack: number[] = [];
  min: number = +Infinity;

  push(val: number): void {
      this.min = Math.min(val, this.min);
      this.stack.push(val);
  }

  pop(): void {
      const val = this.stack.pop();
      if (this.min === val) this.min = Math.min(...this.stack);
  }

  top(): number {
      return this.stack[this.stack.length - 1];
  }

  getMin(): number {
      return this.min;
  }
}

class MinStack3 {
  private stack: number[];
  private minStack: number[];

  constructor() {
      this.stack = [];
      this.minStack = [];
  }

  push(val: number): void {
      this.stack.push(val);

      if (this.minStack.length === 0) this.minStack.push(val);
      else {
          const currentMin = this.minStack[this.minStack.length - 1];

          this.minStack.push(val < currentMin ? val : currentMin);
      }
  }

  pop(): void {
      this.stack.pop();
      this.minStack.pop();
  }

  top(): number {
      return this.stack[this.stack.length - 1];
  }

  getMin(): number {
      return this.minStack[this.minStack.length - 1];
  }
}

// to see the output of this file use the command: node src/04-stack/leetcode/min-stack.ts