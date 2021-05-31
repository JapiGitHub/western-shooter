import React, { useEffect, useRef, useState } from "react";

import useSound from "use-sound";
import pistolShot2 from "../sounds/pistol.shot.2.mp3";
import pistolCock1 from "../sounds/cock.pistol.1.mp3";
import ding from "../sounds/ding.mp3";
import holster from "../sounds/holster.mp3";

import "./textsplash.scss";

export default function TextSplash({
  playerReady,
  setPlayerReady,
  playerAnim,
  setPlayerAnim,
}) {
  const [infoText, setInfoText] = useState("Ready?");
  const [startTime, setStartTime] = useState(888);
  const [randomTime, setRandomTime] = useState(0);
  const [gunLoaded, setGunLoaded] = useState(true);

  const [pistolShot2Play] = useSound(pistolShot2);
  const [pistolCock1Play] = useSound(pistolCock1);
  const [dingPlay] = useSound(ding);
  const [holsterPlay] = useSound(holster);

  const infoRef = useRef();

  useEffect(() => {
    setRandomTime(3500 + Math.floor(Math.random() * 3000));
  }, []);

  useEffect(() => {
    setStartTime(3500 + Math.floor(Math.random() * 3000));
  }, [randomTime]);

  const actionClick = () => {
    //START TIMER
    if (playerReady === false) {
      setPlayerReady(true);
      //1500ms kohdalla tulee "set..."

      setInfoText("Ready!");
      pistolCock1Play();

      setTimeout(() => {
        setInfoText("Set ...");
      }, 1500);

      setTimeout((startTime) => {
        setInfoText("BANG!");
        holsterPlay();
        console.log(randomTime);
        setStartTime(new Date());
      }, randomTime);
    }

    //SHOOTING
    if (playerReady === true) {
      if (gunLoaded === true) {
        const pullTriggerTime = new Date();
        const reactTimeConst = pullTriggerTime - startTime;

        console.log(reactTimeConst / 1000, " seconds reaction time");
        setGunLoaded(false);

        if (reactTimeConst < 500) {
          setPlayerAnim("shooting");
          setInfoText("Win!");
          pistolShot2Play();
        } else {
          setInfoText("Lost!");
        }
      }
    }
  };

  return (
    <div className="textSplashFrame" onClick={actionClick}>
      <div className="infoText">{infoText}</div>
    </div>
  );
}
