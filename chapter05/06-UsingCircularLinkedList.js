let circularLinkedList = new CircularLinkedList2();

circularLinkedList.append(15);
circularLinkedList.print();

circularLinkedList.append(16);
circularLinkedList.print();

circularLinkedList.insert(0,14);
circularLinkedList.print();

circularLinkedList.insert(1,14.5);
circularLinkedList.print();

circularLinkedList.insert(4,17);
circularLinkedList.print();

circularLinkedList.removeAt(0);
circularLinkedList.print();

circularLinkedList.removeAt(1);
circularLinkedList.print();

circularLinkedList.removeAt(2);
circularLinkedList.print();

console.log(circularLinkedList.indexOf(14.5));
console.log(circularLinkedList.indexOf(16));