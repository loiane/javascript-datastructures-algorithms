// Path: src/01-intro/08-typescript.ts
var myName = 'Packt';
// myName = 10; // commented to avoid error
/* Type inference */
var age = 20; // number
var existsFlag = true; // boolean
var language = 'JavaScript'; // string
var favoriteLanguage;
var langs = ['JavaScript', 'Ruby', 'Python'];
favoriteLanguage = langs[0];
function printName(person) {
    console.log(person.name);
}
var john = { name: 'John', age: 21 };
var mary = { name: 'Mary', age: 21, phone: '123-45678' };
printName(john);
printName(mary);
