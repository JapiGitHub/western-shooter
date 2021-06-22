import React from "react";
import "./cactus.scss";

export default function Cactus({ gameMode, screenSlide }) {
  return (
    <>
      <aside
        className={gameMode === "menu" ? "cactus1  hideCactus1" : "cactus1"}
      >
        <img className="cactusGif" src="./assets/cactus1.gif" alt="cacti"></img>
      </aside>
      <aside
        className={gameMode === "menu" ? "cactus2 hideCactus2" : "cactus2"}
      >
        <img className="cactusGif" src="./assets/cactus2.gif" alt="cacti"></img>
      </aside>
      <aside
        className={(() => {
          switch (screenSlide) {
            case "menu":
              return "cactus3 hideCactus3";
            case "game":
              return "cactus3";
            case "leaderboard":
              return "cactus3 ldbCactus3";
          }
        })()}
      >
        <img
          className="cactusGif"
          src="./assets/cactus.dark.gif"
          alt="cacti"
        ></img>
      </aside>

      <aside
        className={gameMode === "menu" ? "cactus4 hideCactus4" : "cactus4"}
      >
        <img className="cactusGif" src="./assets/cactus2.gif" alt="cacti"></img>
      </aside>
    </>
  );
}
