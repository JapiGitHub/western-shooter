import React, { useState } from "react";

import HeroSelectorAI from "./HeroSelectorAI";
import GameLocalAI from "./GameLocalAI";

export default function LocalAiMode({
  setGameMode,
  showMenu,
  setShowMenu,
  difficulty,
  firestore,
  slideGame,
  setSlideGame,
  setScreenSlide,
  screenSlide,
  playerAnim,
  setPlayerAnim,
  player2Anim,
  setPlayer2Anim,
  player2Hero,
  setPlayer2Hero,
  player1Hero,
  setPlayer1Hero,
  setShowLeaderBoard,
  showLeaderBoard,
}) {
  //playerAnim vaihtoehdot:
  //waiting
  //shooting
  //shot
  //dead

  const backToMenu = () => {
    setGameMode("menu");
    setShowMenu(true);
    setSlideGame(false);
    setScreenSlide("menu");
  };

  return (
    <>
      <main className="background-world-arena">
        <section className="ground"></section>
        <button onClick={backToMenu} className="menuButton">
          Menu
        </button>
        <GameLocalAI
          setPlayerAnim={setPlayerAnim}
          setPlayer2Anim={setPlayer2Anim}
          showMenu={showMenu}
          slideGame={slideGame}
          setSlideGame={setSlideGame}
          setShowLeaderBoard={setShowLeaderBoard}
          showLeaderBoard={showLeaderBoard}
          setScreenSlide={setScreenSlide}
          firestore={firestore}
        />
        <HeroSelectorAI
          setPlayer1Hero={setPlayer1Hero}
          player1Hero={player1Hero}
        />
      </main>
    </>
  );
}
