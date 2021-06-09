import React, { useEffect, useState } from "react";
import "./menu.scss";
import useSound from "use-sound";
import MenuMusicLoboGlueWorm from "../sounds/LoboLocoGlueworm.mp3";

export default function Menu({ gameMode, setGameMode }) {
  //const [MenuMusicLoboGlueWormPlay, { stop }] = useSound(MenuMusicLoboGlueWorm);

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

  return (
    <div className="menuContainer">
      <p>Shoot first &nbsp; Die last</p>
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
        <button onClick={() => setMenuMusic(false)}>stop</button>
      </section>
    </div>
  );
}
