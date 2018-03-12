export default class MyObj {
  constructor(public el1: any, public el2: any) { }
  toString() {
    return `${this.el1.toString()}|${this.el2.toString()}`;
  }
}

