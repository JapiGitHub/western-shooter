import React, { useState, useEffect } from "react";
import "./playerChars.scss";

export default function PlayerChars({
  playerAnim,
  player2Anim,
  player2Hero,
  player1Hero,
  screenSlide,
  setScreenSlide,
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
          }
        })()}
      >
        <img
          className="playerGif"
          src={`./assets/${player1Hero}.left.${playerAnim}.gif`}
          alt="character1"
        ></img>
      </article>
      <aside className="waitingGrassBall"></aside>
    </>
  );
}
