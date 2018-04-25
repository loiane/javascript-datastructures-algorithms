(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['./17-CalcArea.js', './17-Book.js'], factory);
  } else if (typeof exports !== "undefined") {
    factory(require('./17-CalcArea.js'), require('./17-Book.js'));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.CalcArea, global.Book);
    global.ES2015ES6Modules = mod.exports;
  }
})(this, function (_CalcArea, _Book) {
  'use strict';

  var area = _interopRequireWildcard(_CalcArea);

  var _Book2 = _interopRequireDefault(_Book);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  // @ts-check
  // import { circleArea, squareArea } from './17-CalcArea'; // {2}
  // import { circleArea as circle } from './17-CalcArea';

  // console.log(circleArea(2));
  // console.log(squareArea(2));

  /* Different way of importing the module  */
  // import * as area from './17-CalcArea';
  // import Book from './17-Book';

  console.log(area.circle(2)); // we need the .js to run this code in the browser

  console.log(area.square(2));

  var myBook = new _Book2.default('some title');
  myBook.printTitle();
});