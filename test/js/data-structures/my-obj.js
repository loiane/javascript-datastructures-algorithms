export default class MyObj {
  constructor(el1, el2) {
    this.el1 = el1;
    this.el2 = el2;
  }

  toString() {
    return `${this.el1.toString()}|${this.el2.toString()}`;
  }
}
