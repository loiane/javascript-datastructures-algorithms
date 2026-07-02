// src/10-tree/02-in-order-traversal.ts
import BinarySearchTree from './binary-search-tree';

class Student {
  idNumber: number;
  lastName: string;
  firstName: string;

  constructor(idNumber: number, firstName: string, lastName: string) {
    this.idNumber = idNumber;
    this.lastName = lastName;
    this.firstName = firstName;
  }
}

// create student comparator to compare lastName using localCompare
const studentComparator = (a: Student, b: Student) => a.lastName.localeCompare(b.lastName);

const studentTree = new BinarySearchTree(studentComparator);

studentTree.insert(new Student(9, 'Sofia', 'Cygnus'));
studentTree.insert(new Student(12, 'Seth', 'Capella'));
studentTree.insert(new Student(11, 'Darcy', 'Vega'));
studentTree.insert(new Student(7, 'Tory', 'Vega'));
studentTree.insert(new Student(5, 'Caleb', 'Altair'));
studentTree.insert(new Student(15, 'Max', 'Rigel'));


// in order traversal
const classRoster: string[] = [];
const addToRoster = (studentData: Student) => {
  classRoster.push(`${studentData.idNumber}: ${studentData.lastName}, ${studentData.firstName}`);
}
studentTree.inOrderTraverse(addToRoster);

console.log(classRoster);
// [
//   '5: Altair, Caleb',
//   '12: Capella, Seth',
//   '9: Cygnus, Sofia',
//   '15: Rigel, Max',
//   '11: Vega, Darcy',
//   '7: Vega, Tory'
// ]

// to see the output of this file use the command: node src/10-tree/02-in-order-traversal.js

export {};
