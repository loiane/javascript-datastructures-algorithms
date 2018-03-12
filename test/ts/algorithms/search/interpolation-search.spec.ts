import { interpolationSearch } from '../../../../src/ts/index';
import { testSearchAlgorithm } from './search-algorithms-tests';

testSearchAlgorithm(interpolationSearch, 'Interpolation Search', { customEquals: false });

