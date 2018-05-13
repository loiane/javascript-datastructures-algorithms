export var Node = (function () {
  function Node(element, next) {
    this.element = element;
    this.next = next;
  }
  return Node;
}());

export var DoublyNode = (function () {
  function DoublyNode(element, next, prev) {
    this.prev = prev;
    Node.call(this, element, next);
  }

  return DoublyNode;
}());
