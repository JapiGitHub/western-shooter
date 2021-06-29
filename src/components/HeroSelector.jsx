import React from "react";
import "./heroSelector.scss";

export default function HeroSelector({
  setPlayer1Hero,
  setPlayer2Hero,
  player1Hero,
  player2Hero,
}) {
  const heroesList = ["sheriff", "cowboy", "pirate"];

  const changePlayer1Hero = (e) => {
    setPlayer1Hero(e.target.name);
  };

  const changePlayer2Hero = (e) => {
    setPlayer2Hero(e.target.name);
  };

  return (
    <>
      <div className="heroes-box-keyboard">
        {heroesList.map((hero) => (
          <div className="hero-avatar-keyboard" key={hero}>
            <img
              className={player2Hero === hero ? "chosen" : null}
              src={`./assets/${hero}.avatar.gif`}
              key={hero}
              name={hero}
              onClick={changePlayer2Hero}
              alt="avatar"
            ></img>
          </div>
        ))}
      </div>

      <div className="heroes-box-mouse">
        {heroesList.map((hero) => (
          <div className="hero-avatar-mouse" key={hero}>
            <img
              className={player1Hero === hero ? "chosen" : null}
              src={`./assets/${hero}.avatar.gif`}
              key={hero}
              name={hero}
              onClick={changePlayer1Hero}
              alt="avatar"
            ></img>
          </div>
        ))}
      </div>
    </>
  );
}
