import 'mocha';
import { expect } from 'chai';
import { HashTableSeparateChaining } from '../../../src/js/index';
import MyObj from './my-obj';

describe('HashTableSeparateChaining', () => {
  const A = 'Jonathan';
  const B = 'Jamie';
  const C = 'Sue';
  it('starts empty', () => {
    const hashTable = new HashTableSeparateChaining();
    expect(hashTable.size()).to.equal(0);
    expect(hashTable.isEmpty()).to.equal(true);
  });
  it('generates hashcode', () => {
    // numbers
    let hashTable = new HashTableSeparateChaining();
    expect(hashTable.hashCode(1)).to.equal(1);
    expect(hashTable.hashCode(10)).to.equal(10);
    expect(hashTable.hashCode(100)).to.equal(100);
    expect(hashTable.hashCode(1000)).to.equal(1000);
    // strings
    hashTable = new HashTableSeparateChaining();
    expect(hashTable.hashCode('1')).to.equal(12);
    expect(hashTable.hashCode('10')).to.equal(23);
    expect(hashTable.hashCode('100')).to.equal(34);
    expect(hashTable.hashCode('1000')).to.equal(8);
    expect(hashTable.hashCode('a')).to.equal(23);
    expect(hashTable.hashCode('A')).to.equal(28);
    expect(hashTable.hashCode('Aba')).to.equal(1);
    // objects
    hashTable = new HashTableSeparateChaining();
    const myObjList = [];
    for (let i = 1; i <= 5; i++) {
      myObjList.push(new MyObj(i, i + 1));
    }
    expect(hashTable.hashCode(myObjList[0])).to.equal(1);
    expect(hashTable.hashCode(myObjList[1])).to.equal(3);
    expect(hashTable.hashCode(myObjList[2])).to.equal(5);
    expect(hashTable.hashCode(myObjList[3])).to.equal(7);
    expect(hashTable.hashCode(myObjList[4])).to.equal(9);
  });
  it('puts undefined and null keys and values', () => {
    const hashTable = new HashTableSeparateChaining();
    expect(hashTable.put('undefined', undefined)).to.equal(false);
    expect(hashTable.get('undefined')).to.equal(undefined);
    expect(hashTable.put('undefined', 1)).to.equal(true);
    expect(hashTable.get('undefined')).to.equal(1);
    expect(hashTable.put('null', null)).to.equal(false);
    expect(hashTable.get('null')).to.equal(undefined);
    expect(hashTable.put('null', 1)).to.equal(true);
    expect(hashTable.get('null')).to.equal(1);
    hashTable.clear();
    expect(hashTable.put(undefined, undefined)).to.equal(false);
    expect(hashTable.get(undefined)).to.equal(undefined);
    expect(hashTable.put(undefined, 1)).to.equal(false);
    expect(hashTable.get(undefined)).to.equal(undefined);
    expect(hashTable.put(null, null)).to.equal(false);
    expect(hashTable.get(null)).to.equal(undefined);
    expect(hashTable.put(null, 1)).to.equal(false);
    expect(hashTable.get(null)).to.equal(undefined);
  });
  it('puts values with number key without collisions', () => {
    const min = 1;
    const max = 5;
    const size = (max - min) + 1;
    const hashTable = new HashTableSeparateChaining();
    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i)).to.equal(true);
    }
    expect(hashTable.size()).to.equal(size);
    const table = hashTable.getTable();
    for (let i = min; i <= max; i++) {
      const linkedList = table[i];
      expect(linkedList.size()).to.equal(1);
      const valuePair = linkedList.getHead();
      expect(valuePair.element.key).to.equal(i);
      expect(valuePair.element.value).to.equal(i);
    }
  });
  it('puts values with string key without collisions', () => {
    const hashTable = new HashTableSeparateChaining();
    expect(hashTable.put('1', 1)).to.equal(true);
    expect(hashTable.put('10', 10)).to.equal(true);
    expect(hashTable.put('100', 100)).to.equal(true);
    expect(hashTable.put('1000', 1000)).to.equal(true);
    const table = hashTable.getTable();
    let linkedList = table[12];
    expect(linkedList.size()).to.equal(1);
    let valuePair = linkedList.getHead();
    expect(valuePair.element.key).to.equal('1');
    expect(valuePair.element.value).to.equal(1);
    linkedList = table[23]; // eslint-disable-line prefer-destructuring
    expect(linkedList.size()).to.equal(1);
    valuePair = linkedList.getHead();
    expect(valuePair.element.key).to.equal('10');
    expect(valuePair.element.value).to.equal(10);
    linkedList = table[34]; // eslint-disable-line prefer-destructuring
    expect(linkedList.size()).to.equal(1);
    valuePair = linkedList.getHead();
    expect(valuePair.element.key).to.equal('100');
    expect(valuePair.element.value).to.equal(100);
    linkedList = table[8]; // eslint-disable-line prefer-destructuring
    expect(linkedList.size()).to.equal(1);
    valuePair = linkedList.getHead();
    expect(valuePair.element.key).to.equal('1000');
    expect(valuePair.element.value).to.equal(1000);
  });
  it('puts values with object key without collisions', () => {
    const hashTable = new HashTableSeparateChaining();
    const myObjList = [];
    for (let i = 1; i <= 5; i++) {
      myObjList.push(new MyObj(i, i + 1));
      expect(hashTable.put(myObjList[i - 1], myObjList[i - 1])).to.equal(true);
    }
    const table = hashTable.getTable();
    let linkedList = table[1];
    expect(linkedList.size()).to.equal(1);
    let valuePair = linkedList.getHead();
    expect(valuePair.element.key).to.equal(myObjList[0]);
    expect(valuePair.element.value).to.equal(myObjList[0]);
    linkedList = table[3]; // eslint-disable-line prefer-destructuring
    expect(linkedList.size()).to.equal(1);
    valuePair = linkedList.getHead();
    expect(valuePair.element.key).to.equal(myObjList[1]);
    expect(valuePair.element.value).to.equal(myObjList[1]);
    linkedList = table[5]; // eslint-disable-line prefer-destructuring
    expect(linkedList.size()).to.equal(1);
    valuePair = linkedList.getHead();
    expect(valuePair.element.key).to.equal(myObjList[2]);
    expect(valuePair.element.value).to.equal(myObjList[2]);
    linkedList = table[7]; // eslint-disable-line prefer-destructuring
    expect(linkedList.size()).to.equal(1);
    valuePair = linkedList.getHead();
    expect(valuePair.element.key).to.equal(myObjList[3]);
    expect(valuePair.element.value).to.equal(myObjList[3]);
    linkedList = table[9]; // eslint-disable-line prefer-destructuring
    expect(linkedList.size()).to.equal(1);
    valuePair = linkedList.getHead();
    expect(valuePair.element.key).to.equal(myObjList[4]);
    expect(valuePair.element.value).to.equal(myObjList[4]);
  });
  it('puts values with collisions', () => {
    const min = 1;
    const max = 5;
    const size = (max - min) + 1;
    const hashTable = new HashTableSeparateChaining();
    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i)).to.equal(true);
    }
    expect(hashTable.size()).to.equal(size);
    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i + 10)).to.equal(true);
    }
    expect(hashTable.size()).to.equal(size * 2);
    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i + 100)).to.equal(true);
    }
    expect(hashTable.size()).to.equal(size * 3);
    const table = hashTable.getTable();
    for (let i = min; i <= max; i++) {
      const linkedList = table[i];
      expect(linkedList.size()).to.equal(3);
      let valuePair = linkedList.getHead();
      expect(valuePair.element.key).to.equal(i);
      expect(valuePair.element.value).to.equal(i);
      valuePair = valuePair.next;
      expect(valuePair.element.key).to.equal(i);
      expect(valuePair.element.value).to.equal(i + 10);
      valuePair = valuePair.next;
      expect(valuePair.element.key).to.equal(i);
      expect(valuePair.element.value).to.equal(i + 100);
    }
  });
  it('removes elements without collisions', () => {
    const min = 1;
    const max = 5;
    const size = (max - min) + 1;
    const hashTable = new HashTableSeparateChaining();
    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i)).to.equal(true);
    }
    expect(hashTable.size()).to.equal(size);
    for (let i = min; i <= max; i++) {
      expect(hashTable.remove(i)).to.equal(true);
    }
    // elements do not exist
    for (let i = min; i <= max; i++) {
      expect(hashTable.remove(i)).to.equal(false);
    }
    expect(hashTable.isEmpty()).to.equal(true);
  });
  function addValuesCollision() {
    const hashTable = new HashTableSeparateChaining();
    expect(hashTable.put(A, `${A}@email.com`)).to.equal(true);
    expect(hashTable.put(B, `${B}@email.com`)).to.equal(true);
    expect(hashTable.put(C, `${C}@email.com`)).to.equal(true);
    expect(hashTable.size()).to.equal(3);
    const expectedHash = 5;
    expect(hashTable.hashCode(A)).to.equal(expectedHash);
    expect(hashTable.hashCode(B)).to.equal(expectedHash);
    expect(hashTable.hashCode(C)).to.equal(expectedHash);
    expect(hashTable.getTable()[expectedHash].size()).to.equal(3);
    return hashTable;
  }
  function removeWithCollision(a, b, c) {
    const hashTable = addValuesCollision();
    expect(hashTable.remove(a)).to.equal(true);
    expect(hashTable.get(a)).to.equal(undefined);
    expect(hashTable.get(b)).to.not.equal(undefined);
    expect(hashTable.get(c)).to.not.equal(undefined);
    expect(hashTable.remove(b)).to.equal(true);
    expect(hashTable.get(a)).to.equal(undefined);
    expect(hashTable.get(b)).to.equal(undefined);
    expect(hashTable.get(c)).to.not.equal(undefined);
    expect(hashTable.remove(c)).to.equal(true);
    expect(hashTable.get(a)).to.equal(undefined);
    expect(hashTable.get(b)).to.equal(undefined);
    expect(hashTable.get(c)).to.equal(undefined);
    expect(hashTable.isEmpty()).to.equal(true);
  }
  it('removes elements with collisions', () => {
    // test all possibilities for removal
    removeWithCollision(A, B, C);
    removeWithCollision(A, C, B);
    removeWithCollision(B, A, C);
    removeWithCollision(B, C, A);
    removeWithCollision(C, A, B);
    removeWithCollision(C, B, A);
  });
  it('returns toString primitive types without collisions', () => {
    const hashTable = new HashTableSeparateChaining();
    expect(hashTable.toString()).to.equal('');
    hashTable.put(1, 1);
    expect(hashTable.toString()).to.equal('{1 => [#1: 1]}');
    hashTable.put(2, 2);
    expect(hashTable.toString()).to.equal('{1 => [#1: 1]},{2 => [#2: 2]}');
    hashTable.clear();
    expect(hashTable.toString()).to.equal('');
  });
  it('returns toString primitive types without collisions', () => {
    const hashTable = new HashTableSeparateChaining();
    hashTable.put('el1', 1);
    expect(hashTable.toString()).to.equal('{36 => [#el1: 1]}');
    hashTable.put('el2', 2);
    expect(hashTable.toString()).to.equal('{0 => [#el2: 2]},{36 => [#el1: 1]}');
  });
  it('returns toString objects without collisions', () => {
    const hashTable = new HashTableSeparateChaining();
    let myObj = new MyObj(1, 2);
    hashTable.put(myObj, myObj);
    expect(hashTable.toString()).to.equal('{1 => [#1|2: 1|2]}');
    myObj = new MyObj(3, 4);
    hashTable.put(myObj, myObj);
    expect(hashTable.toString()).to.equal('{1 => [#1|2: 1|2]},{5 => [#3|4: 3|4]}');
  });
  it('returns toString with collisions', () => {
    const hashTable = new HashTableSeparateChaining();
    expect(hashTable.toString()).to.equal('');
    hashTable.put(1, 1);
    expect(hashTable.toString()).to.equal('{1 => [#1: 1]}');
    hashTable.put(2, 2);
    expect(hashTable.toString()).to.equal('{1 => [#1: 1]},{2 => [#2: 2]}');
    hashTable.put(1, 10);
    expect(hashTable.toString()).to.equal('{1 => [#1: 1],[#1: 10]},{2 => [#2: 2]}');
    hashTable.clear();
    expect(hashTable.toString()).to.equal('');
  });
});
