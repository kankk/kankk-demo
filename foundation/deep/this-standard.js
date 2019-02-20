// this规范简述
// 1. 计算MemberExpression的结果赋值给ref
// 2. 判断ref是不是一个Reference类型
// 2.1 如果ref是Reference, 并且IsPropertyReference(ref) = true, 那么this的值为GetBase(ref)
// 2.2 如果ref是Reference, 并且base value的值是Environment Record, 那么this的值为ImplicitThisValue(ref)
// 2.3 如果ref不是Reference, 那么this的值为undefined

var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

// demo1
// bar-this指向foo
console.log(foo.bar()); // 2

// demo2
// bar-this指向foo
console.log((foo.bar)()); // 2

// demo3
console.log((foo.bar = foo.bar)()); // undefined || 1(非严格模式)

// demo4
console.log((false || foo.bar)());  // undefined || 1(非严格模式)

// demo5
console.log((foo.bar, foo.bar)());  // undefined || 1(非严格模式)