'use client';


export function Square({value, onSquareClick, disabled}) {
  return (
    <button className={`square ${disabled ? "disabled" : null}`} disabled={disabled} onClick={onSquareClick}>
      {value}
    </button>
  );
}

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
        return squares[a];
      }
    }
    return null;
  }
  

export function Board({ xIsNext, squares, onPlay, gameStatus, playerStatus }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
  const isGameDisabled = gameStatus == "NOT_STARTED"

  return (
    <>
        { playerStatus == "NOT_JOINED" ? "Waiting for the other player": "your opponent has joined the game"}
      <div className="status">{status}</div>
      <div className="board-row">
        <Square disabled={isGameDisabled} value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square disabled={isGameDisabled} value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square disabled={isGameDisabled} value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square disabled={isGameDisabled} value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square disabled={isGameDisabled} value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square disabled={isGameDisabled} value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square disabled={isGameDisabled} value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square disabled={isGameDisabled} value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square disabled={isGameDisabled} value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
