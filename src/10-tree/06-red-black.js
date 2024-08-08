// src/10-tree/06-red-black.js

const RedBlackTree = require('./red-black-tree');

class Student {
  constructor(idNumber, name, gradeLevel, address) {
    this.idNumber = idNumber;
    this.name = name;
    this.gradeLevel = gradeLevel;
  }
  toString() {
    return `${this.idNumber} - ${this.name}`;
  }
}

// create student comparator to compare idNumber
const studentComparator = (a, b) => a.idNumber - b.idNumber;

const studentTree = new RedBlackTree(studentComparator);

studentTree.insert(new Student(11, 'Darcy', 10));
studentTree.insert(new Student(7, 'Tory', 10));
studentTree.insert(new Student(5, 'Caleb', 10));
studentTree.insert(new Student(9, 'Sofia', 10));
studentTree.insert(new Student(15, 'Max', 10));
studentTree.insert(new Student(13, 'Geraldine', 10));
studentTree.insert(new Student(12, 'Seth', 10));

studentTree.print();

// console.log('--- Removing 7');
// studentTree.remove(new Student(7, 'Tory', 10));
// studentTree.print();

// to see the output of this file use the command: node src/10-tree/06-red-black.js