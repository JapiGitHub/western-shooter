import React from "react";
import "./heroSelector.scss";

export default function HeroSelector({ setPlayer1Hero, setPlayer2Hero }) {
  const player2sheriff = () => {
    setPlayer2Hero("sheriff");
  };

  const player2cowboy = () => {
    setPlayer2Hero("cowboy");
  };

  const player1sheriff = () => {
    setPlayer1Hero("sheriff");
  };

  const player1cowboy = () => {
    setPlayer1Hero("cowboy");
  };

  return (
    <>
      <div className="heroes-box-keyboard">
        <div className="hero-avatar-keyboard" onClick={player2sheriff}>
          <img src="./assets/sheriff.avatar.gif" alt="sheriff"></img>
        </div>
        <div className="hero-avatar-keyboard" onClick={player2cowboy}>
          <img src="./assets/cowboy.avatar.gif" alt="cowboy"></img>
        </div>
      </div>

      <div className="heroes-box-mouse">
        <div className="hero-avatar-mouse" onClick={player1cowboy}>
          <img src="./assets/cowboy.avatar.gif" alt="cowboy"></img>
        </div>
        <div className="hero-avatar-mouse" onClick={player1sheriff}>
          <img src="./assets/sheriff.avatar.gif" alt="sheriff"></img>
        </div>
      </div>
    </>
  );
}
