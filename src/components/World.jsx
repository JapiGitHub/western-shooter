import React, { useEffect, useState } from "react";
import PlayerChars from "./PlayerChars";
import Cactus from "./Cactus";
import TextSplash from "./TextSplash";

export default function World() {
  const [playerReady, setPlayerReady] = useState(false);

  const [playerAnim, setPlayerAnim] = useState("waiting");
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
          playerReady={playerReady}
          setPlayerReady={setPlayerReady}
          playerAnim={playerAnim}
          setPlayerAnim={setPlayerAnim}
        />
        <PlayerChars playerAnim={playerAnim} setPlayerAnim={setPlayerAnim} />
        <Cactus />
      </main>
    </>
  );
}
