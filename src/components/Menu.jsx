import React, { useEffect, useState } from "react";
import "./menu.scss";
import useSound from "use-sound";
import MenuMusicLoboGlueWorm from "../sounds/LoboLocoGlueworm.mp3";

export default function Menu({ gameMode, setGameMode, auth }) {
  const [playerAvatar, setPlayerAvatar] = useState(auth.currentUser.photoURL);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const [song, setSong] = useState(MenuMusicLoboGlueWorm);
  const [play, { stop }] = useSound(song);
  const [menuMusic, setMenuMusic] = useState(true);

  useEffect(() => {
    console.log(gameMode);
    if (menuMusic) {
      play();
    } else {
      stop();
    }
  });

  const modeKvM = () => {
    stop();
    setGameMode("split");
  };

  const modeAI = () => {
    stop();
    setGameMode("ai");
  };

  const modeLobby = () => {
    stop();
    setGameMode("lobby");
  };

  const modeTouch = () => {
    stop();
    setGameMode("touch");
  };

  const profileClick = () => {
    setProfileMenuOpen(true);
  };

  return (
    <div className="menuContainer">
      <p>Shoot first // Die last</p>
      <section className="buttonContainer">
        <button onClick={modeKvM} className="btn">
          Keyboard vs Mouse
        </button>
        <button onClick={modeTouch} className="btn">
          Touchscreen Splitscreen
        </button>
        <button onClick={modeAI} className="btn">
          Single Player vs AI
        </button>
        <button onClick={modeLobby} className="btn">
          Multiplayer
        </button>
      </section>
      <button className="btn musicToggle" onClick={() => setMenuMusic(false)}>
        ||
      </button>
      <img
        alt=""
        className="avatar"
        src={playerAvatar}
        onClick={profileClick}
      ></img>
      <div className="profileMenu"></div>
    </div>
  );
}
