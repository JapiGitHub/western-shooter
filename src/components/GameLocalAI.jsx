import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import LeaderBoard from "./LeaderBoard";
import LeaderBoardInput from "./LeaderBoardInput";

import useSound from "use-sound";
import pistolShotFromLeft from "../sounds/pistol.shot.from.left.mp3";
import pistolShotFromRight from "../sounds/pistol.shot.from.right.mp3";
import fatalityFromRight from "../sounds/fatality.from.right.mp3";
import fatalityFromLeft from "../sounds/fatality.from.left.mp3";

import pistolCock1 from "../sounds/cock.pistol.1.mp3";
import holster from "../sounds/holster.mp3";

import ricochetToRight from "../sounds/ricochet.to.right.mp3";
import ricochetToLeft from "../sounds/ricochet.to.left.mp3";

import "./gameLocalAI.scss";

export default function GameLocalAI({
  setPlayerAnim,
  setPlayer2Anim,
  showMenu,
  slideGame,
  setSlideGame,
  setShowLeaderBoard,
  showLeaderBoard,
  setScreenSlide,
  firestore,
  player1Hero,
}) {
  const [playerOneReady, setPlayerOneReady] = useState(false);
  const [gun1Loaded, setGun1Loaded] = useState(true);
  const [aiAlive, setAiAlive] = useState(true);
  const [score, setScore] = useState([0, 0]);

  const [p1ReactText, setP1ReactText] = useState("");
  const [reactTextFade, setReactTextFade] = useState(false);
  const [fatality, setFatality] = useState(false);

  const [showLeaderBoardInput, setShowLeaderBoardInput] = useState(false);
  const [winner, setWinner] = useState(0);

  const [leaderBoardName, setLeaderBoardName] = useState("unknown");
  const [ldbTime, setLdbTime] = useState(888);

  const [player1Reaction, setPlayer1Reaction] = useState(0);

  const [shotFired, setShotFired] = useState(false);

  const [infoText, setInfoText] = useState("Ready?");

  const [startTime, setStartTime] = useState(888);
  const [randomTime, setRandomTime] = useState(0);
  const [ok2Shoot, setOk2Shoot] = useState(false);

  const [pistolCock1Play] = useSound(pistolCock1);
  const [holsterPlay] = useSound(holster);

  const [pistolShotFromLeftPlay] = useSound(pistolShotFromLeft);
  const [pistolShotFromRightPlay] = useSound(pistolShotFromRight);
  const [RicochetToLeftPlay] = useSound(ricochetToLeft);
  const [RicochetToRightPlay] = useSound(ricochetToRight);
  const [fatalityFromRightPlay] = useSound(fatalityFromRight);
  const [fatalityFromLeftPlay] = useSound(fatalityFromLeft);

  const playerTwoReadyCheckBox = useRef();
  const playerOneReadyCheckBox = useRef();

  const fatalityTime = 280;
  const AIbaseTime = 500;

  //leaderboard
  const leaderBoardRef = firestore.collection("leaderBoard");

  const sortedLeaderBoard = leaderBoardRef.orderBy("time");
  const [leaderBoard] = useCollectionData(sortedLeaderBoard, {
    idField: "id",
  });

  const checkLeaderBoardTimes = (leaderBoardTime, player) => {
    //vertaa vain tohon 15. aikaan jotta record history näkyy databasessa.
    if (leaderBoardTime < leaderBoard[14].time) {
      setLdbTime(leaderBoardTime);
      setShowLeaderBoardInput(true);
      setScreenSlide("leaderboard");
    }
  };

  const NextRoundReset = () => {
    setTimeout(() => {
      setInfoText("Again?");
      setGun1Loaded(true);
      setShotFired(false);
      setPlayerOneReady(false);
      setPlayer2Anim("waiting");
      setPlayerAnim("waiting");
      setP1ReactText();
      setReactTextFade(false);
      setFatality(false);
      setPlayer1Reaction(0);
      setOk2Shoot(false);
      setAiAlive(true);
    }, 3000);

    //reactio ajan pään yläpuolella oleva haihtuva teksti
    setTimeout(() => {
      setReactTextFade(true);
    }, 800);
  };

  useEffect(() => {
    setRandomTime(3500 + Math.floor(Math.random() * 3000));
    setPlayerOneReady(false);
  }, []);

  //onko tää ihan turha?
  useEffect(() => {
    setStartTime(3500 + Math.floor(Math.random() * 3000));
  }, [randomTime]);

  //kun pelaajat valmiita, niin aloita timeri
  useEffect(() => {
    if (playerOneReady) {
      setInfoText("Ready!");
      pistolCock1Play();

      setTimeout(() => {
        setInfoText("Set ...");
      }, 1500);

      setTimeout((startTime) => {
        setInfoText("BANG!");
        setOk2Shoot(true);
        holsterPlay();
        setStartTime(new Date());
      }, randomTime);

      setTimeout(() => {
        if (aiAlive) {
          setPlayer1Reaction(AIbaseTime + 1);
        }
      }, randomTime + AIbaseTime);
    }
  }, [playerOneReady]);

  //voiton checkaus
  useEffect(() => {
    if (player1Reaction > 0) {
      console.log("reactio: ", player1Reaction);
      if (
        player1Reaction < AIbaseTime - score[0] * 50 ||
        player1Reaction < fatalityTime
      ) {
        const triggerTime = new Date();
        setAiAlive(false);
        setPlayerAnim("shooting");
        setP1ReactText(`${triggerTime - startTime} ms`);

        if (player1Reaction < fatalityTime) {
          setPlayer2Anim("fatality");
          setInfoText("Fatality!");
          fatalityFromLeftPlay();
          setFatality(true);
        } else {
          pistolShotFromLeftPlay();
          setInfoText("You won");
          setPlayer2Anim("die");
        }
        setWinner(1);
        checkLeaderBoardTimes(triggerTime - startTime, "player1");
        setScore([score[0] + 1, score[1]]);
        NextRoundReset();
      } else {
        if (aiAlive) {
          setGun1Loaded(false);
          setInfoText("AI wins");
          setPlayer2Anim("shooting");
          pistolShotFromRightPlay();
          setPlayerAnim("die");
          setScore([score[0], score[1] + 1]);
          NextRoundReset();
        }
      }
    }
  }, [player1Reaction]);

  //mouse player1
  const actionClick = () => {
    //SHOOTING
    if (playerOneReady) {
      if (gun1Loaded === true) {
        if (ok2Shoot === false) {
          //varaslähtö
          pistolShotFromLeftPlay();
          RicochetToRightPlay();
          setPlayerAnim("shooting");
          setGun1Loaded(false);
        } else {
          //onnistunut laukaus
          setInfoText("mouse wins");

          const pullTriggerTime = new Date();
          const reactTimeConst = pullTriggerTime - startTime;
          setGun1Loaded(false);
          setPlayer1Reaction(reactTimeConst);
          setOk2Shoot(false);
        }
      }
    }
  };

  const playerOneReadyClick = () => {
    console.log("klikattu ykköstä");
    //focus takaisin p2 key listeneriin
    playerTwoReadyCheckBox.current.focus();
    setPlayerOneReady(true);
  };

  return (
    <div
      className={
        playerOneReady ? "textSplashFrame touchAreaOn" : "textSplashFrame"
      }
      onClick={actionClick}
    >
      <label className="playerReadyLabel" htmlFor="p1">
        Mouse {score[0]}
        <input
          className="readyCheckBox p1check"
          type="checkbox"
          checked={playerOneReady}
          ref={playerOneReadyCheckBox}
          onClick={playerOneReadyClick}
          id="p1"
          name="p1"
        />
        <span className="checkMarkPlayer">
          {playerOneReady ? "Ready!" : "Click to ready"}
        </span>
      </label>

      <div
        className={
          reactTextFade
            ? "reactionMouseTextFloater hideTime"
            : "reactionMouseTextFloater"
        }
      >
        <div className={fatality ? "fatality" : "reactMouseTimeText"}>
          {p1ReactText}
        </div>
      </div>

      <label className="aiReadyLabel" htmlFor="p2">
        {score[1]} AI
        <input
          className="readyCheckBox p2check"
          type="checkbox"
          checked={true}
          ref={playerTwoReadyCheckBox}
          onClick={playerOneReadyClick}
          id="p2"
          name="p2"
        />
        <span className="checkMarkAI">Ready!</span>
      </label>

      <div className={slideGame ? "infoText" : "infoText hideInfo"}>
        {infoText}
      </div>

      <LeaderBoard
        setLeaderBoardName={setLeaderBoardName}
        firestore={firestore}
        player1Hero={player1Hero}
        ldbTime={ldbTime}
        setShowLeaderBoard={setShowLeaderBoard}
        showLeaderBoard={showLeaderBoard}
      />

      <LeaderBoardInput
        setLeaderBoardName={setLeaderBoardName}
        firestore={firestore}
        player1Hero={player1Hero}
        winner={winner}
        ldbTime={ldbTime}
        setShowLeaderBoard={setShowLeaderBoard}
        setShowLeaderBoardInput={setShowLeaderBoardInput}
        showLeaderBoardInput={showLeaderBoardInput}
      />

      <button
        className="btn ldbButton"
        onClick={() => {
          setShowLeaderBoard(!showLeaderBoard);
          setScreenSlide("leaderboard");
        }}
      >
        Leaderboard
      </button>
    </div>
  );
}
