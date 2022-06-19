import React from 'react'

function Square({value, style, onClick}) {
  return (
    <div className="square" style={style} onClick={onClick}>
      {value === null ? "-" : value}
    </div>
  );
}

export default Square