// 普通版本
// 缺点: 会发生卡死, CPU飙升
function sleep_normal(sleepTime) {
  const start = +new Date;
  let now = start;
  while(now - start <= sleepTime) {
    now = +new Date;
  }
  return;
}
sleep_normal(1000);
console.log('sleep_normal: done');

// Promise版本
// 实际使用setTimeout, 没有形成进程阻塞
// 缺点: 不够美观, 不能停止执行
function sleep_promise(sleepTime) {
  return new Promise(resolve => 
    setTimeout(resolve, sleepTime)
  );
}
sleep_promise(1000).then(() => {
  console.log('sleep_promise: done');  
});

// Async/Await版本
function sleep_async(sleepTime) {
  return new Promise(resolve => 
    setTimeout(resolve, sleepTime)
  );
}
!async function test() {
  const result = await sleep_async(1000);
  console.log(result);
  console.log('sleep_async: done');
}();