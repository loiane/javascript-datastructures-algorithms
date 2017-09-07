function Dictionary(){

    var items = {};

    this.set = function(key, value){
        items[key] = value; //{1}
    };

    this.delete = function(key){
        if (this.has(key)){
            delete items[key];
            return true;
        }
        return false;
    };

    this.has = function(key){
        return items.hasOwnProperty(key);
        //return value in items;
    };

    this.get = function(key) {
        return this.has(key) ? items[key] : undefined;
    };

    this.clear = function(){
        items = {};
    };

    this.size = function(){
        return Object.keys(items).length;
    };

    this.keys = function(){
        return Object.keys(items);
    };

    this.values = function(){
        var values = [];
        for (var k in items) {
            if (this.has(k)) {
                values.push(items[k]);
            }
        }
        return values;
    };

    this.each = function(fn) {
        for (var k in items) {
            if (this.has(k)) {
                fn(k, items[k]);
            }
        }
    };

    this.getItems = function(){
        return items;
    }
}