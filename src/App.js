import React, {useState} from "react";
import './App.css';
import Square from "./Square";
const initialData = [null, null, null, null, null, null, null, null, null];
const matches = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


function App() {
  const [squares, setSquares] = useState(initialData);
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const checkWinner = () => {
    for (let index = 0; index < matches.length; index++) {
      if (
        squares[matches[index][0]] == squares[matches[index][1]] &&
        squares[matches[index][1]] == squares[matches[index][2]] &&
        squares[matches[index][2]] == squares[matches[index][0]]
      ) {
        return squares[matches[index][0]];
      }
    }
    return false;
  };

  const getNextPlayer = () => {
    if(currentPlayer == "X")
    {
      setCurrentPlayer("0");
    }
    else {
      setCurrentPlayer("X");
    }
  };

  const CheckStatus = () => {
    let status;
    let winner = checkWinner();
    let tie=squares.every((ele) => ele !== null);
    if (winner) {
      status = `Winner is : ${winner}`;
      
    } else if (tie) {
      status = `Tie!`;
    } else {
      status = `Current Player : ${currentPlayer}`;
    }
    return <h2>{status}</h2>
  };
  

  const handleCheck = (i) => {
    if(checkWinner())
    {
      return true;
    }
    const updateSquares = [...squares];
    if (updateSquares[i] == null) {
    updateSquares[i] = currentPlayer;
    setSquares(updateSquares);
    getNextPlayer();
    }
  };
  const handleRestart= () => {
    setSquares(initialData);
    setCurrentPlayer("X");
  };

  const renderSquares = () => {
    return (
      <div>
        {squares.map((square, index) => {
          if (index !== 0 && index % 3 == 0) {
            return (
              <>
                <br />
                <Square
                  index={index}
                  key={index}
                  value={square}
                  style={{ display: "inline-block" }}
                  onClick={() => handleCheck(index)}
                />
              </>
            );
          }
          return (
            <Square
              key={index}
              value={square}
              style={{ display: "inline-block" }}
              onClick={() => handleCheck(index)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <CheckStatus />
      {renderSquares()}
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
}

export default App;
