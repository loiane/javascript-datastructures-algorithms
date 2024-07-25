// src/08-dictionary-hash/hash-table-separate-chaining.js

const LinkedList = require('../06-linked-list/linked-list_');

class HashTableSeparateChaining {
  #table = [];

  #loseLoseHashCode(key) {
    if (typeof key !== 'string') {
      key = this.#elementToString(key);
    }
    const hash = key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return hash % 37; // mod to reduce the hash code
  }

  hash(key) {
    return this.#loseLoseHashCode(key);
  }


  put(key, value) {
    if (key != null && value != null) {
      const index = this.hash(key); // Get hash code (index)

      if (this.#table[index] == null) {
        this.#table[index] = new LinkedList(); // Create linked list if needed
      }

      this.#table[index].append({key, value}); // Append to linked list
      return true;
    }
    return false;
  }

  get(key) {
    const index = this.hash(key);
    const linkedList = this.#table[index];
    if (linkedList != null) {
      linkedList.forEach((element) => {
        if (element.key === key) {
          return element.value;
        }
      });
    }
    return undefined; // key not found
  }

  remove(key) {
    const index = this.hash(key);
    const linkedList = this.#table[index];
    if (linkedList != null) {
      const compareFunction = (a, b) => a.key === b.key;
      const toBeRemovedIndex = linkedList.indexOf({key}, compareFunction);
      if (toBeRemovedIndex >= 0) {
        linkedList.removeAt(toBeRemovedIndex);
        if (linkedList.isEmpty()) {
          this.#table[index] = undefined;
        }
        return true;
      }  
    }
    return false; // key not found
  }

  #elementToString(data) {
    if (typeof data === 'object' && data !== null) {
      return JSON.stringify(data);
    } else {
      return data.toString(); 
    }
  }

  toString() {
    const keys = Object.keys(this.#table);
    let objString = `{${keys[0]} => ${this.#table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      const value = this.#elementToString(this.#table[keys[i]]).toString();
      objString = `${objString}\n{${keys[i]} => ${value}}`;
    }
    return objString;
  }
  
}
