import React from "react";
import "./leaderBoardInput.scss";

export default function LeaderBoardInput({
  setLeaderBoardName,
  firestore,
  player1Hero,
  ldbTime,
  setShowLeaderBoard,
}) {
  const leaderBoardRef = firestore.collection("leaderBoard");

  const sendLeader = async (e) => {
    e.preventDefault();

    console.error(e.target.name.value);

    await leaderBoardRef.add({
      hero: player1Hero,
      name: e.target.name.value,
      time: ldbTime,
    });
    setShowLeaderBoard(false);
  };

  return (
    <div className="leaderBoardContainer">
      <img src="./assets/leaderboard.anim.piskel.anim.test.gif"></img>
      <form onSubmit={sendLeader}>
        You were fast enough for leaderboard:
        <input
          type="text"
          placeholder="Enter name"
          autofocus
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
