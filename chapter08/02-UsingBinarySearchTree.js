var tree = new BinarySearchTree();

tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

console.log('********* in-order transverse ***********');
function printNode(value){
    console.log(value);
}
tree.inOrderTraverse(printNode);

console.log('********* pre-order transverse ***********');
tree.preOrderTraverse(printNode);

console.log('********* post-order transverse ***********');
tree.postOrderTraverse(printNode);


console.log('********* max and min ***********');
console.log(tree.max());
console.log(tree.min());
console.log(tree.search(1) ? 'Key 1 found.' : 'Key 1 not found.');
console.log(tree.search(8) ? 'Key 8 found.' : 'Key 8 not found.');


console.log('********* remove 6 ***********');
tree.remove(6);
tree.inOrderTraverse(printNode);

console.log('********* remove 5 ***********');
tree.remove(5);
tree.inOrderTraverse(printNode);

console.log('********* remove 15 ***********');
tree.remove(15);
tree.inOrderTraverse(printNode);

console.log('********* raw data structure ***********');
console.log(tree.getRoot());

console.log('********* printing HTML tree ***********');
var parent = document.getElementsByTagName('body')[0];
printHTMLTree(tree.getRoot(), parent, 255);