import React, { Component } from 'react';

import Square from './Square';

class Board extends Component {
  constructor(){
    super();
  }
  renderSquare = (i) => {
    let isWin;
    if (this.props.wins) {
      isWin = this.props.wins.includes(i);
    } else {
      isWin = false;
    }
    // return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
    return <Square value={this.props.squares[i]} win={isWin} onClick={() => this.props.onClick(i)}/>;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;