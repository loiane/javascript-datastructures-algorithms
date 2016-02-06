function CircularLinkedList() {

    let Node = function(element){

        this.element = element;
        this.next = null;
    };

    let length = 0;
    let head = null;

    this.append = function(element){

        let node = new Node(element),
            current;

        if (head === null){ //first node on list
            head = node;
        } else {

            current = head;

            //loop the list until find last item
            while(current.next !== head){ //last element will be head instead of NULL
                current = current.next;
            }

            //get last item and assign next to added item to make the link
            current.next = node;
        }

        //set node.next to head - to have circular list
        node.next = head;

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

                node.next = current;

                //update last element
                while(current.next !== head){ //last element will be head instead of NULL
                    current = current.next;
                }

                head = node;
                current.next = head;

            } else {
                while (index++ < position){
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
    };

    this.removeAt = function(position){

        //check for out-of-bounds values
        if (position > -1 && position < length){

            let current = head,
                previous,
                index = 0;

            //removing first item
            if (position === 0){

                while(current.next !== head){ //needs to update last element first
                    current = current.next;
                }

                head = head.next;
                current.next = head;

            } else { //no need to update last element for circular list

                while (index++ < position){

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
        while(current.next !== head){

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

    this.size = function() {
        return length;
    };

    this.getHead = function(){
        return head;
    };

    this.toString = function(){

        let current = head,
            s = current.element;

        while(current.next !== head){
            current = current.next;
            s += ', ' + current.element;
        }

        return s.toString();
    };

    this.print = function(){
        console.log(this.toString());
    };
}