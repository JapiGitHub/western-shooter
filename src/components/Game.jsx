import React, { useState } from "react";
import Menu from "./Menu";
import LocalSplitScreenMode from "./LocalSplitScreenMode";
import LocalAiMode from "./LocalAiMode";
import MultiPlayerMode from "./MultiPlayerMode";
import TouchSplitMode from "./TouchSplitMode";
import MultiPlayerLobby from "./MultiPlayerLobby";

export default function Game({ gameMode, setGameMode, auth, firestore }) {
  const [showMenu, setShowMenu] = useState(true);
  const [slideGame, setSlideGame] = useState(false);

  return (
    <div className="screen">
      <Menu
        gameMode={gameMode}
        setGameMode={setGameMode}
        auth={auth}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />

      {gameMode === "split" ? (
        <LocalSplitScreenMode
          setGameMode={setGameMode}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          slideGame={slideGame}
          setSlideGame={setSlideGame}
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

      {gameMode === "multi" ? (
        <MultiPlayerMode
          setGameMode={setGameMode}
          auth={auth}
          firestore={firestore}
          slideGame={slideGame}
          setSlideGame={setSlideGame}
        />
      ) : null}

      {gameMode === "lobby" ? (
        <MultiPlayerLobby
          setGameMode={setGameMode}
          auth={auth}
          firestore={firestore}
          slideGame={slideGame}
          setSlideGame={setSlideGame}
        />
      ) : null}
    </div>
  );
}
