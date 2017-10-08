import { hotPotato } from '../../../src/ts/others/hot-potato';
import 'mocha';
import { expect } from 'chai';

describe('Hot Potato with Queue', () => {

  it('Hot potato game', () => {
    const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
    expect(hotPotato(names, 6).winner).to.equal('Ingrid');
    expect(hotPotato(names, 7).winner).to.equal('John');
    expect(hotPotato(names, 8).winner).to.equal('Jack');
    expect(hotPotato(names, 9).winner).to.equal('Ingrid');
    expect(hotPotato(names, 10).winner).to.equal('Carl');
  });

});
