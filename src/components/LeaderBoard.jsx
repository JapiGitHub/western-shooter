import React, { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import "./leaderBoard.scss";

export default function LeaderBoard({
  setLeaderBoardName,
  firestore,
  player1Hero,
  ldbTime,
  setShowLeaderBoard,
  showLeaderBoard,
}) {
  const leaderBoardRef = firestore.collection("leaderBoard");

  //leaderborad
  const sortedLeaderBoard = leaderBoardRef.orderBy("time");
  const [leaderBoard] = useCollectionData(sortedLeaderBoard, {
    idField: "id",
  });

  //debug
  useEffect(() => {
    console.error("boardii", leaderBoard);
  }, []);

  return (
    <div
      className={
        showLeaderBoard
          ? "leaderBoardContainer"
          : "leaderBoardContainer ldbHide"
      }
    >
      <img src="./assets/wantedboard.gif"></img>
      <div className="leaderBoardList">
        {leaderBoard &&
          leaderBoard.slice(0, 15).map((ldbEntry) => {
            return (
              <div className="leaderBoardEntry">
                <img
                  src={`./assets/${ldbEntry.hero}.avatar.gif`}
                  className="ldbHero"
                  alt="heroavatar"
                ></img>
                &nbsp;&nbsp;&nbsp;
                {ldbEntry.time} ms&nbsp;&nbsp;&nbsp;{ldbEntry.name}
              </div>
            );
          })}
      </div>
    </div>
  );
}
