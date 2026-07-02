/** Comparison result constants: LESS_THAN (-1), EQUALS (0), BIGGER_THAN (1). */
export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
} as const;

export type CompareResult = typeof Compare[keyof typeof Compare];

export default Compare;
