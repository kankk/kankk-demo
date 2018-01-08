import React, { Component } from 'react';
import Board from './Board';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        wins: lines[i]
      };
    }
  }
  return null;
}

class Game extends Component {
  constructor() {
    super();
    this.state = {
      history: [{squares: Array(9).fill(null)}],
      stepNumber: 0,
      xIsNext: true,
      wins: Array(3).fill(null),
    };
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    // .slice()方法可以浅拷贝一个当前数组
    const squares = current.squares.slice();
    // 当前方格内已经落子/有一方获胜就无法继续落子
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) ? false : true
    });
  }

  render() {
    // 没有悔棋
    // const history = this.state.history;
    // 实现悔棋
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const result = calculateWinner(current.squares);
    const winner = result && result.winner;
    const wins = result && result.wins;

    const moves = history.map((step, move) => {
      const desc = move ? `Move #${move}`: 'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{ desc }</a>
        </li>
      )
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`; 
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            wins={wins}
            onClick={(i) => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

export default Game;