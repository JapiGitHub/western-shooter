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
  difficulty,
  firestore,
  player1Hero,
  player2Hero,
  setScreenSlide,
  screenSlide,
  showLeaderBoard,
  setShowLeaderBoard,
}) {
  const [playerOneReady, setPlayerOneReady] = useState(false);
  const [playerTwoReady, setPlayerTwoReady] = useState(false);

  const [gun1Loaded, setGun1Loaded] = useState(true);
  const [gun2Loaded, setGun2Loaded] = useState(true);
  //vain yksi laukaus per ase

  const [shotFired, setShotFired] = useState(false);
  //vain yksi onnistunut laukaus per round. varaslähtö voi toki olla myös.

  const [score, setScore] = useState([0, 0]);

  const [p1ReactText, setP1ReactText] = useState("");
  const [p2ReactText, setP2ReactText] = useState("");
  const [reactTextFade, setReactTextFade] = useState(false);

  const [fatality, setFatality] = useState(false);

  const [showLeaderBoardInput, setShowLeaderBoardInput] = useState(false);
  const [winner, setWinner] = useState(0);

  const [ldbTime, setLdbTime] = useState(888);

  const [infoText, setInfoText] = useState("Ready?");

  const [startTime, setStartTime] = useState(888);
  const [randomTime, setRandomTime] = useState(0);
  const [ok2Shoot, setOk2Shoot] = useState(false);

  const [pistolCock1Play] = useSound(pistolCock1);
  const [holsterPlay] = useSound(holster);

  //äänet
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

  //leaderborad
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

  useEffect(() => {
    playerTwoReadyCheckBox.current.focus();
  }, [player2Hero, player1Hero]);

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
      setRandomTime(3500 + Math.floor(Math.random() * 6000));
    }, 3000);

    //reactioajan pään yläpuolella haihtuva teksti
    setTimeout(() => {
      setReactTextFade(true);
    }, 800);

    playerTwoReadyCheckBox.current.focus();
  };

  useEffect(() => {
    setRandomTime(3500 + Math.floor(Math.random() * 6000));
    setPlayerOneReady(false);
    setPlayerTwoReady(false);
    playerTwoReadyCheckBox.current.focus();
  }, []);

  useEffect(() => {
    if (!showLeaderBoardInput) {
      setScreenSlide("game");
      playerTwoReadyCheckBox.current.focus();
    } else {
      setScreenSlide("leaderboard");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLeaderBoardInput]);

  useEffect(() => {
    if (!showLeaderBoard) {
      setScreenSlide("game");
      playerTwoReadyCheckBox.current.focus();
    } else {
      setScreenSlide("leaderboard");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLeaderBoard]);

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
        playerTwoReadyCheckBox.current.focus();
      }, randomTime);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerTwoReady, playerOneReady]);

  //mouse player2
  const actionClick = (e) => {
    setShowLeaderBoard(false);
    //setScreenSlide("game");
    //SHOOTING
    if (
      playerOneReady === true &&
      playerTwoReady === true &&
      gun1Loaded === true &&
      shotFired === false
    ) {
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
    playerTwoReadyCheckBox.current.focus();
  };

  //keyboard player1
  const actionKey = (e) => {
    setPlayerTwoReady(true);
    setShowLeaderBoard(false);
    setShowLeaderBoardInput(false);
    //setScreenSlide("game");

    if (
      playerTwoReady === true &&
      playerOneReady === true &&
      gun2Loaded === true &&
      shotFired === false
    ) {
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
  };

  const playerOneReadyClick = () => {
    //focus takaisin p2 key listeneriin
    playerTwoReadyCheckBox.current.focus();
    setPlayerOneReady(true);
    setShowLeaderBoard(false);
    //setScreenSlide("game");
  };

  const empty = () => {
    //tää pitää olla jotta vältytään tolta errorilta:
    //Warning: You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.
    // jos laittaa defaultChecked, niin ready ei vaihdu vihreäksi
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
          onChange={empty}
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
          className="keybInput readyCheckBox p2check"
          type="checkbox"
          checked={playerTwoReady}
          onChange={empty}
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

      <div className="infoText">{infoText}</div>

      <LeaderBoard firestore={firestore} showLeaderBoard={showLeaderBoard} />

      <LeaderBoardInput
        firestore={firestore}
        player1Hero={player1Hero}
        player2Hero={player2Hero}
        winner={winner}
        ldbTime={ldbTime}
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
