function PriorityQueue() {

    let items = [];

    function QueueElement (element, priority){ // {1}
        this.element = element;
        this.priority = priority;
    }

    this.enqueue = function(element, priority){
        let queueElement = new QueueElement(element, priority);

        let added = false;
        for (let i=0; i<items.length; i++){
            if (queueElement.priority < items[i].priority){ // {2}
                items.splice(i,0,queueElement);             // {3}
                added = true;
                break; // {4}
            }
        }
        if (!added){
            items.push(queueElement); //{5}
        }
    };

    this.dequeue = function(){
        return items.shift();
    };

    this.front = function(){
        return items[0];
    };

    this.isEmpty = function(){
        return items.length == 0;
    };

    this.size = function(){
        return items.length;
    };

    this.print = function(){
        for (let i=0; i<items.length; i++){
            console.log(`${items[i].element}  - ${items[i].priority}`);
        }
    };
}

let priorityQueue = new PriorityQueue();
priorityQueue.enqueue("John", 2);
priorityQueue.enqueue("Jack", 1);
priorityQueue.enqueue("Camila", 1);
priorityQueue.print();

