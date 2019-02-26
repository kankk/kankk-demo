// Promise的最小实现

// 构造函数
function Promise(executor) {
  const self = this;
  self.status = 'pending'; // Promise当前的状态
  self.data = undefined; // Promise的值
  self.onResolvedCallback = []; // Promise resolve时的回调函数集, 因为在Promise结束之前有可能有多个回调添加到它上面
  self.onRejectdCallback = []; // Promise reject时的回调函数集, 因为在Promise结束之前有可能有多个回调添加到它上面

  // 考虑到this的绑定
  // 要么这两个函数是经过bind后传给executor,
  // 要么它们定义在构造函数的内部, 使用self来访问所属的Promise对象

  function resolve(value) {
    if (self.status === 'pending') {
      self.status = 'resolved';
      self.data = value;
      for (let i = 0; i < self.onResolvedCallback.length; i++) {
        self.onResolvedCallback[i](value);
      }
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      self.status = 'rejected';
      self.data = reason;
      for (let i = 0; i < self.onRejectdCallback.length; i++) {
        self.onRejectdCallback[i](reason);
      }
    }
  }

  try {
    // 考虑到执行executor的过程中有可能出错
    // 所以用try/catch抱起来, 并且在出错后以catch到的值reject掉这个Promise
    executor(resolve, reject);

    // 如果resolve, reject定义在外部
    // executor(resolve.bind(this), reject.bind(this))
  } catch (e) {
    reject(e);
  }

}

// then用来注册在这个Promise状态确定后的回调
// then方法需要写在原型链上, then方法会返回一个promise
Promise.prototype.then = function (onResolved, onRejected) {
  const self = this;
  let promise2;

  // 根据标准, 如果then的参数不是function, 则我们需要忽略它, 此处作如下方式处理
  // v => v 和 r => r 解决Promise值穿透的问题
  onResolved = typeof onResolved === 'function' ? onResolved : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : r => r;

  if (self.status === 'resolved') {
    return promise2 = new Promise(function (resolve, reject) {
      // 考虑到promise1(此处为this/self)的状态已经确定并且是resolved, 调用onResolved
      // 因为考虑到有可能throw, 所以这里也将其包在try/catch块中
      try {
        const x = onResolved(self.data);
        // 如果onResolved的返回值是一个Promise对象, 直接取它的结果作为promise2的结果
        if (x instanceof Promise) {
          x.then(resolve, reject);
        }
        resolve(x); // 否则，以它的返回值作为promise2的结果
      } catch (e) {
        reject(e);
      }
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new Promise(function (resolve, reject) {
      try {
        const x = onRejected(self.data);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        }
      } catch (e) {
        reject(e);
      }
    })
  }

  if (self.status === 'pending') {
    return promise2 = new Promise(function (resolve, reject) {
      // 如果当前的Promise还处于pending状态, 我们不能确定调用onResolved还是onRejected
      // 只能等到Promise的状态确定后, 才能确定如何处理
      // 所以我们需要把两种情况的处理逻辑作为callback放入promise1(此处为this.self)的回调数组里
      self.onRejectdCallback.push(function (value) {
        try {
          const x = onResolved(self.data);
          // 如果onResolved的返回值是一个Promise对象, 直接取它的结果作为promise2的结果
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
          resolve(x); // 否则，以它的返回值作为promise2的结果
        } catch (e) {
          reject(e);
        }
      });

      self.onRejectdCallback.push(function (reason) {
        try {
          var x = onRejected(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}

// catch实现
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}

new Promise(resolve => resolve(8))
  .then(function (value) {
    return value
  })
  .catch(function (reason) {
    throw reason
  })
  .then(function (value) {
    console.log(value);
  })
