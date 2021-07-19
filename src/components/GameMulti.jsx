import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

import useSound from "use-sound";
import pistolShot2 from "../sounds/pistol.shot.2.mp3";
import pistolCock1 from "../sounds/cock.pistol.1.mp3";
import holster from "../sounds/holster.mp3";
import ricochet from "../sounds/ricochet.mp3";

import "./gameMulti.scss";

// setScore to DB, muuten tulee vaan lokaalisti creatorille
// jostain syystä joined jää vaan "set..." kohtaan
// make game full when 2 players online
// checkaa, että ready palikat on oikealla puolella ruutua pelaajille
//

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
  const [gun1Loaded, setGun1Loaded] = useState(false);
  const [player1Reaction, setPlayer1Reaction] = useState(88888);
  const [player2Reaction, setPlayer2Reaction] = useState(88888);
  const [score, setScore] = useState([0, 0]);
  const [shotFired, setShotFired] = useState(false);

  const [infoText, setInfoText] = useState("Ready?");

  const [startTime, setStartTime] = useState(888);
  const [randomTime, setRandomTime] = useState(0);
  const [ok2Shoot, setOk2Shoot] = useState(false);

  const [pistolShot2Play] = useSound(pistolShot2);
  const [pistolCock1Play] = useSound(pistolCock1);
  const [holsterPlay] = useSound(holster);
  const [ricochetPlay] = useSound(ricochet);

  const playerTwoReadyCheckBox = useRef();
  const playerOneReadyCheckBox = useRef();

  //firebase
  const gameServersRef = firestore.collection("gameServers");
  const [gameList] = useCollectionData(gameServersRef, { idField: "id" });
  const [chosenServer, setChosenServer] = useState([]);
  let exportReadyData = { ready: [false, false], lastOnline: 0 };
  let exportShootData = {};
  const [serverLoaded, setServerLoaded] = useState(false);

  useEffect(async () => {
    setPlayer2Anim("waiting");
    setPlayerAnim("waiting");

    await gameServersRef.onSnapshot((snapshot) =>
      snapshot.docs.map((doc) => {
        if (doc.data().servName === joinedServer) {
          setChosenServer(doc.data());
          setServerLoaded(true);
          //DEBUG return ilman constia turha
          return doc.data();
        }
      })
    );
  }, []);

  //next round reset
  useEffect(() => {
    if (serverLoaded) {
      if (chosenServer.shotFired[0] || chosenServer.shotFired[1]) {
        console.log("next round reset");
        setTimeout(async () => {
          const server = gameList.filter((game) => {
            if (game.servName === joinedServer) {
              return game.id;
            } else {
              return null;
            }
          });

          if (gameCreatorP1) {
            console.log("score menossa DBhen ", score);
            exportReadyData = {
              ready: [false, false],
              shotFired: [false, false],
              lastOnline: Date.now(),
              lastRandomTime: 3500 + Math.floor(Math.random() * 6000),
              score: score,
              lastReactionTime: [88888, 88888],
            };
            await gameServersRef.doc(server[0].id).update(exportReadyData);
          }

          setInfoText("Again?");
          setGun1Loaded(true);
          setPlayerOneReady(false);
          setPlayerTwoReady(false);
          setPlayer2Anim("waiting");
          setPlayerAnim("waiting");
          //setP1ReactText();
          //setReactTextFade(false);
          //setFatality(false);
          setPlayer1Reaction(0);
          setOk2Shoot(false);
          setRandomTime(chosenServer.lastRandomTime);
        }, 3000);

        //reactio ajan pään yläpuolella oleva haihtuva teksti
        setTimeout(() => {
          //setReactTextFade(true);
        }, 800);
      }
    }
  }, [chosenServer.score]);

  const NextRoundReset = () => {};

  const playerOneReadyClick = async () => {
    setPlayerOneReady(true);
    setRandomTime(chosenServer.lastRandomTime);

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

  //update READY and RANDTime states from DB
  useEffect(() => {
    if (serverLoaded) {
      setPlayerOneReady(chosenServer.ready[0]);
      setPlayerTwoReady(chosenServer.ready[1]);
      setRandomTime(chosenServer.lastRandomTime);
      console.log("randomTime set to ", chosenServer.lastRandomTime);
    } else {
      console.log("db connecting");
    }
  }, [chosenServer.ready]);

  useEffect(() => {
    try {
      if (chosenServer.shotFired[1]) {
        setPlayer2Reaction(chosenServer.lastReactionTime[1]);
      }
    } catch {
      console.log("connecting to DB ... ");
    }
  }, [chosenServer.shotFired]);

  //kun pelaajat valmiita, niin aloita timeri
  useEffect(() => {
    if (playerOneReady === true && playerTwoReady === true) {
      setInfoText("Ready!");
      pistolCock1Play();

      setTimeout(() => {
        setInfoText("Set ...");
        setGun1Loaded(true);
        setShotFired(false);
      }, 1500);

      setTimeout((startTime) => {
        setInfoText("BANG!");
        setOk2Shoot(true);

        setShotFired(false);

        holsterPlay();
        setStartTime(new Date());
      }, randomTime);
    }
  }, [playerTwoReady, playerOneReady]);

  //voiton checkaus
  useEffect(() => {
    if (gun1Loaded && !shotFired) {
      if (player1Reaction < player2Reaction) {
        setInfoText("You won");
        setPlayerAnim("shooting");
        setPlayer2Anim("die");
        pistolShot2Play();
        if (gameCreatorP1) {
          setScore([score[0] + 1, score[1]]);
        }
      } else {
        setInfoText("player 2 wins");
        //ampumis anim 2
        setPlayerAnim("die");
        setPlayer2Anim("shooting");
        pistolShot2Play();
        //kuolemisanim 1
        if (gameCreatorP1) {
          setScore([score[0], score[1] + 1]);
        }
      }
      setGun1Loaded(false);
      //NextRoundReset();
      setShotFired(true);
    }
  }, [player1Reaction, player2Reaction]);

  //SHOOTING
  const actionClick = async () => {
    if (playerOneReady === true && playerTwoReady === true) {
      if (gun1Loaded === true && shotFired === false) {
        if (ok2Shoot === false) {
          //varaslähtö
          ricochetPlay();
          setPlayerAnim("shooting");
          setGun1Loaded(false);
        } else {
          //onnistunut laukaus

          //reaction time
          const pullTriggerTime = new Date();
          const reactTimeConst = pullTriggerTime - startTime;
          console.log("reaction ms : ", reactTimeConst);
          console.log("server : ", chosenServer);

          if (gameCreatorP1) {
            exportShootData = {
              lastReactionTime: [
                reactTimeConst,
                chosenServer.lastReactionTime[1],
              ],
              lastOnline: Date.now(),
              shotFired: [true, chosenServer.shotFired[0]],
            };
          } else {
            exportShootData = {
              lastReactionTime: [
                chosenServer.lastReactionTime[0],
                reactTimeConst,
              ],
              lastOnline: Date.now(),
              shotFired: [chosenServer.shotFired[1], true],
            };
          }

          //your connected server ID
          const server = gameList.filter((game) => {
            if (game.servName === joinedServer) {
              return game.id;
            } else {
              return null;
            }
          });

          //update your reactiontime to DB
          console.log("exporting data to DB", exportShootData);
          await gameServersRef.doc(server[0].id).update(exportShootData);

          setPlayer1Reaction(reactTimeConst);
          console.log("p1 reaction : ", reactTimeConst);
          setOk2Shoot(false);
          setShotFired(true);
        }
      }
    }
  };

  return (
    <div className="textSplashFrame" onClick={actionClick}>
      <label className="playerLocalReadyLabel" htmlFor="p1">
        <span className="localPlayerText">
          You{gameCreatorP1 ? " Creator" : " Joined"}{" "}
          {serverLoaded ? chosenServer.score[0] : "0"}
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
        {serverLoaded ? chosenServer.score[1] : "0"} Enemy
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
