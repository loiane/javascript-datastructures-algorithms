let set = new Set();

set.add(1);
console.log(set.values()); //outputs @Iterator
console.log(set.has(1));   //outputs true
console.log(set.size);   //outputs 1

set.add(2);
console.log(set.values()); //outputs [1, 2]
console.log(set.has(2));   //true
console.log(set.size);   //2

set.delete(1);
console.log(set.values()); //outputs [2]

set.delete(2);
console.log(set.values()); //outputs []

let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

let setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);

//--------- Union ----------
let unionAb = new Set();
for (let x of setA) unionAb.add(x);
for (let x of setB) unionAb.add(x);
console.log(unionAb);

//--------- Intersection ----------
let intersection = function(setA, setB){
    let intersectionSet = new Set();

    for (let x of setA){
        if (setB.has(x)){
            intersectionSet.add(x);
        }
    }

    return intersectionSet;
};
let intersectionAB = intersection(setA, setB);
console.log(intersectionAB);

//alternative - works on FF only
//intersectionAb = new Set([x for (x of setA) if (setB.has(x))]);
//console.log(intersectionAB);

//--------- Difference ----------
let difference = function(setA, setB){
    let differenceSet = new Set();

    for (let x of setA){
        if (!setB.has(x)){
            differenceSet.add(x);
        }
    }

    return differenceSet;
};
let differenceAB = difference(setA, setB);
console.log(differenceAB);

//alternative  - works on FF only
//differenceAB = new Set([x for (x of setA) if (!setB.has(x))]);
//console.log(differenceAB);
