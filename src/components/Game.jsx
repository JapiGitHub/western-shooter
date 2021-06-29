import React, { useState } from "react";
import Menu from "./Menu";
import LocalSplitScreenMode from "./LocalSplitScreenMode";
import LocalAiMode from "./LocalAiMode";
import TouchSplitMode from "./TouchSplitMode";
import Cactus from "./Cactus";
import PlayerChars from "./PlayerChars";
import MultiPlayer from "./MultiPlayer";

export default function Game({ gameMode, setGameMode, firestore }) {
  const [showMenu, setShowMenu] = useState(true);
  const [screenSlide, setScreenSlide] = useState("menu");
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);

  const [difficulty, setDifficulty] = useState(240);

  const [theme, setTheme] = useState("normal");

  const [playerAnim, setPlayerAnim] = useState("waiting");
  const [player2Anim, setPlayer2Anim] = useState("waiting");
  const [player2Hero, setPlayer2Hero] = useState("sheriff");
  const [player1Hero, setPlayer1Hero] = useState("cowboy");

  return (
    <div className={theme === "normal" ? "screen" : "screen themeSepia"}>
      <aside className="sky"></aside>
      <img
        alt="horizon"
        src="./assets/horizon.wide.gif"
        className={(() => {
          switch (screenSlide) {
            case "menu":
              return "menuHorizon";
            case "game":
              return "menuHorizon menuSlide";
            case "leaderboard":
              return "menuHorizon menuSlide";
            default:
              return "menuHorizon";
          }
        })()}
      ></img>
      <img src="./assets/cloud1.gif" alt="cloud" className="cloud cloud1"></img>
      <img src="./assets/cloud2.gif" alt="cloud" className="cloud cloud2"></img>
      <img src="./assets/cloud3.gif" alt="cloud" className="cloud cloud3"></img>
      <img src="./assets/cloud3.gif" alt="cloud" className="cloud cloud4"></img>

      {gameMode === "menu" ? (
        <Menu
          gameMode={gameMode}
          setGameMode={setGameMode}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          setTheme={setTheme}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          setScreenSlide={setScreenSlide}
        />
      ) : null}

      {gameMode === "split" ? (
        <LocalSplitScreenMode
          setGameMode={setGameMode}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          difficulty={difficulty}
          firestore={firestore}
          setScreenSlide={setScreenSlide}
          screenSlide={screenSlide}
          playerAnim={playerAnim}
          setPlayerAnim={setPlayerAnim}
          player2Anim={player2Anim}
          setPlayer2Anim={setPlayer2Anim}
          player2Hero={player2Hero}
          setPlayer2Hero={setPlayer2Hero}
          player1Hero={player1Hero}
          setPlayer1Hero={setPlayer1Hero}
          showLeaderBoard={showLeaderBoard}
          setShowLeaderBoard={setShowLeaderBoard}
        />
      ) : null}

      {gameMode === "touch" ? (
        <TouchSplitMode
          setGameMode={setGameMode}
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          difficulty={difficulty}
          firestore={firestore}
          setScreenSlide={setScreenSlide}
          screenSlide={screenSlide}
        />
      ) : null}

      {gameMode === "ai" ? (
        <LocalAiMode
          setGameMode={setGameMode}
          setShowMenu={setShowMenu}
          difficulty={difficulty}
          setScreenSlide={setScreenSlide}
          setPlayerAnim={setPlayerAnim}
          setPlayer2Anim={setPlayer2Anim}
          player1Hero={player1Hero}
          setPlayer1Hero={setPlayer1Hero}
        />
      ) : null}

      {gameMode === "network" ? (
        <MultiPlayer setGameMode={setGameMode} firestore={firestore} />
      ) : null}
      <Cactus gameMode={gameMode} screenSlide={screenSlide} />
      <img
        alt="cow"
        className={gameMode !== "menu" ? "cow hideCow" : "cow"}
        src="./assets/cow.gif"
      ></img>
      <PlayerChars
        playerAnim={playerAnim}
        player2Anim={player2Anim}
        player2Hero={player2Hero}
        player1Hero={player1Hero}
        showMenu={showMenu}
        screenSlide={screenSlide}
        setScreenSlide={setScreenSlide}
      />
    </div>
  );
}
