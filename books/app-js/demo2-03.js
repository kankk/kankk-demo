var PubSub = {
  subscribe: function (ev, callback) {
    // 创建_callbacks对象, 除非它已经存在了
    var calls = this._callbacks || (this._callbacks = {});
    // 针对给定的事件key创建一个数组, 除非这个数组已经存在
    // 然后将回调函数追加到这个数组中
    (this._callbacks[ev]) || (this._callbacks[ev] = []).push(callback);

    return this;
  },

  publish: function () {
    // 将arguments对象转换为真正的数组
    var args = Array.prototype.slice.call(arguments, 0);

    // 拿出第1个参数, 即事件名称
    var ev = args.shift();

    // 如果不存在_callbacks对象, 则返回
    // 或者如果不包含给定事件对应的数组
    var list, calls, i, l;
    if (!(calls = this._callbacks)) return this;
    if (!(list = this._callbacks[ev])) return this;

    // 触发回调
    for (i = 0, l = list.length; i < l; i++) {
      list[i].apply(this, args);
    }

    return this;
  }
}

// 使用方法
PubSub.subscribe('test', function(value) {
  console.log('test', value);
});

PubSub.publish('test', 'myValue');