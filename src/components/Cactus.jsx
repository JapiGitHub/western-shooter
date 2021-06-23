import React from "react";
import "./cactus.scss";

export default function Cactus({ gameMode, screenSlide }) {
  return (
    <>
      <aside
        className={(() => {
          switch (screenSlide) {
            case "menu":
              return "cactus1 hideCactus1";
            case "game":
              return "cactus1";
            case "leaderboard":
              return "cactus1 ldbCactus1";
          }
        })()}
      >
        <img className="cactusGif" src="./assets/cactus1.gif" alt="cacti"></img>
      </aside>
      <aside
        className={(() => {
          switch (screenSlide) {
            case "menu":
              return "cactus2 hideCactus2";
            case "game":
              return "cactus2";
            case "leaderboard":
              return "cactus2 ldbCactus2";
          }
        })()}
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
