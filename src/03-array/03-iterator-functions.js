// Path: src/03-array/03-iterator-functions.js

// using forEach method
const raffleParticipants = ['poppy@email.com', 'sera@email.com', 'millie@example.com'];
const sendWelcomeEmail = email => {
  console.log(`Welcome email sent to ${email}`);
};

raffleParticipants.forEach(email => sendWelcomeEmail(email));

raffleParticipants.forEach(sendWelcomeEmail);

const sendConfirmationEmail = (email, raffleNumber) => {
  console.log(`Hi ${email}, your raffle number is ${raffleNumber}`);
};

const sendSpecialPrizeEmail = (email) => {
  console.log(`Congrats ${email}! You've won a special prize!`);
};

raffleParticipants.forEach((value, index, array) => {
  const raffleNumber = index + 1; // Raffle numbers start from 1
  sendConfirmationEmail(value, raffleNumber);

  if (index === array.length - 1) { // Check if it's the last element
      sendSpecialPrizeEmail(value);
  }
});

// using every method
const formFields = [
  { id: 'username', value: 'poppy' }, 
  { id: 'email', value: 'poppy@email.com' },
  { id: 'password', value: 'bookClub123!' }];

  const isFormValid = () => 
    formFields.every(field => field.value !== '' && field.value !== null); 


const onFormSubmit = () => {
  if (isFormValid()) {
    console.log('Form submitted successfully!');
  } else {
    console.log('Please fill out all required fields.');
  }
}
onFormSubmit(); // Form submitted successfully!

// using a for loop
const isFormValidForLoop = () => {
  for (let i = 0; i < formFields.length; i++) {
    if (formFields[i].value === '' || formFields[i].value === null) {
      return false;
    }
  }
  return true;
};


// using some method
const products = [
  { name: 'Laptop', inStock: true },
  { name: 'Smartphone', inStock: false },
  { name: 'Headphones', inStock: true }
];

const searchQuery = 'phone';
const isProductAvailable = products.some(product => {
  return product.name.toLowerCase().includes(searchQuery.toLowerCase()) && product.inStock;
});

console.log(isProductAvailable ? 'Product Available!' : 'No Products Found.'); // Product Available!

// using a for loop
const isProductAvailableForLoop = () => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase().includes(searchQuery.toLowerCase()) && products[i].inStock) {
      return true; // Found a match, no need to continue checking
    }
  }
  return false; // No match found after checking all products
};


// to see the output of this file use the command: node src/03-array/03-iterator-functions.js