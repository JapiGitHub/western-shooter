import React, { useEffect, useRef } from "react";
import "./leaderBoardInput.scss";

export default function LeaderBoardInput({
  setLeaderBoardName,
  firestore,
  player1Hero,
  player2Hero,
  winner,
  ldbTime,
  setShowLeaderBoard,
  setShowLeaderBoardInput,
}) {
  const leaderBoardRef = firestore.collection("leaderBoard");
  const leaderInputRef = useRef;

  const sendLeader = async (e) => {
    e.preventDefault();

    console.error(e.target.name.value);

    if (winner === 1) {
      await leaderBoardRef.add({
        hero: player1Hero,
        name: e.target.name.value,
        time: ldbTime,
      });
    } else {
      await leaderBoardRef.add({
        hero: player2Hero,
        name: e.target.name.value,
        time: ldbTime,
      });
    }

    setShowLeaderBoardInput(false);
  };

  useEffect(() => {
    leaderInputRef.current.focus();
  });

  return (
    <div className="leaderBoardInputContainer">
      <img src="./assets/leaderboard.anim.piskel.anim.test.gif"></img>
      <form onSubmit={sendLeader}>
        You were fast enough for leaderboard:
        <input
          type="text"
          placeholder="Enter name"
          autoComplete="off"
          autofocus
          required
          maxlength="20"
          name="name"
          ref={leaderInputRef}
        ></input>
        <button type="submit" className="btn okbtn">
          OK
        </button>
      </form>
    </div>
  );
}
