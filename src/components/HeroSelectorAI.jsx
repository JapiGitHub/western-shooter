import React from "react";
import "./heroSelectorAI.scss";

export default function HeroSelectorAI({ setPlayer1Hero, player1Hero }) {
  const heroesList = ["sheriff", "cowboy", "pirate"];

  const changePlayer1Hero = (e) => {
    setPlayer1Hero(e.target.name);
  };

  return (
    <>
      <div className="heroes-box-mouse-human">
        {heroesList.map((hero) => (
          <div className="hero-avatar-mouse-human" key={hero}>
            <img
              className={player1Hero === hero ? "chosen" : null}
              src={`./assets/${hero}.avatar.gif`}
              key={hero}
              name={hero}
              onClick={changePlayer1Hero}
              alt="loading"
            ></img>
          </div>
        ))}
      </div>
    </>
  );
}
