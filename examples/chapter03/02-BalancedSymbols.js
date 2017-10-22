const { parenthesesChecker } = PacktDataStructuresAlgorithms;

console.log('{([])}', parenthesesChecker('{([])}')); // true
console.log('{{([][])}()}', parenthesesChecker('{{([][])}()}')); // true
console.log('[{()]', parenthesesChecker('[{()]')); // false
