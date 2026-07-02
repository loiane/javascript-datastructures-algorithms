// src/10-tree/03-pre-order-traversal.ts
import BinarySearchTree from './binary-search-tree';

class Employee {
  id: number;
  name: string;
  title: number;

  constructor(id: number, name: string, title: number) {
    this.id = id;
    this.name = name;
    this.title = title;
  }
}

// create title constant
const TITLE = {
  CEO: 1,
  VP: 2,
  MANAGER: 3,
  STAFF: 4
} as const;

// create employee comparator to compare title
const employeeComparator = (a: Employee, b: Employee) => a.id - b.id;

const employeeTree = new BinarySearchTree(employeeComparator);

employeeTree.insert(new Employee(10, 'Gandalf', TITLE.CEO));
employeeTree.insert(new Employee(5, 'Frodo', TITLE.VP));
employeeTree.insert(new Employee(3,'Legolas', TITLE.MANAGER));
employeeTree.insert(new Employee(1, 'Aragorn', TITLE.STAFF));
employeeTree.insert(new Employee(4, 'Gimli', TITLE.STAFF));

employeeTree.insert(new Employee(14, 'Arya', TITLE.VP));
employeeTree.insert(new Employee(12, 'John', TITLE.MANAGER));
employeeTree.insert(new Employee(11, 'Brienne', TITLE.STAFF));
employeeTree.insert(new Employee(13, 'Tyrion', TITLE.STAFF));

// pre order traversal
const sendEmergencyNotification = (employee: Employee, message: string) => {
  console.log(`Notifying ${employee.name}: ${message}`);
}
const emergencyMessage = 'Tornado warning in the area. Seek shelter immediately!';
employeeTree.preOrderTraverse((node) => sendEmergencyNotification(node, emergencyMessage));

// Notifying Gandalf: Tornado warning in the area. Seek shelter immediately!
// Notifying Frodo: Tornado warning in the area. Seek shelter immediately!
// Notifying Legolas: Tornado warning in the area. Seek shelter immediately!
// Notifying Arya: Tornado warning in the area. Seek shelter immediately!
// Notifying Aragorn: Tornado warning in the area. Seek shelter immediately!
// Notifying John: Tornado warning in the area. Seek shelter immediately!
// Notifying Gimli: Tornado warning in the area. Seek shelter immediately!
// Notifying Brienne: Tornado warning in the area. Seek shelter immediately!
// Notifying Tyrion: Tornado warning in the area. Seek shelter immediately!

// to see the output of this file use the command: node src/10-tree/03-pre-order-traversal.js

export {};
