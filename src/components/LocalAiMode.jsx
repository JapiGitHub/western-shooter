import React from "react";
import useSound from "use-sound";
import SwooshFromLeft from "../sounds/swoosh.left.mp3";

import HeroSelectorAI from "./HeroSelectorAI";
import GamePracticeAI from "./GamePracticeAI";

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
        <button onClick={backToMenu} className="btn menuButton">
          Menu
        </button>
        <GamePracticeAI
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
