import React, { useEffect } from "react";
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
  showLeaderBoardInput,
}) {
  const leaderBoardRef = firestore.collection("leaderBoard");

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

  return (
    <div
      className={
        showLeaderBoardInput
          ? "leaderBoardInputContainer"
          : "leaderBoardInputContainer ldbInputHide"
      }
    >
      <img src="./assets/wantedboard1.gif"></img>
      <form onSubmit={sendLeader}>
        You were fast enough for leaderboard:
        <input
          type="text"
          placeholder="Enter name"
          autoComplete="off"
          autoFocus
          required
          maxlength="20"
          name="name"
        ></input>
        <button type="submit" className="btn okbtn">
          OK
        </button>
      </form>
    </div>
  );
}
