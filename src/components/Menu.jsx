import React, { useEffect, useState } from "react";
import Settings from "./Settings";

import "./menu.scss";
import useSound from "use-sound";
import MenuMusicLoboGlueWorm from "../sounds/LoboLocoGlueworm.mp3";
import SwooshFromLeft from "../sounds/swoosh.left.mp3";
import SwooshFromRight from "../sounds/swoosh.right.mp3";

export default function Menu({
  gameMode,
  setGameMode,
  showMenu,
  setShowMenu,
  setTheme,
  theme,
  difficulty,
  setDifficulty,
  setScreenSlide,
}) {
  /*   const [playerAvatar, setPlayerAvatar] = useState(
    user ? auth.currentUser.photoURL : null
  ); */

  const [song] = useState(MenuMusicLoboGlueWorm);
  const [play, { stop }] = useSound(song);
  const [menuMusic, setMenuMusic] = useState(false);
  const [SwooshFromLeftPlay] = useSound(SwooshFromLeft);
  const [SwooshFromRightPlay] = useSound(SwooshFromRight);

  const [showSettings, setShowSettings] = useState(false);

  //The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page
  //eli jos teet esim splash startin ja käyttäjän pitää klikata sitä ekana, että pääsee menuun, niin sit toimii
  useEffect(() => {
    if (menuMusic) {
      play();
    } else {
      stop();
    }
  }, [menuMusic]);

  const modeKvM = (e) => {
    e.preventDefault();
    stop();
    setGameMode("split");
    setShowMenu(false);
    setScreenSlide("game");
    SwooshFromRightPlay();
  };

  const modeAI = (e) => {
    e.preventDefault();
    stop();
    setGameMode("ai");
    setShowMenu(false);
    setScreenSlide("game");
    SwooshFromRightPlay();
  };

  const modeNetwork = () => {
    stop();
    setGameMode("network");
    setShowMenu(false);
    setScreenSlide("lobby");
    SwooshFromLeftPlay();
  };

  const modeTouch = () => {
    stop();
    setGameMode("touch");
    setShowMenu(false);
    setScreenSlide("game");
    SwooshFromRightPlay();
  };

  return (
    <div className={showMenu ? "menuContainer" : "menuContainer hideMenu"}>
      <aside className="dirt"></aside>
      <p className="title">Shoot first&nbsp;&nbsp;&&nbsp;&nbsp;Die last</p>
      <section className="buttonContainer">
        <button onClick={modeKvM} className="btn menuButtons">
          Keyboard vs Mouse
        </button>
        <button onClick={modeTouch} className="btn menuButtons">
          Touchscreen (development)
        </button>
        <button onClick={modeAI} className="btn menuButtons">
          Single Player vs AI
        </button>
        <button onClick={modeNetwork} className="btn menuButtons">
          Multiplayer (development)
        </button>
      </section>
      <button
        className="btn settingsButton"
        onClick={() => setShowSettings(!showSettings)}
      >
        Settings
      </button>

      <section className="settingsContainer">
        <Settings
          theme={theme}
          setTheme={setTheme}
          setMenuMusic={setMenuMusic}
          menuMusic={menuMusic}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          showSettings={showSettings}
        />
      </section>
    </div>
  );
}
