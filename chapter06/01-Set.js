/**
 * ECMSCRIPT 6 already have a Set class implementation:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 * We will try to copy  the same functionalities
 * @constructor
 */
function Set() {

    var items = {};

    this.add = function(value){
        if (!this.has(value)){
            items[value] = value;
            return true;
        }
        return false;
    };

    this.remove = function(value){
        if (this.has(value)){
            delete items[value];
            return true;
        }
        return false;
    };

    this.has = function(value){
        return items.hasOwnProperty(value);
        //return value in items;
    };

    this.clear = function(){
        items = {};
    };

    /**
     * Modern browsers function
     * IE9+, FF4+, Chrome5+, Opera12+, Safari5+
     * @returns {Number}
     */
    this.size = function(){
        return Object.keys(items).length;
    };

    /**
     * cross browser compatibility - legacy browsers
     * for modern browsers use size function
     * @returns {number}
     */
    this.sizeLegacy = function(){
        var count = 0;
        for(var prop in items) {
            if(items.hasOwnProperty(prop))
                ++count;
        }
        return count;
    };

    /**
     * Modern browsers function
     * IE9+, FF4+, Chrome5+, Opera12+, Safari5+
     * @returns {Array}
     */
    this.values = function(){
        return Object.keys(items);
    };

    this.valuesLegacy = function(){
        var keys = [];
        for(var key in items){
            keys.push(key);
        }
        return keys;
    };

    this.getItems = function(){
      return items;
    };

    this.union = function(otherSet){
        var unionSet = new Set(); //{1}

        var values = this.values(); //{2}
        for (var i=0; i<values.length; i++){
            unionSet.add(values[i]);
        }

        values = otherSet.values(); //{3}
        for (var i=0; i<values.length; i++){
            unionSet.add(values[i]);
        }

        return unionSet;
    };

    this.intersection = function(otherSet){
        var intersectionSet = new Set(); //{1}

        var values = this.values();
        for (var i=0; i<values.length; i++){ //{2}
            if (otherSet.has(values[i])){    //{3}
                intersectionSet.add(values[i]); //{4}
            }
        }

        return intersectionSet;
    };

    this.difference = function(otherSet){
        var differenceSet = new Set(); //{1}

        var values = this.values();
        for (var i=0; i<values.length; i++){ //{2}
            if (!otherSet.has(values[i])){    //{3}
                differenceSet.add(values[i]); //{4}
            }
        }

        return differenceSet;
    };

    this.subset = function(otherSet){

        if (this.size() > otherSet.size()){ //{1}
            return false;
        } else {
            var values = this.values();
            for (var i=0; i<values.length; i++){ //{2}
                if (!otherSet.has(values[i])){    //{3}
                    return false; //{4}
                }
            }
            return true;
        }
    };
}