import React from "react";
import "./heroSelectorAI.scss";

export default function HeroSelectorAI({ setPlayer1Hero }) {
  const playersheriff = () => {
    setPlayer1Hero("sheriff");
  };

  const playercowboy = () => {
    setPlayer1Hero("cowboy");
  };

  return (
    <>
      <div className="heroes-box-human">
        <div className="hero-avatar-human" onClick={playersheriff}>
          <img src="./assets/sheriff.avatar.gif" alt="sheriff"></img>
        </div>
        <div className="hero-avatar-human" onClick={playercowboy}>
          <img src="./assets/cowboy.avatar.gif" alt="cowboy"></img>
        </div>
      </div>
    </>
  );
}
