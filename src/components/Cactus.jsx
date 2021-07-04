import React from "react";
import "./cactus.scss";

export default function Cactus({ gameMode, screenSlide }) {
  return (
    <>
      <aside
        className={(() => {
          switch (screenSlide) {
            case "menu":
              return "cactus1 menuCactus1";
            case "game":
              return "cactus1";
            case "leaderboard":
              return "cactus1 ldbCactus1";
            case "lobby":
              return "cactus1 lobbyCactus1";
            default:
              return "cactus1 hideCactus1";
          }
        })()}
      >
        <img className="cactusGif" src="./assets/cactus1.gif" alt="cacti"></img>
      </aside>

      <aside
        className={(() => {
          switch (screenSlide) {
            case "menu":
              return "cactus2 menuCactus2";
            case "game":
              return "cactus2";
            case "leaderboard":
              return "cactus2 ldbCactus2";
            case "lobby":
              return "cactus2 lobbyCactus2";
            default:
              return "cactus2 menuCactus2";
          }
        })()}
      >
        <img
          className="cactusGif"
          src="./assets/VAARAAAAA.gif"
          alt="cacti"
        ></img>
      </aside>

      <aside
        className={(() => {
          switch (screenSlide) {
            case "menu":
              return "cactus3 menuCactus3";
            case "game":
              return "cactus3";
            case "leaderboard":
              return "cactus3 ldbCactus3";
            case "lobby":
              return "cactus3 lobbyCactus3";
            default:
              return "cactus3 menuCactus3";
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
        className={(() => {
          switch (screenSlide) {
            case "menu":
              return "cactus4 menuCactus4";
            case "game":
              return "cactus4";
            case "leaderboard":
              return "cactus4 ldbCactus4";
            case "lobby":
              return "cactus4 lobbyCactus4";
            default:
              return "cactus4 menuCactus4";
          }
        })()}
      >
        <img className="cactusGif" src="./assets/cactus2.gif" alt="cacti"></img>
      </aside>
    </>
  );
}
