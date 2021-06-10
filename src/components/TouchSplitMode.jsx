import React, { useState } from "react";
import PlayerChars from "./PlayerChars";
import Cactus from "./Cactus";
import GameLocalTouchSplit from "./GameLocalTouchSplit";
import HeroSelector from "./HeroSelector";

export default function TouchSplitMode({
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
          src="./assets/horizon.gif"
          alt="horizon"
        ></img>
        <button onClick={backToMenu} className="menuButton">
          Menu
        </button>
        <GameLocalTouchSplit
          playerAnim={playerAnim}
          setPlayerAnim={setPlayerAnim}
          player2Anim={playerAnim}
          setPlayer2Anim={setPlayer2Anim}
          slideGame={slideGame}
          setSlideGame={setSlideGame}
        />
        <PlayerChars
          playerAnim={playerAnim}
          player2Anim={player2Anim}
          player2Hero={player2Hero}
          player1Hero={player1Hero}
          slideGame={slideGame}
          setSlideGame={setSlideGame}
        />
        <HeroSelector
          setPlayer1Hero={setPlayer1Hero}
          setPlayer2Hero={setPlayer2Hero}
        />
        <Cactus slideGame={slideGame} setSlideGame={setSlideGame} />
      </main>
    </>
  );
}
