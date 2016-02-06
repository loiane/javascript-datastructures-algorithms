let list = new DoublyLinkedList2();

list.append(15);
list.print();
list.printInverse();

list.append(16);
list.print();
list.printInverse();

list.append(17);
list.print();
list.printInverse();

list.insert(0,13);
list.print();
list.printInverse();

list.insert(4,18);
list.print();
list.printInverse();

list.insert(1,14);
list.print();
list.printInverse();

list.removeAt(0);
list.print();
list.printInverse();

list.removeAt(list.size()-1);
list.print();
list.printInverse();

list.removeAt(1);
list.print();
list.printInverse();

list.remove(16);
list.print();
list.printInverse();

list.remove(14);
list.print();
list.printInverse();

list.remove(17);
list.print();
list.printInverse();