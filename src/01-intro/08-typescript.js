// Path: src/01-intro/08-typescript.ts
let myName = 'Packt';
// myName = 10; // commented to avoid error
/* Type inference */
let age = 20; // number
let existsFlag = true; // boolean
let language = 'JavaScript'; // string
let favoriteLanguage;
let langs = ['JavaScript', 'Ruby', 'Python'];
favoriteLanguage = langs[0];
function printName(person) {
    console.log(person.name);
}
const john = { name: 'John', age: 21 };
const mary = { name: 'Mary', age: 21, phone: '123-45678' };
printName(john);
printName(mary);
class MyObject {
    age;
    constructor(age) {
        this.age = age;
    }
    compareTo(b) {
        if (this.age === b.age) {
            return 0;
        }
        return this.age > b.age ? 1 : -1;
    }
}
/* Enums */
var Compare;
(function (Compare) {
    Compare[Compare["LESS_THAN"] = -1] = "LESS_THAN";
    Compare[Compare["BIGGER_THAN"] = 1] = "BIGGER_THAN";
    Compare[Compare["EQUALS"] = 0] = "EQUALS";
})(Compare || (Compare = {}));
function compareTo(a, b) {
    if (a.age === b.age) {
        return Compare.EQUALS;
    }
    return a.age > b.age ? Compare.BIGGER_THAN : Compare.LESS_THAN;
}
