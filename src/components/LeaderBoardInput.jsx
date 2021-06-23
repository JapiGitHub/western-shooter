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
  showLeaderBoardInput,
}) {
  const leaderBoardRef = firestore.collection("leaderBoard");
  const ldbInputRef = useRef();

  const sendLeader = async (e) => {
    e.preventDefault();

    console.error(e.target.name.value);

    if (winner === 1) {
      console.log("1winner : ", winner);
      console.log("dbg player 1 hero, winner1", player1Hero);
      await leaderBoardRef.add({
        hero: player1Hero,
        name: e.target.name.value,
        time: ldbTime,
      });
    } else {
      console.log("?winner : ", winner);
      console.log("dbg player 2 hero", player2Hero);
      await leaderBoardRef.add({
        hero: player2Hero,
        name: e.target.name.value,
        time: ldbTime,
      });
    }

    setShowLeaderBoardInput(false);
  };

  useEffect(() => {
    ldbInputRef.current.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    ldbInputRef.current.focus({ preventScroll: true });
  });

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
          ref={ldbInputRef}
        ></input>
        <button type="submit" className="btn okbtn">
          OK
        </button>
      </form>
    </div>
  );
}
