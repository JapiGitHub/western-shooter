import React from "react";
import Cactus from "./Cactus";

import HeroSelectorAI from "./HeroSelectorAI";
import GameMulti from "./GameMulti";

export default function MultiPlayerMode({
  setGameMode,
  gameMode,
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
          gameMode={gameMode}
          setPlayerAnim={setPlayerAnim}
          setPlayer2Anim={setPlayer2Anim}
          firestore={firestore}
          joinedServer={joinedServer}
          setGameCreatorP1={setGameCreatorP1}
          gameCreatorP1={gameCreatorP1}
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
