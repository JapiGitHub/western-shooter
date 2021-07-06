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
  yourServer,
  setYourServer,
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
  const [chosenServer, setChosenServer] = useState([]);
  let exportReadyData = { ready: [false, false], lastOnline: 0 };
  const [serverLoaded, setServerLoaded] = useState(false);

  useEffect(async () => {
    await gameServersRef.onSnapshot((snapshot) =>
      snapshot.docs.map((doc) => {
        if (doc.data().servName === joinedServer) {
          setChosenServer(doc.data());
          setServerLoaded(true);
          return doc.data();
        }
      })
    );
  }, []);

  const NextRoundReset = () => {
    console.log("next round reset");
    setTimeout(async () => {
      const server = gameList.filter((game) => {
        if (game.servName === joinedServer) {
          return game.id;
        } else {
          return null;
        }
      });
      exportReadyData = { ready: [false, false] };
      await gameServersRef.doc(server[0].id).update(exportReadyData);

      setInfoText("Again?");
      setGun1Loaded(true);
      setPlayerOneReady(false);
      setPlayer2Anim("waiting");
      setPlayerAnim("waiting");
      //setP1ReactText();
      //setReactTextFade(false);
      //setFatality(false);
      setPlayer1Reaction(0);
      setOk2Shoot(false);
      //setAiAlive(true);
      setRandomTime(3500 + Math.floor(Math.random() * 6000));
    }, 3000);

    //reactio ajan pään yläpuolella oleva haihtuva teksti
    setTimeout(() => {
      //setReactTextFade(true);
    }, 800);
  };

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

    //your connected server ID
    const server = gameList.filter((game) => {
      if (game.servName === joinedServer) {
        return game.id;
      } else {
        return null;
      }
    });

    //data for READY?
    if (gameCreatorP1) {
      exportReadyData = {
        ready: [true, chosenServer.ready[1]],
        lastOnline: Date.now(),
      };
    } else {
      exportReadyData = {
        ready: [chosenServer.ready[0], true],
        lastOnline: Date.now(),
      };
    }

    //update READY to database
    await gameServersRef.doc(server[0].id).update(exportReadyData);
  };

  //määritä randomtime
  useEffect(() => {
    setRandomTime(3500 + Math.floor(Math.random() * 3000));
    setPlayerOneReady(false);
  }, []);

  //update READY state from DB
  useEffect(() => {
    if (serverLoaded) {
      setPlayerOneReady(chosenServer.ready[0]);
      setPlayerTwoReady(chosenServer.ready[1]);
    } else {
      console.log("db connecting");
    }
  }, [chosenServer.ready]);

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
    //NextRoundReset();
  }, [player1Reaction, player2Reaction]);

  //SHOOTING
  const actionClick = () => {
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

          //reaction time
          const pullTriggerTime = new Date();
          const reactTimeConst = pullTriggerTime - startTime;
          console.log("reaction ms : ", reactTimeConst);
          setGun1Loaded(false);
          setPlayer1Reaction(reactTimeConst);
          setOk2Shoot(false);
        }
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
          checked={serverLoaded ? chosenServer.ready[0] : false}
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
          checked={serverLoaded ? chosenServer.ready[1] : false}
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
