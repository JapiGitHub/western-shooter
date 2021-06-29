import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import useSound from "use-sound";
import pistolShot2 from "../sounds/pistol.shot.2.mp3";
import pistolCock1 from "../sounds/cock.pistol.1.mp3";
import holster from "../sounds/holster.mp3";

import "./gameMulti.scss";

export default function GameMulti({
  setPlayerAnim,
  setPlayer2Anim,
  firestore,
  joinedServer,
  setGameCreatorP1,
  gameCreatorP1,
}) {
  const [playerOneReady, setPlayerOneReady] = useState(false);
  const [playerTwoReady, setPlayerTwoReady] = useState(false);
  const [gun1Loaded, setGun1Loaded] = useState(true);
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

  //firebase
  const gameServersRef = firestore.collection("gameServers");
  const [gameList] = useCollectionData(gameServersRef, { idField: "id" });

  const playerOneReadyClick = async () => {
    setPlayerOneReady(true);
    //pushReady();
    // const exportData = {
    //   servName: joinedServer,
    //   open: true,
    //   ready: [true, true],
    //   score: [0, 0],
    //   shotFired: [false, false],
    //   lastOnline: Date.now(),
    //   lastReactionTimes: [888, 888],
    // };

    const server = gameList.filter((game) => {
      if (game.servName === joinedServer) {
        return game.id;
      } else {
        return null;
      }
    });

    const exportReadyData = {
      ready: gameCreatorP1
        ? [true, server[0].ready[1]]
        : [server[0].ready[0], true],
      lastOnline: Date.now(),
    };

    const exportReadyData2 = {
      ready: [true, true],
      lastOnline: Date.now(),
    };

    console.log("server : ", server[0]);
    console.log("server ID : ", server[0].id);

    await gameServersRef.doc(server[0].id).update(exportReadyData);
  };

  useEffect(() => {
    //päivitä ready statet
  }, [gameList]);

  const pushReady = async () => {};

  //määritä randomtime
  useEffect(() => {
    setRandomTime(3500 + Math.floor(Math.random() * 3000));
    setPlayerOneReady(false);
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

  return (
    <div className="textSplashFrame" onClick={actionClick}>
      <label className="playerLocalReadyLabel" htmlFor="p1">
        <span className="localPlayerText">
          You{gameCreatorP1 ? " Creator" : " Joined"}
        </span>
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
