import React from "react";
import "./playerCharsMulti.scss";

export default function PlayerCharsMulti({
  playerAnim,
  player2Anim,
  player2Hero,
  player1Hero,
}) {
  return (
    <>
      <article className="playerLocalChar">
        <img
          className="playerGif"
          src={`./assets/${player1Hero}.left.${player2Anim}.gif`}
          alt="character"
        ></img>
      </article>

      <article className="playerNetworkChar">
        <img
          className="playerGif"
          src={`./assets/${player2Hero}.right.${playerAnim}.gif`}
          alt="character"
        ></img>
      </article>
      <aside className="waitingGrassBall"></aside>
    </>
  );
}
