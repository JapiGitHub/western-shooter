import React, { useEffect, useState } from "react";
import PlayerChars from "./PlayerChars";
import Cactus from "./Cactus";
import GameLocalSplitScreen from "./GameLocalSplitScreen";
import HeroSelector from "./HeroSelector";

export default function LocalSplitScreenMode({ setGameMode }) {
  const [playerAnim, setPlayerAnim] = useState("waiting");
  const [player2Anim, setPlayer2Anim] = useState("waiting");
  const [player2Hero, setPlayer2Hero] = useState("cowboy");
  const [player1Hero, setPlayer1Hero] = useState("sheriff");

  //playerAnim vaihtoehdot:
  //waiting
  //shooting
  //shot
  //dead

  // useEffect(() => {
  //   const timeout = setTimeout(() => {

  //   }, 3000);
  // }, []);

  const backToMenu = () => {
    console.log(setGameMode);
    setGameMode("menu");
  };

  return (
    <>
      <main className="background-world-arena">
        <section className="ground"></section>
        <img className="horizon" src="./assets/horizon.gif"></img>
        <button onClick={backToMenu} className="menuButton">
          Menu
        </button>
        <GameLocalSplitScreen
          playerAnim={playerAnim}
          setPlayerAnim={setPlayerAnim}
          player2Anim={playerAnim}
          setPlayer2Anim={setPlayer2Anim}
        />
        <PlayerChars
          playerAnim={playerAnim}
          player2Anim={player2Anim}
          player2Hero={player2Hero}
          player1Hero={player1Hero}
        />
        <HeroSelector
          setPlayer1Hero={setPlayer1Hero}
          setPlayer2Hero={setPlayer2Hero}
        />
        <Cactus />
      </main>
    </>
  );
}
