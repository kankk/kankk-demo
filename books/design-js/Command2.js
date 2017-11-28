var Ryu = {
  attack: function () {
    console.log('attack');
  },
  defense: function () {
    console.log('defense');
  },
  jump: function () {
    console.log('jump');
  },
  crouch: function () {
    console.log('crouch');
  }
};

var makeCommand = function (receiver, state) {
  return function () {
    receiver[state]();
  }
};

var commands = {
  '119': 'jump', // W
  '115': 'crouch', // S
  '87': 'defense', // A
  '100': 'attack', // D
};

var commandStack = [];

document.onkeypress = function (ev) {
  var keyCode = ev.keyCode;
  command = makeCommand(Ryu, commands[keyCode]);
  if (command) {
    command(); // 执行命令
    commandStack.push(command); // 将刚刚执行过的命令保存进堆栈
  }
};

document.getElementById('replay').onclick = function () {
  var command;
  while (command = commandStack.shift()) {
    command();
  }
}