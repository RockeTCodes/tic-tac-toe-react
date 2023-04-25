import React, { useState } from "react";
import Board from "./components/Board";
import "./styles.scss";
import { calculateWinner } from "./calculateWinner";
import StatusMessage from "./components/StatusMessage";
import History from "./components/History";

const NEW_GAME = [{ squares: Array(9).fill(null), isNext: false }];

function App() {
  const [history, setHistory] = useState(NEW_GAME);

  const [currentMove, setCurrentMove] = useState(0);

  const gamingBoard = history[currentMove];

  const { winner, winningSquares } = calculateWinner(gamingBoard.squares);

  const handleSquareClick = (clickedPosition) => {
    if (gamingBoard.squares[clickedPosition] || winner) {
      return;
    }
    setHistory((currentHistory) => {
      const isTraversing = currentMove + 1 !== currentHistory.length;

      const lastGamingState = isTraversing
        ? currentHistory[currentMove]
        : currentHistory[currentHistory.length - 1];
      // console.log(lastGamingState);

      const nextSquaresState = lastGamingState.squares.map(
        (sqaureValue, position) => {
          if (clickedPosition === position) {
            return lastGamingState.isNext ? "X" : "O";
          }
          return sqaureValue;
        }
      );

      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      return base.concat({
        squares: nextSquaresState,
        isNext: !lastGamingState.isNext,
      });
    });
    setCurrentMove((move) => move + 1);
  };

  const moveTo = (move) => {
    setCurrentMove(move);
  };

  const newGameStart = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  const draw = gamingBoard.squares.every(
    (currentSquareValue) => currentSquareValue !== null
  );

  const tacClass = () => {
    if (!winner && !draw) {
      return gamingBoard.isNext ? "text-green" : "text-orange";
    } else if (winner === "X") {
      return "text-green";
    } else if (winner === "O") {
      return "text-orange";
    } else if (draw) {
      return;
    }
  };

  return (
    <div className="app">
      <h1>
        TIC <span className={tacClass()}>TAC</span> TOE
      </h1>
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board
        squares={gamingBoard.squares}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <button
        type="button"
        className={`btn-reset ${winner || draw ? "active" : ""}`}
        onClick={newGameStart}
      >
        New Game
      </button>
      <h2>Game History</h2>

      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls" />
    </div>
  );
}

export default App;
