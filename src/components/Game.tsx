import { Button, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import Letters from "./Letters";
import Keyboard from "./Keyboard";
import { GameStatsProps } from "../App";
import WordInput from "./WordInput";

interface Guess {
  splitGuess: string[];
  correctWord: { letter: string; status: string }[];
}

export interface KeyStatus {
  greenKeys: string[];
  yellowKeys: string[];
  wrongKeys: string[];
}

export interface GameProps {
  gameStats: GameStatsProps;
  setGameStats: React.Dispatch<
    React.SetStateAction<{
      gameCount: number;
      winCount: number;
      loseCount: number;
    }>
  >;
}

const Game = ({ gameStats, setGameStats }: GameProps) => {
  const initialCorrectWord = [
    { letter: "", status: "white" },
    { letter: "", status: "white" },
    { letter: "", status: "white" },
    { letter: "", status: "white" },
    { letter: "", status: "white" },
  ];

  const [correctWord, setCorrectWord] = useState(initialCorrectWord);
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [guessText, setGuessText] = useState<string>("");
  const [guessCount, setGuessCount] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [playerWon, setPlayerWon] = useState<boolean>(false);
  const [keyPressed, setKeyPressed] = useState<string>("");

  const keys: string[] = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

  const [keyStatus, setKeyStatus] = useState<KeyStatus>({
    greenKeys: [],
    yellowKeys: [],
    wrongKeys: [],
  });

  const incrementGameCount = () => {
    setGameStats((prevGameStats) => ({
      ...prevGameStats,
      gameCount: prevGameStats.gameCount + 1,
    }));
  };

  const incrementWinCount = () => {
    setGameStats((prevGameStats) => ({
      ...prevGameStats,
      winCount: prevGameStats.winCount + 1,
    }));
  };

  const incrementLoseCount = () => {
    setGameStats((prevGameStats) => ({
      ...prevGameStats,
      loseCount: prevGameStats.loseCount + 1,
    }));
  };

  const resetGame = () => {
    setCorrectWord(initialCorrectWord);
    setGuesses([]);
    setGuessText("");
    setGuessCount(0);
    setGameOver(false);
    setPlayerWon(false);
    setKeyStatus({ greenKeys: [], yellowKeys: [], wrongKeys: [] });
    incrementGameCount();
  };

  const failMessage = (
    <>
      Game Over! The correct word was{" "}
      <span className="font-bold">
        {correctWord.map((letter) => letter.letter).join("")}
      </span>
      .
    </>
  );

  const successMessage = (
    <>
      Congratulations! You got it in{" "}
      <span className="font-bold">{guessCount}</span> attempts.
    </>
  );
  useEffect(() => {
    const fetchRandomWord = async () => {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word?length=5"
      );
      const data = await response.json();
      const randomWord = data[0].toUpperCase().split("");
      const correctWord = randomWord.map((letter: string) => ({
        letter,
        status: "white",
      }));
      console.log(correctWord);
      setCorrectWord(correctWord);
    };

    try {
      fetchRandomWord();
    } catch (error) {
      console.log(error);
    }
  }, [gameStats.gameCount]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const chars = guessText.split("");
    const newGuess: Guess = {
      splitGuess: [...chars],
      correctWord: [...correctWord],
    };
    const updatedGuesses = [...guesses, newGuess];
    setGuesses(updatedGuesses);
    checkGuess(updatedGuesses);
    setGuessCount(guessCount + 1);
    setGuessText("");
  }

  function checkGuess(updatedGuesses: Guess[]) {
    const updatedGuessesWithColors = updatedGuesses.map((guess) => {
      const updatedCorrectWord = guess.correctWord.map((item) => ({ ...item }));

      guess.splitGuess.forEach((guessLetter, index) => {
        const correctLetter = updatedCorrectWord[index].letter;

        if (correctLetter === guessLetter) {
          updatedCorrectWord[index].status = "green";
        } else if (
          guess.correctWord.some((letter) => letter.letter === guessLetter)
        ) {
          updatedCorrectWord[index].status = "yellow";
        } else {
          updatedCorrectWord[index].status = "white";
        }
        // purpose is to store key status for keyboard sake
        setKeyStatus((prevKeyStatus) => {
          const updatedKeyStatus = { ...prevKeyStatus };

          if (updatedCorrectWord[index].status === "green") {
            updatedKeyStatus.greenKeys = [
              ...updatedKeyStatus.greenKeys,
              guessLetter,
            ];
          } else if (updatedCorrectWord[index].status === "yellow") {
            updatedKeyStatus.yellowKeys = [
              ...updatedKeyStatus.yellowKeys,
              guessLetter,
            ];
          } else if (updatedCorrectWord[index].status === "white") {
            updatedKeyStatus.wrongKeys = [
              ...updatedKeyStatus.wrongKeys,
              guessLetter,
            ];
          }

          return updatedKeyStatus;
        });
      });

      return {
        splitGuess: guess.splitGuess,
        correctWord: updatedCorrectWord,
      };
    });

    setGuesses(updatedGuessesWithColors);

    const allCorrect = updatedGuessesWithColors.some((guess) =>
      guess.correctWord.every((word) => word.status === "green")
    );

    if (allCorrect) {
      setGameOver(true);
      setPlayerWon(true);
      incrementWinCount();
    } else if (guessCount === 4 && !allCorrect) {
      setGameOver(true);
      incrementLoseCount();
    }
  }

  return (
    <>
      <div className="flex flex-row justify-center w-100">
        <WordInput
          handleSubmit={handleSubmit}
          guessText={guessText}
          setGuessText={setGuessText}
          setKeyPressed={setKeyPressed}
          playerWon={playerWon}
          gameOver={gameOver}
        />
        {/* <form
          onSubmit={handleSubmit}
          className=" w-1/5 flex flex-row justify-evenly items-center mb-5"
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
            Go
          </Button>
        </form> */}
        {/* <LetterInput
          sequence={guessText}
          setSequence={setGuessText}
          handleSubmit={handleSubmit}
          playerWon={playerWon}
          gameOver={gameOver}
        /> */}
      </div>
      {guesses.length > 0 && (
        <div className="flex flex-col justify-center items-center">
          {guesses.map((guess, index) => (
            <Letters
              key={index}
              correctWord={guess.correctWord}
              splitGuess={guess.splitGuess}
            />
          ))}
        </div>
      )}

      <div className="my-5 flex flex-col items-center justify-center gap-4 mt-10">
        {gameOver && !playerWon && <Text>{failMessage}</Text>}
        {playerWon && <Text>{successMessage}</Text>}
        {gameOver && <Button onClick={resetGame}>New Game</Button>}
      </div>
      <div className="fixed bottom-10 left-0 right-0 p-4">
        {!gameOver && (
          <Keyboard
            keys={keys}
            guessText={guessText}
            setGuessText={setGuessText}
            keyStatus={keyStatus}
            keyPressed={keyPressed}
          />
        )}
      </div>
    </>
  );
};

export default Game;
