var stack = new Stack();
 console.log(stack.isEmpty()); //outputs true
 stack.push(5);
 stack.push(8);
 console.log(stack.peek()); // outputs 8
 stack.push(11);
 console.log(stack.size()); // outputs 3
 console.log(stack.isEmpty()); //outputs false
 stack.push(15);
 stack.pop();
 stack.pop();
 console.log(stack.size()); // outputs 2
 stack.print(); // outputs [5, 8]