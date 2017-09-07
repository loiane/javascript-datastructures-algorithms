let LinkedList2 = (function () {

    class Node {
        constructor(element){
            this.element = element;
            this.next = null;
        }
    }

    const length = new WeakMap();
    const head = new WeakMap();

    class LinkedList2 {

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
                while (current.next) {
                    current = current.next;
                }

                //get last item and assign next to added item to make the link
                current.next = node;
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

                    node.next = current;
                    head.set(this, node);

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
                    head.set(this, current.next);
                } else {

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

            let index = this.indexOf(element);
            return this.removeAt(index);
        }

        indexOf(element) {

            let current = this.getHead(),
                index = 0;

            while (current) {
                if (element === current.element) {
                    return index;
                }
                index++;
                current = current.next;
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
                string = '';

            while (current) {
                string += current.element + (current.next ? ', ' : '');
                current = current.next;
            }
            return string;

        }

        print() {
            console.log(this.toString());
        }
    }

    return LinkedList2;
})();
