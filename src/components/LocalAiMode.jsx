import React from "react";

import HeroSelectorAI from "./HeroSelectorAI";
import GameLocalAI from "./GameLocalAI";

export default function LocalAiMode({
  setGameMode,
  setShowMenu,
  difficulty,
  setScreenSlide,
  setPlayerAnim,
  setPlayer2Anim,
  player1Hero,
  setPlayer1Hero,
}) {
  //playerAnim vaihtoehdot:
  //waiting
  //shooting
  //shot
  //dead

  const backToMenu = () => {
    setGameMode("menu");
    setShowMenu(true);
    setScreenSlide("menu");
  };

  return (
    <>
      <main className="background-world-arena">
        <section className="ground"></section>
        <button onClick={backToMenu} className="btn menuButton">
          Menu
        </button>
        <GameLocalAI
          setPlayerAnim={setPlayerAnim}
          setPlayer2Anim={setPlayer2Anim}
          difficulty={difficulty}
        />
        <HeroSelectorAI
          setPlayer1Hero={setPlayer1Hero}
          player1Hero={player1Hero}
        />
      </main>
    </>
  );
}
