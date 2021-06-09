import React, { useEffect, useRef, useState } from "react";

import useSound from "use-sound";
import pistolShot2 from "../sounds/pistol.shot.2.mp3";
import pistolCock1 from "../sounds/cock.pistol.1.mp3";
import ding from "../sounds/ding.mp3";
import holster from "../sounds/holster.mp3";

import "./gameLocalTouchSplit.scss";

export default function GameLocalTouchSplit({
  playerAnim,
  setPlayerAnim,
  player2Anim,
  setPlayer2Anim,
}) {
  const [playerOneReady, setPlayerOneReady] = useState(false);
  const [playerTwoReady, setPlayerTwoReady] = useState(false);
  const [gun1Loaded, setGun1Loaded] = useState(true);
  const [gun2Loaded, setGun2Loaded] = useState(true);
  const [player1Reaction, setPlayer1Reaction] = useState(0);
  const [player2Reaction, setPlayer2Reaction] = useState(0);

  const [shotFired, setShotFired] = useState(false);

  const [infoText, setInfoText] = useState("Ready?");

  const [startTime, setStartTime] = useState(888);
  const [randomTime, setRandomTime] = useState(0);
  const [ok2Shoot, setOk2Shoot] = useState(false);

  const [pistolShot2Play] = useSound(pistolShot2);
  const [pistolCock1Play] = useSound(pistolCock1);
  const [holsterPlay] = useSound(holster);

  const playerTwoReadyCheckBox = useRef();
  const playerOneReadyCheckBox = useRef();

  useEffect(() => {
    setRandomTime(3500 + Math.floor(Math.random() * 3000));
    playerTwoReadyCheckBox.current.focus();
    setPlayerOneReady(false);
    console.log("initialize");
  }, []);

  //onko tää ihan turha?
  useEffect(() => {
    setStartTime(3500 + Math.floor(Math.random() * 3000));
  }, [randomTime]);

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

  //
  useEffect(() => {
    if (gun1Loaded === false && gun2Loaded === false) {
    }
  }, [gun1Loaded, gun2Loaded]);

  //Right
  const actionClickRight = () => {
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
        }
      }
    }
  };

  //left
  const actionClickLeft = () => {
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
        onClick={actionClickLeft}
        className={
          playerOneReady === true && playerTwoReady === true
            ? "leftTouchArea touchAreaOn"
            : "leftTouchArea"
        }
      ></section>
      <section
        onClick={actionClickRight}
        className={
          playerOneReady === true && playerTwoReady === true
            ? "rightTouchArea touchAreaOn"
            : "rightTouchArea"
        }
      ></section>

      <label className="player1ReadyLabel" htmlFor="p1">
        Right
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
      <label className="player2ReadyLabel" htmlFor="p2">
        Left
        <input
          className="readyCheckBox p2check"
          type="checkbox"
          checked={playerTwoReady}
          ref={playerTwoReadyCheckBox}
          onClick={playerTwoReadyClick}
          id="p2"
          name="p2"
        />
        <span className="checkMark2">
          {playerTwoReady ? "Ready!" : "Press any key"}
        </span>
      </label>

      <div className="infoText">{infoText}</div>
    </div>
  );
}
