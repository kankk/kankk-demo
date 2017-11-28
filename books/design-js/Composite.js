var MacroCommand = function() {
  return {
    commandsList: [],
    add: function(command) {
      this.commandsList.push(command);
    },
    execute: function() {
      for(var i = 0, command; command = this.commandsList[i++];) {
        command.execute();
      }
    }
  }
};

var openTvCommand = {
  execute: function() {
    console.log('打开电视');
  },
  add: function() {
    throw new Error('叶子对象不能添加子节点');
  }
};

var macroCommand = MacroCommand();

macroCommand.add(openTvCommand);
// openTvCommand.add(macroCommand); // Uncaught Error: 叶子对象不能添加子节点