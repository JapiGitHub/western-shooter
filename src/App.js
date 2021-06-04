import "./App.scss";
import { useState } from "react";

import Menu from "./components/Menu";
import LocalSplitScreenMode from "./components/LocalSplitScreenMode";
import AiMode from "./components/AiMode";

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
      {gameMode === "ai" ? <AiMode /> : null}
    </div>
  );
}

export default App;
