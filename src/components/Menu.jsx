import React from "react";
import "./menu.scss";

export default function Menu({ gameMode, setGameMode }) {
  const modeKvM = () => {
    setGameMode("split");
  };

  const modeAI = () => {
    setGameMode("ai");
  };

  const modeLobby = () => {
    setGameMode("lobby");
  };

  const modeTouch = () => {
    setGameMode("touch");
  };

  return (
    <div className="menuContainer">
      <p>Shoot 'em</p>
      <section className="buttonContainer">
        <button onClick={modeKvM}>Keyboard vs Mouse</button>
        <button onClick={modeTouch}>Touchscreen Splitscreen</button>
        <button onClick={modeAI}>Single Player vs AI</button>
        <button onClick={modeLobby}>Multiplayer</button>
      </section>
    </div>
  );
}
