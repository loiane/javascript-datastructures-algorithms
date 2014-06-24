function Queue() {

    this.items = [];

    this.enqueue = function(element){
        this.items.push(element);
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
        console.log(this.items.toString());
    };
}
