import React, { useEffect, useState } from "react";

import useSound from "use-sound";
import pistolShot2 from "../sounds/pistol.shot.2.mp3";
import pistolCock1 from "../sounds/cock.pistol.1.mp3";
import holster from "../sounds/holster.mp3";

import "./gameLocalTouchSplit.scss";

export default function GameLocalTouchSplit({
  setPlayerAnim,
  setPlayer2Anim,
  slideGame,
  setSlideGame,
  player1Hero,
  player2Hero,
}) {
  const [playerOneReady, setPlayerOneReady] = useState(false);
  const [playerTwoReady, setPlayerTwoReady] = useState(false);
  const [gun1Loaded, setGun1Loaded] = useState(true);
  const [gun2Loaded, setGun2Loaded] = useState(true);
  const [shotFired, setShotFired] = useState(false);
  const [fatality, setFatality] = useState(false);
  const [score, setScore] = useState([0, 0]);

  const [infoText, setInfoText] = useState("Ready?");

  const [randomTime, setRandomTime] = useState(0);
  const [ok2Shoot, setOk2Shoot] = useState(false);

  const [pistolShot2Play] = useSound(pistolShot2);
  const [pistolCock1Play] = useSound(pistolCock1);
  const [holsterPlay] = useSound(holster);

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
      //setP1ReactText();
      //setP2ReactText();
      //setReactTextFade(false);
      setFatality(false);
      setRandomTime(3500 + Math.floor(Math.random() * 6000));
    }, 3000);

    //reactioajan pään yläpuolella haihtuva teksti
    setTimeout(() => {
      //setReactTextFade(true);
    }, 800);
  };

  useEffect(() => {
    setRandomTime(3500 + Math.floor(Math.random() * 3000));
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
      }, randomTime);
    }
  }, [playerTwoReady, playerOneReady]);

  //Right
  const actionClickRight = (e) => {
    e.preventDefault();
    //SHOOTING
    if (playerOneReady === true && playerTwoReady === true) {
      if (gun1Loaded === true && shotFired === false) {
        if (ok2Shoot === false) {
          //varaslähtö
          pistolShot2Play();
          setPlayer2Anim("shooting");
          setGun1Loaded(false);
        } else {
          //onnistunut laukaus
          setShotFired(true);
          setPlayer2Anim("shooting");
          setPlayerAnim("die");
          pistolShot2Play();
          setInfoText("Right wins");
          setScore([score[0] + 1, score[1]]);
          NextRoundReset();
        }
      }
    }
  };

  //left
  const actionClickLeft = (e) => {
    e.preventDefault();
    //SHOOTING
    if (playerOneReady === true && playerTwoReady === true) {
      if (gun2Loaded === true && shotFired === false) {
        if (ok2Shoot === false) {
          //varaslähtö
          pistolShot2Play();
          setPlayerAnim("shooting");
          setGun2Loaded(false);
        } else {
          //onnistunut laukaus
          setShotFired(true);
          setPlayerAnim("shooting");
          setPlayer2Anim("die");
          pistolShot2Play();
          setInfoText("Left wins");
          setScore([score[0], score[1] + 1]);
          NextRoundReset();
        }
      }
    }
  };

  const playerTwoReadyClick = () => {
    setPlayerTwoReady(true);
  };

  const playerOneReadyClick = () => {
    setPlayerOneReady(true);
  };

  return (
    <div
      className={
        playerOneReady === true && playerTwoReady === true
          ? "textSplashFrame touchAreaOn"
          : "textSplashFrame"
      }
    >
      <section
        //onClick={actionClickLeft}
        onTouchStart={actionClickLeft}
        className={
          playerOneReady === true && playerTwoReady === true
            ? "leftTouchArea touchAreaOn"
            : "leftTouchArea"
        }
      ></section>
      <section
        //onClick={actionClickRight}
        onTouchStart={actionClickRight}
        className={
          playerOneReady === true && playerTwoReady === true
            ? "rightTouchArea touchAreaOn"
            : "rightTouchArea"
        }
      ></section>

      <label className="player1ReadyLabel" htmlFor="p1">
        {score[0]} Right
        <input
          className="readyCheckBox p1check"
          type="checkbox"
          checked={playerOneReady}
          onClick={playerOneReadyClick}
          id="p1"
          name="p1"
        />
        <span className="checkMark1">
          {playerOneReady ? "Ready!" : "Tap to ready"}
        </span>
      </label>
      <label className="player2ReadyLabel" htmlFor="p2">
        Left {score[1]}
        <input
          className="readyCheckBox p2check"
          type="checkbox"
          checked={playerTwoReady}
          onClick={playerTwoReadyClick}
          id="p2"
          name="p2"
        />
        <span className="checkMark2">
          {playerTwoReady ? "Ready!" : "Tap to ready"}
        </span>
      </label>

      <div className="infoText">{infoText}</div>
    </div>
  );
}
