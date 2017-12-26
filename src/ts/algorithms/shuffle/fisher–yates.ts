import { swap } from '../../util';

export function shuffle<T>(array: T[]) {
  let currentIndex = array.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    swap(array, currentIndex, randomIndex);
  }

  return array;
}
