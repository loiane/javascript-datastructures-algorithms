// src/08-dictionary-hash/hash-table-linear-probing.js

class HashTableLinearProbing {
  #table = [];

  #loseLoseHashCode(key) {
    if (typeof key !== 'string') {
      key = this.#elementToString(key);
    }
    const calcASCIIValue = (acc, char) => acc + char.charCodeAt(0);
    const hash = key.split('').reduce((acc, char) => calcASCIIValue, 0);
    return hash % 37; // mod to reduce the hash code
  }

  #djb2HashCode(key) {
    if (typeof key !== 'string') {
      key = this.#elementToString(key);
    }
    const calcASCIIValue = (acc, char) => (acc * 33) + char.charCodeAt(0);
    const hash = key.split('').reduce((acc, char) => calcASCIIValue, 5381);
    return hash % 1013;
  } 

  hash(key) {
    return this.#loseLoseHashCode(key);
  }

  #elementToString(data) {
    if (typeof data === 'object' && data !== null) {
      return JSON.stringify(data);
    } else {
      return data.toString(); 
    }
  }

  put(key, value) {
    if (key != null && value != null) {
      let index = this.hash(key);

      // linear probing to find an empty slot
      while (this.#table[index] != null) { 
        if (this.#table[index].key === key) {
          this.#table[index].value = value; // update existing key
          return true;
        }
        index++;
        index %= this.#table.length; // wrap around if end is reached
      }

      this.#table[index] = {key, value};
      return true;
    }
    return false;
  }

  get(key) {
    let index = this.hash(key);

    // Linear probing to search for the key
    while (this.#table[index] != null) {
      if (this.#table[index].key === key) {
        return this.#table[index].value;
      }
      index++;
      index %= this.#table.length;
    }

    return undefined; // key not found
  }

  remove(key) {
    let index = this.hash(key);
    while (this.#table[index] != null) {
      if (this.#table[index].key === key) {
        delete this.#table[index];
        this.#verifyRemoveSideEffect(key, index);
        return true;
      }
      index++;
      index %= this.#table.length;
    }
    return false; // key not found
  }

  #verifyRemoveSideEffect(key, removedPosition) {
    const size = this.#table.length;
    let index = removedPosition + 1; 
    while (this.#table[index] != null) {
      const currentKey = this.#table[index].key;
      const currentHash = this.hash(currentKey);
      // check if the element should be repositioned
      if (currentHash <= removedPosition) { 
        this.#table[removedPosition] = this.#table[index]; 
        delete this.#table[index];
        removedPosition = index; 
      }
      index++;
      index %= size; // Wrap around if end is reached
    }
  }
}
