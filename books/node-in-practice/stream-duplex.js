// 实现一个双工流
const stream = require('stream');

HungryStream.prototype = Object.create(stream.Duplex.prototype, {
  constructor: {
    value: HungryStream
  }
});

function HungryStream (options) {
  stream.Duplex.call(this, options);
  this.waitting = false;
}

HungryStream.prototype._write = function (chunk, encoding, callback) {
  this.waitting = false;
  this.push('\u001b[32m' + chunk + '\u001b[39m');
  callback();
}

HungryStream.prototype._read = function (size) {
  if (!this.waitting) {
    this.push('Feed me data! > ');
    this.waitting = true;
  }
};

const hungryStream = new HungryStream();
process.stdin.pipe(hungryStream).pipe(process.stdout);