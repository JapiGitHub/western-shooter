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
}) {
  const [playerAnim, setPlayerAnim] = useState("waiting");
  const [player2Anim, setPlayer2Anim] = useState("waiting");
  const [player2Hero, setPlayer2Hero] = useState("sheriff");
  const [player1Hero, setPlayer1Hero] = useState("cowboy");

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
        <GameLocalSplitScreen
          setPlayerAnim={setPlayerAnim}
          setPlayer2Anim={setPlayer2Anim}
          slideGame={slideGame}
          difficulty={difficulty}
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
          player2Hero={player2Hero}
          player1Hero={player1Hero}
          setPlayer1Hero={setPlayer1Hero}
          setPlayer2Hero={setPlayer2Hero}
        />
      </main>
    </>
  );
}
