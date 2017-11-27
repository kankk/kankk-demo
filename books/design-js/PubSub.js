// 通用的发布-订阅模式
var event = {
  clientList: [],
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    // 订阅的消息添加进缓存列表
    this.clientList[key].push(fn);
  },
  trigger: function () {
    var key = Array.prototype.shift.call(arguments);
    var fns = this.clientList[key];
    // 如果没有绑定对应的消息
    if (!fns || fns.length === 0) {
      return false;
    }
    for (var i = 0, fn; fn = fns[i++];) {
      // arguments是trigger时带上的参数
      fn.apply(this, arguments);
    }
  },
  remove: function (key, fn) {
    var fns = this.clientList[key];
    // 如果key对应的消息没有被人订阅, 则直接返回
    if (!fns) {
      return false;
    }
    // 如果没有传入具体的回调函数, 表示需要取消key对应消息的所有订阅
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l];
        if (_fn === fn) {
          // 因为使用splice所以使用l--
          fns.splice(l, 1);
        }
      }
    }
  }
};

var installEvent = function (obj) {
  for (var i in event) {
    obj[i] = event[i];
  }
}

var salesOffices = {};
installEvent(salesOffices);

salesOffices.listen('squareMeter88', function (price) {
  console.log('价格= ' + price);
});

salesOffices.listen('squareMeter110', function (price) {
  console.log('价格= ' + price);
});

salesOffices.trigger('squareMeter88', 2000000);
salesOffices.trigger('squareMeter110', 3000000);