// import { Button } from "@mantine/core";
import { useRef, FormEvent } from "react";

interface InputProps {
  sequence: string;
  setSequence: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: FormEvent<Element>) => void;
  playerWon: boolean;
  gameOver: boolean;
}

const LetterInput = ({
  sequence,
  setSequence,
  handleSubmit,
  playerWon,
  gameOver,
}: InputProps) => {
  const inputs = useRef<HTMLInputElement[]>([]);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setSequence((prevSequence) => {
      const newSequence = prevSequence.split("");
      newSequence[index] = value.toUpperCase();
      return newSequence.join("");
    });

    // Move focus to the next input
    if (index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && index > 0) {
      event.preventDefault();
      inputs.current[index - 1].focus();
    }
    if (event.key === "Enter" && sequence.length === 5) {
      handleSubmit(event);
      inputs.current[0].focus();
    }
  };

  return (
    <div className="">
      {Array.from({ length: 5 }, (_, index) => (
        <input
          key={index}
          ref={(el) => (inputs.current[index] = el as HTMLInputElement)}
          type="text"
          maxLength={1}
          className="w-12 h-12 m-2 text-center rounded-lg mb-10 focus:outline-yellow-50 caret-transparent text-xl font-bold"
          value={sequence[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={playerWon || gameOver}
        />
      ))}
      {/* <Button
        onClick={handleSubmit}
        disabled={playerWon || gameOver || sequence.length !== 5}
        className="ml-10"
      >
        Go!
      </Button> */}
    </div>
  );
};

export default LetterInput;
