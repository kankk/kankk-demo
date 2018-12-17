const target = {};
const handler = {
  get (target, property) {
    console.log('get', target, property);
    return target[property]
  },
  set (target, property, value) {
    console.log('set', target, property, value);
    target[property] = value;
  }
}

// const proxyTarget = new Proxy(target, handler);
// proxyTarget.testFn = (test) => {
//   console.log(test);
// }

// proxyTarget.testFn('123');

// 设置到object.proxy
// const proxyTarget = {
  // proxy: new Proxy(target, handler)
// }
// proxyTarget.proxy.name = 'kan'

// Proxy实例可以作为其他对象的原型对象
// const proxyTarget = Object.create(new Proxy(target, handler))
proxyTarget.name = 'kan'

// Proxy的拦截操作
// get(target, propKey, receiver);
// set(target, propKey, value, receiver);
// has(target, propKey);
// deleteProperty(target, propKey);
// ownKeys(target);
// getOwnPropertyDescriptor(target, propKey);
// defineProperty(target, propKey, propDesc);
// preventExtensions(target);
// getPrototypeOf(target);
// isExtensible(target);
// setPrototypeOf(target, proto);
// apply(target, object, args);
// construct(target, args);