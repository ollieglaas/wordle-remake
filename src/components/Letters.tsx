import { MantineColorScheme, Text, useMantineColorScheme } from "@mantine/core";
import { motion } from "framer-motion";

interface LetterProps {
  correctWord: { letter: string; status: string }[];
  splitGuess: string[];
}

const Letters = ({ correctWord, splitGuess }: LetterProps) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <motion.div className="flex flex-row rounded w-full justify-center">
      {correctWord.map((letter, index) => (
        <motion.span
          key={index}
          className={`w-12 border border-black rounded p-2 m-2 ${getStatusColor(
            letter.status,
            colorScheme
          )}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.25 }} // Stagger delay
        >
          <Text
            c={colorScheme === "dark" ? "white" : "black"}
            size="xl"
            fw="600"
            className="text-center"
          >
            {splitGuess[index] ? splitGuess[index] : letter.letter}
          </Text>
        </motion.span>
      ))}
    </motion.div>
  );
};

function getStatusColor(
  status: string,
  colorScheme: MantineColorScheme
): string {
  if (status === "green") {
    return "bg-green-600";
  } else if (status === "yellow") {
    return "bg-yellow-600";
  } else {
    return `bg-${colorScheme === "dark" ? "[#3b3b3b]" : "white"}`;
  }
}

export default Letters;
