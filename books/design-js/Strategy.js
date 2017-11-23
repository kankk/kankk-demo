// 1. 实现JavaScript的策略模式
var strategies = {
  'S': function (salary) {
    return salary * 4;
  },
  'A': function (salary) {
    return salary * 3;
  },
  'B': function (salary) {
    return salary * 2;
  }
};

var caculateBonus = function (level, salary) {
  return strategies[level](salary);
}

console.log(caculateBonus('S', 20000));
console.log(caculateBonus('A', 10000));