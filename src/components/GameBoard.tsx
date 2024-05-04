const GameBoard = ({ onSelectedSquare, board }): JSX.Element => {
  return (
    <ol className="flex gap-5">
      {board.map((row, indexRow: number) => (
        <li key={indexRow}>
          <ol className="flex gap-2 flex-col">
            {row.map((col, colIndex: number) => (
              <li key={colIndex}>
                <button
                  disabled={col !== ""}
                  onClick={() => onSelectedSquare(indexRow, colIndex)}
                  className="h-10 w-10 bg-gray-500"
                >
                  {col}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
