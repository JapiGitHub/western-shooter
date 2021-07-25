import React, { useEffect, useRef, useState } from "react";
import loggi from "./loggi";
import { useCollectionData } from "react-firebase-hooks/firestore";

import useSound from "use-sound";
import pistolShot2 from "../sounds/pistol.shot.2.mp3";
import pistolCock1 from "../sounds/cock.pistol.1.mp3";
import holster from "../sounds/holster.mp3";
import ricochet from "../sounds/ricochet.mp3";
import fatalityVoice from "../sounds/fatality.mp3";

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
  difficulty,
  player2Hero,
  setPlayer2Hero,
  player1Hero,
  setPlayer1Hero,
}) {
  const [playerOneReady, setPlayerOneReady] = useState(false);
  const [playerTwoReady, setPlayerTwoReady] = useState(false);
  const [gun1Loaded, setGun1Loaded] = useState(false);
  const [player1Reaction, setPlayer1Reaction] = useState(88888);
  const [player2Reaction, setPlayer2Reaction] = useState(88888);
  const [score, setScore] = useState([0, 0]);
  const [shotFired, setShotFired] = useState(false);

  //reffi setTimeOuttia varten jotta saadaan päivitetty arvo
  const shotFiredCreatorRef = useRef(false);
  const shotFiredJoinedRef = useRef(false);

  const [localOneClick, setLocalOneClick] = useState(true);
  const [bothPlayersVarasLahto, setBothPlayersVarasLahto] = useState(false);

  const [fatality, setFatality] = useState(false);

  const [infoText, setInfoText] = useState("Ready?");

  const [startTime, setStartTime] = useState(888);
  const [randomTime, setRandomTime] = useState(0);
  const [ok2Shoot, setOk2Shoot] = useState(false);

  //äänet
  const [pistolShot2Play] = useSound(pistolShot2);
  const [pistolCock1Play] = useSound(pistolCock1);
  const [holsterPlay] = useSound(holster);
  const [ricochetPlay] = useSound(ricochet);
  const [fatalityVoicePlay] = useSound(fatalityVoice);

  const playerTwoReadyCheckBox = useRef();
  const playerOneReadyCheckBox = useRef();

  //firebase
  const gameServersRef = firestore.collection("gameServers");
  const [gameList] = useCollectionData(gameServersRef, { idField: "id" });
  const [chosenServer, setChosenServer] = useState([]);
  let exportReadyData = { ready: [false, false], lastOnline: 0 };
  let exportShootData = {};
  let exportHeroData = {};
  const [serverLoaded, setServerLoaded] = useState(false);

  useEffect(async () => {
    setPlayer2Anim("waiting");
    setPlayerAnim("waiting");

    //jotta herot alkaa samoista kummallakin
    if (!gameCreatorP1) {
      setPlayer1Hero("sheriff");
      setPlayer2Hero("cowboy");
    }

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

  //kun DB ladannut, niin päivitä herot
  useEffect(() => {
    if (gameCreatorP1) {
      setPlayer1Hero(chosenServer.heroCreator);
      setPlayer2Hero(chosenServer.heroJoined);
      shotFiredCreatorRef.current = chosenServer.shotFiredCreator;
      shotFiredJoinedRef.current = chosenServer.shotFiredJoined;
    } else {
      setPlayer2Hero(chosenServer.heroCreator);
      setPlayer1Hero(chosenServer.heroJoined);
    }
  }, [serverLoaded]);

  //hero changes to DB
  useEffect(async () => {
    //your connected server ID
    if (serverLoaded) {
      const server = gameList.filter((game) => {
        if (game.servName === joinedServer) {
          return game.id;
        } else {
          return null;
        }
      });

      //data for hero
      if (gameCreatorP1) {
        exportHeroData = {
          heroCreator: player1Hero,
          lastOnline: Date.now(),
        };
      } else {
        exportHeroData = {
          heroJoined: player1Hero,
          lastOnline: Date.now(),
        };
      }
      //update hero to database
      await gameServersRef.doc(server[0].id).update(exportHeroData);
    }
  }, [player1Hero, player2Hero]);
  //hero changes from DB:
  useEffect(() => {
    if (serverLoaded) {
      if (gameCreatorP1) {
        setPlayer1Hero(chosenServer.heroCreator);
        setPlayer2Hero(chosenServer.heroJoined);
      } else {
        setPlayer1Hero(chosenServer.heroJoined);
        setPlayer2Hero(chosenServer.heroCreator);
      }
    }
  }, [chosenServer.heroCreator, chosenServer.heroJoined]);

  //next round reset
  useEffect(() => {
    loggi("trying round reset");
    if (serverLoaded) {
      loggi("score nyt ", score);
      if (chosenServer.shotFiredCreator && chosenServer.shotFiredJoined) {
        loggi("next round reset");
        setTimeout(async () => {
          const server = gameList.filter((game) => {
            if (game.servName === joinedServer) {
              return game.id;
            } else {
              return null;
            }
          });

          //vain game creator päivittää round resetin
          if (gameCreatorP1) {
            loggi("score menossa DBhen ", score);
            exportReadyData = {
              ready: [false, false],
              //shotFired: [false, false],
              lastOnline: Date.now(),
              lastRandomTime: 3500 + Math.floor(Math.random() * 6000),
              score: score,
              lastReactionTimeCreator: 88888,
              lastReactionTimeJoined: 88888,
              tooEarlyRicochetCreator: false,
              tooEarlyRicochetJoined: false,
            };
            await gameServersRef.doc(server[0].id).update(exportReadyData);
          }
          bothPlayersVarasLahto
            ? setInfoText("Double Fail!")
            : setInfoText("Again?");
          setBothPlayersVarasLahto(false);
          setGun1Loaded(true);
          setPlayerOneReady(false);
          setPlayerTwoReady(false);
          setPlayer2Anim("waiting");
          setPlayerAnim("waiting");
          setLocalOneClick(true);
          //setP1ReactText();
          //setReactTextFade(false);

          setFatality(false);
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
  }, [score, bothPlayersVarasLahto]);

  //readyClick
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
        shotFiredCreator: false,
        shotFiredJoined: false,
        lastOnline: Date.now(),
      };
    } else {
      exportReadyData = {
        ready: [chosenServer.ready[0], true],
        shotFiredCreator: false,
        shotFiredJoined: false,
        lastOnline: Date.now(),
      };
    }

    //update READY to database
    await gameServersRef.doc(server[0].id).update(exportReadyData);
  };

  //update READY and RANDTime states from DB
  useEffect(() => {
    if (serverLoaded) {
      if (gameCreatorP1) {
        setPlayerOneReady(chosenServer.ready[0]);
        setPlayerTwoReady(chosenServer.ready[1]);
      } else {
        setPlayerOneReady(chosenServer.ready[1]);
        setPlayerTwoReady(chosenServer.ready[0]);
      }

      setRandomTime(chosenServer.lastRandomTime);
      loggi("randomTime set to ", chosenServer.lastRandomTime, ". from DB");
    } else {
      loggi("db connecting .. updating ready&randTime");
    }
  }, [chosenServer.ready]);

  //kun pelaajat valmiita,  aloita timeri
  useEffect(() => {
    if (playerOneReady && playerTwoReady) {
      setInfoText("Ready!");
      pistolCock1Play();

      setTimeout(() => {
        setInfoText("Set ...");
        setGun1Loaded(true);
        setShotFired(false);
      }, 1500);

      setTimeout((startTime) => {
        bothPlayersVarasLahto
          ? setInfoText("Double Fail")
          : setInfoText("BANG!");
        setOk2Shoot(true);

        holsterPlay();
        setStartTime(new Date());
      }, randomTime);

      //tarkista jos toisen tulos on tullut jo, niin voit julistaa sen voittajaksi suorilta
      setTimeout(async () => {
        //REFfiä käytetään jotta saadaan päivittynyt arvo setTimeOutin sulkujen sisään linkattua. statella se olis se vanha timerin alussa oleva arvo
        if (gameCreatorP1) {
          if (shotFiredJoinedRef.current && !shotFiredCreatorRef.current) {
            loggi("joined oli nopeampi kuin 500ms");
            //set reactiontime to ricochet-default eli 88887
            exportShootData = {
              lastReactionTimeCreator: 80000,
              lastOnline: Date.now(),
              shotFiredCreator: true,
            };
          }
        } else {
          console.log(
            "shotFiredJoinedRef",
            shotFiredJoinedRef.current,
            "   shotFiredCreatorRef",
            shotFiredCreatorRef.current
          );
          if (!shotFiredJoinedRef.current && shotFiredCreatorRef.current) {
            loggi("creator oli nopeampi kuin 500ms");
            exportShootData = {
              lastReactionTimeJoined: 80000,
              lastOnline: Date.now(),
              shotFiredJoined: true,
            };
          }
        }

        //your connected server ID
        const server = gameList.filter((game) => {
          if (game.servName === joinedServer) {
            return game.id;
          } else {
            return null;
          }
        });
        //update to DB
        await gameServersRef.doc(server[0].id).update(exportShootData);
      }, randomTime + 1000);
    }
  }, [playerTwoReady, playerOneReady]);

  //SHOOTING
  const actionClick = async () => {
    loggi("actionclick-1/3");
    if (playerOneReady && playerTwoReady && localOneClick) {
      loggi("actionclick-2/3");
      setLocalOneClick(false);

      if (gun1Loaded === true && shotFired === false) {
        loggi("actionclick-3/3");

        if (ok2Shoot === false) {
          loggi("varaslähtö");

          //varaslähtö
          ricochetPlay();
          setPlayerAnim("shooting");
          setGun1Loaded(false);

          //set reactiontime to ricochet-default eli 88887
          if (gameCreatorP1) {
            exportShootData = {
              lastReactionTimeCreator: 88887,
              lastOnline: Date.now(),
              shotFiredCreator: true,
              tooEarlyRicochetCreator: true,
            };
          } else {
            exportShootData = {
              lastReactionTimeJoined: 88887,
              lastOnline: Date.now(),
              shotFiredJoined: true,
              tooEarlyRicochetJoined: true,
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
          await gameServersRef.doc(server[0].id).update(exportShootData);
        } else {
          //onnistunut laukaus
          loggi("onnistunut laukaus");

          //reaction time
          const pullTriggerTime = new Date();
          const reactTimeConst = pullTriggerTime - startTime;
          loggi("reaction ms : ", reactTimeConst);
          loggi("server : ", chosenServer);
          setInfoText("waiting for other");

          if (gameCreatorP1) {
            exportShootData = {
              lastReactionTimeCreator: reactTimeConst,

              lastOnline: Date.now(),
              shotFiredCreator: true,
            };
          } else {
            exportShootData = {
              lastReactionTimeJoined: reactTimeConst,
              lastOnline: Date.now(),
              shotFiredJoined: true,
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
          loggi("exporting data to DB", exportShootData);
          await gameServersRef.doc(server[0].id).update(exportShootData);

          setPlayer1Reaction(reactTimeConst);
          loggi("p1 reaction : ", reactTimeConst);
          setOk2Shoot(false);

          //tätä ei tule varaslähdössä. siinä tulee vaan gunLoaded(false)
          setShotFired(true);
        }
      }
    }
  };

  //DEBUG tarviiko tätä enää?
  //päivitä locaaliinstateen creatorin enemyn reactioaika
  useEffect(() => {
    if (serverLoaded) {
      if (
        chosenServer.lastReactionTimeCreator !== 88888 &&
        chosenServer.lastReactionTimeJoined !== 88888
      ) {
        if (gameCreatorP1) {
          setPlayer2Reaction(chosenServer.lastReactionTimeJoined);
        } else {
          setPlayer2Reaction(chosenServer.lastReactionTimeCreator);
        }

        loggi("LOCAL you  reaction:", player1Reaction);
        loggi("LOCAL enem reaction:", player2Reaction);

        loggi("NET crea  reaction:", chosenServer.lastReactionTimeCreator);
        loggi("NET join  reaction:", chosenServer.lastReactionTimeJoined);
      }
    } else {
      loggi("connecting to DB ... updating reactiontimes");
    }
  }, [chosenServer.shotFired]);

  //varaslähdön checkaus toiselta pelaajalta DBn kautta:
  useEffect(() => {
    if (serverLoaded) {
      //check enemyn varaslähtö
      if (gameCreatorP1) {
        if (
          chosenServer.tooEarlyRicochetJoined &&
          chosenServer.shotFiredJoined
        ) {
          ricochetPlay();
          setPlayer2Anim("shooting");
        }
      } else {
        if (
          chosenServer.tooEarlyRicochetCreator &&
          chosenServer.shotFiredCreator
        ) {
          ricochetPlay();
          setPlayer2Anim("shooting");
        }
      }

      //kummankin varaslähtö:
      if (
        chosenServer.tooEarlyRicochetCreator &&
        chosenServer.tooEarlyRicochetJoined
      ) {
        loggi("kumpikin teki varaslähdön!");
        setBothPlayersVarasLahto(true);
      }
    }
  }, [
    chosenServer.tooEarlyRicochetCreator,
    chosenServer.tooEarlyRicochetJoined,
  ]);

  //voiton checkaus
  useEffect(async () => {
    loggi("win check 1");
    shotFiredCreatorRef.current = chosenServer.shotFiredCreator;
    shotFiredJoinedRef.current = chosenServer.shotFiredJoined;

    //joined ei pääse enää tänne jos se on ampunu ekana ja creatorinlla ollu sillon vielä 88888
    if (
      serverLoaded &&
      chosenServer.shotFiredCreator &&
      chosenServer.shotFiredJoined
    ) {
      loggi("win check 2");
      if (
        chosenServer.lastReactionTimeCreator < 88888 &&
        chosenServer.lastReactionTimeJoined < 88888 &&
        !bothPlayersVarasLahto
      ) {
        loggi("win check 3 kumpikin ampunut");
        pistolShot2Play();
        if (
          chosenServer.lastReactionTimeCreator <
          chosenServer.lastReactionTimeJoined
        ) {
          // [0]faster
          if (gameCreatorP1) {
            setInfoText("you/Creator won");
            setPlayerAnim("shooting");
            setPlayer2Anim("die");
            setScore([score[0] + 1, score[1]]);
          } else {
            setInfoText("You lost");
            setPlayer2Anim("shooting");
            setPlayerAnim("die");
            //jos et ole creator, niin sulla päivittyy vain locaalisti score, jotta menee oikeinpäin ruudulla
            setScore([score[0], score[1] + 1]);
          }

          // [1]faster
        } else {
          if (gameCreatorP1) {
            setInfoText("You lost");
            setPlayerAnim("die");
            setPlayer2Anim("shooting");
            setScore([score[0], score[1] + 1]);
          } else {
            setInfoText("You/joined won");
            setPlayer2Anim("die");
            setPlayerAnim("shooting");
            //jos et ole creator, niin sulla päivittyy vain locaalisti score, jotta menee oikeinpäin ruudulla
            setScore([score[0] + 1, score[1]]);
          }
        }

        //fatality check
        if (
          chosenServer.lastReactionTimeCreator <
            chosenServer.FatalityDifficulty ||
          chosenServer.lastReactionTimeJoined < chosenServer.FatalityDifficulty
        ) {
          setFatality(true);
          setInfoText("Fatality!");
          fatalityVoicePlay();
          if (gameCreatorP1) {
            chosenServer.lastReactionTimeCreator <
            chosenServer.lastReactionTimeJoined
              ? setPlayer2Anim("fatality")
              : setPlayerAnim("fatality");
          } else {
            chosenServer.lastReactionTimeCreator <
            chosenServer.lastReactionTimeJoined
              ? setPlayerAnim("fatality")
              : setPlayer2Anim("fatality");
          }
        }

        setGun1Loaded(false);
        //NextRoundReset(); menee useEffectillä nykyään
        setShotFired(true);
      } else {
        loggi("odottaa toista ampua");
      }
    }
  }, [
    chosenServer.lastReactionTimeJoined,
    chosenServer.lastReactionTimeCreator,
    chosenServer.shotFiredCreator,
    chosenServer.shotFiredJoined,
  ]);

  return (
    <div className="textSplashFrame" onClick={actionClick}>
      <label className="playerLocalReadyLabel" htmlFor="p1">
        <span className="localPlayerText">
          You{gameCreatorP1 ? " Creator" : " Joined"} {score[0]}
        </span>
        <input
          className="readyCheckBox p1check"
          type="checkbox"
          checked={serverLoaded ? playerOneReady : false}
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
        {score[1]} Enemy
        <input
          className="readyCheckBox p2check"
          type="checkbox"
          checked={serverLoaded ? playerTwoReady : false}
          ref={playerTwoReadyCheckBox}
          onClick={playerOneReadyClick}
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
