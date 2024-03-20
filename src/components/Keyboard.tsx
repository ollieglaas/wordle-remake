import { Text } from "@mantine/core";
import React, { SetStateAction } from "react";
import { KeyStatus } from "./Game";

interface KeyboardProps {
  keys: string[];
  guessText: string;
  setGuessText: React.Dispatch<SetStateAction<string>>;
  keyStatus: KeyStatus;
  keyPressed: string;
}

const Keyboard = ({
  keys,
  guessText,
  setGuessText,
  keyStatus,
  keyPressed,
}: KeyboardProps) => {
  const addLetter = (letter: string) => {
    setGuessText((prev) => prev + letter);
  };

  const getBackground = (letter: string) => {
    if (keyStatus.greenKeys.includes(letter)) {
      return "bg-green-600";
    } else if (keyStatus.yellowKeys.includes(letter)) {
      return "bg-yellow-600";
    } else if (keyStatus.wrongKeys.includes(letter)) {
      return "bg-[#2b2b2b]";
    } else {
      return "bg-[#3b3b3b]";
    }
  };

  return (
    <>
      {keys.map((key) => (
        <div key={key} className="flex flex-row justify-center w-100">
          {key.split("").map((letter) => (
            <button
              key={letter}
              // className={`w-14 h-14 m-1 border border-${
              //   isWrongKey(letter) ? "[#2e2e2e]" : "[#E2E2E2]"
              // } rounded-xl hover:bg-[#777777] hover:border-[#777777] transition-all`}
              className={`w-14 h-14 m-1 ${getBackground(letter)} rounded ${
                keyPressed === letter &&
                guessText.length !== 5 &&
                "outline outline-white"
              }`}
              disabled={guessText.length === 5}
              onClick={() => addLetter(letter)}
            >
              <Text size="xl" className="active:text-3xl" fw={700}>
                {letter}
              </Text>
            </button>
          ))}
        </div>
      ))}
    </>
  );
};

export default Keyboard;
