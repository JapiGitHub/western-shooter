import React, { useRef } from "react";
import "./leaderBoardInput.scss";

export default function LeaderBoardInput({
  firestore,
  player1Hero,
  player2Hero,
  winner,
  ldbTime,
  setShowLeaderBoardInput,
  showLeaderBoardInput,
}) {
  const leaderBoardRef = firestore.collection("leaderBoard");
  const ldbInputRef = useRef();

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
      <img src="./assets/wantedboard1.gif" alt="wantedboard"></img>
      <form onSubmit={sendLeader}>
        You were fast enough for leaderboard:
        <input
          type="text"
          placeholder="Enter name"
          autoComplete="off"
          autoFocus
          required
          maxLength="20"
          name="name"
          ref={ldbInputRef}
        ></input>
        <button type="submit" className="btn okbtn">
          OK
        </button>
      </form>
    </div>
  );
}
