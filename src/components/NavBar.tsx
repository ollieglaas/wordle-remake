import { Image, Text, useMantineColorScheme } from "@mantine/core";
import Logo from "/logo.svg";
import LogoWhite from "/logo-white.svg";
import { GameStatsProps } from "../App";

interface NavBarProps {
  gameStats: GameStatsProps;
}

const NavBar = ({ gameStats }: NavBarProps) => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <div className="w-100 p-8 border-b-2 border-[#2e2e2e] mb-5">
      <div className="flex flex-row justify-between items-center px-20">
        <Image src={colorScheme === "dark" ? LogoWhite : Logo} alt="" w={400} />
        <div className="flex flex-row gap-16">
          <Text>Games Played: {gameStats.gameCount}</Text>
          <Text>Win Count: {gameStats.winCount}</Text>
          <Text>Lose Count: {gameStats.loseCount}</Text>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
