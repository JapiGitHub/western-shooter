import React, { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import "./leaderBoard.scss";

export default function LeaderBoard({
  setLeaderBoardName,
  firestore,
  player1Hero,
  ldbTime,
  setShowLeaderBoard,
}) {
  const leaderBoardRef = firestore.collection("leaderBoard");

  //leaderborad
  const sortedLeaderBoard = leaderBoardRef.orderBy("time");
  const [leaderBoard] = useCollectionData(sortedLeaderBoard, {
    idField: "id",
  });

  useEffect(() => {
    console.error("boardii", leaderBoard);
  }, []);

  return (
    <div className="leaderBoardContainer">
      <img src="./assets/leaderboard.anim.piskel.anim.test.gif"></img>
      <div className="leaderBoardList">
        {leaderBoard &&
          leaderBoard.slice(0, 15).map((ldbEntry) => {
            return (
              <div className="leaderBoardEntry">
                <img
                  src={`./assets/${ldbEntry.hero}.avatar.gif`}
                  className="ldbHero"
                ></img>
                &nbsp;
                {ldbEntry.time} {ldbEntry.name}
              </div>
            );
          })}
      </div>
    </div>
  );
}
