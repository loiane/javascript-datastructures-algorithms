import 'mocha';
import { expect } from 'chai';
import { HashTableLinearProbingLazy } from '../../../src/js/index';
import MyObj from './my-obj';

describe('HashTableLinearProbingLazy', () => {
  const A = 'Jonathan';
  const B = 'Jamie';
  const C = 'Sue';
  it('starts empty', () => {
    const hashTable = new HashTableLinearProbingLazy();
    expect(hashTable.size()).to.equal(0);
    expect(hashTable.isEmpty()).to.equal(true);
  });
  it('generates hashcode', () => {
    // numbers
    let hashTable = new HashTableLinearProbingLazy();
    expect(hashTable.hashCode(1)).to.equal(1);
    expect(hashTable.hashCode(10)).to.equal(10);
    expect(hashTable.hashCode(100)).to.equal(100);
    expect(hashTable.hashCode(1000)).to.equal(1000);
    // strings
    hashTable = new HashTableLinearProbingLazy();
    expect(hashTable.hashCode('1')).to.equal(12);
    expect(hashTable.hashCode('10')).to.equal(23);
    expect(hashTable.hashCode('100')).to.equal(34);
    expect(hashTable.hashCode('1000')).to.equal(8);
    expect(hashTable.hashCode('a')).to.equal(23);
    expect(hashTable.hashCode('A')).to.equal(28);
    expect(hashTable.hashCode('Aba')).to.equal(1);
    // objects
    hashTable = new HashTableLinearProbingLazy();
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
    const hashTable = new HashTableLinearProbingLazy();
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
    const hashTable = new HashTableLinearProbingLazy();
    for (let i = min; i <= max; i++) {
      expect(hashTable.put(i, i)).to.equal(true);
    }
    expect(hashTable.size()).to.equal(size);
    const table = hashTable.getTable();
    for (let i = min; i <= max; i++) {
      expect(table[i].key).to.equal(i);
      expect(table[i].value).to.equal(i);
    }
  });
  it('puts values with string key without collisions', () => {
    const hashTable = new HashTableLinearProbingLazy();
    expect(hashTable.put('1', 1)).to.equal(true);
    expect(hashTable.put('10', 10)).to.equal(true);
    expect(hashTable.put('100', 100)).to.equal(true);
    expect(hashTable.put('1000', 1000)).to.equal(true);
    const table = hashTable.getTable();
    expect(table[12].key).to.equal('1');
    expect(table[12].value).to.equal(1);
    expect(table[23].key).to.equal('10');
    expect(table[23].value).to.equal(10);
    expect(table[34].key).to.equal('100');
    expect(table[34].value).to.equal(100);
    expect(table[8].key).to.equal('1000');
    expect(table[8].value).to.equal(1000);
  });
  it('puts values with object key without collisions', () => {
    const hashTable = new HashTableLinearProbingLazy();
    const myObjList = [];
    for (let i = 1; i <= 5; i++) {
      myObjList.push(new MyObj(i, i + 1));
      expect(hashTable.put(myObjList[i - 1], myObjList[i - 1])).to.equal(true);
    }
    const table = hashTable.getTable();
    expect(table[1].key).to.equal(myObjList[0]);
    expect(table[1].value).to.equal(myObjList[0]);
    expect(table[3].key).to.equal(myObjList[1]);
    expect(table[3].value).to.equal(myObjList[1]);
    expect(table[5].key).to.equal(myObjList[2]);
    expect(table[5].value).to.equal(myObjList[2]);
    expect(table[7].key).to.equal(myObjList[3]);
    expect(table[7].value).to.equal(myObjList[3]);
    expect(table[9].key).to.equal(myObjList[4]);
    expect(table[9].value).to.equal(myObjList[4]);
  });
  function addValuesCollision() {
    const hashTable = new HashTableLinearProbingLazy();
    expect(hashTable.put(A, `${A}@email.com`)).to.equal(true);
    expect(hashTable.put(B, `${B}@email.com`)).to.equal(true);
    expect(hashTable.put(C, `${C}@email.com`)).to.equal(true);
    expect(hashTable.size()).to.equal(3);
    const expectedHash = 5;
    expect(hashTable.hashCode(A)).to.equal(expectedHash);
    expect(hashTable.hashCode(B)).to.equal(expectedHash);
    expect(hashTable.hashCode(C)).to.equal(expectedHash);
    expect(hashTable.size()).to.equal(3);
    return hashTable;
  }
  it('puts values with collisions', () => {
    const min = 1;
    const max = 5;
    const size = (max - min) + 1;
    const hashTable = new HashTableLinearProbingLazy();
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
      expect(table[i].key).to.equal(i);
      expect(table[i].value).to.equal(i);
      expect(table[i + size].key).to.equal(i);
      expect(table[i + size].value).to.equal(i + 10);
      expect(table[i + (size * 2)].key).to.equal(i);
      expect(table[i + (size * 2)].value).to.equal(i + 100);
    }
    addValuesCollision();
  });
  it('removes elements without collisions', () => {
    const min = 1;
    const max = 5;
    const size = (max - min) + 1;
    const hashTable = new HashTableLinearProbingLazy();
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
  it('removes elements with collisions: scenario 1', () => {
    // test all possibilities for removal
    removeWithCollision(A, B, C);
    removeWithCollision(A, C, B);
    removeWithCollision(B, A, C);
    removeWithCollision(B, C, A);
    removeWithCollision(C, A, B);
    removeWithCollision(C, B, A);
  });
  function addValuesCollision2() {
    const hashTable = new HashTableLinearProbingLazy();
    expect(hashTable.put(')', 'parenthesis@email.com')).to.equal(true);
    expect(hashTable.put(A, `${A}@email.com`)).to.equal(true);
    expect(hashTable.put('+', 'plus@email.com')).to.equal(true);
    expect(hashTable.put(B, `${B}@email.com`)).to.equal(true);
    expect(hashTable.put(',', 'comma@email.com')).to.equal(true);
    expect(hashTable.put(C, `${C}@email.com`)).to.equal(true);
    expect(hashTable.put('-', 'minus@email.com')).to.equal(true);
    expect(hashTable.put('0', 'zero@email.com')).to.equal(true);
    const expectedHash = 5;
    expect(hashTable.hashCode(A)).to.equal(expectedHash);
    expect(hashTable.hashCode(B)).to.equal(expectedHash);
    expect(hashTable.hashCode(C)).to.equal(expectedHash);
    expect(hashTable.hashCode(')')).to.equal(4);
    expect(hashTable.hashCode('+')).to.equal(6);
    expect(hashTable.hashCode(',')).to.equal(7);
    expect(hashTable.hashCode('-')).to.equal(8);
    expect(hashTable.hashCode('0')).to.equal(11);
    expect(hashTable.size()).to.equal(8);
    const table = hashTable.getTable();
    expect(table[4].key).to.equal(')');
    expect(table[5].key).to.equal(A);
    expect(table[6].key).to.equal('+');
    expect(table[7].key).to.equal(B);
    expect(table[8].key).to.equal(',');
    expect(table[9].key).to.equal(C);
    expect(table[10].key).to.equal('-');
    expect(table[11].key).to.equal('0');
    return hashTable;
  }
  function verifyOtherKeys(hashTable) {
    expect(hashTable.get(')')).to.not.equal(undefined);
    expect(hashTable.get('+')).to.not.equal(undefined);
    expect(hashTable.get(',')).to.not.equal(undefined);
    expect(hashTable.get('-')).to.not.equal(undefined);
    expect(hashTable.get('0')).to.not.equal(undefined);
  }
  function removeWithCollision2(a, b, c) {
    const hashTable = addValuesCollision2();
    expect(hashTable.remove(a)).to.equal(true);
    expect(hashTable.get(a)).to.equal(undefined);
    expect(hashTable.get(b)).to.not.equal(undefined);
    expect(hashTable.get(c)).to.not.equal(undefined);
    verifyOtherKeys(hashTable);
    expect(hashTable.remove(b)).to.equal(true);
    expect(hashTable.get(a)).to.equal(undefined);
    expect(hashTable.get(b)).to.equal(undefined);
    expect(hashTable.get(c)).to.not.equal(undefined);
    verifyOtherKeys(hashTable);
    expect(hashTable.remove(c)).to.equal(true);
    expect(hashTable.get(a)).to.equal(undefined);
    expect(hashTable.get(b)).to.equal(undefined);
    expect(hashTable.get(c)).to.equal(undefined);
    verifyOtherKeys(hashTable);
  }
  it('removes elements with collisions: scenario 2', () => {
    // test all possibilities for removal
    removeWithCollision2(A, B, C);
    removeWithCollision2(A, C, B);
    removeWithCollision2(B, A, C);
    removeWithCollision2(B, C, A);
    removeWithCollision2(C, A, B);
    removeWithCollision2(C, B, A);
  });
  it('returns toString primitive types without collisions', () => {
    const hashTable = new HashTableLinearProbingLazy();
    expect(hashTable.toString()).to.equal('');
    hashTable.put(1, 1);
    expect(hashTable.toString()).to.equal('{1 => [#1: 1]}');
    hashTable.put(2, 2);
    expect(hashTable.toString()).to.equal('{1 => [#1: 1]},{2 => [#2: 2]}');
    hashTable.clear();
    expect(hashTable.toString()).to.equal('');
  });
  it('returns toString primitive types without collisions', () => {
    const hashTable = new HashTableLinearProbingLazy();
    hashTable.put('el1', 1);
    expect(hashTable.toString()).to.equal('{36 => [#el1: 1]}');
    hashTable.put('el2', 2);
    expect(hashTable.toString()).to.equal('{0 => [#el2: 2]},{36 => [#el1: 1]}');
  });
  it('returns toString objects without collisions', () => {
    const hashTable = new HashTableLinearProbingLazy();
    let myObj = new MyObj(1, 2);
    hashTable.put(myObj, myObj);
    expect(hashTable.toString()).to.equal('{1 => [#1|2: 1|2]}');
    myObj = new MyObj(3, 4);
    hashTable.put(myObj, myObj);
    expect(hashTable.toString()).to.equal('{1 => [#1|2: 1|2]},{5 => [#3|4: 3|4]}');
  });
  it('returns toString with collisions', () => {
    const hashTable = new HashTableLinearProbingLazy();
    expect(hashTable.toString()).to.equal('');
    hashTable.put(1, 1);
    expect(hashTable.toString()).to.equal('{1 => [#1: 1]}');
    hashTable.put(2, 2);
    expect(hashTable.toString()).to.equal('{1 => [#1: 1]},{2 => [#2: 2]}');
    hashTable.put(1, 10);
    expect(hashTable.toString()).to.equal('{1 => [#1: 1]},{2 => [#2: 2]},{3 => [#1: 10]}');
    hashTable.clear();
    expect(hashTable.toString()).to.equal('');
  });
});
