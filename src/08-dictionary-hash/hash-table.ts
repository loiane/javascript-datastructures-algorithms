// src/08-dictionary-hash/hash-table.ts

class HashTable<V> {

  private table: V[] = [];

  #loseLoseHashCode(key: string) {
    // if (typeof key !== 'string') {
    //   key = this.#elementToString(key);
    // }
    const calcASCIIValue = (acc: number, char: string) => acc + char.charCodeAt(0);
    const hash = key.split('').reduce(calcASCIIValue, 0);
    return hash % 37;
  }

  hash(key: string) {
    return this.#loseLoseHashCode(key);
  }

  put(key: string, value: V) {
    const index = this.hash(key);
    this.table[index] = value; 
    return true;
  }

  get(key: string): V {
    const index = this.hash(key);
    return this.table[index];
  }

  remove(key: string) {
    if (key == null) {
      return false;
    }
    const index = this.hash(key);
    if (this.table[index]) {
      delete this.table[index];
      return true;
    }
    return false;
  }

  #elementToString(data: V) {
    if (typeof data === 'object' && data !== null) {
      return JSON.stringify(data);
    } else {
      return String(data); 
    }
  }

  toString() {
    const keys = Object.keys(this.table);
    let objString = `{${keys[0]} => ${this.#elementToString(this.table[Number(keys[0])])}}`;
    for (let i = 1; i < keys.length; i++) {
      const value = this.#elementToString(this.table[Number(keys[i])]);
      objString = `${objString}\n{${keys[i]} => ${value}}`;
    }
    return objString;
  }
}

export default HashTable;