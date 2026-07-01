// src/08-dictionary-hash/hash-table.js

class HashTable {

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
    if (key == null && value == null)  {
      return false;
    }
    const index = this.hash(key);
    this.#table[index] = value; 
    return true;
  }

  get(key) {
    if (key == null) {
      return undefined;
    }
    const index = this.hash(key);
    return this.#table[index];
  }

  remove(key) {
    if (key == null) {
      return false;
    }
    const index = this.hash(key);
    if (this.#table[index]) {
      delete this.#table[index];
      return true;
    }
    return false;
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

module.exports = HashTable;