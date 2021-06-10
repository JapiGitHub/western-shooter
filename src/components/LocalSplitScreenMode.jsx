import React, { useState } from "react";
import PlayerChars from "./PlayerChars";
import Cactus from "./Cactus";
import GameLocalSplitScreen from "./GameLocalSplitScreen";
import HeroSelector from "./HeroSelector";

export default function LocalSplitScreenMode({
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
          src="./assets/horizon.gif"
          alt="horizon"
        ></img>
        <button onClick={backToMenu} className="menuButton">
          Menu
        </button>
        <GameLocalSplitScreen
          setPlayerAnim={setPlayerAnim}
          setPlayer2Anim={setPlayer2Anim}
          slideGame={slideGame}
        />
        <PlayerChars
          playerAnim={playerAnim}
          player2Anim={player2Anim}
          player2Hero={player2Hero}
          player1Hero={player1Hero}
          showMenu={showMenu}
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
