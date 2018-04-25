import Stack from '../data-structures/stack';

export function parenthesesChecker(symbols: string) {
  const stack = new Stack<string>();
  const opens = '([{';
  const closers = ')]}';
  let balanced = true;
  let index = 0;
  let symbol: string;
  let top: string;

  while (index < symbols.length && balanced) {
    symbol = symbols[index];
    if (opens.indexOf(symbol) >= 0) {
      stack.push(symbol);
      // console.log(`open symbol - stacking ${symbol}`);
    } else {
      // console.log(`close symbol ${symbol}`);
      if (stack.isEmpty()) {
        balanced = false;
        // console.log('Stack is empty, no more symbols to pop and compare');
      } else {
        top = stack.pop();
        // if (!matches(top, symbol)){
        if (!(opens.indexOf(top) === closers.indexOf(symbol))) {
          balanced = false;
          /* console.log(
            `poping symbol ${top} - is not a match compared to ${symbol}`
          ); */
        } /* else {
          console.log(
            `poping symbol ${top} - is is a match compared to ${symbol}`
          );
        } */
      }
    }
    index++;
  }
  return balanced && stack.isEmpty();
}
