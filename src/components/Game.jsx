import React, { useState } from "react";
import Menu from "./Menu";
import LocalSplitScreenMode from "./LocalSplitScreenMode";
import LocalAiMode from "./LocalAiMode";
import Login from "./Login";
import TouchSplitMode from "./TouchSplitMode";
import MultiPlayerLobby from "./MultiPlayerLobby";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Game({ gameMode, setGameMode, auth, firestore }) {
  const [showMenu, setShowMenu] = useState(true);
  const [slideGame, setSlideGame] = useState(false);

  const [user] = useAuthState(auth);

  return (
    <div className="screen">
      {gameMode === "menu" ? (
        <Menu
          gameMode={gameMode}
          setGameMode={setGameMode}
          auth={auth}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          user={user}
        />
      ) : null}

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
    </div>
  );
}
