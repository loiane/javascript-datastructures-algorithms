// src/08-dictionary-hash/hash-table.ts

class KeyValuePair<V> {
  constructor(public key: string, public value: V) {}
}

class HashTable<V> {

  private table: KeyValuePair<V>[][] = [];

  #loseLoseHashCode(key: string) {
    const calcASCIIValue = (acc: number, char: string) => acc + char.charCodeAt(0);
    const hash = key.split('').reduce(calcASCIIValue, 0);
    return hash % 37;
  }

  hash(key: string) {
    return this.#loseLoseHashCode(key);
  }

  put(key: string, value: V) {
    const index = this.hash(key);
    if (this.table[index] == null) {
      this.table[index] = [];
    }
    const chain = this.table[index];
    const existing = chain.find(pair => pair.key === key);
    if (existing) {
      existing.value = value;
    } else {
      chain.push(new KeyValuePair(key, value));
    }
    return true;
  }

  get(key: string): V | undefined {
    const index = this.hash(key);
    const chain = this.table[index];
    if (chain != null) {
      const pair = chain.find(p => p.key === key);
      return pair?.value;
    }
    return undefined;
  }

  remove(key: string): boolean {
    const index = this.hash(key);
    const chain = this.table[index];
    if (chain == null) return false;
    const pairIndex = chain.findIndex(p => p.key === key);
    if (pairIndex === -1) return false;
    chain.splice(pairIndex, 1);
    if (chain.length === 0) {
      delete this.table[index];
    }
    return true;
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
    return keys.map(k => {
      const chain = this.table[Number(k)];
      const pairs = chain.map(p => `${p.key}: ${this.#elementToString(p.value)}`).join(', ');
      return `{${k} => [${pairs}]}`;
    }).join('\n');
  }
}

export default HashTable;