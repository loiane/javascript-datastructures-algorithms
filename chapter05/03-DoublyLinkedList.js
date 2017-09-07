function DoublyLinkedList() {

    let Node = function(element){

        this.element = element;
        this.next = null;
        this.prev = null; //NEW
    };

    let length = 0;
    let head = null;
    let tail = null; //NEW

    this.append = function(element){

        let node = new Node(element),
            current;

        if (head === null){ //first node on list
            head = node;
            tail = node; //NEW
        } else {

            //attach to the tail node //NEW
            tail.next = node;
            node.prev = tail;
            tail = node;
        }

        length++; //update size of list
    };

    this.insert = function(position, element){

        //check for out-of-bounds values
        if (position >= 0 && position <= length){

            let node = new Node(element),
                current = head,
                previous,
                index = 0;

            if (position === 0){ //add on first position

                if (!head){       //NEW
                    head = node;
                    tail = node;
                } else {
                    node.next = current;
                    current.prev = node; //NEW {1}
                    head = node;
                }

            } else  if (position === length) { //last item //NEW

                current = tail;     // {2}
                current.next = node;
                node.prev = current;
                tail = node;

            } else {
                while (index++ < position){ //{3}
                    previous = current;
                    current = current.next;
                }
                node.next = current;
                previous.next = node;

                current.prev = node; //NEW
                node.prev = previous; //NEW
            }

            length++; //update size of list

            return true;

        } else {
            return false;
        }
    };

    this.removeAt = function(position){

        //check for out-of-bounds values
        if (position > -1 && position < length){

            let current = head,
                previous,
                index = 0;

            //removing first item
            if (position === 0){

                head = current.next; // {1}

                //if there is only one item, then we update tail as well //NEW
                if (length === 1){ // {2}
                    tail = null;
                } else {
                    head.prev = null; // {3}
                }

            } else if (position === length-1){ //last item //NEW

                current = tail; // {4}
                tail = current.prev;
                tail.next = null;

            } else {

                while (index++ < position){ // {5}

                    previous = current;
                    current = current.next;
                }

                //link previous with current's next - skip it to remove
                previous.next = current.next; // {6}
                current.next.prev = previous; //NEW
            }

            length--;

            return current.element;

        } else {
            return null;
        }
    };

    this.remove = function(element){

        let index = this.indexOf(element);
        return this.removeAt(index);
    };

    this.indexOf = function(element){

        let current = head,
            index = -1;

        //check first item
        if (element == current.element){
            return 0;
        }

        index++;

        //check in the middle of the list
        while(current.next){

            if (element == current.element){
                return index;
            }

            current = current.next;
            index++;
        }

        //check last item
        if (element == current.element){
            return index;
        }

        return -1;
    };

    this.isEmpty = function() {
        return length === 0;
    };

    this. size = function() {
        return length;
    };

    this.toString = function(){

        let current = head,
            s = current ? current.element : '';

        while(current && current.next){
            current = current.next;
            s += ', ' + current.element;
        }

        return s;
    };

    this.inverseToString = function() {

        let current = tail,
            s = current ? current.element : '';

        while(current && current.prev){
            current = current.prev;
            s += ', ' + current.element;
        }

        return s;
    };

    this.print = function(){
        console.log(this.toString());
    };

    this.printInverse = function(){
        console.log(this.inverseToString());
    };

    this.getHead = function(){
        return head;
    };

    this.getTail = function(){
        return tail;
    }
}