import React, { useState } from "react";
import PlayerCharsAI from "./PlayerChars";
import Cactus from "./Cactus";

import HeroSelectorAI from "./HeroSelectorAI";
import GameLocalAI from "./GameLocalAI";

export default function LocalAiMode({
  setGameMode,
  showMenu,
  setShowMenu,
  slideGame,
  setSlideGame,
}) {
  const [playerAnim, setPlayerAnim] = useState("waiting");
  const [player2Anim, setPlayer2Anim] = useState("waiting");
  const [player2Hero, setPlayer2Hero] = useState("cowboy");
  const [player1Hero, setPlayer1Hero] = useState("sheriff");

  //playerAnim vaihtoehdot:
  //waiting
  //shooting
  //shot
  //dead

  const backToMenu = () => {
    setGameMode("menu");
    setShowMenu(true);
    setSlideGame(false);
  };

  return (
    <>
      <main className="background-world-arena">
        <section className="ground"></section>
        <img
          className={slideGame ? "horizon" : "horizon hideHorizon"}
          src="./assets/horizon.wide.gif"
          alt="horizon"
        ></img>
        <button onClick={backToMenu} className="menuButton">
          Menu
        </button>
        <GameLocalAI
          setPlayerAnim={setPlayerAnim}
          setPlayer2Anim={setPlayer2Anim}
          showMenu={showMenu}
          slideGame={slideGame}
          setSlideGame={setSlideGame}
        />
        <PlayerCharsAI
          playerAnim={playerAnim}
          player2Anim={player2Anim}
          player2Hero={player2Hero}
          player1Hero={player1Hero}
          showMenu={showMenu}
          slideGame={slideGame}
          setSlideGame={setSlideGame}
        />
        <HeroSelectorAI setPlayer1Hero={setPlayer1Hero} />
      </main>
    </>
  );
}
