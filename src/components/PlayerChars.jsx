import React from "react";
import "./playerChars.scss";

export default function PlayerChars({
  playerAnim,
  player2Anim,
  player2Hero,
  player1Hero,
}) {
  return (
    <>
      <article className="player2char">
        <img
          className="playerGif"
          src={`./assets/${player2Hero}.right.${player2Anim}.gif`}
          alt="character"
        ></img>
      </article>

      <article className="player1char">
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
