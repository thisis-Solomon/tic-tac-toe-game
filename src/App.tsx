"useClient";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./GameOver";

type SquareT = {
  row: number;
  col: number;
};

type TurnsT = {
  square: SquareT;
  player: string;
}[];

type PlayerT = {
  X: string;
  O: string;
};

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns: TurnsT): string {
  let currentPlayer: string = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, player): string {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = player[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [player, setPlayer] = useState<PlayerT>({
    X: "player 1",
    O: "player 2",
  });

  const [gameTurns, setGameTurns] = useState<TurnsT>([]);
  const activePlayer = derivedActivePlayer(gameTurns);

  const gameBoard = Array.from(initialBoard, (row) =>
    row.map((col) => (col !== null ? col : ""))
  );

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player !== null ? player : "";
  }

  const winner = deriveWinner(gameBoard, player);
  const itsDraw = gameTurns.length === 9 && !winner;

  const handleSelectedSquare = (rowIndex: number, colIndex: number): void => {
    setGameTurns((prevTurn: TurnsT): TurnsT => {
      const currentPlayer = derivedActivePlayer(prevTurn);

      const updatedTurns: TurnsT = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];

      return updatedTurns;
    });
  };

  const handlePlayer = (symbol: string, playerName: PlayerT): void => {
    setPlayer((prevPlayerName) => {
      return {
        ...prevPlayerName,
        [symbol]: playerName,
      };
    });
  };

  const gameRestart = (): void => {
    setGameTurns([]);
  };

  return (
    <main>
      <section>
        <ul>
          <Player
            initialPlayerName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChange={handlePlayer}
          />
          <Player
            initialPlayerName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChange={handlePlayer}
          />
        </ul>
      </section>
      {(winner || itsDraw) && (
        <GameOver winner={winner as string} onRematch={gameRestart} />
      )}
      <GameBoard onSelectedSquare={handleSelectedSquare} board={gameBoard} />
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
