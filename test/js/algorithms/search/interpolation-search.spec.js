import { interpolationSearch } from '../../../../src/js/index';
import { testSearchAlgorithm } from './search-algorithms-tests';

testSearchAlgorithm(interpolationSearch, 'Interpolation Search', { customEquals: false });
