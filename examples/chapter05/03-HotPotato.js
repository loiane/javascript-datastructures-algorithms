const { hotPotato } = PacktDataStructuresAlgorithms;

const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
const result = hotPotato(names, 7);

result.eliminated.forEach(name => {
  console.log(`${name} was eliminated from the Hot Potato game.`);
});

console.log(`The winner is: ${result.winner}`);

// Camila was eliminated from the Hot Potato game.
// Jack was eliminated from the Hot Potato game.
// Carl was eliminated from the Hot Potato game.
// Ingrid was eliminated from the Hot Potato game.
// The winner is: John
