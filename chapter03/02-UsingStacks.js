let stack = new Stack3();
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


//how to ensure true privacy
//in case using Stack 2 uncomment code below
/*let objectSymbols = Object.getOwnPropertySymbols(stack);

 console.log(objectSymbols.length); // 1
 console.log(objectSymbols);        // [Symbol()]
 console.log(objectSymbols[0]);     // Symbol()
 stack[objectSymbols[0]].push(1);
 stack.print(); //5, 8, 1*/