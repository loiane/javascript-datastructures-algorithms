// src/08-dictionary-hash/hash-table.js

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

class HashTable {

  #table = new Map();

  #loseLoseHashCode(key) {
    const hash = key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return hash % 37;
  }

  hash(key) {
    return this.#loseLoseHashCode(key);
  }

  put(key, value) {
    const index = this.hash(key);
    if (!this.#table.has(index)) {
      this.#table.set(index, []);
    }
    const chain = this.#table.get(index);
    const existing = chain.find(pair => pair.key === key);
    if (existing) {
      existing.value = value;
    } else {
      chain.push(new KeyValuePair(key, value));
    }
    return true;
  }

  get(key) {
    const index = this.hash(key);
    const chain = this.#table.get(index);
    if (chain) {
      const pair = chain.find(p => p.key === key);
      return pair ? pair.value : undefined;
    }
    return undefined;
  }

  remove(key) {
    const index = this.hash(key);
    const chain = this.#table.get(index);
    if (!chain) return false;
    const pairIndex = chain.findIndex(p => p.key === key);
    if (pairIndex === -1) return false;
    chain.splice(pairIndex, 1);
    if (chain.length === 0) {
      this.#table.delete(index);
    }
    return true;
  }

  #elementToString(data) {
    if (typeof data === 'object' && data !== null) {
      return JSON.stringify(data);
    } else {
      return String(data);
    }
  }

  toString() {
    const lines = [];
    for (const [hash, chain] of this.#table) {
      const pairs = chain.map(p => `${p.key}: ${this.#elementToString(p.value)}`).join(', ');
      lines.push(`{${hash} => [${pairs}]}`);
    }
    return lines.join('\n');
  }
}

module.exports = HashTable;