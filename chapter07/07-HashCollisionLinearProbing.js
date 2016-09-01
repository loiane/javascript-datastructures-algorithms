function HashLinearProbing(){

    var table = [];

    var ValuePair = function(key, value){
        this.key = key;
        this.value = value;

        this.toString = function() {
            return '[' + this.key + ' - ' + this.value + ']';
        }
    };

    var loseloseHashCode = function (key) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    };

    var hashCode = function(key){
        return loseloseHashCode(key);
    };

    this.put = function(key, value){
        var position = hashCode(key);
        console.log(position + ' - ' + key);

        if (table[position] == undefined) {
            table[position] = new ValuePair(key, value);
        } else {
            var index = ++position;
            while (table[index] != undefined){
                index++;
            }
            table[index] = new ValuePair(key, value);
        }
    };

    this.get = function(key) {
        var position = hashCode(key);

        if (table[position] !== undefined){
            if (table[position].key === key) {
                return table[position].value;
            } else {
                var index = ++position;
                while (table[index] !== undefined && (table[index] && table[index].key !== key)){
                    index++;
                }
                if (table[index] && table[index].key === key) {
                    return table[index].value;
                }
            }
        }
        return undefined;
    };

    this.remove = function(key){
        var position = hashCode(key);

        if (table[position] !== undefined){
            if (table[position].key === key) {
                table[position] = undefined;
            } else {
                var index = ++position;
                while (table[index] === undefined || table[index].key !== key){
                    index++;
                }
                if (table[index].key === key) {
                    table[index] = undefined;
                }
            }
        }
    };

    this.print = function() {
        for (var i = 0; i < table.length; ++i) {
            if (table[i] !== undefined) {
                console.log(i + ' -> ' + table[i].toString());
            }
        }
    };
}
