import React, { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import pistolShot1 from "../sounds/pistol.shot.1.mp3";
import "./textsplash.scss";

export default function TextSplash({ playerReady, setPlayerReady }) {
  const [infoText, setInfoText] = useState("Ready?");
  const [reactionTime, setReactionTime] = useState(7777);
  const [startTime, setStartTime] = useState(888);
  const [randomTime, setRandomTime] = useState(0);
  const [gunLoaded, setGunLoaded] = useState(true);

  const [pistolShot1Play] = useSound(pistolShot1);

  useEffect(() => {
    setRandomTime(5000 + Math.floor(Math.random() * 3000));
    console.log(randomTime);
  }, []);

  useEffect(() => {
    setStartTime(5000 + Math.floor(Math.random() * 3000));
    console.log("R", randomTime);
  }, [randomTime]);

  const readyClick = () => {
    //START TIMER
    if (playerReady === false) {
      setPlayerReady(true);
      //3000ms kohdalla tulee "set..."

      setInfoText("Ready!");

      setTimeout(() => {
        setInfoText("Set ...");
      }, 3000);

      setTimeout((startTime) => {
        setInfoText("BANG!");
        console.log(randomTime);
        setStartTime(new Date());
      }, randomTime);
    }

    //SHOOTING
    if (playerReady === true) {
      if (gunLoaded === true) {
        const pullTriggerTime = new Date();
        const reactTimeConst = pullTriggerTime - startTime;

        setReactionTime(reactTimeConst);
        console.log(reactTimeConst / 1000, " seconds reaction time");
        setGunLoaded(false);

        if (reactTimeConst < 500) {
          setInfoText("Win!");
          pistolShot1Play();
        } else {
          setInfoText("Lost!");
        }
      }
    }
  };

  return (
    <div className="textSplashFrame" onClick={readyClick}>
      <div className="infoText">{infoText}</div>
    </div>
  );
}
