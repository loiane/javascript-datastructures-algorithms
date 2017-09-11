class Stack {

    constructor () {
        this.items = [];
    }

    push(element){
        this.items.push(element);
    }

    pop(){
        return this.items.pop();
    }

    peek(){
        return this.items[this.items.length-1];
    }

    isEmpty(){
        return this.items.length == 0;
    }

    size(){
        return this.items.length;
    }

    clear(){
        this.items = [];
    }

    print(){
        console.log(this.toString());
    }

    toString(){
        return this.items.toString();
    }
}
