let CircularLinkedList2 = (function () {

    class Node {
        constructor(element) {
            this.element = element;
            this.next = null;
        }
    }

    const length = new WeakMap();
    const head = new WeakMap();

    class CircularLinkedList2 {

        constructor () {
            length.set(this, 0);
            head.set(this, null);
        }

        append(element) {

            let node = new Node(element),
                current;

            if (this.getHead() === null) { //first node on list
                head.set(this, node);
            } else {

                current = this.getHead();

                //loop the list until find last item
                while (current.next !== this.getHead()) { //last element will be head instead of NULL
                    current = current.next;
                }

                //get last item and assign next to added item to make the link
                current.next = node;
            }

            //set node.next to head - to have circular list
            node.next = this.getHead();

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

                    node.next = current;

                    //update last element
                    while (current.next !== this.getHead()) { //last element will be head instead of NULL
                        current = current.next;
                    }

                    head.set(this, node);
                    current.next = this.getHead();

                } else {
                    while (index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.next = node;
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

                let current = this.getHead(),
                    previous,
                    index = 0;

                //removing first item
                if (position === 0) {

                    while (current.next !== this.getHead()) { //needs to update last element first
                        current = current.next;
                    }

                    head.set(this, this.getHead().next);
                    current.next = this.getHead();

                } else { //no need to update last element for circular list

                    while (index++ < position) {

                        previous = current;
                        current = current.next;
                    }

                    //link previous with current's next - skip it to remove
                    previous.next = current.next;
                }

                let l = this.size();
                l--;
                length.set(this, l);

                return current.element;

            } else {
                return null;
            }
        }

        remove(element) {

            let index = indexOf(element);
            return removeAt(index);
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
            while (current.next !== this.getHead()) {

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

        getHead() {
            return head.get(this);
        }

        toString() {

            let current = this.getHead(),
                s = current.element;

            while (current.next !== this.getHead()) {
                current = current.next;
                s += ', ' + current.element;
            }

            return s.toString();
        }

        print() {
            console.log(this.toString());
        }
    }
    return CircularLinkedList2;
})();