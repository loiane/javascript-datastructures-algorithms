// src/08-dictionary-hash/dictionary.js

class Dictionary {
  #items = {};
  #size = 0;

  hasKey(key) {
    return this.#items[this.#elementToString(key)] != null;
  }

  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.#elementToString(key);
      this.#items[tableKey] = value;
      this.#size++;
      return true;
    }
    return false;
  }

  delete(key) {
    if (this.hasKey(key)) {
      delete this.#items[this.#elementToString(key)];
      this.#size--;
      return true;
    }
    return false;
  }

  get(key) {
    return this.#items[this.#elementToString(key)];
  }

  values() {
    return Object.values(this.#items);
  }

  keys() {
    return Object.keys(this.#items);
  }

  forEach(callbackFn) {
    for (const key in this.#items) {
      if (this.#items.hasOwnProperty(key)) {
        callbackFn(this.#items[key], key);
      }
    }
  }

  #elementToString(data) {
    if (typeof data === 'object' && data !== null) {
      return JSON.stringify(data);
    } else {
      return data.toString(); 
    }
  }
}

module.exports = Dictionary;