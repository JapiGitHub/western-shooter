import React, { useEffect, useRef, useState } from "react";

import useSound from "use-sound";
import pistolShot2 from "../sounds/pistol.shot.2.mp3";
import pistolCock1 from "../sounds/cock.pistol.1.mp3";
import ding from "../sounds/ding.mp3";
import holster from "../sounds/holster.mp3";

import "./gameLocalAI.scss";

export default function GameLocalAI({
  setPlayerAnim,
  setPlayer2Anim,
  showMenu,
  slideGame,
  setSlideGame,
}) {
  const [playerOneReady, setPlayerOneReady] = useState(false);
  const [gun1Loaded, setGun1Loaded] = useState(true);
  const [aiAlive, setAiAlive] = useState(true);
  const [score, setScore] = useState([0, 0]);

  const [player1Reaction, setPlayer1Reaction] = useState(0);

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

  const NextRoundReset = () => {
    setTimeout(() => {
      setInfoText("Again?");
      setGun1Loaded(true);
      setShotFired(false);
      setPlayerOneReady(false);
      setPlayer2Anim("waiting");
      setPlayerAnim("waiting");
      setPlayer1Reaction(0);
      setOk2Shoot(false);
      setAiAlive(true);
    }, 3000);
  };

  useEffect(() => {
    setRandomTime(3500 + Math.floor(Math.random() * 3000));
    setPlayerOneReady(false);
    console.log(randomTime);
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
          setPlayer1Reaction(501);
        }
      }, randomTime + 500);
    }
  }, [playerOneReady]);

  //voiton checkaus
  useEffect(() => {
    if (player1Reaction > 0) {
      console.log("reactio: ", player1Reaction);
      if (player1Reaction < 500) {
        setAiAlive(false);
        setInfoText("You won");
        setPlayerAnim("shooting");
        pistolShot2Play();
        setPlayer2Anim("die");
        setScore([score[0] + 1, score[1]]);
        NextRoundReset();
      } else {
        if (aiAlive) {
          setGun1Loaded(false);
          setInfoText("AI wins");
          setPlayer2Anim("shooting");
          pistolShot2Play();
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
          pistolShot2Play();
          setPlayerAnim("shooting");
          setGun1Loaded(false);
        } else {
          //onnistunut laukaus
          setInfoText("mouse wins");

          const pullTriggerTime = new Date();
          const reactTimeConst = pullTriggerTime - startTime;

          console.log(reactTimeConst / 1000, " seconds reaction time player1");
          setGun1Loaded(false);

          setPlayer1Reaction(reactTimeConst);
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
    </div>
  );
}
