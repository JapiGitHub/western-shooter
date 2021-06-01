import React, { useEffect, useState } from "react";
import PlayerChars from "./PlayerChars";
import Cactus from "./Cactus";
import TextSplash from "./TextSplash";

export default function World() {
  const [playerAnim, setPlayerAnim] = useState("waiting");
  const [player2Anim, setPlayer2Anim] = useState("waiting");

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
        <PlayerChars playerAnim={playerAnim} player2Anim={player2Anim} />
        <Cactus />
      </main>
    </>
  );
}
