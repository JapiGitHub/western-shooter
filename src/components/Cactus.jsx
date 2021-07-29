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
            case "multiplayer":
              return "cactus1 multiplayerCactus1";
            default:
              return "cactus1 multiplayerCactus1";
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
            case "multiplayer":
              return "cactus2 multiplayerCactus2";
            default:
              return "cactus2 menuCactus2";
          }
        })()}
      >
        <img className="cactusGif" src="./assets/cactus2.gif" alt="cacti"></img>
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
            case "multiplayer":
              return "cactus3 multiplayerCactus3";
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
            case "multiplayer":
              return "cactus4 multiplayerCactus4";
            default:
              return "cactus4 multiplayerCactus4";
          }
        })()}
      >
        <img className="cactusGif" src="./assets/cactus2.gif" alt="cacti"></img>
      </aside>

      <aside
        className={(() => {
          switch (screenSlide) {
            case "menu":
              return "cactus5 menuCactus5";
            case "game":
              return "cactus5";
            case "leaderboard":
              return "cactus5 ldbCactus5";
            case "lobby":
              return "cactus5 lobbyCactus5";
            case "multiplayer":
              return "cactus5 multiplayerCactus5";
            default:
              return "cactus5 menuCactus5";
          }
        })()}
      >
        <img
          className="cactusGif"
          src="./assets/cactus1b.gif"
          alt="cacti"
        ></img>
      </aside>
    </>
  );
}
