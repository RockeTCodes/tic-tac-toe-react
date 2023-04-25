const StatusMessage = ({ winner, gamingBoard }) => {
  const { squares, isNext } = gamingBoard;

  const noMovesLeft = squares.every(
    (currentSquareValue) => currentSquareValue !== null
  );

  const next = isNext ? "X" : "O";

  const renderMessage = () => {
    if (winner) {
      return (
        <div>
          Winner is{" "}
          <span className={winner === "X" ? "text-green" : "text-orange"}>
            {winner}
          </span>
        </div>
      );
    }

    if (!winner && noMovesLeft) {
      return (
        <div>
          Draw between <span className="text-orange">O</span> &{" "}
          <span className="text-green">X</span>
        </div>
      );
    }

    if (!winner && !noMovesLeft) {
      return (
        <div>
          Next player is{" "}
          <span className={isNext ? "text-green" : "text-orange"}>{next}</span>
        </div>
      );
    }

    return null;
  };

  return <div className="status-message">{renderMessage()}</div>;
};

export default StatusMessage;
