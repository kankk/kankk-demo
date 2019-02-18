// const result = 34;

// console.log(Math.log(result / 50) / Math.log(2/3));

function fun(result) {
  return Math.log(result / 50) / Math.log(2/3);
}

const max = 50;
const resultArr = [];
for (let i = 1; i < max; i++) {
  resultArr.push(fun(i));
  console.log(`${i}${i < 10 ? ' ' : ''} --- ${fun(i)}`);
}

const offsetArr = [];
for (let i = 0; i < resultArr.length - 1; i++) {
  const offset = resultArr[i] - resultArr[i+1];
  offsetArr.push(offset);
  // console.log(`${i}${i < 10 ? ' ' : ''} --- ${offset}`);
}

// console.log(offsetArr);