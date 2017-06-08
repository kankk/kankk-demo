const Writable = require('stream').Writable;
const util = require('util');

module.exports = CountStream;

util.inherits(CountStream, Writable);

function CountStream(matchText, options) {
    Writable.call(this, options);
    this.count = 0;
    this.matcher = new RegExp(matchText, 'ig');
}

CountStream.prototype._write = function (chunk, encoding, cb) {
    let matches = chunk.toString().match(this.matcher);
    if (matches) {
        this.count += matches.length;
    }
    cb();
}

CountStream.prototype.end = function() {
    this.emit('total', this.count);
}