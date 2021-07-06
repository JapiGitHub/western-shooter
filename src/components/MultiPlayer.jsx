import React, { useState } from "react";
import MultiPlayerLobby from "./MultiPlayerLobby";
import MultiPlayerMode from "./MultiPlayerMode";
import "./multiPlayer.scss";

export default function MultiPlayer({
  setGameMode,
  firestore,
  setScreenSlide,
  screenSlide,
  setPlayerAnim,
  setPlayer2Anim,
  playerAnim,
  player2Anim,
  player2Hero,
  setPlayer2Hero,
  player1Hero,
  setPlayer1Hero,
}) {
  const [joinedServer, setJoinedServer] = useState("");
  const [gameCreatorP1, setGameCreatorP1] = useState(false);
  //push create true   ,   backToMenu/refresh false

  // seuraavaksi:
  //player heros to firestore
  //set ready ja muutenkin koko peli
  //voit testata suoraan toisen pelaajan settejä firestoresta ekana

  return (
    <div>
      <aside className="dirt"></aside>
      {joinedServer === "" ? (
        <MultiPlayerLobby
          firestore={firestore}
          setGameMode={setGameMode}
          setJoinedServer={setJoinedServer}
          setGameCreatorP1={setGameCreatorP1}
          setScreenSlide={setScreenSlide}
          screenSlide={screenSlide}
        />
      ) : (
        <MultiPlayerMode
          player2Hero={player2Hero}
          setPlayer2Hero={setPlayer2Hero}
          player1Hero={player1Hero}
          setPlayer1Hero={setPlayer1Hero}
          setGameMode={setGameMode}
          firestore={firestore}
          joinedServer={joinedServer}
          gameCreatorP1={gameCreatorP1}
          setGameCreatorP1={setGameCreatorP1}
          setScreenSlide={setScreenSlide}
          screenSlide={screenSlide}
          playerAnim={playerAnim}
          setPlayerAnim={setPlayerAnim}
          player2Anim={player2Anim}
          setPlayer2Anim={setPlayer2Anim}
        />
      )}
    </div>
  );
}
