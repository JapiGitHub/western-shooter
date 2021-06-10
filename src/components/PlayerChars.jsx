import React, { useState, useEffect } from "react";
import "./playerChars.scss";

export default function PlayerChars({
  playerAnim,
  player2Anim,
  player2Hero,
  player1Hero,
  slideGame,
  setSlideGame,
}) {
  useEffect(() => {
    setSlideGame(true);
  }, []);

  return (
    <>
      <article
        className={slideGame ? "player2char" : "player2char hidePlayer2"}
      >
        <img
          className="playerGif"
          src={`./assets/${player2Hero}.right.${player2Anim}.gif`}
          alt="character"
        ></img>
      </article>

      <article
        className={slideGame ? "player1char" : "player1char hidePlayer1"}
      >
        <img
          className="playerGif"
          src={`./assets/${player1Hero}.left.${playerAnim}.gif`}
          alt="character"
        ></img>
      </article>
      <aside className="waitingGrassBall"></aside>
    </>
  );
}
