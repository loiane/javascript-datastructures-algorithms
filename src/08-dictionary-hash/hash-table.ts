// src/08-dictionary-hash/hash-table.ts

class KeyValuePair<V> {
  constructor(public key: string, public value: V) {}
}

class HashTable<V> {

  private table: Map<number, KeyValuePair<V>[]> = new Map();

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
    if (!this.table.has(index)) {
      this.table.set(index, []);
    }
    const chain = this.table.get(index)!;
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
    const chain = this.table.get(index);
    if (chain) {
      const pair = chain.find(p => p.key === key);
      return pair?.value;
    }
    return undefined;
  }

  remove(key: string): boolean {
    const index = this.hash(key);
    const chain = this.table.get(index);
    if (!chain) return false;
    const pairIndex = chain.findIndex(p => p.key === key);
    if (pairIndex === -1) return false;
    chain.splice(pairIndex, 1);
    if (chain.length === 0) {
      this.table.delete(index);
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
    const lines: string[] = [];
    for (const [hash, chain] of this.table) {
      const pairs = chain.map(p => `${p.key}: ${this.#elementToString(p.value)}`).join(', ');
      lines.push(`{${hash} => [${pairs}]}`);
    }
    return lines.join('\n');
  }
}

export default HashTable;