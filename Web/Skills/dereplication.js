const array1 = [1, 1, '1', '1'];
// 双层循环
function unique1(arr) {
  let res = [];
  for (let i = 0, arrLen = arr.length; i < arrLen; i++) {
    let exist = false
    for (let j = 0, resLen = res.length; j < resLen; j++) {
      if (arr[i] === res[j]) {
        exist = true;
        break;
      }
    }
    if (!exist) {
      res.push(arr[i]);
    }
  }
  return res;
}

// indexOf简化内循环
function unique2(arr) {
  let res = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    let current = arr[i];
    if (res.indexOf(current) === -1) {
      res.push(current)
    }
  }
  return res;
}

// 排序后去重
function unique3(arr) {
  let res = [];
  let sortedArray = arr.concat().sort();
  let seen;
  for (let i = 0, len = sortedArray.length; i < len; i++) {
    if (!i || seen !== sortedArray[i]) {
      res.push(sortedArray[i]);
    }
    seen = sortedArray[i];
  }
  return res;
}

console.log(unique1(array1));
console.log(unique2(array1));
console.log(unique3(array1));


const array2 = [1, 2, '1', 2, 1];
const array3 = [1, 1, '1', 2, 2];
// unique API 1
function unique_api1(arr, isSorted) {
  const res = [];
  const seen = [];

  for (let i = 0, len = arr.length; i < len; i++) {
    const value = arr[i];
    if (isSorted) {
      if (!i || seen !== value) {
        res.push(value);
      }
      seen = value;
    } else if (res.indexOf(value) === -1) {
      res.push(value);
    }
  }
  return res;
}

console.log(unique_api1(array2));
console.log(unique_api1(array3));


const array4 = [1, 1, 'a', 'A', 2, 2];
// unique API 2
function unique_api2(arr, isSorted, iteratee) {
  const res = [];
  const seen = [];

  for (let i = 0, len = arr.length; i < len; i++) {
    const value = arr[i];
    const computed = iteratee ? iteratee(value, i, arr) : value;
    if (isSorted) {
      if (!i || seen !== value) {
        res.push(value);
      }
      seen = value;
    } else if (iteratee) {
      if (seen.indexOf(computed) === -1) {
        seen.push(computed);
        res.push(value);
      }
    } else if (res.indexOf(value) === -1) {
      res.push(value);
    }
  }

  return res;
}

console.log(unique_api2(array4, false, item => {
  return typeof item == 'string' ? item.toLowerCase() : item
}));


const array5 = [1, 2, 1, 1, '1'];
// filter - indexOf
function unique4(arr) {
  let res = arr.filter((item, index, arr) => {
    return arr.indexOf(item) === index;
  });
  return res;
}

// filter - sort
function unique5(arr) {
  return arr.concat().sort().filter((item, index, arr) => {
    return !index || item !== arr[index - 1];
  });
}

console.log(unique4(array5));
console.log(unique5(array5));


const array6 = [1, 2, 1, 1, '1'];
// 键值对
function unique6(arr) {
  const obj = {};
  return arr.filter((item, index, arr) => {
    return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true)
  });
}

console.log(unique6(array6));

const array7 = [1, 2, 1, 1, '1'];
// ES6 - Set
function unique7(arr) {
  return Array.from(new Set(arr));
}

function unique8(arr) {
  return [...new Set(arr)];
}

// ES6 - Map
function unique9(arr) {
  const seen = new Map();
  return arr.filter(a => !seen.has(a) && seen.set(a, 1));
}

console.log(unique7(array7));
console.log(unique8(array7));
console.log(unique9(array7));