export type ICompareFunction<T> = (a: T, b: T) => number;

export type IEqualsFunction<T> = (a: T, b: T) => boolean;

export enum Compare {
  LESS_THAN = -1,
  BIGGER_THAN = 1
}

export function defaultCompare<T>(a: T, b: T): number {
  if (a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

export function defaultEquals<T>(a: T, b: T): boolean {
  return a === b;
}

export function defaultToString(item: any): string {
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}

export function swap(array: any[], a: number, b: number) {
  /* const temp = array[a];
  array[a] = array[b];
  array[b] = temp; */
  [array[a], array[b]] = [array[b], array[a]];
}

export function reverseCompare<T>(compareFn: ICompareFunction<T>): ICompareFunction<T> {
  return (a, b) => compareFn(b, a);
}
