import React, { useEffect, useRef, useState } from "react";

import useSound from "use-sound";
import pistolShot2 from "../sounds/pistol.shot.2.mp3";
import pistolCock1 from "../sounds/cock.pistol.1.mp3";
import ding from "../sounds/ding.mp3";
import holster from "../sounds/holster.mp3";

import "./gameLocalSplitScreen.scss";

export default function GameLocalSplitScreen({
  playerAnim,
  setPlayerAnim,
  player2Anim,
  setPlayer2Anim,
  setLeftGroundMiss,
  setRightGroundMiss,
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

  //voiton checkaus
  useEffect(() => {
    if (player1Reaction > 0 && player2Reaction > 0) {
      if (player1Reaction < player2Reaction) {
        setInfoText("player 1 won");
        //ampumis anim 1
        setPlayerAnim("shooting");
        pistolShot2Play();
        //kuolemisanim 2
      } else {
        setInfoText("player 2 wins");
        //ampumis anim 2
        pistolShot2Play();
        //kuolemisanim 1
      }
    }
  }, [player1Reaction, player2Reaction]);

  //mouse player1
  const actionClick = () => {
    playerTwoReadyCheckBox.current.focus();

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
          setInfoText("mouse wins");
        }

        /*         const pullTriggerTime = new Date();
        const reactTimeConst = pullTriggerTime - startTime;

        console.log(reactTimeConst / 1000, " seconds reaction time player1");
        setGun1Loaded(false);

        setPlayer1Reaction(reactTimeConst); */
        /*         if (reactTimeConst < 500) {
          setPlayerAnim("shooting");
          setInfoText("Win!");
          pistolShot2Play();
        } else {
          setInfoText("Lost!");
        } */
      }
    }
  };

  //keyboard player2
  const actionKey = (e) => {
    setPlayerTwoReady(true);

    if (playerTwoReady === true && playerOneReady === true) {
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
          setInfoText("keyboard wins");
        }
        /*         const pullTriggerTime = new Date();
        const reactTimeConst = pullTriggerTime - startTime;

        console.log(reactTimeConst / 1000, " seconds reaction time player2");
        setGun2Loaded(false);

        setPlayer2Reaction(reactTimeConst); */
        /*         if (reactTimeConst < 500) {
          setPlayerAnim("shooting");
          setInfoText("Win2!");
          pistolShot2Play();
        } else {
          setInfoText("Lost2!");
        } */
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
    <div className="textSplashFrame" onClick={actionClick}>
      <label className="player1ReadyLabel" htmlFor="p1">
        Mouse
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
        Keyboard
        <input
          className="readyCheckBox p2check"
          type="checkbox"
          checked={playerTwoReady}
          ref={playerTwoReadyCheckBox}
          onKeyPress={(e) => {
            actionKey(e);
          }}
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
