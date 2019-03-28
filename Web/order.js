const randomArr = [];

for (let i = 0; i < 20; i++) {
  randomArr.push(parseInt(Math.random() * 1000));
}

// 冒泡排序
function bubbleSort (arr) {
  
  const arrLen = arr.length;
  for (let i = arrLen - 1; i > 1; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

// 选择排序
function selectSort (arr) {
  
  const arrLen = arr.length;
  for (let i = 0; i < arrLen; i++) {
    for (let j = i + 1; j < arrLen; j++) {
      if (arr[j] < arr[i]) {
        const temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
    }
  }

  return arr;
}

// 插入排序
function insertSort (arr) {

  const arrLen = arr.length;
  for (let i = 1; i < arrLen; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        const temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
      } else {
        break;
      }
    }
  }

  return arr;
}

// 快速排序
function quickSort (arr) {

  if (arr.length <= 1) {
    return arr;
  }

  const leftArr = [];
  const rightArr = [];
  const pivot = arr.splice(0,1);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      leftArr.push(arr[i]);
    } else {
      rightArr.push(arr[i]);
    }
  }

  return quickSort(leftArr).concat(pivot, quickSort(rightArr));
}

console.log('原始顺序: ' + JSON.stringify(randomArr));
console.log('冒泡排序: ' + JSON.stringify(bubbleSort(randomArr.slice())));
console.log('选择排序: ' + JSON.stringify(selectSort(randomArr.slice())));
console.log('插入排序: ' + JSON.stringify(insertSort(randomArr.slice())));
console.log('快速排序: ' + JSON.stringify(quickSort(randomArr.slice())));
