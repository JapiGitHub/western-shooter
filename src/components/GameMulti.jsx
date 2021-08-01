import React, { useEffect, useRef, useState } from "react";
import loggi from "./loggi";
import { useCollectionData } from "react-firebase-hooks/firestore";

import LeaderBoard from "./LeaderBoard";
import LeaderBoardInput from "./LeaderBoardInput";

import useSound from "use-sound";
import pistolShot2 from "../sounds/pistol.shot.2.mp3";
import pistolCock1 from "../sounds/cock.pistol.1.mp3";
import holster from "../sounds/holster.mp3";
import ricochet from "../sounds/ricochet.mp3";
import fatalityVoice from "../sounds/fatality.mp3";

import "./gameMulti.scss";

export default function GameMulti({
  gameMode,
  setPlayerAnim,
  setPlayer2Anim,
  firestore,
  joinedServer,
  setGameCreatorP1,
  gameCreatorP1,
  difficulty,
  player2Hero,
  setPlayer2Hero,
  player1Hero,
  setPlayer1Hero,
  setScreenSlide,
  screenSlide,
  showLeaderBoard,
  setShowLeaderBoard,
}) {
  //Warning: You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.
  //= tää johtuu tosta "click to ready" palikan toiminnasta, mutta se toimii ihan oikein ja jos muuttais noin ku se ehdottaa, ni ei toimis enää kunnolla. no problem.

  const [playerOneReady, setPlayerOneReady] = useState(false);
  const [playerTwoReady, setPlayerTwoReady] = useState(false);
  const [gun1Loaded, setGun1Loaded] = useState(false);
  //const [player1Reaction, setPlayer1Reaction] = useState(88888);
  //const [player2Reaction, setPlayer2Reaction] = useState(88888);
  const [score, setScore] = useState([0, 0]);
  const [shotFired, setShotFired] = useState(false);

  //reffi setTimeOuttia varten jotta saadaan päivitetty arvo, muuten setTimeout ottais sen ajastimen startissa olevan arvon eikä realtimea
  const shotFiredCreatorRef = useRef(false);
  const shotFiredJoinedRef = useRef(false);

  const [localOneClick, setLocalOneClick] = useState(true);
  const [bothPlayersVarasLahto, setBothPlayersVarasLahto] = useState(false);

  //päitten ylle reactio ajan nousu
  const [p1ReactText, setP1ReactText] = useState("");
  const [p2ReactText, setP2ReactText] = useState("");
  const [reactTextFade, setReactTextFade] = useState(false);

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

  //FIREBASE FIRESTORE DB
  //gameServers / network multiplayer
  const gameServersRef = firestore.collection("gameServers");
  const [gameList] = useCollectionData(gameServersRef, { idField: "id" });
  const [chosenServer, setChosenServer] = useState([]);

  const [serverLoaded, setServerLoaded] = useState(false);

  //leaderborad
  const [showLeaderBoardInput, setShowLeaderBoardInput] = useState(true);
  const [ldbTime, setLdbTime] = useState(888);
  const [winner, setWinner] = useState(0);

  const leaderBoardRef = firestore.collection("leaderBoard");
  const sortedLeaderBoard = leaderBoardRef.orderBy("time");
  const [leaderBoard] = useCollectionData(sortedLeaderBoard, {
    idField: "id",
  });

  const checkLeaderBoardTimes = (leaderBoardTime) => {
    //vertaa vain tohon 15. aikaan jotta record history näkyy databasessa.
    if (leaderBoardTime < leaderBoard[14].time) {
      setLdbTime(leaderBoardTime);
      setShowLeaderBoardInput(true);
      setScreenSlide("leaderboardMulti");
    }
  };

  useEffect(() => {
    if (showLeaderBoard) {
      setScreenSlide("leaderboardMulti");
    } else {
      setScreenSlide("multiplayer");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLeaderBoard]);

  //shoot, ready, ricochet, otherPlrFaster data to gameServers DB
  const sendToDB = async (data) => {
    //your connected server ID
    try {
      const server = gameList.filter((game) => {
        if (game.serverId === joinedServer) {
          return game.id;
        } else {
          return null;
        }
      });

      //tää menee vielä vanhan autoIDn kautta, mutta eipä sen väliä ku se toimii. Mikään ei kuitenkaan mene enää servNamen kautta jolloin ois voinu tulla ongelmia
      //chosenServer.update ei onnistu suoraan ku se on snapshot taas siinä. tuntuu, että kaikista fiksuin on vaa tehdä tän autoIDn kautta tää update()
      await gameServersRef.doc(server[0].id).update(data);
    } catch (err) {
      console.log(
        "connection to DB not ready yet (propably connection is OK after this): ",
        err
      );
    }
  };

  //alkusäädöt
  useEffect(() => {
    setPlayer2Anim("waiting");
    setPlayerAnim("waiting");
    setShowLeaderBoard(false);
    setShowLeaderBoardInput(false);

    //jotta herot alkaa samoista kummallakin
    if (!gameCreatorP1) {
      setPlayer1Hero("sheriff");
      setPlayer2Hero("cowboy");
    }

    const alkuSaadot = async () => {
      await gameServersRef.onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          if (doc.data().serverId === joinedServer) {
            setChosenServer(doc.data());
            setServerLoaded(true);
            return doc.data();
          } else {
            return null;
          }
        })
      );
    };
    // asynccina tässä, ku useEffectiä ei kannata laittaa asynciksi (race conditions)
    alkuSaadot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //kun DB ladannut, niin päivitä herot
  useEffect(() => {
    if (gameCreatorP1) {
      setPlayer1Hero(chosenServer.heroCreator);
      setPlayer2Hero(chosenServer.heroJoined);
      shotFiredCreatorRef.current = chosenServer.shotFiredCreator;
      shotFiredJoinedRef.current = chosenServer.shotFiredJoined;
    } else {
      //joined
      setPlayer2Hero(chosenServer.heroCreator);
      setPlayer1Hero(chosenServer.heroJoined);

      const exportOnlineData = {
        onlineJoined: true,
      };
      sendToDB(exportOnlineData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverLoaded]);

  //server full/open
  useEffect(() => {
    if (gameCreatorP1) {
      if (chosenServer.onlineCreator && chosenServer.onlineJoined) {
        const exportOnlineData = {
          open: false,
        };
        sendToDB(exportOnlineData);
      } else {
        const exportOnlineData = {
          open: true,
        };
        sendToDB(exportOnlineData);
      }

      //jos creator lähtee, niin sulje serveri
      if (gameMode !== "network") {
        const exportOnlineData = {
          open: false,
          lastOnline: chosenServer.lastOnline - 555000,
        };
        sendToDB(exportOnlineData);
      }
    } else {
      //jos joined lähtee pois pelistä, niin tee taas open. tää ei itseasiassa ehdi tulla ku tää componentti tuhoutuu ennenku toi ajaa...
      if (gameMode !== "network") {
        const exportOnlineData = {
          open: true,
          onlineJoined: false,
        };
        sendToDB(exportOnlineData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenServer.onlineCreator, chosenServer.onlineJoined, gameMode]);

  //hero changes to DB
  useEffect(() => {
    //your connected server ID
    if (serverLoaded) {
      //data for hero
      if (gameCreatorP1) {
        const exportHeroData = {
          heroCreator: player1Hero,
          lastOnline: Date.now(),
        };
        sendToDB(exportHeroData);
      } else {
        const exportHeroData = {
          heroJoined: player1Hero,
          lastOnline: Date.now(),
        };
        sendToDB(exportHeroData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenServer.heroCreator, chosenServer.heroJoined]);

  //NEXT ROUND RESET
  useEffect(() => {
    if (serverLoaded) {
      if (chosenServer.shotFiredCreator && chosenServer.shotFiredJoined) {
        loggi("next round reset");
        setTimeout(async () => {
          //vain game creator päivittää round resetin
          if (gameCreatorP1) {
            const exportReadyData = {
              readyCreator: false,
              readyJoined: false,
              lastOnline: Date.now(),
              lastRandomTime: 3500 + Math.floor(Math.random() * 6000),
              score: score,
              lastReactionTimeCreator: 88888,
              lastReactionTimeJoined: 88888,
              tooEarlyRicochetCreator: false,
              tooEarlyRicochetJoined: false,
            };
            sendToDB(exportReadyData);
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
          setP1ReactText("");
          setP2ReactText("");
          setReactTextFade(false);

          setFatality(false);
          setOk2Shoot(false);
          setRandomTime(chosenServer.lastRandomTime);
        }, 3000);

        //reactio ajan pään yläpuolella oleva haihtuva teksti
        setTimeout(() => {
          setReactTextFade(true);
        }, 800);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, bothPlayersVarasLahto]);

  //readyClick
  const playerOneReadyClick = async () => {
    setPlayerOneReady(true);
    setRandomTime(chosenServer.lastRandomTime);

    //data for READY?
    if (gameCreatorP1) {
      const exportReadyData = {
        readyCreator: true,
        shotFiredCreator: false,
        shotFiredJoined: false,
        lastOnline: Date.now(),
      };
      sendToDB(exportReadyData);
    } else {
      const exportReadyData = {
        readyJoined: true,
        shotFiredCreator: false,
        shotFiredJoined: false,
        lastOnline: Date.now(),
      };
      sendToDB(exportReadyData);
    }
  };

  //update READY and RANDTime states from DB
  useEffect(() => {
    if (serverLoaded) {
      if (gameCreatorP1) {
        setPlayerOneReady(chosenServer.readyCreator);
        setPlayerTwoReady(chosenServer.readyJoined);
      } else {
        setPlayerOneReady(chosenServer.readyJoined);
        setPlayerTwoReady(chosenServer.readyCreator);
      }
      setRandomTime(chosenServer.lastRandomTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenServer.readyJoined, chosenServer.readyCreator]);

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
            //set reactiontime to ricochet-default eli 88887
            const exportShootData = {
              lastReactionTimeCreator: 80000,
              lastOnline: Date.now(),
              shotFiredCreator: true,
            };
            sendToDB(exportShootData);
          }
        } else {
          if (!shotFiredJoinedRef.current && shotFiredCreatorRef.current) {
            const exportShootData = {
              lastReactionTimeJoined: 80000,
              lastOnline: Date.now(),
              shotFiredJoined: true,
            };
            sendToDB(exportShootData);
          }
        }

        //update to DB
      }, randomTime + 1200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerTwoReady, playerOneReady]);

  //SHOOTING
  const actionClick = async () => {
    if (showLeaderBoard) {
      setShowLeaderBoard(false);
    }
    if (playerOneReady && playerTwoReady && localOneClick) {
      setLocalOneClick(false);

      if (gun1Loaded === true && shotFired === false) {
        //varaslähtö
        if (ok2Shoot === false) {
          loggi("varaslähtö");

          ricochetPlay();
          setPlayerAnim("shooting");
          setGun1Loaded(false);

          //set reactiontime to ricochet-default eli 88887
          if (gameCreatorP1) {
            const exportShootData = {
              lastReactionTimeCreator: 88887,
              lastOnline: Date.now(),
              shotFiredCreator: true,
              tooEarlyRicochetCreator: true,
            };
            sendToDB(exportShootData);
          } else {
            const exportShootData = {
              lastReactionTimeJoined: 88887,
              lastOnline: Date.now(),
              shotFiredJoined: true,
              tooEarlyRicochetJoined: true,
            };
            sendToDB(exportShootData);
          }
        } else {
          //onnistunut laukaus
          loggi("onnistunut laukaus");

          //reaction time
          const pullTriggerTime = new Date();
          const reactTimeConst = pullTriggerTime - startTime;
          loggi("reaction ms : ", reactTimeConst);
          setInfoText("waiting for other");

          if (gameCreatorP1) {
            const exportShootData = {
              lastReactionTimeCreator: reactTimeConst,
              lastOnline: Date.now(),
              shotFiredCreator: true,
            };
            sendToDB(exportShootData);
          } else {
            const exportShootData = {
              lastReactionTimeJoined: reactTimeConst,
              lastOnline: Date.now(),
              shotFiredJoined: true,
            };
            sendToDB(exportShootData);
          }

          loggi("p1 reaction : ", reactTimeConst);
          setOk2Shoot(false);

          //tätä ei tule varaslähdössä. siinä tulee vaan gunLoaded(false)
          setShotFired(true);
        }
      }
    }
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    chosenServer.tooEarlyRicochetCreator,
    chosenServer.tooEarlyRicochetJoined,
  ]);

  //VOITON CHECKAUS
  useEffect(() => {
    shotFiredCreatorRef.current = chosenServer.shotFiredCreator;
    shotFiredJoinedRef.current = chosenServer.shotFiredJoined;

    if (
      serverLoaded &&
      chosenServer.shotFiredCreator &&
      chosenServer.shotFiredJoined
    ) {
      loggi("win check 1");
      if (
        chosenServer.lastReactionTimeCreator < 88888 &&
        chosenServer.lastReactionTimeJoined < 88888 &&
        !bothPlayersVarasLahto
      ) {
        loggi("win check 2 : kumpikin ampunut");
        pistolShot2Play();
        if (
          chosenServer.lastReactionTimeCreator <
          chosenServer.lastReactionTimeJoined
        ) {
          // [0]/creator = faster
          if (gameCreatorP1) {
            setInfoText("you/Creator won");
            setP1ReactText(chosenServer.lastReactionTimeCreator);
            setPlayerAnim("shooting");
            setPlayer2Anim("die");
            setScore([score[0] + 1, score[1]]);

            //leaderboardi
            setWinner(1);
            checkLeaderBoardTimes(chosenServer.lastReactionTimeCreator);
          } else {
            setInfoText("You lost");
            setP2ReactText(chosenServer.lastReactionTimeCreator);
            setPlayer2Anim("shooting");
            setPlayerAnim("die");
            //jos et ole creator, niin sulla päivittyy vain locaalisti score, jotta menee oikeinpäin ruudulla
            setScore([score[0], score[1] + 1]);
          }

          // [1]/joined = faster
        } else {
          if (gameCreatorP1) {
            setInfoText("You lost");
            setP2ReactText(chosenServer.lastReactionTimeJoined);
            setPlayerAnim("die");
            setPlayer2Anim("shooting");
            setScore([score[0], score[1] + 1]);
          } else {
            setInfoText("You/joined won");
            setP1ReactText(chosenServer.lastReactionTimeJoined);
            setPlayer2Anim("die");
            setPlayerAnim("shooting");
            //jos et ole creator, niin sulla päivittyy vain locaalisti score, jotta menee oikeinpäin ruudulla
            setScore([score[0] + 1, score[1]]);

            //leaderboard
            setWinner(2);
            checkLeaderBoardTimes(chosenServer.lastReactionTimeJoined);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    chosenServer.lastReactionTimeJoined,
    chosenServer.lastReactionTimeCreator,
    chosenServer.shotFiredCreator,
    chosenServer.shotFiredJoined,
  ]);

  return (
    <div className="textSplashFrameMulti" onClick={actionClick}>
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

      <div
        className={
          reactTextFade
            ? "reactionP2TextFloater hideTime"
            : "reactionP2TextFloater"
        }
      >
        <div className={fatality ? "fatality" : "reactP2TimeText"}>
          {p2ReactText}
        </div>
      </div>

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
          {playerTwoReady ? "Ready!" : ""}
        </span>
      </label>

      <div
        className={
          reactTextFade
            ? "reactionP1TextFloater hideTime"
            : "reactionP1TextFloater"
        }
      >
        <div className={fatality ? "fatality" : "reactP1TimeText"}>
          {p1ReactText}
        </div>
      </div>

      <div className="infoText">{infoText}</div>

      <section className="serverInfo">{chosenServer.servName}</section>

      <LeaderBoard
        firestore={firestore}
        showLeaderBoard={showLeaderBoard}
        setShowLeaderBoard={setShowLeaderBoard}
        gameMode={gameMode}
      />

      <LeaderBoardInput
        firestore={firestore}
        player1Hero={player1Hero}
        player2Hero={player2Hero}
        winner={winner}
        ldbTime={ldbTime}
        setShowLeaderBoardInput={setShowLeaderBoardInput}
        showLeaderBoardInput={showLeaderBoardInput}
      />

      <button
        className="btn ldbButton"
        onClick={() => {
          setShowLeaderBoard(true);
          setScreenSlide("leaderboardMulti");
        }}
      >
        Leaderboard
      </button>
    </div>
  );
}
