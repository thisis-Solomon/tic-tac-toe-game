type SquareT = {
  row: number;
  col: number;
};

type TurnsT = {
  square: SquareT;
  player: string;
}[];

type LogProps = {
  turns: TurnsT;
};

const Log = ({ turns }: LogProps): JSX.Element => {
  return (
    <ol>
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row}-{turn.square.col}
        </li>
      ))}
    </ol>
  );
};

export default Log;
