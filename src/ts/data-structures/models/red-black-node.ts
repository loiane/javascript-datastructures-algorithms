export enum Colors {
  RED = 0,
  BLACK = 1
}

export class RedBlackNode<K> {
  left: RedBlackNode<K>;
  right: RedBlackNode<K>;
  color: Colors;

  constructor(public key: K) {}

  isRed() {
    return this.color === Colors.RED;
  }

  flipColor() {
    if (this.color === Colors.RED) {
      this.color = Colors.BLACK;
    } else {
      this.color = Colors.RED;
    }
  }

  toString() {
    return `${this.key}`;
  }
}
