type GameOverPropsT = {
  winner: string;
  onRematch: () => void;
};

const GameOver = ({ winner, onRematch }: GameOverPropsT): JSX.Element => {
  return (
    <>
      <h1>Game Over!</h1>
      {winner && <p>{winner} won</p>}
      {!winner && <p>It's a draw</p>}
      <p>
        <button onClick={onRematch}>Rematch</button>
      </p>
    </>
  );
};

export default GameOver;
