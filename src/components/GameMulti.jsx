import React, { useEffect, useRef, useState } from "react";

import useSound from "use-sound";
import pistolShot2 from "../sounds/pistol.shot.2.mp3";
import pistolCock1 from "../sounds/cock.pistol.1.mp3";
import holster from "../sounds/holster.mp3";

import "./gameMulti.scss";

export default function GameMulti({
  setPlayerAnim,
  setPlayer2Anim,
  firestore,
  auth,
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

  const [playerAvatar, setPlayerAvatar] = useState(auth.currentUser.photoURL);
  const dataMessagesRef = firestore.collection("dataMessages");

  const sendii = async () => {
    await dataMessagesRef.add({
      test: "toimii",
    });
  };

  //määritä randomtime
  useEffect(() => {
    setRandomTime(3500 + Math.floor(Math.random() * 3000));
    setPlayerOneReady(false);

    const { uid, photoURL } = auth.currentUser;
    console.log("initialize");
    console.log("id", uid, "  url", photoURL);

    sendii();
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

  const playerOneReadyClick = () => {
    setPlayerOneReady(true);
  };

  return (
    <div className="textSplashFrame" onClick={actionClick}>
      <label className="playerLocalReadyLabel" htmlFor="p1">
        <span className="localPlayerText">You</span>
        <input
          className="readyCheckBox p1check"
          type="checkbox"
          checked={playerOneReady}
          ref={playerOneReadyCheckBox}
          onClick={playerOneReadyClick}
          id="p1"
          name="p1"
        />
        <span className="checkMarkLocal">
          {playerOneReady ? "Ready!" : "Click to ready"}
        </span>
        <img src={playerAvatar} alt="playerAvatar" className="avatar"></img>
      </label>

      <label className="playerNetworkReadyLabel" htmlFor="p2">
        Enemy
        <input
          className="readyCheckBox p2check"
          type="checkbox"
          checked={playerTwoReady}
          ref={playerTwoReadyCheckBox}
          id="p2"
          name="p2"
        />
        <span className="checkMarkNetwork">
          {playerTwoReady ? "Ready!" : "Press any key"}
        </span>
      </label>

      <div className="infoText">{infoText}</div>
    </div>
  );
}
