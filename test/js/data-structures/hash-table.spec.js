import 'mocha';
import { expect } from 'chai';
import { HashTable } from '../../../src/js/index';
import MyObj from './my-obj';

describe('HashTable', () => {
  it('starts empty', () => {
    const hashTable = new HashTable();
    expect(hashTable.size()).to.equal(0);
    expect(hashTable.isEmpty()).to.equal(true);
  });
  it('generates hashcode', () => {
    // numbers
    let hashTable = new HashTable();
    expect(hashTable.hashCode(1)).to.equal(1);
    expect(hashTable.hashCode(10)).to.equal(10);
    expect(hashTable.hashCode(100)).to.equal(100);
    expect(hashTable.hashCode(1000)).to.equal(1000);
    // strings
    hashTable = new HashTable();
    expect(hashTable.hashCode('1')).to.equal(12);
    expect(hashTable.hashCode('10')).to.equal(23);
    expect(hashTable.hashCode('100')).to.equal(34);
    expect(hashTable.hashCode('1000')).to.equal(8);
    expect(hashTable.hashCode('a')).to.equal(23);
    expect(hashTable.hashCode('A')).to.equal(28);
    expect(hashTable.hashCode('Aba')).to.equal(1);
    // objects
    hashTable = new HashTable();
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
    const hashTable = new HashTable();
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
  it('puts values with number key', () => {
    const min = 1;
    const max = 5;
    const size = (max - min) + 1;
    const hashTable = new HashTable();
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
  it('puts values with string key', () => {
    const hashTable = new HashTable();
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
  it('puts values with object key', () => {
    const hashTable = new HashTable();
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
  it('does NOT handle collision, replaces values', () => {
    const hashTable = new HashTable();
    for (let i = 0; i < 5; i++) {
      expect(hashTable.put(1, i)).to.equal(true);
    }
    expect(hashTable.size()).to.equal(1);
  });
  it('removes elements', () => {
    const min = 1;
    const max = 5;
    const size = (max - min) + 1;
    const hashTable = new HashTable();
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
  it('returns toString primitive types', () => {
    const hashTable = new HashTable();
    expect(hashTable.toString()).to.equal('');
    hashTable.put(1, 1);
    expect(hashTable.toString()).to.equal('{1 => [#1: 1]}');
    hashTable.put(2, 2);
    expect(hashTable.toString()).to.equal('{1 => [#1: 1]},{2 => [#2: 2]}');
    hashTable.clear();
    expect(hashTable.toString()).to.equal('');
  });
  it('returns toString primitive types', () => {
    const hashTable = new HashTable();
    hashTable.put('el1', 1);
    expect(hashTable.toString()).to.equal('{36 => [#el1: 1]}');
    hashTable.put('el2', 2);
    expect(hashTable.toString()).to.equal('{0 => [#el2: 2]},{36 => [#el1: 1]}');
  });
  it('returns toString objects', () => {
    const hashTable = new HashTable();
    let myObj = new MyObj(1, 2);
    hashTable.put(myObj, myObj);
    expect(hashTable.toString()).to.equal('{1 => [#1|2: 1|2]}');
    myObj = new MyObj(3, 4);
    hashTable.put(myObj, myObj);
    expect(hashTable.toString()).to.equal('{1 => [#1|2: 1|2]},{5 => [#3|4: 3|4]}');
  });
});
