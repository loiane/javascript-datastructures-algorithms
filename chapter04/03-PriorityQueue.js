function PriorityQueue() {

    this.items = [];

    function QueueElement (element, priority){
        this.element = element;
        this.priority = priority;
    }

    this.enqueue = function(element, priority){
        var queueElement = new QueueElement(element, priority);

        if (this.isEmpty()){
            this.items.push(queueElement);
        } else {
            for (var i=0; i<this.items.length; i++){
                if (queueElement.priority < this.items[i].priority){
                    this.items.splice(i,0,queueElement);
                    break;
                }
            }
        }
    };

    this.dequeue = function(){
        return this.items.shift();
    };

    this.front = function(){
        return this.items[0];
    };

    this.isEmpty = function(){
        return this.items.length == 0;
    };

    this.size = function(){
        return this.items.length;
    };

    this.print = function(){
        for (var i=0; i<this.items.length; i++){
            console.log(this.items[i].element + ' - ' + this.items[i].priority);
        }
    };
}

var priorityQueue = new PriorityQueue();
priorityQueue.enqueue("John", 2);
priorityQueue.enqueue("Jack", 1);
priorityQueue.enqueue("Camila", 1);
priorityQueue.print();

