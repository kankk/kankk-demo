var objectPoolFactory = function (createObjFn) {
  var objectPool = [];

  return {
    create: function () {
      var obj = objectPool.length === 0 ? createObjFn.apply(this, arguments) : objectPool.shift();
      return obj;
    },
    recover: function(obj) {
      object.push(obj);
    }
  };
}

