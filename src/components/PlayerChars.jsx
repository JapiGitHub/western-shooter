import React from "react";
import "./playerChars.scss";

export default function PlayerChars({
  playerAnim,
  player2Anim,
  player2Hero,
  player1Hero,
  screenSlide,
}) {
  return (
    <>
      <article
        className={(() => {
          switch (screenSlide) {
            case "menu":
              return "player2char hidePlayer2";
            case "game":
              return "player2char";
            case "leaderboard":
              return "player2char ldbPlayer2";
            case "lobby":
              return "player2char lobbyPlayer2";
            case "multiplayer":
              return "player2char multiPlayer2";
            default:
              return "player2char hidePlayer2";
          }
        })()}
      >
        <img
          className="playerGif"
          src={`./assets/${player2Hero}.right.${player2Anim}.gif`}
          alt="character2"
        ></img>
      </article>

      <article
        className={(() => {
          switch (screenSlide) {
            case "menu":
              return "player1char hidePlayer1";
            case "game":
              return "player1char";
            case "leaderboard":
              return "player1char ldbPlayer1";
            case "lobby":
              return "player1char lobbyPlayer1";
            case "multiplayer":
              return "player1char multiPlayer1";
            default:
              return "player1char hidePlayer1";
          }
        })()}
      >
        <img
          className="playerGif"
          src={`./assets/${player1Hero}.left.${playerAnim}.gif`}
          alt="character1"
        ></img>
      </article>
    </>
  );
}
