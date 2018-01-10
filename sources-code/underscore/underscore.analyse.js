//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2017 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

// note:
// 不安全的undefined
// 因为undefined可能会被重复赋值导致 x === undefined判断结果不正确
// 所有全文使用void 0 ( ==> undefined )来代替undefined判断

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            this ||
            {};

  // 保存当前全局上绑定在_上的对象
  var previousUnderscore = root._;

  // 使用局部变量
  // 避免冗长的代码书写
  // 减少对象成员的访问深度, 能提高一定的性能
  var ArrayProto = Array.prototype, ObjProto = Object.prototype;
  var SymbolProto = typeof Symbol !== 'undefined' ? Symbol.prototype : null;

  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;

  // ES5的原生方法
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeCreate = Object.create;

  // constructor的缩写, 用于对象创建
  // 这种做法是出于性能上的考虑, 避免每次调用baseCreate都要创建空的构造函数
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for their old module API. If we're in
  // the browser, add `_` as a global object.
  // (`nodeType` is checked to ensure that `module`
  // and `exports` are not HTML elements.)
  if (typeof exports != 'undefined' && !exports.nodeType) {
    if (typeof module != 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  // func 待优化回调函数
  // context 执行上下文
  // argCount 参数个数
  // 总体思路: 传入待优化的回调函数func, 以及迭代回调需要的参数个数argCount, 根据参数个数分情况进行优化
  var optimizeCb = function(func, context, argCount) {
    // 一定要保证回调的执行上下文存在
    if (context === void 0) return func;
    switch (argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      // The 2-parameter case has been omitted only because no current consumers
      // made use of it.
      case null:
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      // accumulator: 累加器
      // value: 迭代元素
      // index: 迭代索引
      // collection: 当前迭代集合
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  var builtinIteratee;

  // An internal function to generate callbacks that can be applied to each
  // element in a collection, returning the desired result — either `identity`,
  // an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    // 是否用自定义的iteratee, underscore支持通过覆盖_.iteratee属性自定义iteratee
    // 发布版1.8.3不支持
    if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
    // value为null, 返回其自身的值
    if (value == null) return _.identity;
    // value为Function, 通过内置函数optimizeCb对其进行优化
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    // value为一个对象, 返回iteratt(_.matcher)的目的是想要知道当前被迭代元素是否匹配给定的这个对象
    if (_.isObject(value) && !_.isArray(value)) return _.matcher(value);
    // value为字面量, 如数字, 字符串等, 它指示了一个对象的属性key, 返回的iteratee(_.property)将用来获得该属性对应的值
    return _.property(value);
  };

  // External wrapper for our callback generator. Users may customize
  // `_.iteratee` if they want additional predicate/iteratee shorthand styles.
  // This abstraction hides the internal-only argCount argument.
  // 首先把内建的iteratt赋值给buildtinIteratee变量
  _.iteratee = builtinIteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // 一个包装器, 包装函数func, 使其支持rest参数 (ps: 现在es6已经支持rest参数了 (x, ...rest))
  // func 需要rest参数的函数
  // startIndex 从哪里开始标识rest参数, 如果不传递, 默认最后一个参数为rest参数
  var restArgs = function(func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    // 返回一个支持rest参数的函数
    return function() {
      // 校正参数, 避免出现负值情况
      var length = Math.max(arguments.length - startIndex, 0),
          rest = Array(length),
          index = 0;
      for (; index < length; index++) {
        rest[index] = arguments[index + startIndex];
      }
      // 根据rest参数不同, 分情况调用函数, 需要注意的是, rest参数总是最后一个参数, 否则会有歧义
      switch (startIndex) {
        case 0: return func.call(this, rest);
        case 1: return func.call(this, arguments[0], rest);
        case 2: return func.call(this, arguments[0], arguments[1], rest);
      }
      // 除了以上三种情况, 更加通用的情况
      var args = Array(startIndex + 1);
      // 先取得前面的参数
      for (index = 0; index < startIndex; index++) {
        args[index] = arguments[index];
      }
      // 再拼接上剩余参数
      args[startIndex] = rest;
      return func.apply(this, args);
    };
  };

  // 创建一个对象, 该对象继承自prototype
  // 并且保证该对象在其原型上挂载属性不会影响所继承的prototype
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    // 如果存在原生的创建方法(Object.create), 则用原生的进行创建
    if (nativeCreate) return nativeCreate(prototype);
    // 利用Ctor这个空函数, 临时设置对象原型
    Ctor.prototype = prototype;
    // 创建对象, result.__proto__ === prototype
    var result = new Ctor;
    // 还原Ctor原型
    Ctor.prototype = null;
    return result;
  };

  // 浅获取该key对应的值
  var shallowProperty = function(key) {
    return function(obj) {
      // void 0 为undefined
      return obj == null ? void 0 : obj[key];
    };
  };

  // 深获取该key对应的值
  var deepGet = function(obj, path) {
    var length = path.length;
    for (var i = 0; i < length; i++) {
      if (obj == null) return void 0;
      obj = obj[path[i]];
    }
    return length ? obj : void 0;
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object.
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = shallowProperty('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // 集合函数
  // --------------------

  // 支持array, 还支持object的迭代
  // 对object迭代的依据是对象的键序列keys
  _.each = _.forEach = function(obj, iteratee, context) {
    // 首先要优化回调过程
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    // 区分数组和对象的迭代过程
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        // 数组的迭代回调传入三个参数(迭代值, 迭代索引, 迭代对象)
        iteratee(obj[i], i, obj);
      }
    } else {
      // 获取对象的键序列keys
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    // 返回对象自身, 以便进行链式构造
    return obj;
  };

  // 一个映射过程就是将各个元素, 按照一定的规则, 逐个映射为新的元素
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // 用于创建reduce函数
  // dir用于区分reduce方向
  // initial标识了是否传入了规约起点
  var createReduce = function(dir) {
    // Wrap code that reassigns argument variables in a separate function than
    // the one that accesses `arguments.length` to avoid a perf hit. (#1991)
    var reducer = function(obj, iteratee, memo, initial) {
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // memo 用来记录最新的reduce结果
      // 如果reduce没有初始化memo, 则默认为首个元素
      if (!initial) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        // 执行reduce回调, 刷新当前值
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    };

    return function(obj, iteratee, memo, context) {
      // 如果参数正常, 则代表已经初始化了memo
      var initial = arguments.length >= 3;
      // 所有的传入回调都要通过optimizeCb进行优化
      // reducer因为引入了累加器, 所以优化函数的第三个函数传入了4
      // 这样, 新的迭代回调第一个参数就是当前的累加结果
      return reducer(obj, optimizeCb(iteratee, context, 4), memo, initial);
    };
  };

  // 从左至右进行reduce
  _.reduce = _.foldl = _.inject = createReduce(1);

  // 从右至左进行reduce
  _.reduceRight = _.foldr = createReduce(-1);

  // 返回obj中满足条件predicate的元素
  _.find = _.detect = function(obj, predicate, context) {
    // 既能检索数组(_.findIndex), 也能检索对象(_.findKey)
    var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
    var key = keyFinder(obj, predicate, context);
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // 返回当前迭代元素满足真值检测函数(predicate)为true的元素
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // 使用_.negate(反义predicate结果)简化实现_.filter的反义_.reject
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // 判断obj的每个元素是否都满足predicate, 返回true/false
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // 判断obj的某个元素是否满足predicate, 返回true/false
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // 判断obj是否包含item, 可以设置查询起点fromIndex
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    // 如果不是数组, 则根据值查找
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    // 判断_.indexOf返回值是否大于-1
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // 迭代obj, 对每个元素调用其成员方法method
  _.invoke = restArgs(function(obj, path, args) {
    var contextPath, func;
    if (_.isFunction(path)) {
      func = path;
    } else if (_.isArray(path)) {
      contextPath = path.slice(0, -1);
      path = path[path.length - 1];
    }
    return _.map(obj, function(context) {
      var method = func;
      if (!method) {
        // 如果path为数组
        if (contextPath && contextPath.length) {
          context = deepGet(context, contextPath);
        }
        if (context == null) return void 0;
        method = context[path];
      }
      // 如果对象不存在方法, 则返回null
      return method == null ? method : method.apply(context, args);
    });
  });

  // 取出obj中key对应的值
  _.pluck = function(obj, key) {
    // 迭代集合, 每个迭代元素返回其对应属性的对应值
    return _.map(obj, _.property(key));
  };

  // 类似SQL中的where限定符, 获得满足attrs的元素
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // 与_.where类似, 但只返回第一条查询到的记录
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // 根据iteratee声明的大小关系, 获得obj最大元素
  _.max = function(obj, iteratee, context) {
    // 默认返回-Infinity
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    // 如果没有传递iteratee, 则按值进行比较
    if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value > result) {
          result = value;
        }
      }
    } else {
      // 否则, 以iteratee为最大值依据, 每次传入当前迭代之给iteratee, 算出最大值
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // 根据iteratee声明的大小关系, 获得obj最小元素
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value != null && value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(v, index, list) {
        computed = iteratee(v, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = v;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // 获得obj乱序副本, 基于_.sample实现
  _.shuffle = function(obj) {
    return _.sample(obj, Infinity);
  };

  // 从obj随机取出n个样本
  // 如果是对一个对象进行抽样, 那么是对这个对象的值集合进行抽样
  // 如果没有设置n, 则随机返回一个元素, 不进行集合乱序
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    // 如果是对象, 乱序key的排序
    var sample = isArrayLike(obj) ? _.clone(obj) : _.values(obj);
    var length = getLength(sample);
    // 校正参数n, 使得0 <= n < length
    n = Math.max(Math.min(n, length), 0);
    var last = length - 1;
    // 开始洗牌算法, 洗出来n个就停止
    for (var index = 0; index < n; index++) {
      // 从[index, last]即剩余未乱序部分获得一个随机位置
      var rand = _.random(index, last);
      // 交换当前值与随机位置的值
      var temp = sample[index];
      sample[index] = sample[rand];
      sample[rand] = temp;
      // 此时, 排序后的第一个数据sample[0]已经确定
    }
    return sample.slice(0, n);
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    var index = 0;
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, key, list) {
      return {
        value: value,
        index: index++,
        criteria: iteratee(value, key, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // 内置函数group, 类似group by操作
  // behavior: 获得组别后的行为, 即当确定一个分组后, 在该分组上施加的行为
  // partition: 是否进行划分, 即是否将一个集合一分为二
  var group = function(behavior, partition) {
    // obj: 待分组结合对象
    // iteratee: 集合迭代器, 同样会被内置函数cb优化
    // context: 执行上下文
    return function(obj, iteratee, context) {
      // 分组结果初始化
      // 如果是进行划分的话, 则结果分为两个组
      var result = partition ? [[], []] : {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        // 根据iteratee计算得到分组组别key
        var key = iteratee(value, index, obj);
        // 获得组别后, 执行定义的行为
        behavior(result, value, key);
      });
      return result;
    };
  };

  // 对obj按照iteratee进行分组
  // 如果分组结果中存在该分组, 将元素追加进该分组
  // 否则新建一个分组, 并将元素放入
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // 对集合按照指定的关键字进行索引
  // 对obj按照iteratee进行索引
  // 当iteratee确定了一个分组后, _indexBy会设置该分组(索引)的对象为当前元素
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // 对obj按照iteratee进行计算
  // 当iteratee确定了一个分组后, _.countBy的行为: 如果该分组已存在, 则计数加一, 否则开始计数
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  var reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (_.isString(obj)) {
      // Keep surrogate pair characters together
      return obj.match(reStrSymbol);
    }
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  // 将obj按照iteratee进行分组
  // 当iteratee确定了一个分组后, _.partion会将元素放入对应分组
  _.partition = group(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true);

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null || array.length < 1) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null || array.length < 1) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, Boolean);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    output = output || [];
    var idx = output.length;
    for (var i = 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        // Flatten current level of array or arguments object.
        if (shallow) {
          var j = 0, len = value.length;
          while (j < len) output[idx++] = value[j++];
        } else {
          flatten(value, shallow, strict, output);
          idx = output.length;
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = restArgs(function(array, otherArrays) {
    return _.difference(array, otherArrays);
  });

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // The faster algorithm will not work with an iteratee if the iteratee
  // is not a one-to-one function, so providing an iteratee will disable
  // the faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted && !iteratee) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = restArgs(function(arrays) {
    return _.uniq(flatten(arrays, true, true));
  });

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      var j;
      for (j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = restArgs(function(array, rest) {
    rest = flatten(rest, true, true);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  });

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices.
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = restArgs(_.unzip);

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values. Passing by pairs is the reverse of _.pairs.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions.
  // 内置工厂函数, createIndexFinder的增强版
  // 不仅能查询直接量在集合中的位置, 也支持通过一个真值检测函数查找位置
  // dir: 搜索方向
  var createPredicateIndexFinder = function(dir) {
    return function(array, predicate, context) {
      // 如果传入的predicate是一个立即数, 会被cb优化为一个_.property(predicate)函数, 用来获得对象的某个属性
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        // 只找到第一次满足条件的位置
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  };

  // 由内置的createPredicateIndexFinder工厂函数创建
  // 根据条件predicate, 查询元素在array中出现的位置
  // array: 待搜索数组
  // predicate: 真值检测函数
  // context: 执行上下文
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // 根据比较条件iteratee, 查询obj在array中的位置
  // 如果失败, 则返回obj应当出现的位置
  // _.sortedIndex使用二分查找作为查找算法
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    // 以下是二分查找算法实现, O(h)=O(log2n)
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // 内置的工厂函数, 创建一个索引查询器
  // dir: 查询方向
  // predicatedFind: 真值检测函数, 该函数只有在查询元素为NaN才会使用
  // sortedIndex: 有序数组的索引获得函数. 如果设置了该参数, 将嘉定数组已经有序, 从而更高效通过针对有序数组的查询函数来优化查询性能
  var createIndexFinder = function(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      // 如果设定了查询起点, 且查询起点格式正确(Number)
      if (typeof idx == 'number') {
        // 校正查询起点
        if (dir > 0) {
          i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        // 如果传递sortedIndex函数, 则先假设array为排序好的, 获得item在array中的位置
        idx = sortedIndex(array, item);
        // 验证这个假设是否真确
        return array[idx] === item ? idx : -1;
      }
      // 如果item为NaN, 需要通过predicateFind来查找
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      // 否则直接通过 === 进行查找
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      // 查找不到的情况返回-1
      return -1;
    };
  };

  // 通过内置的工厂函数createIndexFinder创建一个索引查找器
  // function(array, item, idx)
  // array: 待搜索数组
  // item: 待搜索对象
  // idx: 查询起点
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    if (!step) {
      step = stop < start ? -1 : 1;
    }

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Split an **array** into several arrays containing **count** or less elements
  // of initial array.
  _.chunk = function(array, count) {
    if (count == null || count < 1) return [];

    var result = [];
    var i = 0, length = array.length;
    while (i < length) {
      result.push(slice.call(array, i, i += count));
    }
    return result;
  };

  // Function (ahem) Functions
  // ------------------

  // 内置绑定函数上下文的方法
  // sourceFunc: 待绑定函数
  // boundFunc: 绑定后函数
  // context: 待绑定上下文
  // callingContext: 执行上下文, 通常就是this
  // args: 函数执行所需参数
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    // 为了支持链式调用
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // 将func的执行上下文绑定到context
  // _.bind将为我们返回一个绑定了上下文的函数, 该函数的执行过程会限定执行上下文
  _.bind = restArgs(function(func, context, args) {
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var bound = restArgs(function(callArgs) {
      return executeBound(func, bound, context, this, args.concat(callArgs));
    });
    return bound;
  });

  // 返回一个偏函数
  // partial反映了新函数是原函数的一部分
  _.partial = restArgs(function(func, boundArgs) {
    var placeholder = _.partial.placeholder;
    // 返回一个partial后的新函数
    var bound = function() {
      // position用来标识当前赋值的arguments最新位置
      var position = 0, length = boundArgs.length;
      // 初始化新函数执行的参数
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        // 对于最终调用时的位置`i`的参数
        // 如果绑定参数的对应位置是占位符, 代表略过, 以新的参数赋值之, 并刷新最新位置`position`
        // 否则以绑定参数赋值
        args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
      }
      // 如果arguments还没有被消费完, 则剩余arguments全部添加到args
      while (position < arguments.length) args.push(arguments[position++]);
      // 执行绑定函数的时候, 不改变上下文
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  });

  // 传入_表示为占位符
  _.partial.placeholder = _;

  // 绑定对象obj的所有制定成员方法中的执行上下文到obj
  _.bindAll = restArgs(function(obj, keys) {
    keys = flatten(keys, false, false);
    var index = keys.length;
    if (index < 1) throw new Error('bindAll must be passed function names');
    // 遍历数组, 逐个通过_.bind进行绑定
    while (index--) {
      var key = keys[index];
      obj[key] = _.bind(obj[key], obj);
    }
  });

  // 为函数func提供缓存功能, hasher定义如何获得缓存
  // _.memoize将缓存绑定到了缓存函数的cache属性上, 在创建一个缓存函数时, 除了提供函数func
  // 用来计算外, 还可以提供hasher函数来自定义如何获得缓存的位置.
  // 如果hasher不设置, 则以缓存函数的参数key标识缓存位置
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      // 执行记忆函数的时候, 先获得缓存
      var cache = memoize.cache;
      // 获得缓存地址
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      // 如果缓存没有命中, 则需要调用函数执行
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      // 否则直接返回缓存
      return cache[address];
    };
    // 初始化记忆函数的缓存
    memoize.cache = {};
    return memoize;
  };

  // 等待wait毫秒, 执行func
  // _.delay会将待延迟执行的函数上下文"绑定"到null, 所以, 传入回调的时候, 
  // 一定要确保上下文已经正确绑定(也就是先替换掉函数中this, 避免之后this被错误绑定)
  _.delay = restArgs(function(func, wait, args) {
    return setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  });

  // 将func异步化
  // 通过偏函数实现, 创建了一个新函数, 该函数会被推迟至少1ms才执行, 亦即, 我们将传入的任务异步化
  _.defer = _.partial(_.delay, _, 1);

  
  // 节流
  // options: leading 和 trailing
  // leading: 是否设置节流前缘, 前缘的作用是保证第一次尝试调用的func会被立即执行, 否则第一调用也必须等待wait时间, 默认为true
  // trailing: 是否设置节流后缘, 后缘的作用是当最后一次尝试调用func时, 如果func不能立即执行, 会延后func的执行, 默认为true
  _.throttle = function(func, wait, options) {
    // timeout标识最后一次呗追踪的调用
    // context和args缓存func执行时需要的上下文
    // result缓存func执行结果
    var timeout, context, args, result;
    // 最后一次func被调用的时间点
    var previous = 0;
    if (!options) options = {};

    // 创建一个延后执行的函数包裹住func的执行过程
    var later = function() {
      // 执行时, 刷新最后一次调用时间
      previous = options.leading === false ? 0 : _.now(); // leading默认为ture
      // 清空为此次执行设置的定时器
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };

    // 返回一个throttle化的函数
    var throttled = function() {
      // 尝试调用func时, 会首先记录当前时间戳
      var now = _.now();
      // 是否第一次调用
      if (!previous && options.leading === false) previous = now; // leading默认为true
      // func还要等待多久才能被调用 = 预设的最小等待时间 - (当前时间 - 上次调用的事件)
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      // 如果计算后能被立即执行
      if (remaining <= 0 || remaining > wait) {
        // 清除之前设置的延迟执行, 就不存在某些回调一同发生的情况了
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        // 刷新最后一次func调用的时间点
        previous = now;
        // 执行func调用
        result = func.apply(context, args);
        // 再次检查timeout, 因为func执行期间可能有新的timeout别设置, 如果timeout被清空了, 代表不再有等待执行的func，也清空context和args
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {  // trailing默认为true
        // 如果设置了trailing edge, name暂缓此次调用尝试的执行
        timeout = setTimeout(later, remaining);
      }
      return result;
    };

    // 不在控制函数执行调用频率
    throttled.cancel = function() {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };

    return throttled;
  };

  // 防抖
  _.debounce = function(func, wait, immediate) {
    var timeout, result;

    var later = function(context, args) {
      timeout = null;
      if (args) result = func.apply(context, args);
    };

    var debounced = restArgs(function(args) {
      // 每次新的尝试调用func, 会使抛弃之前等待的func
      if (timeout) clearTimeout(timeout);
      // 如果允许新的调用尝试立即执行
      if (immediate) {
        // 如果之前尚没有调用尝试, name此次调用可以立马执行, 否则就需要等待
        var callNow = !timeout;
        // 刷新timeout
        timeout = setTimeout(later, wait);
        // 如果能被立即执行, 立即执行
        if (callNow) result = func.apply(this, args);
      } else {
        // 否则, 这次尝试调用会延时wait个时间
        timeout = _.delay(later, wait, this, args);
      }

      return result;
    });

    debounced.cancel = function() {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  };

  // 使用wrapper对func进行包裹, 使func的执行前后能融入更多业务逻辑
  _.wrap = function(func, wrapper) {
    // 借助偏函数将func传递给wrapper
    return _.partial(wrapper, func);
  };

  // 用于反义predicate的执行结果
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // 组合各个函数为一个新函数
  // 在函数式编程中, 从右向左的组合顺序是标准的
  _.compose = function() {
    var args = arguments; // 函数序列
    var start = args.length - 1;  // 以传入最后一个函数作为首个处理器
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // 创建一个函数, 该函数运行times次后, 才执行传入的回调func
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // 创建一个函数, 该函数每次调用都会执行回调函数func, 直至制定times次数后, 执行结果不在改变
  _.before = function(times, func) {
    // memo暂存最近一次的调用结果, 当调用次数达到times次后, memo不再改变
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      // 清除函数引用, 节省内存
      if (times <= 1) func = null;
      return memo;
    };
  };

  // 保证func只执行一次
  _.once = _.partial(_.before, 2);

  // restArgs别名
  _.restArgs = restArgs;

  // Object Functions
  // ----------------

  // IE9之前的版本存在的bug, 以下以不能被for key in ...所迭代
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  var collectNonEnumProps = function(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    // 通过对象构造函数获得对象的原型
    var constructor = obj.constructor;
    // 如果构造函数合法, 且具有proototype属性, 那么prototype就是该obj的原型
    // 否则默认obj的原型为Object.prototype
    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

    // 如果对象有constructors属性, 且当前的属性集合不存在构造函数这一属性
    var prop = 'constructor';
    // 需要将constructor属性添加到属性集合中
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    // 将不可枚举的属性也添加到属性集合中
    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      // 注意, 添加的属性只能是自有属性 (obj[prop] !== proto[prop])
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  };

  // 获得对象的所有属性名
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    // 如果原生的Object.keys方法存在的话, 
    // 直接调用Object.keys来获得自有属性
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    // 通过_.has, 剔除非自有属性
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // IE9之前存在枚举bug, 需要校正最后的属性集合
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // 获得obj所有属性, 包括原型链上的属性
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // IE9之前存在枚举bug, 需要校正最后的属性集合
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // 获得obj所有的值
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    // 定长初始化, 提前分配内存空间
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object.
  // In contrast to _.map it returns an object.
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = _.keys(obj),
        length = keys.length,
        results = {};
    for (var index = 0; index < length; index++) {
      var currentKey = keys[index];
      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  // The opposite of _.object.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // 调换obj的属性和值
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      // 可能出现后面的覆盖前面的情况
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // 获得obj含有的方法
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      // 通过_.isFunction判断值是否为方法类型
      if (_.isFunction(obj[key])) names.push(key);
    }
    // 最后返回的函数列表会按字典序进行排序
    return names.sort();
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length;
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s).
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // 返回obj中第一个满足条件的predicate的key
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Internal pick helper function to determine if `obj` has key `key`.
  var keyInObj = function(value, key, obj) {
    return key in obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = restArgs(function(obj, keys) {
    var result = {}, iteratee = keys[0];
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
      keys = _.allKeys(obj);
    } else {
      iteratee = keyInObj;
      keys = flatten(keys, false, false);
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  });

  // Return a copy of the object without the blacklisted properties.
  _.omit = restArgs(function(obj, keys) {
    var iteratee = keys[0], context;
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
      if (keys.length > 1) context = keys[1];
    } else {
      keys = _.map(flatten(keys, false, false), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  });

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // 判断obj是否满足attrs
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      // 一旦遇到value不等, 或者atrrs中的key不在obj中, 立即返回false
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq, deepEq;
  eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null) return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a) return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== 'function' && type !== 'object' && typeof b != 'object') return false;
    return deepEq(a, b, aStack, bStack);
  };

  // Internal recursive comparison function for `isEqual`.
  deepEq = function(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN.
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
      case '[object Symbol]':
        return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError, isMap, isWeakMap, isSet, isWeakSet.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), Safari 8 (#1929), and PhantomJS (#2236).
  var nodelist = root.document && root.document.childNodes;
  if (typeof /./ != 'function' && typeof Int8Array != 'object' && typeof nodelist != 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return !_.isSymbol(obj) && isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    return _.isNumber(obj) && isNaN(obj);
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // 该函数依赖于JavaScript原生的Object.prototype.hasOwnProperty, 因而他判断的是自身的属性, 
  // 而不会去寻找原型链的属性
  _.has = function(obj, path) {
    // 如果path不为数组
    if (!_.isArray(path)) {
      return obj != null && hasOwnProperty.call(obj, path);
    }
    // 如果path为数组
    var length = path.length;
    for (var i = 0; i < length; i++) {
      var key = path[i];
      // 如果其中一个key不在obj中, 则返回false
      if (obj == null || !hasOwnProperty.call(obj, key)) {
        return false;
      }
      obj = obj[key];
    }
    return !!length;
  };

  // Utility Functions
  // -----------------

  // 重命名underscore对象
  // 返回一个underscore对象, 把_所有权交还给原来的拥有者
  _.noConflict = function() {
    // 恢复原来_指向的对象
    root._ = previousUnderscore;
    // 返回underscore对象
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  // 获得该属性path对应的值
  _.property = function(path) {
    // path不为数组
    if (!_.isArray(path)) {
      return shallowProperty(path);
    }
    // path为数组
    return function(obj) {
      // 遍历path的元素获取对应key的值
      return deepGet(obj, path);
    };
  };

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    if (obj == null) {
      return function(){};
    }
    return function(path) {
      return !_.isArray(path) ? obj[path] : deepGet(obj, path);
    };
  };

  // 返回一个校验过程, 用以校验对象的属性是否匹配给定的属性列表
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

  // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped.
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // Traverses the children of `obj` along `path`. If a child is a function, it
  // is invoked with its parent as context. Returns the value of the final
  // child, or `fallback` if any child is undefined.
  _.result = function(obj, path, fallback) {
    if (!_.isArray(path)) path = [path];
    var length = path.length;
    if (!length) {
      return _.isFunction(fallback) ? fallback.call(obj) : fallback;
    }
    for (var i = 0; i < length; i++) {
      var prop = obj == null ? void 0 : obj[path[i]];
      if (prop === void 0) {
        prop = fallback;
        i = length; // Ensure we don't continue iterating.
      }
      obj = _.isFunction(prop) ? prop.call(obj) : prop;
    }
    return obj;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate: /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape: /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offset.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    var render;
    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var chainResult = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return chainResult(this, func.apply(_, args));
      };
    });
    return _;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return chainResult(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return chainResult(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return String(this._wrapped);
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define == 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}());
