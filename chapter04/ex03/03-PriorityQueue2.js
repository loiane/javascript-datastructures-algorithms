let PriorityQueue2 = (function () {

    class QueueElement {
        constructor(element, priority){
            this.element = element;
            this.priority = priority;
        }
    }

    const items = new WeakMap();

    class PriorityQueue2 { //extends Queue2 { //with this approach the private properties are not reachable through inheritance

        constructor () {
            items.set(this, []);
        }

        enqueue(element, priority){
            let queueElement = new QueueElement(element, priority);

            let q = items.get(this);

            let added = false;
            for (let i=0; i<q.length; i++){
                if (queueElement.priority < q[i].priority){
                    q.splice(i,0,queueElement);
                    added = true;
                    break;
                }
            }
            if (!added){
                q.push(queueElement);
            }

            items.set(this, q);
        };

        dequeue() {
            let q = items.get(this);
            let r = q.shift();
            items.set(this, q);
            return r;
        }

        front() {
            let q = items.get(this);
            return q[0];
        }

        isEmpty(){
            return items.get(this).length == 0;
        }

        size(){
            let q = items.get(this);
            return q.length;
        }

        clear(){
            items.set(this, []);
        }

        print(){
            let q = items.get(this);
            for (let i=0; i<q.length; i++){
                console.log(`${q[i].element}  - ${q[i].priority}`);
            }
        };
    }
    return PriorityQueue2;
})();


let priorityQueue = new PriorityQueue2();
priorityQueue.enqueue("John", 2);
priorityQueue.enqueue("Jack", 1);
priorityQueue.enqueue("Camila", 1);
priorityQueue.enqueue("Maxwell", 2);
priorityQueue.enqueue("Ana", 3);
priorityQueue.print();