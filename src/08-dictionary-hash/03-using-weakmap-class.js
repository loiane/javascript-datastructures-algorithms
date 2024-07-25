const privateData = new WeakMap();

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    privateData.set(this, { ssn: 'XXX-XX-XXXX', medicalHistory: [] });
  }

  getSSN() {
    return privateData.get(this)?.ssn;
  }
}

const alice = new Person("Penelope", 20);
console.log(alice.name);      // Penelope
console.log(alice.getSSN());  // XXX-XX-XXXX

// Try to access private data