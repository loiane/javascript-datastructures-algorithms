let Stack3 = (function () {

    const items = new WeakMap();

    class Stack3 {

        constructor () {
            items.set(this, []);
        }

        push(element){
            let s = items.get(this);
            s.push(element);
        }

        pop(){
            let s = items.get(this);
            let r = s.pop();
            return r;
        }

        peek(){
            let s = items.get(this);
            return s[s.length-1];
        }

        isEmpty(){
            return items.get(this).length == 0;
        }

        size(){
            let s = items.get(this);
            return s.length;
        }

        clear(){
            items.set(this, []);
        }

        print(){
            console.log(this.toString());
        }

        toString(){
            return items.get(this).toString();
        }
    }

    return Stack3;
})();

