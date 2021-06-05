import React, { useEffect, useState } from "react";
import PlayerCharsAI from "./PlayerChars";
import Cactus from "./Cactus";

import HeroSelectorAI from "./HeroSelectorAI";
import GameLocalAI from "./GameLocalAI";

export default function LocalAiMode({ setGameMode }) {
  const [playerAnim, setPlayerAnim] = useState("waiting");
  const [player2Anim, setPlayer2Anim] = useState("waiting");
  const [player2Hero, setPlayer2Hero] = useState("cowboy");
  const [player1Hero, setPlayer1Hero] = useState("sheriff");

  //playerAnim vaihtoehdot:
  //waiting
  //shooting
  //shot
  //dead

  // useEffect(() => {
  //   const timeout = setTimeout(() => {

  //   }, 3000);
  // }, []);

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
        <GameLocalAI
          playerAnim={playerAnim}
          setPlayerAnim={setPlayerAnim}
          player2Anim={playerAnim}
          setPlayer2Anim={setPlayer2Anim}
        />
        <PlayerCharsAI
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
