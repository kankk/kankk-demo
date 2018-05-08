// stream可读流
// 实现一个JSON行解析器
const stream = require('stream');
const util = require('util');
const fs = require('fs');

function JSONLineReader(source) {
  stream.Readable.call(this);
  this._source = source;
  this._foundLineEnd = false;
  this._buffer = '';

  source.on('readable', function() {
    this.read();
  }.bind(this));
}

util.inherits(JSONLineReader, stream.Readable);

JSONLineReader.prototype._read = function (size) {
  let chunk;
  let line;
  let lineIndex;
  let result;

  if (this._buffer.length === 0) {
    chunk = this._source.read();
    this._buffer += chunk;
  }

  lineIndex = this._buffer.indexOf('\n');

  if (lineIndex !== -1) {
    line = this._buffer.slice(0, lineIndex);
    if (line) {
      result = JSON.parse(line);
      this._buffer = this._buffer.slice(lineIndex + 1);
      this.emit('object', result);
      this.push(util.inspect(result));
    } else {
      this._buffer = this._buffer.slice(1);
    }
  }
};

const input = fs.createReadStream(__dirname + '/json-line.txt', {
  encoding: 'utf-8'
});
const jsonLineReader = new JSONLineReader(input);

jsonLineReader.on('object', function (obj) {
  console.log('pos: ', obj.position, '- letter:', obj.letter);
})