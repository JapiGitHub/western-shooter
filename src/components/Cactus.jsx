import React from "react";
import "./cactus.scss";

export default function Cactus({ slideGame, setSlideGame }) {
  return (
    <>
      <aside className={slideGame ? "cactus1" : "cactus1 hideCactus1"}>
        <img className="cactusGif" src="./assets/cactus1.gif" alt="cacti"></img>
      </aside>

      <aside className={slideGame ? "cactus2" : "cactus2 hideCactus2"}>
        <img className="cactusGif" src="./assets/cactus2.gif" alt="cacti"></img>
      </aside>

      <aside className={slideGame ? "cactus3" : "cactus3 hideCactus3"}>
        <img className="cactusGif" src="./assets/cactus1.gif" alt="cacti"></img>
      </aside>
    </>
  );
}
