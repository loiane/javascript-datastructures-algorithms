// src/07-set/01-using-myset-class.js

const MySet = require('./set');

const article = {
  title: 'The importance of data structures in programming',
  content: '...',
  tags: new MySet()  // using MySet to store tags
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

// union example
const interestsFromWebsites = new MySet();
interestsFromWebsites.addAll(['technology', 'politics', 'photography']);

const interestsFromSocialMedia = new MySet();
interestsFromSocialMedia.addAll(['technology', 'movies', 'books']);

const allInterests = interestsFromWebsites.union(interestsFromSocialMedia);
console.log(allInterests.values());  // ['technology', 'politics', 'photography', 'movies', 'books']

// intersection example
const job1Skills = new MySet();
job1Skills.addAll(['JavaScript', 'Angular', 'Java', 'SQL']);
const job2Skills = new MySet();
job2Skills.addAll(['Python', 'Machine Learning', 'SQL', 'Statistics']);
const jobPostings = 
 [{
      title: 'Software Engineer',
      skills: job1Skills
  },
  {
      title: 'Data Scientist',
      skills: job2Skills
  }];

const candidateSkills = new MySet();
candidateSkills.addAll(['JavaScript', 'Angular', 'TypeScript', 'AWS']);
const candidate = {
  name: 'Loiane',
  skills: candidateSkills
};

// Function to match candidate with jobs
function matchCandidateWithJobs(candidate, jobPostings) {
  const matches = [];
  for (const job of jobPostings) {
      const matchingSkillsSet = candidate.skills.intersection(job.skills);
      if (!matchingSkillsSet.isEmpty()){
          matches.push({
              title: job.title,
              matchingSkills: matchingSkillsSet.values() 
          });
      }
  }
  return matches;
}

// Find matching jobs for the candidate
const matchingJobs = matchCandidateWithJobs(candidate, jobPostings);
console.log(matchingJobs);
// output: [{ title: 'Software Engineer', matchingSkills: [ 'JavaScript', 'Angular' ] }]

// difference example
// Sets representing subscriber interests
const allSubscribers = new MySet();
allSubscribers.addAll(['Aelin', 'Rowan', 'Xaden', 'Poppy', 'Violet']);
const booksInterested = new MySet();
booksInterested.addAll(['Aelin', 'Poppy', 'Violet']);
const alreadyPurchasedBooks = new MySet();
alreadyPurchasedBooks.addAll(['Poppy']);

// Find subscribers interested in books but haven't purchased yet
const targetSubscribers = booksInterested.difference(alreadyPurchasedBooks);

// Send targeted email
targetSubscribers.values().forEach(subscriber => {
  sendEmail(subscriber, 'New books you will love!');
});

function sendEmail(subscriber, message) {
  console.log(`Sending email to ${subscriber}: ${message}`);
}
// Sending email to Aelin: New books you will love!
// Sending email to Violet: New books you will love!

// subset example
// Example Recipe Data

const chickenIngredients = new MySet()
chickenIngredients.addAll(['chicken', 'tomato', 'onion', 'garlic', 'ginger', 'spices']);

const spaghettiIngredients = new MySet();
spaghettiIngredients.addAll(['spaghetti', 'eggs', 'bacon', 'parmesan', 'pepper']);

const recipes = 
[{
      name: 'Chicken Tikka Masala',
      ingredients: chickenIngredients
  },
  {
      name: 'Spaghetti Carbonara',
      ingredients: spaghettiIngredients
  }];

// User's available ingredients
const userIngredients = new MySet();
userIngredients.addAll(['chicken', 'onion', 'garlic', 'ginger']);

// Function to filter recipes
function filterRecipes(recipes, userIngredients) {
  const filteredRecipes = [];
  for (const recipe of recipes) {
      if (userIngredients.isSubsetOf(recipe.ingredients)) {
          filteredRecipes.push({ name: recipe.name });
      }
  }
  return filteredRecipes;
}

// Filter recipes based on user's ingredients
const matchingRecipes = filterRecipes(recipes, userIngredients);
console.log(matchingRecipes);
// [ { name: 'Chicken Tikka Masala' } ]



// to see the output of this file use the command: node src/07-set/01-using-myset-class.js