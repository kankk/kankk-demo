const fs = require('fs');
const stdin = process.stdin;
const stdout = process.stdout;

fs.readdir(process.cwd(), (err, files) => {
  const stats = [];
  console.log('');

  if (!files.length) {
    return console.log('    \033[31m No files to show!\033[39\n');
  }

  console.log('    Select which file or directory you want to se \n');

  function file(i) {
    var filename = files[i];

    fs.stat(__dirname + '/' + filename, (err, stat) => {
      if (stat.isDirectory()) {
        stats[i] = stat;
        console.log('    ' + i + '     ' + '\033[36m' + filename + '/\033[39m');
      } else {
        console.log('    ' + i + '     ' + '\033[90m' + filename + '/\033[39m');
      }

      i++;
      if (i == files.length) {
        read();
      } else {
        file(i);
      }
    });
  }

  function read() {
    console.log('');
    stdout.write('    \033[33mEnter your choice: \033[39m');
    stdin.resume();
    stdin.setEncoding('utf-8');

    stdin.on('data', (data) => {
      const filename = files[Number(data)];
      if (stats[Number(data)].isDirectory()) {
        // stdout.write('    \033[31mEnter your choice: \033[39m');
        fs.readdir(__dirname + '/' + filename, (err, files) => {
          console.log('');
          console.log('    (' + files.length + 'files');
          files.forEach((file) => {
            console.log('    -  ' + file);
          });
          console.log('');
        });
      } else {
        stdin.pause();
        fs.readFile(__dirname + '/' + filename, 'utf-8', (err, data) => {
          console.log('');
          console.log('\033[90m' + data.replace(/(.*)/g, '    $1') + '\033[39m');
        });
      }
    });
  }

  file(0);
});