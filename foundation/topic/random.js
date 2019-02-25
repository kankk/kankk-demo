// 普通乱序实现

var times = [0, 0, 0, 0, 0];
for (var i = 0; i < 100000; i++) {
  let arr = [1, 2, 3, 4, 5];
  arr.sort(() => Math.random() - 0.5);
  times[arr[4] - 1]++;
}

console.log(times);

var times = 100000;
var res = {};
for (var i = 0; i < times; i++) {
    
    var arr = [1, 2, 3];
    arr.sort(() => Math.random() - 0.5);
    
    var key = JSON.stringify(arr);
    res[key] ? res[key]++ :  res[key] = 1;
}
// 为了方便展示，转换成百分比
for (var key in res) {
    res[key] = res[key] / times * 100 + '%'
}

console.log(res)

// Fisher-Yates乱序
function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a;
}

// Fisher-Yates乱序-es6实现
function shuffle_es6(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
}


// 测试demo
var times = 100000;
var res = {};
for (var i = 0; i < times; i++) {
    var arr = shuffle([1, 2, 3]);

    var key = JSON.stringify(arr);
    res[key] ? res[key]++ :  res[key] = 1;
}
// 为了方便展示，转换成百分比
for (var key in res) {
    res[key] = res[key] / times * 100 + '%'
}
console.log(res)