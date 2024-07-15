// src/07-set/02-using-set-class.js

const article = {
  title: 'The importance of data structures in programming',
  content: '...',
  tags: new Set()  
  tags: new Set(['programming', 'data structures', 'algorithms'])
};

// add tags
article.tags.add('programming');
article.tags.add('data structures');
article.tags.add('algorithms');
article.tags.add('programming');

console.log(article.tags.size);  // 3
console.log(article.tags.has('data structures'));  // true
console.log(article.tags.has('algorithms'));  // true
console.log(article.tags.has('programming'));  // true
console.log(article.tags.has('javascript'));  // false
console.log(article.tags.values());  // ['programming', 'data structures', 'algorithms']

// remove tags
article.tags.delete('programming');
article.tags.add('JavaScript');
console.log(article.tags.values());  // ['data structures', 'algorithms', 'JavaScript']


// to see the output of this file use the command: node src/07-set/02-using-set-class.js