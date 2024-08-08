// src/10-tree/04-post-order-traversal.js
const BinarySearchTree = require('./binary-search-tree');

class FileOrDirectory {
  constructor(name, isDirectory, size = 0) {
    this.name = name;
    this.isDirectory = isDirectory; // true for directory, false for file
  }
}
const fileDirectoryComparator = (a, b) => a.name.localeCompare(b.name);

const fileSystemTree = new BinarySearchTree(fileDirectoryComparator);
fileSystemTree.insert(new FileOrDirectory('Project', true));
fileSystemTree.insert(new FileOrDirectory('Documents', true));
fileSystemTree.insert(new FileOrDirectory('Code', true));
fileSystemTree.insert(new FileOrDirectory('notes.txt', false));
fileSystemTree.insert(new FileOrDirectory('design.pdf', false));
fileSystemTree.insert(new FileOrDirectory('app.js', false));


// post order traversal
const deleteFileOrDirectory = (fileDirectory) => {
  console.log(`Deleting ${fileDirectory.name}`);
}
fileSystemTree.postOrderTraverse(deleteFileOrDirectory);

// Deleting app.js
// Deleting design.pdf
// Deleting Code
// Deleting notes.txt
// Deleting Documents
// Deleting Project

// to see the output of this file use the command: node src/10-tree/04-post-order-traversal.js