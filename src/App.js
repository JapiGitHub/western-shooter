import "./App.scss";
import { useState } from "react";

import Menu from "./components/Menu";
import LocalSplitScreenMode from "./components/LocalSplitScreenMode";
import LocalAiMode from "./components/LocalAiMode";
import GameLocalAI from "./components/GameLocalAI";

function App() {
  const [gameMode, setGameMode] = useState("menu");

  return (
    <div className="App">
      {gameMode === "menu" ? (
        <Menu gameMode={gameMode} setGameMode={setGameMode} />
      ) : null}
      {gameMode === "split" ? (
        <LocalSplitScreenMode setGameMode={setGameMode} />
      ) : null}
      {gameMode === "ai" ? <LocalAiMode setGameMode={setGameMode} /> : null}
    </div>
  );
}

export default App;
