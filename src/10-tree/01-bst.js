// src/10-tree/01-bst.js
const BinarySearchTree = require('./binary-search-tree');

class Student {
  constructor(idNumber, name, gradeLevel, address) {
    this.idNumber = idNumber;
    this.name = name;
    this.gradeLevel = gradeLevel;
  }
}

// create student comparator to compare idNumber
const studentComparator = (a, b) => a.idNumber - b.idNumber;

const studentTree = new BinarySearchTree(studentComparator);

studentTree.insert(new Student(11, 'Darcy', 10));
studentTree.insert(new Student(7, 'Tory', 10));
studentTree.insert(new Student(5, 'Caleb', 10));
studentTree.insert(new Student(9, 'Sofia', 10));
studentTree.insert(new Student(15, 'Max', 10));

//     11
//    / \
//   7   15
//  / \   
// 5   9

studentTree.insert(new Student(12, 'Seth', 10));

//    11
//    / \
//   7   15
//  / \  /
// 5   9 12


// to see the output of this file use the command: node src/10-tree/01-bst.js
