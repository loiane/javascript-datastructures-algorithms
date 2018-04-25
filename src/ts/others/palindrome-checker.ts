import Deque from '../data-structures/deque';

export function palindromeChecker(aString: string) {

  if (aString === undefined || aString === null ||
    (aString !== null && aString.length === 0)) {
    return false;
  }

  const deque = new Deque<string>();
  const lowerString = aString.toLocaleLowerCase().split(' ').join('');
  let firstChar: string, lastChar: string;

  for (let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString.charAt(i));
  }

  while (deque.size() > 1) {
    firstChar = deque.removeFront();
    lastChar = deque.removeBack();
    if (firstChar !== lastChar) {
      return false;
    }
  }

  return true;
}
