import { ValuePair } from './value-pair';

export class ValuePairLazy<K, V> extends ValuePair<K, V> {
  constructor(public key: K, public value: V, public isDeleted = false) {
    super(key, value);
  }
}
