const fs = require('fs');
const files = fs.readdirSync(process.cwd());
files.forEach((file) => {
  if (/\.js/.test(files)) {
    fs.watchFile(process.cwd() + '/' + file, () => {
      console.log(' - ' + file + ' changed!');
    });
  }
});