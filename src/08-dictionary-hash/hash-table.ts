// src/08-dictionary-hash/hash-table.ts

class HashTable<V> {

  private table: V[] = [];

  #loseLoseHashCode(key: string) {
    const calcASCIIValue = (acc: number, char: string) => acc + char.charCodeAt(0);
    const hash = key.split('').reduce(calcASCIIValue, 0);
    return hash % 37;
  }

  /**
   * Computes the hash index for a given key.
   * @param key - The string key to hash
   * @returns Hash index in range [0, 36]
   * @complexity Time O(k) where k = key length | Space O(1)
   */
  hash(key: string) {
    return this.#loseLoseHashCode(key);
  }

  /**
   * Stores a value at the hash index of the given key.
   * @param key - The key to store under
   * @param value - The value to store
   * @returns true always
   * @complexity Time O(k) | Space O(1)
   */
  put(key: string, value: V) {
    const index = this.hash(key);
    this.table[index] = value;
    return true;
  }

  /**
   * Retrieves the value stored at the hash index of the given key.
   * @param key - The key to look up
   * @returns The stored value, or undefined if not found
   * @complexity Time O(k) | Space O(1)
   */
  get(key: string): V | undefined {
    const index = this.hash(key);
    return this.table[index];
  }

  /**
   * Removes the entry for the given key.
   * @param key - The key to remove
   * @returns true if removed, false if key was null or not found
   * @complexity Time O(k) | Space O(1)
   */
  remove(key: string): boolean {
    if (key == null) {
      return false;
    }
    const index = this.hash(key);
    if (this.table[index] != null) {
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

  /**
   * Returns a multi-line string of all key→value pairs in the hash table.
   * @returns String representation of all entries
   * @complexity Time O(n) | Space O(n)
   */
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