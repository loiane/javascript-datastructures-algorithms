import Stack from '../data-structures/stack';

function towerOfHanoi(
  plates: number,
  source: Stack<number>,
  helper: Stack<number>,
  dest: Stack<number>,
  sourceName: string, helperName: string, destName: string,
  moves: any[] = []
) {
  if (plates <= 0) {
    return moves;
  }
  if (plates === 1) {
    dest.push(source.pop());
    const move: any = {};
    move[sourceName] = source.toString();
    move[helperName] = helper.toString();
    move[destName] = dest.toString();
    moves.push(move);
  } else {
    towerOfHanoi(plates - 1, source, dest, helper, sourceName, destName, helperName, moves);
    dest.push(source.pop());
    const move: any = {};
    move[sourceName] = source.toString();
    move[helperName] = helper.toString();
    move[destName] = dest.toString();
    moves.push(move);
    towerOfHanoi(plates - 1, helper, source, dest, helperName, sourceName, destName, moves);
  }
  return moves;
}

export function hanoiStack(plates: number) {
  const source = new Stack<number>();
  const dest = new Stack<number>();
  const helper = new Stack<number>();

  for (let i = plates; i > 0; i--) {
    source.push(i);
  }

  return towerOfHanoi(plates, source, helper, dest, 'source', 'helper', 'dest');
}

export function hanoi(
  plates: number,
  source: string,
  helper: string,
  dest: string,
  moves: string[][] = []
) {
  if (plates <= 0) {
    return moves;
  }
  if (plates === 1) {
    moves.push([source, dest]);
  } else {
    hanoi(plates - 1, source, dest, helper, moves);
    moves.push([source, dest]);
    hanoi(plates - 1, helper, source, dest, moves);
  }
  return moves;
}
