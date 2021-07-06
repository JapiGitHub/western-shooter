import React from "react";
import useSound from "use-sound";
import SwooshFromLeft from "../sounds/swoosh.left.mp3";

import GameLocalSplitScreen from "./GameLocalSplitScreen";
import HeroSelector from "./HeroSelector";

export default function LocalSplitScreenMode({
  setGameMode,
  showMenu,
  setShowMenu,
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
  showLeaderBoard,
  setShowLeaderBoard,
}) {
  //playerAnim vaihtoehdot:
  //waiting
  //shooting
  //shot
  //dead

  const [SwooshFromLeftPlay] = useSound(SwooshFromLeft);

  const backToMenu = (e) => {
    e.preventDefault();
    SwooshFromLeftPlay();
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
        <GameLocalSplitScreen
          setPlayerAnim={setPlayerAnim}
          setPlayer2Anim={setPlayer2Anim}
          difficulty={difficulty}
          firestore={firestore}
          player1Hero={player1Hero}
          player2Hero={player2Hero}
          setScreenSlide={setScreenSlide}
          screenSlide={screenSlide}
          showLeaderBoard={showLeaderBoard}
          setShowLeaderBoard={setShowLeaderBoard}
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
