let _items = Symbol();

class Stack2 {

    constructor () {
        this[_items] = [];
    }

    push(element){
        this[_items].push(element);
    }

    pop(){
        return this[_items].pop();
    }

    peek(){
        return this[_items][this[_items].length-1];
    }

    isEmpty(){
        return this[_items].length == 0;
    }

    size(){
        return this[_items].length;
    }

    clear(){
        this[_items] = [];
    }

    print(){
        console.log(this.toString());
    }

    toString(){
        return this[_items].toString();
    }
}
