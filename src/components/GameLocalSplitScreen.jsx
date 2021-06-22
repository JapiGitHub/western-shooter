import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import LeaderBoard from "./LeaderBoard";
import LeaderBoardInput from "./LeaderBoardInput";

import "./gameLocalSplitScreen.scss";

//sounds
import useSound from "use-sound";
import pistolShotFromLeft from "../sounds/pistol.shot.from.left.mp3";
import pistolShotFromRight from "../sounds/pistol.shot.from.right.mp3";
import fatalityFromRight from "../sounds/fatality.from.right.mp3";
import fatalityFromLeft from "../sounds/fatality.from.left.mp3";
import pistolCock1 from "../sounds/cock.pistol.1.mp3";
import holster from "../sounds/holster.mp3";
import ricochetToRight from "../sounds/ricochet.to.right.mp3";
import ricochetToLeft from "../sounds/ricochet.to.left.mp3";
import fall from "../sounds/fall.mp3";

export default function GameLocalSplitScreen({
  setPlayerAnim,
  setPlayer2Anim,
  slideGame,
  setSlideGame,
  difficulty,
  firestore,
  player1Hero,
  player2Hero,
}) {
  const [playerOneReady, setPlayerOneReady] = useState(false);
  const [playerTwoReady, setPlayerTwoReady] = useState(false);
  const [gun1Loaded, setGun1Loaded] = useState(true);
  const [gun2Loaded, setGun2Loaded] = useState(true);
  const [shotFired, setShotFired] = useState(false);
  const [score, setScore] = useState([0, 0]);

  const [p1ReactText, setP1ReactText] = useState("");
  const [p2ReactText, setP2ReactText] = useState("");
  const [reactTextFade, setReactTextFade] = useState(false);
  const [fatality, setFatality] = useState(false);

  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const [showLeaderBoardInput, setShowLeaderBoardInput] = useState(false);
  const [winner, setWinner] = useState(0);

  const [leaderBoardName, setLeaderBoardName] = useState("unknown");
  const [ldbTime, setLdbTime] = useState(888);

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

  const [FallPlay] = useSound(fall);

  const playerTwoReadyCheckBox = useRef();
  const playerOneReadyCheckBox = useRef();

  const fatalityTime = difficulty;

  const leaderBoardRef = firestore.collection("leaderBoard");

  //leaderborad
  const sortedLeaderBoard = leaderBoardRef.orderBy("time");
  const [leaderBoard] = useCollectionData(sortedLeaderBoard, {
    idField: "id",
  });

  const checkLeaderBoardTimes = (leaderBoardTime, player) => {
    //vertaa vain tohon 15. aikaan jotta record history näkyy databasessa.
    if (leaderBoardTime < leaderBoard[14].time) {
      setLdbTime(leaderBoardTime);
      setShowLeaderBoardInput(true);
    }
  };

  const NextRoundReset = () => {
    setTimeout(() => {
      setInfoText("Again?");
      setGun1Loaded(true);
      setGun2Loaded(true);
      setShotFired(false);
      setPlayerOneReady(false);
      setPlayerTwoReady(false);
      setPlayer2Anim("waiting");
      setPlayerAnim("waiting");
      setP1ReactText();
      setP2ReactText();
      setReactTextFade(false);
      setFatality(false);
      setWinner(0);
    }, 3000);

    //reactio ajan pään yläpuolella oleva haihtuva teksti
    setTimeout(() => {
      setReactTextFade(true);
    }, 800);
  };

  useEffect(() => {
    playerTwoReadyCheckBox.current.focus();
    console.log("leaderboard:", leaderBoard);
    try {
      console.log("leaderboard1:", leaderBoard[0]);
    } catch {
      console.log("not yet connected to DB");
    }
  });

  useEffect(() => {
    setRandomTime(3500 + Math.floor(Math.random() * 3000));
    setPlayerOneReady(false);
    setPlayerTwoReady(false);
    playerTwoReadyCheckBox.current.focus();
  }, []);

  //kun pelaajat valmiita, niin aloita timeri
  useEffect(() => {
    if (playerOneReady === true && playerTwoReady === true) {
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
    }
  }, [playerTwoReady, playerOneReady]);

  //mouse player2
  const actionClick = (e) => {
    //SHOOTING
    if (playerOneReady === true && playerTwoReady === true) {
      if (gun1Loaded === true && shotFired === false) {
        if (ok2Shoot === false) {
          //varaslähtö
          pistolShotFromRightPlay();
          setPlayer2Anim("shooting");
          setGun1Loaded(false);
          RicochetToLeftPlay();
          playerTwoReadyCheckBox.current.focus();
          console.log(document.activeElement);
        } else {
          //onnistunut laukaus
          const triggerTime = new Date();
          setShotFired(true);
          setPlayer2Anim("shooting");

          setP1ReactText(`${triggerTime - startTime} ms`);
          if (triggerTime - startTime < fatalityTime) {
            fatalityFromRightPlay();
            setFatality(true);
            setInfoText("Fatality!");
            setPlayerAnim("fatality");
          } else {
            pistolShotFromRightPlay();
            setInfoText("Mouse wins");
            setPlayerAnim("die");
          }
          setWinner(2);
          checkLeaderBoardTimes(triggerTime - startTime, "player2");
          setScore([score[0] + 1, score[1]]);
          setOk2Shoot(false);
          NextRoundReset();
        }
      }
    }
  };

  //keyboard player1
  const actionKey = (e) => {
    setPlayerTwoReady(true);

    if (playerTwoReady === true && playerOneReady === true) {
      if (gun2Loaded === true && shotFired === false) {
        if (ok2Shoot === false) {
          //varaslähtö
          pistolShotFromLeftPlay();
          setPlayerAnim("shooting");
          setGun2Loaded(false);
          RicochetToRightPlay();
        } else {
          //onnistunut laukaus
          const triggerTime = new Date();
          setShotFired(true);
          setPlayerAnim("shooting");

          FallPlay();
          setP2ReactText(`${triggerTime - startTime} ms`);
          if (triggerTime - startTime < fatalityTime) {
            fatalityFromLeftPlay();
            setFatality(true);
            setInfoText("Fatality!");
            setPlayer2Anim("fatality");
          } else {
            pistolShotFromLeftPlay();
            setInfoText("Keyboard wins");
            setPlayer2Anim("die");
          }
          setWinner(1);
          checkLeaderBoardTimes(triggerTime - startTime, "player1");
          setScore([score[0], score[1] + 1]);
          setOk2Shoot(false);

          NextRoundReset();
        }
      }
    }
  };

  const playerOneReadyClick = () => {
    //focus takaisin p2 key listeneriin
    playerTwoReadyCheckBox.current.focus();
    setPlayerOneReady(true);
  };

  return (
    <div
      className={
        playerOneReady === true && playerTwoReady === true
          ? "textSplashFrame touchAreaOn"
          : "textSplashFrame"
      }
      onMouseDown={actionClick}
    >
      <label className="player1ReadyLabel" htmlFor="p1">
        {score[0]} Mouse
        <input
          className="readyCheckBox p1check"
          type="checkbox"
          checked={playerOneReady}
          ref={playerOneReadyCheckBox}
          onClick={playerOneReadyClick}
          id="p1"
          name="p1"
        />
        <span className="checkMark1">
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
      <input
        className="focusKeyboard"
        ref={playerTwoReadyCheckBox}
        onKeyPress={(e) => {
          actionKey(e);
        }}
      ></input>
      <label className="player2ReadyLabel" htmlFor="p2">
        Keyboard {score[1]}
        <input
          className="keybInput"
          className="readyCheckBox p2check"
          type="checkbox"
          checked={playerTwoReady}
          id="p2"
          name="p2"
        />
        <span className="checkMark2">
          {playerTwoReady ? "Ready!" : "Press any key"}
        </span>
      </label>
      <div
        className={
          reactTextFade
            ? "reactionKeybTextFloater hideTime"
            : "reactionKeybTextFloater"
        }
      >
        <div className={fatality ? "fatality" : "reactKeybTimeText"}>
          {p2ReactText}
        </div>
      </div>
      <div className={slideGame ? "infoText" : "infoText hideInfo"}>
        {infoText}
      </div>
      {showLeaderBoard ? (
        <LeaderBoard
          setLeaderBoardName={setLeaderBoardName}
          firestore={firestore}
          player1Hero={player1Hero}
          player1Hero={player1Hero}
          ldbTime={ldbTime}
          setShowLeaderBoard={setShowLeaderBoard}
        />
      ) : null}

      {showLeaderBoardInput ? (
        <LeaderBoardInput
          setLeaderBoardName={setLeaderBoardName}
          firestore={firestore}
          player1Hero={player1Hero}
          player2Hero={player2Hero}
          winner={winner}
          ldbTime={ldbTime}
          setShowLeaderBoard={setShowLeaderBoard}
          setShowLeaderBoardInput={setShowLeaderBoardInput}
        />
      ) : null}

      <button
        className="btn ldbButton"
        onClick={() => {
          setShowLeaderBoard(!showLeaderBoard);
        }}
      >
        Leaderboard
      </button>
    </div>
  );
}
