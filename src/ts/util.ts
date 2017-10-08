export type ICompareFunction<T> = (a: T, b: T) => number;

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
