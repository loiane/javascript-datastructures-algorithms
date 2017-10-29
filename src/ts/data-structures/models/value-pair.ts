export class ValuePair<K, V> {
  constructor(public key: K, public value: V) {}

  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}
