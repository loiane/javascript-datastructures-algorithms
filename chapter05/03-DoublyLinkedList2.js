let DoublyLinkedList2 = (function () {

    class Node {
        constructor(element) {
            this.element = element;
            this.next = null;
            this.prev = null; //NEW
        }
    }

    const length = new WeakMap();
    const head = new WeakMap();
    const tail = new WeakMap(); //NEW

    class DoublyLinkedList2 {

        constructor () {
            length.set(this, 0);
            head.set(this, null);
            tail.set(this, null);
        }

        append(element) {

            let node = new Node(element),
                current, _tail;

            if (this.getHead() === null) { //first node on list
                head.set(this, node);
                tail.set(this, node); //NEW
            } else {
                //attach to the tail node //NEW
                _tail = this.getTail();
                _tail.next = node;
                node.prev = _tail;
                tail.set(this, node);
            }

            //update size of list
            let l = this.size();
            l++;
            length.set(this, l);
        }

        insert(position, element) {

            //check for out-of-bounds values
            if (position >= 0 && position <= this.size()) {

                let node = new Node(element),
                    current = this.getHead(),
                    previous,
                    index = 0;

                if (position === 0) { //add on first position

                    if (!this.getHead()) {       //NEW
                        head.set(this, node);
                        tail.set(this, node);
                    } else {
                        node.next = current;
                        current.prev = node; //NEW {1}
                        head.set(this, node);
                    }

                } else if (position === this.size()) { //last item //NEW

                    current = tail;     // {2}
                    current.next = node;
                    node.prev = current;
                    tail.set(this, node);

                } else {
                    while (index++ < position) { //{3}
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.next = node;

                    current.prev = node; //NEW
                    node.prev = previous; //NEW
                }

                //update size of list
                let l = this.size();
                l++;
                length.set(this, l);

                return true;

            } else {
                return false;
            }
        }

        removeAt(position) {

            //check for out-of-bounds values
            if (position > -1 && position < this.size()) {

                let _head = this.getHead(),
                    _tail = this.getTail(),
                    current = _head,
                    previous,
                    index = 0;

                //removing first item
                if (position === 0) {

                    _head = current.next; // {1}

                    //if there is only one item, then we update tail as well //NEW
                    if (this.size() === 1) { // {2}
                        _tail = null;
                    } else {
                        _head.prev = null; // {3}
                    }

                } else if (position === this.size() - 1) { //last item //NEW

                    current = _tail; // {4}
                    _tail = current.prev;
                    _tail.next = null;

                } else {

                    while (index++ < position) { // {5}

                        previous = current;
                        current = current.next;
                    }

                    //link previous with current's next - skip it to remove
                    previous.next = current.next; // {6}
                    current.next.prev = previous; //NEW
                }

                head.set(this,_head);
                tail.set(this,_tail);

                //update size of list
                let l = this.size();
                l--;
                length.set(this, l);

                return current.element;

            } else {
                return null;
            }
        }

        remove(element) {

            let index = this.indexOf(element);
            return this.removeAt(index);
        }

        indexOf(element) {

            let current = this.getHead(),
                index = -1;

            //check first item
            if (element == current.element) {
                return 0;
            }

            index++;

            //check in the middle of the list
            while (current.next) {

                if (element == current.element) {
                    return index;
                }

                current = current.next;
                index++;
            }

            //check last item
            if (element == current.element) {
                return index;
            }

            return -1;
        }

        isEmpty() {
            return this.size() === 0;
        }

        size() {
            return length.get(this);
        }

        toString() {

            let current = this.getHead(),
                s = current ? current.element : '';

            while (current && current.next) {
                current = current.next;
                s += ', ' + current.element;
            }

            return s;
        }

        inverseToString() {

            let current = this.getTail(),
                s = current ? current.element : '';

            while (current && current.prev) {
                current = current.prev;
                s += ', ' + current.element;
            }

            return s;
        }

        print() {
            console.log(this.toString());
        }

        printInverse() {
            console.log(this.inverseToString());
        }

        getHead() {
            return head.get(this);
        }

        getTail() {
            return tail.get(this);
        }
    }
    return DoublyLinkedList2;
})();