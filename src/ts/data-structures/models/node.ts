export class Node<K> {
  left: Node<K>;
  right: Node<K>;

  constructor(public key: K) {}

  toString() {
    return `${this.key}`;
  }
}
