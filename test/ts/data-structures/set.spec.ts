import 'mocha';
import { expect } from 'chai';
import { Set } from '../../../src/ts/index';
import MyObj from './my-obj';

describe('Set', () => {
  let set: Set<number>;

  beforeEach(() => {
    set = new Set<number>();
  });

  it('starts empty', () => {
    expect(set.size()).to.equal(0);
    expect(set.isEmpty()).to.equal(true);
  });

  it('adds elements', () => {
    for (let i = 1; i < 5; i++) {
      set.add(i);
      expect(set.size()).to.equal(i);
    }

    expect(set.isEmpty()).to.equal(false);
  });

  it('does not allow duplicated elements', () => {
    let expected = true;
    for (let i = 1; i < 5; i++) {
      expect(set.add(i)).to.equal(expected);
    }

    expected = false;
    for (let i = 1; i < 5; i++) {
      expect(set.add(i)).to.equal(expected);
    }
  });

  it('deletes elements', () => {
    for (let i = 1; i < 5; i++) {
      set.add(i);
    }

    for (let i = 1; i < 5; i++) {
      expect(set.delete(i)).to.equal(true);
    }

    // elements do not exist
    for (let i = 1; i < 5; i++) {
      expect(set.delete(i)).to.equal(false);
    }

    expect(set.isEmpty()).to.equal(true);
  });

  it('returns if element exists', () => {
    for (let i = 1; i < 5; i++) {
      set.add(i);
      expect(set.has(i)).to.equal(true);
    }

    for (let i = 1; i < 5; i++) {
      expect(set.delete(i)).to.equal(true);
      expect(set.has(i)).to.equal(false);
    }
  });

  it('returns the correct size', () => {
    expect(set.size()).to.equal(0);

    for (let i = 1; i < 5; i++) {
      set.add(i);
      expect(set.size()).to.equal(i);
    }

    const max = 5;
    for (let i = 1; i < max; i++) {
      set.delete(i);
      expect(set.size()).to.equal(max - i - 1);
    }

    expect(set.size()).to.equal(0);
    expect(set.isEmpty()).to.equal(true);
  });

  it('returns if it is empty', () => {
    expect(set.isEmpty()).to.equal(true);

    for (let i = 1; i < 5; i++) {
      set.add(i);
      expect(set.isEmpty()).to.equal(false);
    }

    for (let i = 1; i < 5; i++) {
      set.delete(i);
      expect(set.isEmpty()).to.equal(!(i < 4));
    }

    expect(set.size()).to.equal(0);
    expect(set.isEmpty()).to.equal(true);
  });

  it('clears the set', () => {
    set.clear();
    expect(set.isEmpty()).to.equal(true);

    set.add(1);
    set.add(2);

    set.clear();
    expect(set.isEmpty()).to.equal(true);
  });

  function addValues(min: number, max: number) {
    set = new Set();

    for (let i = min; i <= max; i++) {
      set.add(i);
    }

    return set;
  }

  it('union between empty sets', () => {
    const set1 = new Set();
    const set2 = new Set();

    let setResult = set1.union(set2);
    expect(setResult.isEmpty()).to.equal(true);

    setResult = set2.union(set1);
    expect(setResult.isEmpty()).to.equal(true);
  });

  it('union between equal sets', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(1, 5);

    let setResult = set1.union(set2);
    for (let i = 1; i <= 5; i++) {
      expect(setResult.has(i)).to.equal(true);
    }

    setResult = set2.union(set1);
    for (let i = 1; i <= 5; i++) {
      expect(setResult.has(i)).to.equal(true);
    }
  });

  it('union between different sets', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(6, 10);

    let setResult = set1.union(set2);
    for (let i = 1; i <= 10; i++) {
      expect(setResult.has(i)).to.equal(true);
    }

    setResult = set2.union(set1);
    for (let i = 1; i <= 10; i++) {
      expect(setResult.has(i)).to.equal(true);
    }
  });

  it('union between sets with common values', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(3, 6);

    let setResult = set1.union(set2);
    for (let i = 1; i <= 6; i++) {
      expect(setResult.has(i)).to.equal(true);
    }

    setResult = set2.union(set1);
    for (let i = 1; i <= 6; i++) {
      expect(setResult.has(i)).to.equal(true);
    }
  });

  it('intersection between empty sets', () => {
    const set1 = new Set();
    const set2 = new Set();

    let setResult = set1.intersection(set2);
    expect(setResult.isEmpty()).to.equal(true);

    setResult = set2.intersection(set1);
    expect(setResult.isEmpty()).to.equal(true);
  });

  it('intersection between equal sets', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(1, 5);

    let setResult = set1.intersection(set2);
    for (let i = 1; i <= 5; i++) {
      expect(setResult.has(i)).to.equal(true);
    }

    setResult = set2.intersection(set1);
    for (let i = 1; i <= 5; i++) {
      expect(setResult.has(i)).to.equal(true);
    }
  });

  it('intersection different sets', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(6, 10);

    let setResult = set1.intersection(set2);
    expect(setResult.isEmpty()).to.equal(true);

    setResult = set2.intersection(set1);
    expect(setResult.isEmpty()).to.equal(true);
  });

  it('intersection between sets with common values', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(3, 6);

    let setResult = set1.intersection(set2);
    for (let i = 3; i <= 5; i++) {
      expect(setResult.has(i)).to.equal(true);
    }

    setResult = set2.intersection(set1);
    for (let i = 3; i <= 5; i++) {
      expect(setResult.has(i)).to.equal(true);
    }
  });

  it('difference between empty sets', () => {
    const set1 = new Set();
    const set2 = new Set();

    let setResult = set1.difference(set2);
    expect(setResult.isEmpty()).to.equal(true);

    setResult = set2.difference(set1);
    expect(setResult.isEmpty()).to.equal(true);
  });

  it('difference between equal sets', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(1, 5);

    let setResult = set1.difference(set2);
    expect(setResult.isEmpty()).to.equal(true);

    setResult = set2.difference(set1);
    expect(setResult.isEmpty()).to.equal(true);
  });

  it('difference different sets', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(6, 10);

    let setResult = set1.difference(set2);
    for (let i = 1; i <= 5; i++) {
      expect(setResult.has(i)).to.equal(true);
    }

    setResult = set2.difference(set1);
    for (let i = 6; i <= 10; i++) {
      expect(setResult.has(i)).to.equal(true);
    }
  });

  it('difference between sets with common values', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(3, 6);

    let setResult = set1.difference(set2);
    for (let i = 1; i <= 2; i++) {
      expect(setResult.has(i)).to.equal(true);
    }

    setResult = set2.difference(set1);
    for (let i = 6; i <= 6; i++) {
      expect(setResult.has(i)).to.equal(true);
    }
  });

  it('isSubsetOf between empty sets', () => {
    const set1 = new Set();
    const set2 = new Set();

    expect(set1.isSubsetOf(set2)).to.equal(true);
    expect(set2.isSubsetOf(set1)).to.equal(true);
  });

  it('isSubsetOf between equal sets', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(1, 5);

    expect(set1.isSubsetOf(set2)).to.equal(true);
    expect(set2.isSubsetOf(set1)).to.equal(true);
  });

  it('isSubsetOf different sets', () => {
    const set1 = addValues(1, 5);
    const set2 = addValues(6, 10);

    expect(set1.isSubsetOf(set2)).to.equal(false);
    expect(set2.isSubsetOf(set1)).to.equal(false);
  });

  it('isSubsetOf between sets with common values', () => {
    const set1 = addValues(1, 8);
    const set2 = addValues(3, 6);
    expect(set1.isSubsetOf(set2)).to.equal(false);
    expect(set2.isSubsetOf(set1)).to.equal(true);

    const set3 = addValues(1, 5);
    const set4 = addValues(3, 6);
    expect(set3.isSubsetOf(set4)).to.equal(false);
    expect(set4.isSubsetOf(set3)).to.equal(false);
  });

  it('returns toString primitive types', () => {
    expect(set.toString()).to.equal('');

    set.add(1);
    expect(set.toString()).to.equal('1');

    set.add(2);
    expect(set.toString()).to.equal('1,2');

    set.clear();
    expect(set.toString()).to.equal('');
  });

  it('returns toString primitive types: string', () => {
    const ds = new Set<string>();
    ds.add('el1');
    expect(ds.toString()).to.equal('el1');

    ds.add('el2');
    expect(ds.toString()).to.equal('el1,el2');
  });

  it('returns toString objects', () => {
    const ds = new Set<MyObj>();
    expect(ds.toString()).to.equal('');

    ds.add(new MyObj(1, 2));
    expect(ds.toString()).to.equal('1|2');

    ds.add(new MyObj(3, 4));
    expect(ds.toString()).to.equal('1|2,3|4');
  });
});
