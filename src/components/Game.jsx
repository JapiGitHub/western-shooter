import React, { useState } from "react";
import Menu from "./Menu";
import LocalSplitScreenMode from "./LocalSplitScreenMode";
import LocalAiMode from "./LocalAiMode";
import Login from "./Login";
import TouchSplitMode from "./TouchSplitMode";
import MultiPlayerLobby from "./MultiPlayerLobby";
import Cactus from "./Cactus";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Game({ gameMode, setGameMode, auth, firestore }) {
  const [showMenu, setShowMenu] = useState(true);
  const [slideGame, setSlideGame] = useState(false);
  const [difficulty, setDifficulty] = useState(260);

  const [theme, setTheme] = useState("normal");

  const [user] = useAuthState(auth);

  return (
    <div className={theme === "normal" ? "screen" : "screen themeSepia"}>
      <aside className="sky"></aside>
      <img
        src="./assets/horizon.wide.gif"
        className={gameMode != "menu" ? "menuHorizon menuSlide" : "menuHorizon"}
      ></img>
      <img src="./assets/cloud1.gif" className="cloud cloud1"></img>
      <img src="./assets/cloud2.gif" className="cloud cloud2"></img>
      <img src="./assets/cloud3.gif" className="cloud cloud3"></img>
      <img src="./assets/cloud3.gif" className="cloud cloud4"></img>

      {gameMode === "menu" ? (
        <Menu
          gameMode={gameMode}
          setGameMode={setGameMode}
          auth={auth}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          user={user}
          setTheme={setTheme}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      ) : null}

      {gameMode === "split" ? (
        <LocalSplitScreenMode
          setGameMode={setGameMode}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          slideGame={slideGame}
          setSlideGame={setSlideGame}
          difficulty={difficulty}
          firestore={firestore}
        />
      ) : null}

      {gameMode === "touch" ? (
        <TouchSplitMode
          setGameMode={setGameMode}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          slideGame={slideGame}
          setSlideGame={setSlideGame}
        />
      ) : null}

      {gameMode === "ai" ? (
        <LocalAiMode
          setGameMode={setGameMode}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          slideGame={slideGame}
          setSlideGame={setSlideGame}
        />
      ) : null}

      {gameMode === "lobby" ? (
        <MultiPlayerLobby
          gameMode={gameMode}
          setGameMode={setGameMode}
          auth={auth}
          user={user}
          firestore={firestore}
          slideGame={slideGame}
          setSlideGame={setSlideGame}
        />
      ) : null}
      <Cactus gameMode={gameMode} />
      <img
        className={gameMode != "menu" ? "cow hideCow" : "cow"}
        src="./assets/cow.gif"
      ></img>
    </div>
  );
}
