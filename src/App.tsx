import { useState } from "react";
import Game from "./components/Game";
import NavBar from "./components/NavBar";

export interface GameStatsProps {
  gameCount: number;
  winCount: number;
  loseCount: number;
}

function App() {
  const [gameStats, setGameStats] = useState<GameStatsProps>({
    gameCount: 0,
    winCount: 0,
    loseCount: 0,
  });

  return (
    <>
      <NavBar gameStats={gameStats} />
      <Game gameStats={gameStats} setGameStats={setGameStats} />
    </>
  );
}

export default App;
