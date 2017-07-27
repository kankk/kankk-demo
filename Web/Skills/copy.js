// 数组的浅拷贝
const arr1 = ['old', 1, true, null, undefined];

function copy1(arr) {
  // return arr.slice();
  return arr.concat();
}

const copyArr1 = copy1(arr1);
copyArr1[0] = 'new';

console.log(arr1);
console.log(copyArr1);

// 数组的深拷贝
const arr2 = ['old', 1, true, ['old1', 'old2'], {
  old: 1
}];

function copy2(arr) {
  return JSON.parse(JSON.stringify(arr)); // 这种方法使用与数组或对象
}

const copyArr2 = copy2(arr2);
copyArr2[3][0] = 'new1';

console.log(arr2);
console.log(copyArr2);

const shallowCopy = function (obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据obj的类型判断新建一个对象数组还是对象
  let newObj = obj instanceof Array ? [] : {};
  // 遍历obj, 并且判断是obj的属性才拷贝
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

const copyArr3 = shallowCopy(arr1);
copyArr3[0] = 'new';

console.log(arr1);
console.log(copyArr3);

const deepCopy = function (obj) {
  if (typeof obj !== 'object') return;
  const newObj = obj instanceof Array ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}

const copyArr4 = deepCopy(arr2);
copyArr4[3][0] = 'new1';

console.log(arr2);
console.log(copyArr4);