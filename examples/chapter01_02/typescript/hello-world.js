var myName = 'Packt';
// myName = 10;
var age = 20; // number
var existsFlag = true; // boolean
var language = 'JavaScript'; // string
var favoriteLanguage;
var langs = ['JavaScript', 'Ruby', 'Python'];
favoriteLanguage = langs[0];
function printName(person) {
    console.log(person.name);
}
var john = { name: 'John', age: 21 };
var mary = { name: 'Mary', age: 21, phone: '123-45678' };
printName(john);
printName(mary);
var MyObject = /** @class */ (function () {
    function MyObject() {
    }
    MyObject.prototype.compareTo = function (b) {
        if (this.age === b.age) {
            return 0;
        }
        return this.age > b.age ? 1 : -1;
    };
    return MyObject;
}());
function compareTwoObjects(a, b) {
    console.log(a.compareTo(b));
    console.log(b.compareTo(a));
}
