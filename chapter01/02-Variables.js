var num = 1; //{1}
num = 3; //{2}

var price = 1.5; //{3}
var name = 'Packt'; //{4}
var trueValue = true; //{5}
var nullVar = null; //{6}
var und;  //7

console.log("num: "+ num);
console.log("name: "+ name);
console.log("trueValue: "+ trueValue);
console.log("price: "+ price);
console.log("nullVar: "+ nullVar);
console.log("und: "+ und);

//******* EcmaScript 6: let and const keywords
// EcmaScript 6 Constants
const PI = 3.141593;
//PI = 3.0; //throws error
console.log(PI);

// EcmaScript 6: let is the new var
var framework = 'Angular';
var framework = 'React';
console.log(framework);

let language = 'JavaScript!';
//let language = 'Ruby!'; //throws error
console.log(language);

//******* Variable Scope

var myVariable = 'global';
myOtherVariable = 'global';

function myFunction(){
    var myVariable = 'local';
    return myVariable;
}

function myOtherFunction(){
    myOtherVariable = 'local';
    return myOtherVariable;
}

console.log(myVariable);   //{1}
console.log(myFunction()); //{2}

console.log(myOtherVariable);   //{3}
console.log(myOtherFunction()); //{4}
console.log(myOtherVariable);   //{5}

//******* EcmaScript 6: variables scope
let movie = 'Lord of the Rings';
//var movie = 'Batman v Superman'; //throws error, variable movie already declared

function starWarsFan(){
    let movie = 'Star Wars';
    return movie;
}

function marvelFan(){
    movie = 'The Avengers';
    return movie;
}

function blizzardFan(){
    let isFan = true;
    let phrase = 'Warcraft';
    console.log('Before if: ' + phrase);
    if (isFan){
        let phrase = 'initial text';
        phrase = 'For the Horde!';
        console.log('Inside if: ' + phrase);
    }
    phrase = 'For the Alliance!';
    console.log('After if: ' + phrase);
}

console.log(movie);
console.log(starWarsFan());
console.log(marvelFan());
console.log(movie);
blizzardFan();