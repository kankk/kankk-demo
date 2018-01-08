import React, { Component } from 'react';

// class Square extends Component {
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

// 函数定义组件
const Square = (props) => {
  return (
    <button className={`square ${props.win ? 'square-win' : ''}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square