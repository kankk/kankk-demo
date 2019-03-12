(function (modules) { // webpackBootstrap
  
  // 缓存__webpack_require__函数加载过的模块
  var installedModules = {};

  // webpack加载函数, 用来加载webpack定义的模块
  // moduleId 为模块ID, 一般为模块的源码路径
  // exports 为导出对象
  function __webpack_require__(moduleId) {

    // installedModules => 闭包

    // 重复加载则使用缓存
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }

    // 第一次加载, 初始化模块对象, 并缓存到installedModules
    var module = installedModules[moduleId] = {
      i: moduleId,  // 模块id
      l: false, // 模块加载标识
      exports: {} // 模块导出对象
    };

    // 相同的模块只有在第一次引用的时候才会执行模块本身
    // 执行模块
    // module.exports: 模块导出对象引用, 改变模块包裹函数内部的this指向
    // module: 当前模块对象引用
    // module.exports: 模块导出对象引用
    // __webpack_require__: 用于在模块中加载其他模块
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // 模块加载标识设置为已加载
    module.l = true;

    // 返回当前模块的导出对象引用
    return module.exports;
  }


  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // 对Object.defineProperty的简单包装
  __webpack_require__.d = function (exports, name, getter) {
    // 如果export没有[name]属性, 定义该属性的getter
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
    }
  };

  // 用于区分es模块和其他模块
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module'
      });
    }
    Object.defineProperty(exports, '__esModule', {
      value: true
    });
  };

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value
    });
    if (mode & 2 && typeof value != 'string')
      for (var key in value) __webpack_require__.d(ns, key, function (key) {
        return value[key];
      }.bind(null, key));
    return ns;
  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
      function getDefault() {
        return module['default'];
      } :
      function getModuleExports() {
        return module;
      };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // 包装 Object.prototype.hasOwnProperty函数
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // __webpack_public_path__
  __webpack_require__.p = "";


  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./app.js");
})
/************************************************************************/
({

  // 入口模块
  "./app.js":
    (function (module, exports) {

      eval("let func = () => {};\nconst NUM = 45;\nlet arr = [1, 2, 4];\nlet arrB = arr.map(item => item * 2);\n\nconsole.log(arrB.includes(8));\nconsole.log(\"new Set(arrB) is \", new Set(arrB));\n\n//# sourceURL=webpack:///./app.js?");

    })

});