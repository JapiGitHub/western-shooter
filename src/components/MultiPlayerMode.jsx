import React, { useEffect, useState } from "react";
import PlayerCharsMulti from "./PlayerCharsMulti";
import Cactus from "./Cactus";

import HeroSelectorAI from "./HeroSelectorAI";
import GameMulti from "./GameMulti";

export default function MultiPlayerMode({ setGameMode, auth, firestore }) {
  const [playerAnim, setPlayerAnim] = useState("waiting");
  const [player2Anim, setPlayer2Anim] = useState("waiting");
  const [player2Hero, setPlayer2Hero] = useState("cowboy");
  const [player1Hero, setPlayer1Hero] = useState("sheriff");

  const backToMenu = () => {
    setGameMode("menu");
  };

  return (
    <>
      <main className="background-world-arena">
        <section className="ground"></section>
        <img className="horizon" src="./assets/horizon.gif"></img>
        <button onClick={backToMenu} className="menuButton">
          Menu
        </button>
        <GameMulti
          playerAnim={playerAnim}
          setPlayerAnim={setPlayerAnim}
          player2Anim={playerAnim}
          setPlayer2Anim={setPlayer2Anim}
          auth={auth}
          firestore={firestore}
        />
        <PlayerCharsMulti
          playerAnim={playerAnim}
          player2Anim={player2Anim}
          player2Hero={player2Hero}
          player1Hero={player1Hero}
        />
        <HeroSelectorAI setPlayer1Hero={setPlayer1Hero} />
        <Cactus />
      </main>
    </>
  );
}
