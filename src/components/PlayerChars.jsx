import React from "react";
import "./playerChars.scss";

export default function PlayerChars({ playerAnim, player2Anim, player2Hero }) {
  return (
    <>
      <article className="player2char">
        <img
          className="playerGif"
          src={`./assets/${player2Hero}.left.${player2Anim}.gif`}
        ></img>
      </article>

      <article className="player1char">
        <img
          className="playerGif"
          src={`./assets/sheriff.right.${playerAnim}.gif`}
        ></img>
      </article>
      <aside className="waitingGrassBall"></aside>
    </>
  );
}
