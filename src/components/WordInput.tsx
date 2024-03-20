import { Button, Input } from "@mantine/core";
import React, { FormEventHandler } from "react";

interface WordInputProps {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  guessText: string;
  setGuessText: React.Dispatch<React.SetStateAction<string>>;
  setKeyPressed: React.Dispatch<React.SetStateAction<string>>;
  playerWon: boolean;
  gameOver: boolean;
}

const WordInput = ({
  handleSubmit,
  guessText,
  setGuessText,
  setKeyPressed,
  playerWon,
  gameOver,
}: WordInputProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      //className=" w-1/5 flex flex-row justify-evenly items-center mb-5"
      className="w-4/5 xl:w-2/5 flex flex-row justify-evenly items-center mb-5"
    >
      <Input
        type="text"
        className="p-4"
        maxLength={5}
        placeholder="Enter a word"
        value={guessText}
        onChange={(e) => setGuessText(e.target.value.toUpperCase())}
        size="lg"
        disabled={playerWon || gameOver}
        onKeyDown={(e) => setKeyPressed(e.key.toUpperCase())}
        onKeyUp={() => setKeyPressed("")}
      />
      <Button
        type="submit"
        disabled={playerWon || gameOver || guessText.length !== 5}
        className="p-2"
        size="lg"
      >
        Go!
      </Button>
    </form>
  );
};

export default WordInput;
