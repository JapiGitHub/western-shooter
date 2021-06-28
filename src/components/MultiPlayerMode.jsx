import React, { useState } from "react";
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
}) {
  const [playerAnim, setPlayerAnim] = useState("waiting");
  const [player2Anim, setPlayer2Anim] = useState("waiting");
  const [player2Hero, setPlayer2Hero] = useState("cowboy");
  const [player1Hero, setPlayer1Hero] = useState("sheriff");

  const gameServersRef = firestore.collection("gameServers");
  const [gameList] = useCollectionData(gameServersRef, { idField: "id" });

  const backToMenu = () => {
    const server = gameList.filter((game) => {
      if (game.servName === joinedServer) {
        return game.id;
      }
    });

    //toi [0] pitää olla tuolla
    console.log("id: ", server[0].servName);
    console.log("ready : ", server[0].ready);

    console.log(gameServersRef);
  };

  const backToMenu2 = () => {
    setGameMode("menu");
    setGameCreatorP1(false);
  };

  return (
    <>
      <main className="background-world-arena">
        <section className="ground"></section>
        <img className="horizon" src="./assets/horizon.gif" alt="horizon"></img>
        <button onClick={backToMenu} className="menuButton">
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
        />
        <PlayerChars
          playerAnim={playerAnim}
          player2Anim={player2Anim}
          player2Hero={player2Hero}
          player1Hero={player1Hero}
        />
        <HeroSelectorAI setPlayer1Hero={setPlayer1Hero} />

        <Cactus />
      </main>
    </>
  );
}
