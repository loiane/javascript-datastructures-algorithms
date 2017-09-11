//ES6: arrow functions
let circleArea = (r) => {
    const PI = 3.14;
    let area = PI * r * r;
    return area;
}
console.log(circleArea(2));

let circleArea2 = (r) => 3.14 * r * r;
console.log(circleArea2(2));