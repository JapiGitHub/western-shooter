import React from "react";
import Menu from "./Menu";
import LocalSplitScreenMode from "./LocalSplitScreenMode";
import LocalAiMode from "./LocalAiMode";
import MultiPlayerMode from "./MultiPlayerMode";
import TouchSplitMode from "./TouchSplitMode";
import MultiPlayerLobby from "./MultiPlayerLobby";

export default function Game({ gameMode, setGameMode, auth, firestore }) {
  return (
    <div>
      {gameMode === "menu" ? (
        <Menu gameMode={gameMode} setGameMode={setGameMode} auth={auth} />
      ) : null}

      {gameMode === "split" ? (
        <LocalSplitScreenMode setGameMode={setGameMode} />
      ) : null}

      {gameMode === "touch" ? (
        <TouchSplitMode setGameMode={setGameMode} />
      ) : null}

      {gameMode === "ai" ? <LocalAiMode setGameMode={setGameMode} /> : null}

      {gameMode === "multi" ? (
        <MultiPlayerMode
          setGameMode={setGameMode}
          auth={auth}
          firestore={firestore}
        />
      ) : null}

      {gameMode === "lobby" ? (
        <MultiPlayerLobby
          setGameMode={setGameMode}
          auth={auth}
          firestore={firestore}
        />
      ) : null}
    </div>
  );
}
