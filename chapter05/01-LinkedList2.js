let LinkedList2 = (function () {

    class Node {
        constructor(element, priority){
            this.element = element;
            this.next = null;
        }
    }

    let length = 0;
    let head = null;

    class LinkedList2 {

        append(element) {

            let node = new Node(element),
                current;

            if (head === null) { //first node on list
                head = node;
            } else {

                current = head;

                //loop the list until find last item
                while (current.next) {
                    current = current.next;
                }

                //get last item and assign next to added item to make the link
                current.next = node;
            }

            length++; //update size of list
        }

        insert(position, element) {

            //check for out-of-bounds values
            if (position >= 0 && position <= length) {

                let node = new Node(element),
                    current = head,
                    previous,
                    index = 0;

                if (position === 0) { //add on first position

                    node.next = current;
                    head = node;

                } else {
                    while (index++ < position) {
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.next = node;
                }

                length++; //update size of list

                return true;

            } else {
                return false;
            }
        }

        removeAt(position) {

            //check for out-of-bounds values
            if (position > -1 && position < length) {

                let current = head,
                    previous,
                    index = 0;

                //removing first item
                if (position === 0) {
                    head = current.next;
                } else {

                    while (index++ < position) {

                        previous = current;
                        current = current.next;
                    }

                    //link previous with current's next - skip it to remove
                    previous.next = current.next;
                }

                length--;

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

            let current = head,
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
            return length === 0;
        }

        size() {
            return length;
        }

        getHead() {
            return head;
        }

        toString() {

            let current = head,
                string = '';

            while (current) {
                string += current.element + (current.next ? '\n' : '');
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
