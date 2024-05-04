import { ChangeEvent, useState } from "react";

type PlayerProps = {
  initialPlayerName: string;
  symbol: string;
  isActive: boolean;
  onChange: (symbol: string, playerName: string) => void;
};

const Player = ({
  initialPlayerName,
  symbol,
  isActive,
  onChange,
}: PlayerProps): JSX.Element => {
  const [playerName, setPlayerName] = useState(initialPlayerName);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = (): void => {
    setIsEditing((prevEdit) => !prevEdit);

    if (isEditing) {
      onChange(symbol, playerName);
    }
  };

  const handleChangePlayerName = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setPlayerName(event.target.value);
  };

  return (
    <li className={`${isActive ? "border-2" : ""}`}>
      {!isEditing && (
        <>
          <span>{playerName}</span> <span>{symbol}</span>
        </>
      )}
      {isEditing && (
        <input
          type="text"
          onChange={handleChangePlayerName}
          value={playerName}
        />
      )}
      <span onClick={handleEdit}>{!isEditing ? "Edit" : "Save"}</span>
    </li>
  );
};

export default Player;
