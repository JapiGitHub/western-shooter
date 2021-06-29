import React, { useState } from "react";
import MultiPlayerLobby from "./MultiPlayerLobby";
import MultiPlayerMode from "./MultiPlayerMode";
import "./multiPlayer.scss";

export default function MultiPlayer({ setGameMode, firestore }) {
  const [joinedServer, setJoinedServer] = useState("");
  const [gameCreatorP1, setGameCreatorP1] = useState(false);
  //push create true   ,   backToMenu/refresh false

  // seuraavaksi:
  //player heros to firestore
  //set ready ja muutenkin koko peli
  //voit testata suoraan toisen pelaajan settejä firestoresta ekana

  return (
    <div>
      {joinedServer === "" ? (
        <MultiPlayerLobby
          firestore={firestore}
          setGameMode={setGameMode}
          setJoinedServer={setJoinedServer}
          setGameCreatorP1={setGameCreatorP1}
        />
      ) : (
        <MultiPlayerMode
          setGameMode={setGameMode}
          firestore={firestore}
          joinedServer={joinedServer}
          gameCreatorP1={gameCreatorP1}
          setGameCreatorP1={setGameCreatorP1}
        />
      )}
    </div>
  );
}
