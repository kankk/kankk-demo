function Player(name, teamColor) {
  this.name = name;
  this.teamColor = teamColor;
  this.state = 'alive';
};

Player.prototype.win = function () {
  console.log(this.name + ' won ');
};

Player.prototype.lose = function () {
  console.log(this.name + ' lost ');
};

Player.prototype.die = function () {
  this.state = 'dead';
  playerDirector.ReceiveMessage('playerDead', this); // 给中介者发送消息, 玩家死亡
};

Player.prototype.changeTeam = function (color) {
  playerDirector.ReceiveMessage('changeTeam', this, color); // 给中介者发送消息, 玩家换队
};

var playerFactory = function (name, teamColor) {
  var newPlayer = new Player(name, teamColor);
  playerDirector.ReceiveMessage('addPlayer', newPlayer);

  return newPlayer;
};

var playerDirector = (function () {
  var players = {};
  var operations = {};

  // 新增一个玩家
  operations.addPlayer = function (player) {
    var teamColor = player.teamColor;
    players[teamColor] = players[teamColor] || [];
    players[teamColor].push(player);
  };

  // 移除一个玩家
  operations.removePlayer = function (player) {
    var teamColor = player.teamColor;
    var teamPlayers = players[teamColor] || [];
    for (var i = teamPlayers.length - 1; i >= 0; i--) {
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1);
      }
    }
  };

  // 玩家换队
  operations.changeTeam = function (player, newTeamColor) {
    operations.removePlayer(player);
    player.teamColor = newTeamColor;
    operations.addPlayer(player);
  };

  // 玩家死亡
  operations.playerDead = function (player) {
    var teamColor = player.teamColor;
    var teamPlayers = players[teamColor];

    var all_dead = true;

    for (var i = 0, player; player = teamPlayers[i++];) {
      if (player.state !== 'dead') {
        all_dead = false;
        break;
      }
    }

    if (all_dead) {
      for (var i = 0; player; player = teamPlayers[i++]) {
        player.lose();
      }

      for (var color in players) {
        if (color !== teamColor) {
          var teamPlayers = players[color];
          for (var i = 0, player; player = teamPlayers[i++];) {
            player.win();
          }
        }
      }
    }
  };

  var ReceiveMessage = function () {
    var message = Array.prototype.shift.call(arguments);
    operations[message].apply(this, arguments);
  };

  return {
    ReceiveMessage: ReceiveMessage
  }
})();

var player1 = playerFactory('red1', 'red');
var player2 = playerFactory('red2', 'red');
var player3 = playerFactory('red3', 'red');
var player4 = playerFactory('red4', 'red');

var player5 = playerFactory('blue1', 'blue');
var player6 = playerFactory('blue2', 'blue');
var player7 = playerFactory('blue3', 'blue');
var player8 = playerFactory('blue4', 'blue');

player1.die();
player2.die();
player3.die();
player4.die();