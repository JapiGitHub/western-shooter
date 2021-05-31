import React from "react";
import "./playerChars.scss";

export default function PlayerChars({ playerAnim, setPlayerAnim }) {
  return (
    <>
      <article className="player1char">
        <img className="playerGif" src="./assets/cowboy.left.gif"></img>
      </article>
      <article className="player2char">
        <img
          className="playerGif"
          src={`./assets/sheriff.right.${playerAnim}.gif`}
        ></img>
      </article>
      <aside className="waitingGrassBall"></aside>
    </>
  );
}
