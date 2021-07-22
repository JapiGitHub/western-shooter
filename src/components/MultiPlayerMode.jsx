import React, { useState, useEffect } from "react";
import PlayerChars from "./PlayerChars";
import Cactus from "./Cactus";
import { useCollectionData } from "react-firebase-hooks/firestore";

import HeroSelectorAI from "./HeroSelectorAI";
import GameMulti from "./GameMulti";

export default function MultiPlayerMode({
  setGameMode,
  firestore,
  joinedServer,
  setGameCreatorP1,
  gameCreatorP1,
  setScreenSlide,
  screenSlide,
  playerAnim,
  setPlayerAnim,
  player2Anim,
  setPlayer2Anim,
  player2Hero,
  setPlayer2Hero,
  player1Hero,
  setPlayer1Hero,
  difficulty,
}) {
  //const [player2Hero, setPlayer2Hero] = useState("cowboy");
  //const [player1Hero, setPlayer1Hero] = useState("sheriff");

  const gameServersRef = firestore.collection("gameServers");
  const [gameList] = useCollectionData(gameServersRef, { idField: "id" });

  const [serversSnapshot, setServersSnapshot] = useState([]);
  const [yourServer, setYourServer] = useState([]);

  useEffect(() => {
    gameServersRef.onSnapshot((snapshot) =>
      setServersSnapshot(snapshot.docs.map((doc) => doc.data()))
    );

    // DEBUG yourServeriä ei ees käytetä enää missään
    gameServersRef.onSnapshot((snapshot) =>
      snapshot.docs.map((doc) => {
        if (doc.data().servName === joinedServer) {
          setYourServer(doc.data());
          //DEBUG turha ilman "const ="
          return doc.data();
        } else {
          return null;
        }
      })
    );
  }, []);

  const backToMenu = () => {
    setGameMode("menu");
    setGameCreatorP1(false);
    setScreenSlide("menu");
  };

  return (
    <>
      <main className="background-world-arena">
        <section className="ground"></section>
        <button onClick={backToMenu} className="btn menuButton">
          Menu
        </button>
        <section className="serverInfo">{joinedServer}</section>

        <GameMulti
          setPlayerAnim={setPlayerAnim}
          setPlayer2Anim={setPlayer2Anim}
          firestore={firestore}
          joinedServer={joinedServer}
          setGameCreatorP1={setGameCreatorP1}
          gameCreatorP1={gameCreatorP1}
          yourServer={yourServer}
          setYourServer={setYourServer}
          difficulty={difficulty}
          player2Hero={player2Hero}
          setPlayer2Hero={setPlayer2Hero}
          player1Hero={player1Hero}
          setPlayer1Hero={setPlayer1Hero}
        />

        <HeroSelectorAI setPlayer1Hero={setPlayer1Hero} />

        <Cactus />
      </main>
    </>
  );
}
