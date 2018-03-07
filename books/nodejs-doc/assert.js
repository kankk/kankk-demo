const assert = require('assert');

// assert.deepEqual(actual, expected[, message])
// 测试actual参数与expected参数是否深度相等
// 只测试可枚举的自身属性, 不测试对象的原型
assert.deepEqual([1, 2, 3], [1, 2, 3]);
assert.deepEqual(1, '1'); // 原始值使用相等运算符==


// assert.deepStrictEqual(actual, expected[, message])
// 用法类似assert.deepEqual
// 原始值, 对象使用全等运算符===
assert.deepStrictEqual(1, 1);

// assert.strictEqual(actual, expected[, message])
// 使用全等元算法(===)测试actual与expected是否全等
assert.strictEqual(1, 1);

// assert.throws(block[, error][, message])
// 断言block函数会抛出错误
assert.throws(
  () => {
    throw new Error('错误信息');
  },
  Error
);

// assert.doesNotThrow(block[, err][, message])
// 断言block函数不会抛出错误
// 当assert.doesNotThrow()被调用时, 它会立即调用block函数
assert.doesNotThrow(() => {
  assert.deepEqual(1, 2);
});
assert.doesNotThrow(
  () => {
    throw new TypeError('抛出TypeError');
  },
  SyntaxError
);
assert.doesNotThrow(
  () => {
    throw new TypeError('抛出一个带有Got unwanted exception (TypeError)信息的AssertionError');
  },
  TypeError
);

// assert.equal(actual, expected[, message])
// 使用相等运算符(==)测试actual与expected是否相等
assert.equal(1, '1');

// assert.fail(actual, expected[, message[, operator[, stackStartFunction]]])
// 抛出AssertionError
assert.fail(1, 2);
assert.fail(1, 2, undefined, '>');

// assert.ifError(value)
// 如果value为真, 则抛出value. 可用于测试回调函数的error参数
assert.ifError(undefined);
assert.ifError(void 0);
assert.ifError(new Function());

// assert.notDeepEqual(actual, expected[, message])
// 测试actual与expected是否不深度相等. 与assert.deepEqual()相反
assert.notDeepEqual(1, 2);

// assert.notDeepStrictEqual(actual, expected[, message])
// 测试actual与expected是否不深度全等. 与assert.deepStrictEqual()相反
assert.notDeepStrictEqual({ a: 1 }, { a: '1' });

// assert.notEqual(actual, expected[, message])
// 使用不等运算符(!=)测试actual与expected是否不相等
assert.notEqual(1, 2);

// assert.notStrictEqual(actual, expected[, message])
// 使用不全等运算符(!==)测试actual与expected是否不全等
assert.notDeepStrictEqual(1, '1');

// assert.ok(value[, message])
// 测试value是否为真值
assert.ok(true);