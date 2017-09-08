'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hello = hello;
exports.world = world;
// @ts-check

function hello() {
  return 'Hello World!';
}

function world() {
  return [1, 2, 3, 4].includes(3);
}

exports.default = hello;