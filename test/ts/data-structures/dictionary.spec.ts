import 'mocha';
import { expect } from 'chai';
import { Dictionary } from '../../../src/ts/index';
import MyObj from './my-obj';

describe('Dictionary', () => {
  let dictionary: Dictionary<number, number>;

  beforeEach(() => {
    dictionary = new Dictionary<number, number>();
  });

  it('starts empty', () => {
    expect(dictionary.size()).to.equal(0);
    expect(dictionary.isEmpty()).to.equal(true);
  });

  it('sets undefined and null keys and values', () => {
    const dict = new Dictionary<string, number>();

    expect(dict.set('undefined', undefined)).to.equal(false);
    expect(dict.get('undefined')).to.equal(undefined);

    expect(dict.set('undefined', 1)).to.equal(true);
    expect(dict.get('undefined')).to.equal(1);

    expect(dict.set('null', null)).to.equal(false);
    expect(dict.get('null')).to.equal(undefined);

    expect(dict.set('null', 1)).to.equal(true);
    expect(dict.get('null')).to.equal(1);

    dict.clear();
    expect(dict.set(undefined, undefined)).to.equal(false);
    expect(dict.get(undefined)).to.equal(undefined);

    expect(dict.set(undefined, 1)).to.equal(false);
    expect(dict.get(undefined)).to.equal(undefined);

    expect(dict.set(null, null)).to.equal(false);
    expect(dict.get(null)).to.equal(undefined);

    expect(dict.set(null, 1)).to.equal(false);
    expect(dict.get(null)).to.equal(undefined);
  });

  it('sets values with string key', () => {
    const dict = new Dictionary<string, number>();
    const min = 1;
    const max = 5;
    const size = max - min + 1;

    for (let i = min; i <= max; i++) {
      expect(dict.set(`${i}`, i)).to.equal(true);
    }
    expect(dict.size()).to.equal(size);

    const keys = dict.keys();
    expect(keys.length).to.equal(size);
    for (let i = 0; i < keys.length; i++) {
      expect(keys[i]).to.equal((i + 1).toString(10));
    }

    dict.set('a', 1);
    expect(dict.get('a')).to.equal(1);
  });

  it('sets values with number key', () => {
    const min = 1;
    const max = 5;
    const size = max - min + 1;

    for (let i = min; i <= max; i++) {
      expect(dictionary.set(i, i)).to.equal(true);
    }
    expect(dictionary.size()).to.equal(size);

    const keys = dictionary.keys();
    expect(keys.length).to.equal(size);
    for (let i = 0; i < keys.length; i++) {
      expect(keys[i]).to.equal((i + 1));
    }
  });

  it('sets values with object', () => {
    const dict = new Dictionary<MyObj, MyObj>();
    const min = 0;
    const max = 5;
    const size = max - min;
    const myObjList = [];

    for (let i = min; i < max; i++) {
      myObjList.push(new MyObj(i, (i + 1)));
    }

    for (let i = min; i < max; i++) {
      expect(dict.set(myObjList[i], myObjList[i])).to.equal(true);
    }
    expect(dict.size()).to.equal(size);

    for (let i = min; i < max; i++) {
      expect(dict.get(myObjList[i])).to.equal(myObjList[i]);
    }

    const keys = dict.keys();
    expect(keys.length).to.equal(size);
    for (let i = 0; i < keys.length; i++) {
      expect(keys[i]).to.equal(myObjList[i]);
    }

    const values = dict.values();
    expect(values.length).to.equal(size);
    for (let i = 0; i < values.length; i++) {
      expect(values[i]).to.equal(myObjList[i]);
    }
  });

  function customToString(key: MyObj) {
    return `####${key.toString()}`;
  }

  it('sets values with custom toString function', () => {
    const dict = new Dictionary<MyObj, MyObj>(customToString);
    const min = 0;
    const max = 5;
    const size = max - min;
    const myObjList = [];

    for (let i = min; i < max; i++) {
      myObjList.push(new MyObj(i, (i + 1)));
    }

    for (let i = min; i < max; i++) {
      expect(dict.set(myObjList[i], myObjList[i])).to.equal(true);
    }
    expect(dict.size()).to.equal(size);

    for (let i = min; i < max; i++) {
      expect(dict.get(myObjList[i])).to.equal(myObjList[i]);
    }

    const keys = dict.keys();
    expect(keys.length).to.equal(size);
    for (let i = 0; i < keys.length; i++) {
      expect(keys[i]).to.equal(myObjList[i]);
    }

    const values = dict.values();
    expect(values.length).to.equal(size);
    for (let i = 0; i < values.length; i++) {
      expect(values[i]).to.equal(myObjList[i]);
    }
  });

  it('removes elements', () => {
    const min = 1;
    const max = 5;
    const size = max - min + 1;

    for (let i = min; i <= max; i++) {
      expect(dictionary.set(i, i)).to.equal(true);
    }
    expect(dictionary.size()).to.equal(size);

    for (let i = min; i <= max; i++) {
      expect(dictionary.remove(i)).to.equal(true);
    }

    // elements do not exist
    for (let i = min; i <= max; i++) {
      expect(dictionary.remove(i)).to.equal(false);
    }

    expect(dictionary.isEmpty()).to.equal(true);
  });

  it('returns the correct size', () => {
    expect(dictionary.size()).to.equal(0);

    const max = 5;

    for (let i = 1; i < max; i++) {
      dictionary.set(i, i);
      expect(dictionary.size()).to.equal(i);
    }
    for (let i = 1; i < max; i++) {
      dictionary.remove(i);
      expect(dictionary.size()).to.equal(max - i - 1);
    }

    expect(dictionary.size()).to.equal(0);
    expect(dictionary.isEmpty()).to.equal(true);
  });

  it('returns if element exists', () => {
    const min = 1;
    const max = 5;
    const size = max - min + 1;

    for (let i = min; i <= max; i++) {
      expect(dictionary.set(i, i)).to.equal(true);
    }
    expect(dictionary.size()).to.equal(size);

    for (let i = min; i <= max; i++) {
      expect(dictionary.hasKey(i)).to.equal(true);
      expect(dictionary.remove(i)).to.equal(true);
      expect(dictionary.hasKey(i)).to.equal(false);
    }
  });

  it('returns if it is empty', () => {
    expect(dictionary.isEmpty()).to.equal(true);

    for (let i = 1; i < 5; i++) {
      dictionary.set(i, i);
      expect(dictionary.isEmpty()).to.equal(false);
    }

    for (let i = 1; i < 5; i++) {
      dictionary.remove(i);
      expect(dictionary.isEmpty()).to.equal(!(i < 4));
    }

    expect(dictionary.size()).to.equal(0);
    expect(dictionary.isEmpty()).to.equal(true);
  });

  it('clears the dictionary', () => {
    dictionary.clear();
    expect(dictionary.isEmpty()).to.equal(true);

    dictionary.set(1, 1);
    dictionary.set(2, 2);

    dictionary.clear();
    expect(dictionary.isEmpty()).to.equal(true);
  });

  it('returns values, keys and value pairs', () => {
    const min = 1;
    const max = 5;
    const size = max - min + 1;

    for (let i = min; i <= max; i++) {
      expect(dictionary.set(i, i)).to.equal(true);
    }
    expect(dictionary.size()).to.equal(size);

    const keys = dictionary.keys();
    const values = dictionary.values();
    const valuePairs = dictionary.keyValues();
    expect(keys.length).to.equal(size);
    expect(values.length).to.equal(size);
    expect(valuePairs.length).to.equal(size);
    for (let i = 0; i < keys.length; i++) {
      expect(keys[i]).to.equal((i + 1));
      expect(values[i]).to.equal((i + 1));
      expect(valuePairs[i].key).to.equal((i + 1));
      expect(valuePairs[i].value).to.equal((i + 1));
    }
  });

  it('allows to iterate with forEach', () => {
    for (let i = 1; i <= 5; i++) {
      expect(dictionary.set(i, i)).to.equal(true);
    }

    dictionary.forEach((k, v) => {
      expect(dictionary.hasKey(k)).to.equal(true);
      expect(dictionary.get(k)).to.equal(v);
    });
  });

  it('allows to iterate with forEach and interrupt', () => {
    for (let i = 1; i <= 5; i++) {
      expect(dictionary.set(i, i)).to.equal(true);
    }

    const size = dictionary.keys().length;

    let index = 1;
    dictionary.forEach((k, v) => {
      expect(dictionary.hasKey(k)).to.equal(true);
      expect(dictionary.get(k)).to.equal(v);
      index++;
    });
    expect(index).to.equal(size + 1);

    index = 1;
    dictionary.forEach((k, v) => {
      expect(dictionary.hasKey(k)).to.equal(true);
      expect(dictionary.get(k)).to.equal(v);
      index++;
      return !(k % 3 === 0);
    });
    expect(index).to.equal(size - 1);
  });

  it('returns toString primitive types', () => {
    expect(dictionary.toString()).to.equal('');

    dictionary.set(1, 1);
    expect(dictionary.toString()).to.equal('[#1: 1]');

    dictionary.set(2, 2);
    expect(dictionary.toString()).to.equal('[#1: 1],[#2: 2]');

    dictionary.clear();
    expect(dictionary.toString()).to.equal('');
  });

  it('returns toString primitive types: string', () => {
    const dict = new Dictionary<string, number>();
    dict.set('el1', 1);
    expect(dict.toString()).to.equal('[#el1: 1]');

    dict.set('el2', 2);
    expect(dict.toString()).to.equal('[#el1: 1],[#el2: 2]');
  });

  it('returns toString objects', () => {
    const dict = new Dictionary<MyObj, MyObj>();
    expect(dict.toString()).to.equal('');

    let myObj = new MyObj(1, 2);
    dict.set(myObj, myObj);
    expect(dict.toString()).to.equal('[#1|2: 1|2]');

    myObj = new MyObj(3, 4);
    dict.set(myObj, myObj);
    expect(dict.toString()).to.equal('[#1|2: 1|2],[#3|4: 3|4]');
  });

});
