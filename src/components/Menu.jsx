import React from "react";
import "./menu.scss";

export default function Menu({ gameMode, setGameMode }) {
  const modeKvM = () => {
    setGameMode("split");
  };

  const modeAI = () => {
    setGameMode("ai");
  };

  return (
    <div className="menuContainer">
      <p>Shoot 'em</p>
      <section className="buttonContainer">
        <button onClick={modeKvM}>Keyboard vs Mouse</button>
        <button onClick={modeAI}>Single Player vs AI</button>
        <button>Multiplayer</button>
      </section>
    </div>
  );
}
