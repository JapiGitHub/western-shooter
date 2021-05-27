import React from "react";
import "./playerChars.scss";

export default function PlayerChars() {
  return (
    <>
      <article className="player1char">
        <img src="./assets/offle.gif"></img>
      </article>
      <article className="player2char">@</article>
      <aside className="waitingGrassBall">#</aside>
    </>
  );
}
