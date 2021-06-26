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
  difficulty,
  setDifficulty,
  setScreenSlide,
}) {
  const [playerAvatar, setPlayerAvatar] = useState(
    user ? auth.currentUser.photoURL : null
  );

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const [difficultyInfo, setDifficultyInfo] = useState("normal");

  const [song, setSong] = useState(MenuMusicLoboGlueWorm);
  const [play, { stop }] = useSound(song);
  const [menuMusic, setMenuMusic] = useState(false);

  //The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page
  //eli jos teet esim splash startin ja käyttäjän pitää klikata sitä ekana, että pääsee menuun, niin sit toimii
  useEffect(() => {
    if (menuMusic) {
      play();
    } else {
      stop();
    }
  });

  const modeKvM = (e) => {
    e.preventDefault();
    stop();
    setGameMode("split");
    setShowMenu(false);
    setScreenSlide("game");
  };

  const modeAI = (e) => {
    e.preventDefault();
    stop();
    setGameMode("ai");
    setShowMenu(false);
    setScreenSlide("game");
  };

  const modeNetwork = () => {
    stop();
    setGameMode("network");
    setShowMenu(false);
  };

  const modeTouch = () => {
    stop();
    setGameMode("touch");
    setShowMenu(false);
    setScreenSlide("game");
  };

  const profileClick = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <div className={showMenu ? "menuContainer" : "menuContainer hideMenu"}>
      <aside className="dirt"></aside>
      <p>Shoot first&nbsp;&nbsp;&&nbsp;&nbsp;Die last</p>
      <section className="buttonContainer">
        <button onClick={modeKvM} className="btn">
          Keyboard vs Mouse
        </button>
        <button onClick={modeTouch} className="btn">
          Touchscreen (development)
        </button>
        <button onClick={modeAI} className="btn">
          Single Player vs AI
        </button>
        <button onClick={modeNetwork} className="btn">
          Multiplayer (development)
        </button>
      </section>

      <button
        className="btn musicToggle"
        onClick={() => setMenuMusic(!menuMusic)}
      >
        Music
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

      <div className="difficultyInfo">
        <p>{difficulty} ms fatalities</p>{" "}
        {(() => {
          switch (difficulty) {
            case "200":
              return <>Lucky Luke</>;
            case "220":
              return <>Do you feel lucky punk?</>;
            case "240":
              return <>Ranger. Texas Ranger.</>;
            case "300":
              return <>Hold my hand.</>;
          }
        })()}
      </div>

      <div></div>

      <div className="difficultyContainer">
        <button
          className={difficulty === "200" ? "btn chosenButton" : "btn"}
          onClick={() => setDifficulty("200")}
        >
          Insane
        </button>
        <button
          className={difficulty === "220" ? "btn chosenButton" : "btn"}
          onClick={() => setDifficulty("220")}
        >
          Hard
        </button>
        <button
          className={difficulty === "240" ? "btn chosenButton" : "btn"}
          onClick={() => setDifficulty("240")}
        >
          Normal
        </button>
        <button
          className={difficulty === "300" ? "btn chosenButton" : "btn"}
          onClick={() => setDifficulty("300")}
        >
          Easy
        </button>
      </div>
    </div>
  );
}
