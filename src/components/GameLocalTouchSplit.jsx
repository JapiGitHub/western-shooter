import React, { useEffect, useState, useRef } from "react";

import useSound from "use-sound";
import pistolShotFromLeft from "../sounds/pistol.shot.from.left.mp3";
import pistolShotFromRight from "../sounds/pistol.shot.from.right.mp3";
import fatalityFromRight from "../sounds/fatality.from.right.mp3";
import fatalityFromLeft from "../sounds/fatality.from.left.mp3";
import ricochetToRight from "../sounds/ricochet.to.right.mp3";
import ricochetToLeft from "../sounds/ricochet.to.left.mp3";
import pistolCock1 from "../sounds/cock.pistol.1.mp3";
import holster from "../sounds/holster.mp3";
import fatalityVoice from "../sounds/fatality.mp3";

import "./gameLocalTouchSplit.scss";

export default function GameLocalTouchSplit({
  setPlayerAnim,
  setPlayer2Anim,
  slideGame,
  setSlideGame,
  player1Hero,
  player2Hero,
  difficulty,
}) {
  const [playerOneReady, setPlayerOneReady] = useState(false);
  const [playerTwoReady, setPlayerTwoReady] = useState(false);
  const [gun1Loaded, setGun1Loaded] = useState(true);
  const [gun2Loaded, setGun2Loaded] = useState(true);
  const [shotFired, setShotFired] = useState(false);
  const [fatality, setFatality] = useState(false);
  const [score, setScore] = useState([0, 0]);

  const fatalityTime = difficulty;

  const [infoText, setInfoText] = useState("Ready?");

  const [p1ReactText, setP1ReactText] = useState("");
  const [p2ReactText, setP2ReactText] = useState("");
  const [reactTextFade, setReactTextFade] = useState(false);

  const [randomTime, setRandomTime] = useState(0);
  const [ok2Shoot, setOk2Shoot] = useState(false);
  const [startTime, setStartTime] = useState(888);

  //pitää olla REFfinä jotta tän currentti näkyy sit oikein setTimeout:ssa
  const doubleFailRef = useRef(false);

  //äänet
  const [pistolShotFromLeftPlay] = useSound(pistolShotFromLeft);
  const [pistolShotFromRightPlay] = useSound(pistolShotFromRight);
  const [RicochetToLeftPlay] = useSound(ricochetToLeft);
  const [RicochetToRightPlay] = useSound(ricochetToRight);
  const [fatalityFromRightPlay] = useSound(fatalityFromRight);
  const [fatalityFromLeftPlay] = useSound(fatalityFromLeft);
  const [pistolCock1Play] = useSound(pistolCock1);
  const [holsterPlay] = useSound(holster);
  const [fatalityVoicePlay] = useSound(fatalityVoice);

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
        doubleFailRef.current = false;
      }, 1500);

      setTimeout((startTime) => {
        if (!doubleFailRef.current) {
          setInfoText("BANG!");
          setOk2Shoot(true);
          holsterPlay();
          setStartTime(new Date());
        }
      }, randomTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerTwoReady, playerOneReady]);

  //Right
  const actionClickRight = (e) => {
    e.preventDefault();
    console.log("nappia painettu");
    //SHOOTING
    if (playerOneReady === true && playerTwoReady === true) {
      if (gun1Loaded === true && shotFired === false) {
        if (ok2Shoot === false) {
          //varaslähtö
          pistolShotFromRightPlay();
          setPlayer2Anim("shooting");
          setGun1Loaded(false);
          RicochetToLeftPlay();
          if (!gun2Loaded) {
            setInfoText("Double fail");
            doubleFailRef.current = true;
            NextRoundReset();
          }
        } else {
          //onnistunut laukaus
          const triggerTime = new Date();
          setShotFired(true);
          setPlayer2Anim("shooting");
          setP2ReactText(`${triggerTime - startTime} ms`);
          if (triggerTime - startTime < fatalityTime) {
            fatalityFromRightPlay();
            setFatality(true);
            setInfoText("Fatality!");
            setPlayerAnim("fatality");
            fatalityVoicePlay();
          } else {
            pistolShotFromRightPlay();
            setInfoText("Right wins");
            setPlayerAnim("die");
          }
          //setScore([score[0] + 1, score[1]]);
          setScore((prevScore) => {
            return [prevScore[0] + 1, prevScore[1]];
          });
          setOk2Shoot(false);
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
          pistolShotFromLeftPlay();
          setPlayerAnim("shooting");
          setGun2Loaded(false);
          RicochetToRightPlay();
          if (!gun1Loaded) {
            setInfoText("Double fail");
            doubleFailRef.current = true;
            NextRoundReset();
          }
        } else {
          //onnistunut laukaus
          const triggerTime = new Date();
          setP1ReactText(`${triggerTime - startTime} ms`);
          setShotFired(true);
          setPlayerAnim("shooting");
          if (triggerTime - startTime < fatalityTime) {
            fatalityFromLeftPlay();
            setFatality(true);
            setInfoText("Fatality!");
            setPlayer2Anim("fatality");
            fatalityVoicePlay();
          } else {
            pistolShotFromLeftPlay();
            setInfoText("Left wins");
            setPlayer2Anim("die");
          }
          setScore((prevScore) => {
            return [prevScore[0], prevScore[1] + 1];
          });
          setOk2Shoot(false);
          NextRoundReset();
        }
      }
    }
  };

  const playerTwoReadyClick = (e) => {
    e.preventDefault();
    setPlayerTwoReady(true);
  };

  const playerOneReadyClick = (e) => {
    e.preventDefault();
    setPlayerOneReady(true);
  };

  return (
    <div
      className={
        playerOneReady === true && playerTwoReady === true
          ? "textSplashFrame"
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

      <div className="scoreInfoRight">{score[0]}</div>
      <label className="player1ReadyLabelTouch" htmlFor="p1">
        <input
          className="readyCheckBoxTouch p1check"
          type="checkbox"
          checked={playerOneReady}
          onClick={playerOneReadyClick}
          id="p1"
          name="p1"
        />
        <span className="checkMark1Touch">
          {playerOneReady ? "Ready!" : "Tap to ready"}
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

      <div className="scoreInfoLeft">{score[1]}</div>
      <label className="player2ReadyLabelTouch" htmlFor="p2">
        <input
          className="readyCheckBoxTouch p2check"
          type="checkbox"
          checked={playerTwoReady}
          onClick={playerTwoReadyClick}
          id="p2"
          name="p2"
        />
        <span className="checkMark2Touch">
          {playerTwoReady ? "Ready!" : "Tap to ready"}
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
    </div>
  );
}
