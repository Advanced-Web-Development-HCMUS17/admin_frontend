import React from 'react';

function Square(props) {
  return (
    <button style={{
      background: props.highlight === true ?
        (props.value === "X" ? '#015bd8' : '#ff8080') : (props.isMove ? 'gray' : 'white'), cursor: "pointer",
      fontSize: "100%", color: props.value === "X" ? 'blue' : 'red',
    }}
      className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;