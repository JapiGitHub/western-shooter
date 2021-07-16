import React, { useEffect, useRef, useState } from "react";

import useSound from "use-sound";
import pistolShotFromLeft from "../sounds/pistol.shot.from.left.mp3";
import pistolShotFromRight from "../sounds/pistol.shot.from.right.mp3";
import fatalityFromLeft from "../sounds/fatality.from.left.mp3";
import fatalityVoice from "../sounds/fatality.mp3";
import pistolCock1 from "../sounds/cock.pistol.1.mp3";
import holster from "../sounds/holster.mp3";
import ricochetToRight from "../sounds/ricochet.to.right.mp3";

import "./gameLocalAI.scss";

export default function GameLocalAI({
  setPlayerAnim,
  setPlayer2Anim,
  difficulty,
}) {
  const [playerOneReady, setPlayerOneReady] = useState(false);
  const [gun1Loaded, setGun1Loaded] = useState(true);
  const [aiAlive, setAiAlive] = useState(true);
  const [score, setScore] = useState([0, 0]);

  const [p1ReactText, setP1ReactText] = useState("");
  const [reactTextFade, setReactTextFade] = useState(false);
  const [fatality, setFatality] = useState(false);

  const [player1Reaction, setPlayer1Reaction] = useState(0);

  const [infoText, setInfoText] = useState("Ready?");

  const [startTime, setStartTime] = useState(888);
  const [randomTime, setRandomTime] = useState(0);
  const [ok2Shoot, setOk2Shoot] = useState(false);

  const [pistolCock1Play] = useSound(pistolCock1);
  const [holsterPlay] = useSound(holster);

  const [pistolShotFromLeftPlay] = useSound(pistolShotFromLeft);
  const [pistolShotFromRightPlay] = useSound(pistolShotFromRight);
  const [RicochetToRightPlay] = useSound(ricochetToRight);
  const [fatalityFromLeftPlay] = useSound(fatalityFromLeft);
  const [fatalityVoicePlay] = useSound(fatalityVoice);

  const playerTwoReadyCheckBox = useRef();
  const playerOneReadyCheckBox = useRef();

  const fatalityTime = difficulty;
  const AIbaseTime = 500;

  const NextRoundReset = () => {
    setTimeout(() => {
      setInfoText("Again?");
      setGun1Loaded(true);
      setPlayerOneReady(false);
      setPlayer2Anim("waiting");
      setPlayerAnim("waiting");
      setP1ReactText();
      setReactTextFade(false);
      setFatality(false);
      setPlayer1Reaction(0);
      setOk2Shoot(false);
      setAiAlive(true);
      setRandomTime(3500 + Math.floor(Math.random() * 6000));
    }, 3000);

    //reactio ajan pään yläpuolella oleva haihtuva teksti
    setTimeout(() => {
      setReactTextFade(true);
    }, 800);
  };

  useEffect(() => {
    setRandomTime(3500 + Math.floor(Math.random() * 6000));
    setPlayerOneReady(false);
  }, []);

  useEffect(() => {
    setStartTime(3500 + Math.floor(Math.random() * 6000));
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
          setPlayer1Reaction(AIbaseTime + 1);
        }
      }, randomTime + AIbaseTime);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerOneReady]);

  //voiton checkaus
  useEffect(() => {
    if (player1Reaction > 0) {
      console.log("reactio: ", player1Reaction);
      if (
        player1Reaction < AIbaseTime - score[0] * 50 ||
        player1Reaction < fatalityTime
      ) {
        const triggerTime = new Date();
        setAiAlive(false);
        setPlayerAnim("shooting");
        setP1ReactText(`${triggerTime - startTime} ms`);

        if (player1Reaction < fatalityTime) {
          setPlayer2Anim("fatality");
          setInfoText("Fatality!");
          fatalityVoicePlay();
          fatalityFromLeftPlay();
          setFatality(true);
        } else {
          pistolShotFromLeftPlay();
          setInfoText("You won");
          setPlayer2Anim("die");
        }
        setScore([score[0] + 1, score[1]]);
        NextRoundReset();
      } else {
        if (aiAlive) {
          setGun1Loaded(false);
          setInfoText("AI wins");
          setPlayer2Anim("shooting");
          pistolShotFromRightPlay();
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
          pistolShotFromLeftPlay();
          RicochetToRightPlay();
          setPlayerAnim("shooting");
          setGun1Loaded(false);
        } else {
          //onnistunut laukaus
          setInfoText("mouse wins");

          const pullTriggerTime = new Date();
          const reactTimeConst = pullTriggerTime - startTime;
          setGun1Loaded(false);
          setPlayer1Reaction(reactTimeConst);
          setOk2Shoot(false);
        }
      }
    }
  };

  const playerOneReadyClick = () => {
    //focus takaisin p2 key listeneriin
    playerTwoReadyCheckBox.current.focus();
    setPlayerOneReady(true);
  };

  const empty = () => {
    //tää pitää olla jotta vältytään tolta errorilta:
    //Warning: You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.
    // jos laittaa defaultChecked, niin ready ei vaihdu vihreäksi
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
          onChange={empty}
          ref={playerOneReadyCheckBox}
          onClick={playerOneReadyClick}
          id="p1"
          name="p1"
        />
        <span className="checkMarkPlayer">
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

      <label className="aiReadyLabel" htmlFor="p2">
        {score[1]} AI
        <input
          className="readyCheckBox p2check"
          type="checkbox"
          checked={true}
          onChange={empty}
          ref={playerTwoReadyCheckBox}
          onClick={playerOneReadyClick}
          id="p2"
          name="p2"
        />
        <span className="checkMarkAI">Ready!</span>
      </label>

      <div className="infoText">{infoText}</div>
    </div>
  );
}
