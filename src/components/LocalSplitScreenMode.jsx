import React, { useState } from "react";
import PlayerChars from "./PlayerChars";
import GameLocalSplitScreen from "./GameLocalSplitScreen";
import HeroSelector from "./HeroSelector";

export default function LocalSplitScreenMode({
  setGameMode,
  showMenu,
  setShowMenu,
  slideGame,
  setSlideGame,
  difficulty,
  firestore,
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
        <GameLocalSplitScreen
          setPlayerAnim={setPlayerAnim}
          setPlayer2Anim={setPlayer2Anim}
          slideGame={slideGame}
          difficulty={difficulty}
          firestore={firestore}
          player1Hero={player1Hero}
          player2Hero={player2Hero}
          setScreenSlide={setScreenSlide}
        />
        <HeroSelector
          player2Hero={player2Hero}
          player1Hero={player1Hero}
          setPlayer1Hero={setPlayer1Hero}
          setPlayer2Hero={setPlayer2Hero}
        />
      </main>
    </>
  );
}
