// es6
import sum from './vendor/sum'
console.log("sum(1, 2) = ", sum(1, 2));

// commonjs
const minus = require('./vendor/minus')
console.log("minus(1, 2) = ", minus(1, 2));

// amd
require(["./vendor/multi"], function (multi) {
  console.log("multi(1, 2) = ", multi(1, 2));
});