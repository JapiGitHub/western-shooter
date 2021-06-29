import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import "./leaderBoard.scss";

export default function LeaderBoard({ firestore, showLeaderBoard }) {
  const leaderBoardRef = firestore.collection("leaderBoard");

  //leaderborad
  const sortedLeaderBoard = leaderBoardRef.orderBy("time");
  const [leaderBoard] = useCollectionData(sortedLeaderBoard, {
    idField: "id",
  });

  return (
    <div
      className={
        showLeaderBoard
          ? "leaderBoardContainer"
          : "leaderBoardContainer ldbHide"
      }
    >
      <img src="./assets/wantedboard.gif" alt="wantedboard"></img>
      <div className="leaderBoardList">
        {leaderBoard &&
          leaderBoard.slice(0, 15).map((ldbEntry, index) => {
            return (
              <div className="leaderBoardEntry" key={index}>
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
