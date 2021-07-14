import React, { useState } from "react";
import PlayerChars from "./PlayerChars";
import GameLocalTouchSplit from "./GameLocalTouchSplit";
import HeroSelector from "./HeroSelector";

import useSound from "use-sound";
import SwooshFromLeft from "../sounds/swoosh.left.mp3";

export default function TouchSplitMode({
  setGameMode,
  showMenu,
  setShowMenu,
  difficulty,
  firestore,
  setScreenSlide,
  screenSlide,
  player1Hero,
  player2Hero,
  setPlayer1Hero,
  setPlayer2Hero,
  playerAnim,
  setPlayerAnim,
  player2Anim,
  setPlayer2Anim,
}) {
  const [SwooshFromLeftPlay] = useSound(SwooshFromLeft);

  const backToMenu = () => {
    setGameMode("menu");
    setShowMenu(true);
    setScreenSlide("menu");
    SwooshFromLeftPlay();
  };

  return (
    <>
      <main className="background-world-arena">
        <section className="ground"></section>

        <button onClick={backToMenu} className="menuButton btn">
          Menu
        </button>
        <GameLocalTouchSplit
          playerAnim={playerAnim}
          setPlayerAnim={setPlayerAnim}
          player2Anim={playerAnim}
          setPlayer2Anim={setPlayer2Anim}
          player1Hero={player1Hero}
          player2Hero={player2Hero}
          difficulty={difficulty}
        />

        <HeroSelector
          setPlayer1Hero={setPlayer1Hero}
          setPlayer2Hero={setPlayer2Hero}
          player1Hero={player1Hero}
          player2Hero={player2Hero}
        />
      </main>
    </>
  );
}
