import React, { useEffect, useState } from "react";
import PlayerChars from "./PlayerChars";
import Cactus from "./Cactus";
import TextSplash from "./TextSplash";

export default function World() {
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("3sek");
    }, 3000);
  }, []);

  return (
    <>
      <main className="background-world-arena">
        <section className="ground"></section>
        <TextSplash playerReady={playerReady} setPlayerRead={setPlayerReady} />
        <PlayerChars />
        <Cactus />
      </main>
    </>
  );
}
