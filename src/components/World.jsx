import React, { useEffect, useState } from "react";
import PlayerChars from "./PlayerChars";
import Cactus from "./Cactus";
import TextSplash from "./TextSplash";
import HeroSelector from "./HeroSelector";

export default function World() {
  const [playerAnim, setPlayerAnim] = useState("waiting");
  const [player2Anim, setPlayer2Anim] = useState("waiting");
  const [player2Hero, setPlayer2Hero] = useState("cowboy");
  const [playerHero, setPlayerHero] = useState("sheriff");

  //playerAnim vaihtoehdot:
  //waiting
  //shooting
  //shot
  //dead

  // useEffect(() => {
  //   const timeout = setTimeout(() => {

  //   }, 3000);
  // }, []);

  return (
    <>
      <main className="background-world-arena">
        <section className="ground"></section>
        <img className="horizon" src="./assets/horizon.gif"></img>
        <TextSplash
          playerAnim={playerAnim}
          setPlayerAnim={setPlayerAnim}
          player2Anim={playerAnim}
          setPlayer2Anim={setPlayer2Anim}
        />
        <PlayerChars
          playerAnim={playerAnim}
          player2Anim={player2Anim}
          player2Hero={player2Hero}
        />
        <HeroSelector
          setPlayerHero={setPlayerHero}
          setPlayer2Hero={setPlayer2Hero}
          playerHero={playerHero}
          player2Hero={player2Hero}
        />
        <Cactus />
      </main>
    </>
  );
}
