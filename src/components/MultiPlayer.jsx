import React, { useState } from "react";
import MultiPlayerLobby from "./MultiPlayerLobby";
import MultiPlayerMode from "./MultiPlayerMode";

export default function MultiPlayer({ setGameMode, firestore }) {
  const [joinedServer, setJoinedServer] = useState("");

  return (
    <div>
      {joinedServer == "" ? (
        <MultiPlayerLobby
          firestore={firestore}
          setGameMode={setGameMode}
          setJoinedServer={setJoinedServer}
        />
      ) : (
        <MultiPlayerMode setGameMode={setGameMode} firestore={firestore} />
      )}
    </div>
  );
}
