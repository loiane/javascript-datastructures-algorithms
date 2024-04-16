// Path: src/01-intro/08-typescript.ts

let myName = 'Packt';
// myName = 10; // commented to avoid error

/* Type inference */
let age = 20; // number
let existsFlag = true; // boolean
let language = 'JavaScript'; // string

let favoriteLanguage: string;
let langs = ['JavaScript', 'Ruby', 'Python'];
favoriteLanguage = langs[0];

/* Interfaces as type */
interface Person {
  name: string;
  age: number;
}

function printName(person: Person) {
    console.log(person.name);
}
  
const john = { name: 'John', age: 21 };
const mary = { name: 'Mary', age: 21, phone: '123-45678' };
printName(john);
printName(mary);

/* Interfaces as OO */
interface Comparable<T> {
  compareTo(b: T): number;
}

class MyObject implements Comparable<MyObject> {
  age: number;
  
  constructor(age: number) {
    this.age = age;
  }

  compareTo(b: MyObject): number {
    if (this.age === b.age) {
      return 0;
    }
    return this.age > b.age ? 1 : -1;
  }
}

/* Enums */
enum Compare {
  LESS_THAN = -1,
  BIGGER_THAN = 1,
  EQUALS = 0
}

function compareTo(a: MyObject, b: MyObject): number {
  if (a.age === b.age) {
    return Compare.EQUALS;
  }
  return a.age > b.age ? Compare.BIGGER_THAN : Compare.LESS_THAN;
}

/* Type aliases */
type UserID = string;
type User = {
  id: UserID;
  name: string;
}