// src/10-tree/05-avl.ts

import AVLTree from './avl-tree';

class Student {
  idNumber: number;
  name: string;
  gradeLevel: number;

  constructor(idNumber: number, name: string, gradeLevel: number, address?: string) {
    this.idNumber = idNumber;
    this.name = name;
    this.gradeLevel = gradeLevel;
  }

  toString(): string {
    return `${this.idNumber} - ${this.name}`;
  }
}

// create student comparator to compare idNumber
const studentComparator = (a: Student, b: Student) => a.idNumber - b.idNumber;

const studentTree = new AVLTree(studentComparator);

studentTree.insert(new Student(11, 'Darcy', 10));
studentTree.insert(new Student(7, 'Tory', 10));
studentTree.insert(new Student(5, 'Caleb', 10));
studentTree.insert(new Student(9, 'Sofia', 10));
studentTree.insert(new Student(15, 'Max', 10));
studentTree.insert(new Student(13, 'Geraldine', 10));
studentTree.insert(new Student(12, 'Seth', 10));


//     11
//    / \
//   7   13
//  / \  / \
// 5   9 12 15

// to see the output of this file use the command: node src/10-tree/05-avl.js

export {};
