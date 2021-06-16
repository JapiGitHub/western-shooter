import React, { useEffect, useState } from "react";
import "./menu.scss";
import useSound from "use-sound";
import MenuMusicLoboGlueWorm from "../sounds/LoboLocoGlueworm.mp3";

export default function Menu({
  gameMode,
  setGameMode,
  auth,
  showMenu,
  setShowMenu,
  user,
  setTheme,
}) {
  const [playerAvatar, setPlayerAvatar] = useState(
    user ? auth.currentUser.photoURL : null
  );

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const [song, setSong] = useState(MenuMusicLoboGlueWorm);
  const [play, { stop }] = useSound(song);
  const [menuMusic, setMenuMusic] = useState(true);

  useEffect(() => {
    console.log(gameMode);
    if (menuMusic) {
      //play();
    } else {
      stop();
    }
  });

  const modeKvM = () => {
    stop();
    setGameMode("split");
    setShowMenu(false);
  };

  const modeAI = () => {
    stop();
    setGameMode("ai");
    setShowMenu(false);
  };

  const modeLobby = () => {
    stop();
    setGameMode("lobby");
    setShowMenu(false);
  };

  const modeTouch = () => {
    stop();
    setGameMode("touch");
    setShowMenu(false);
  };

  const profileClick = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <div className={showMenu ? "menuContainer" : "menuContainer hideMenu"}>
      <aside className="dirt"></aside>
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
        Pause
      </button>
      <button className="btn theme1Button" onClick={() => setTheme("normal")}>
        Normal
      </button>
      <button className="btn theme2Button" onClick={() => setTheme("sepia")}>
        Oldie
      </button>
      {user ? (
        <img
          alt=""
          className="avatar"
          src={playerAvatar}
          onClick={profileClick}
        ></img>
      ) : null}
      <button
        className={profileMenuOpen ? "profileMenu btn" : "profileMenu hide btn"}
      >
        Logout
      </button>
    </div>
  );
}
